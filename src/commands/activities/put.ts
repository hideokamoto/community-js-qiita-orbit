import {Command, Flags} from '@oclif/core'
import {OrbitClient} from '../../lib/api/orbit'
import {ContentActivity} from '../../lib/api/orbit/activities'
import {PutMemberRequest} from '../../lib/api/orbit/members'
import {ParsedQiitaPost, parseQiitaPosts} from '../../lib/qiita/parser'
import {listQiitaPostsByTag} from '../../lib/qiita/tag'

export type OrbitMemberWithQiitaUsername = {
  [username: string]: null | {
    id: string;
    slug: string;
  }
}
export default class ActivitiesPut extends Command {
  private isDebug = false;
  static description = 'Put contenct creation activity to Orbit'

  static examples = [
    'orbit-qiita activities put <keyword>: Put contenct creation activity to Orbit',
  ]

  static flags = {
    debug: Flags.boolean({char: 'd', description: 'Show process log', default: false}),
  }

  static args = [{
    name: 'keyword',
    required: true,
    description: 'Search keyword',
  }]

  public async run(): Promise<void> {
    const {flags: {debug}, args: {keyword}} = await this.parse(ActivitiesPut)
    this.isDebug = debug

    const response = await listQiitaPostsByTag(keyword)
    const posts = parseQiitaPosts(response)
    const orbitMembers = await this._listOrbitMemberByPosts(posts)

    for await (const post of posts) {
      try {
        if (debug) console.log({username: post.username})
        const orbitMember = orbitMembers[post.username]
        if (debug) console.log({orbitMember})
        if (orbitMember) {
          await this._putMemberActivity(orbitMember.slug, post)
        } else {
          await this._putNewMemberActivity(post)
        }
      } catch (error) {
        if ((error as any).response.status !== 422) {
          if (debug) console.log(error)
          throw error
        }

        console.log(error)
      }
    }

    this.log(JSON.stringify(orbitMembers))
  }

  private async _putMemberActivity(orbitMemberSlug: string, post: ParsedQiitaPost) {
    const contentActivity: ContentActivity = {
      activity_type: 'content',
      url: post.url,
      occurred_at: post.created_at,
    }
    const putActivityResult = await OrbitClient.activities.putContentActivity(orbitMemberSlug, contentActivity)
    if (this.isDebug) console.log(putActivityResult)
    const updateMemberAttributes: Partial<PutMemberRequest['member']> = {}
    if (post.tags) updateMemberAttributes.tags_to_add = post.tags.join(',')

    const user = post.user
    if (user.website) updateMemberAttributes.url = user.website
    if (user.github_login_name) updateMemberAttributes.github = user.github_login_name
    if (user.twitter_screen_name) updateMemberAttributes.twitter = user.twitter_screen_name
    if (user.location) updateMemberAttributes.location = user.location
    if (user.description) updateMemberAttributes.bio = user.description
    if (this.isDebug) console.log(updateMemberAttributes)
    if (Object.keys(updateMemberAttributes).length > 0) {
      const updateMemberResult = await OrbitClient.members.updateMember(orbitMemberSlug, updateMemberAttributes)
      if (this.isDebug) console.log(updateMemberResult)
    }
  }

  private async _putNewMemberActivity(post: ParsedQiitaPost) {
    const contentActivity: ContentActivity = {
      activity_type: 'content',
      url: post.url,
      occurred_at: post.created_at,
    }
    const user = post.user
    const memberProps: PutMemberRequest['member'] = {
      name: user.name || post.username,
      teammate: false,
    }
    if (user.website) memberProps.url = user.website
    if (user.github_login_name) memberProps.github = user.github_login_name
    if (user.twitter_screen_name) memberProps.twitter = user.twitter_screen_name
    if (user.location) memberProps.location = user.location
    if (user.description) memberProps.bio = user.description
    if (post.tags) memberProps.tags_to_add = post.tags.join(',')
    if (this.isDebug) console.log({user, memberProps})
    const putActivityResult = await OrbitClient.activities.putActivityWithMemberData({
      activity: {
        ...contentActivity,
        member: memberProps,
      },
      identity: {
        source: 'Qiita',
        source_host: 'qiita.com',
        username: post.username,
        url: post.profile_url,
      },
    })
    if (this.isDebug) console.log(putActivityResult)
  }

  private async _listOrbitMemberByPosts(posts: ParsedQiitaPost[]): Promise<OrbitMemberWithQiitaUsername> {
    const authorNames = new Set(posts.map(post => post.username))
    const orbitMembers: OrbitMemberWithQiitaUsername = {}

    for await (const authorName of authorNames) {
      try {
        const member = await OrbitClient.members.searchBySource('Qiita', authorName)
        if (member) {
          orbitMembers[authorName] = {
            id: member.data.id,
            slug: member.data.attributes.slug,
          }
        }
      } catch (error) {
        console.log({
          message: (error as Error).message,
        })
        orbitMembers[authorName] = null
      }
    }

    return orbitMembers
  }
}
