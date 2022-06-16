import {Command, Flags} from '@oclif/core'
import * as Table from 'cli-table3'
import * as dayjs from 'dayjs'
import {OrbitClient} from '../../lib/api/orbit'

export default class SearchMembers extends Command {
  static description = 'Search Orbit member by the username each source.'

  static examples = [
    'orbit-qiita search members username -t twitter : search username from Twitter source',
    'orbit-qiita search members username -t Custom : search username from custom source',
    'orbit-qiita search members username -t Custom -f table : Show result as a table',
  ]

  static flags = {
    format: Flags.enum({
      char: 'f',
      default: 'json',
      options: ['json', 'table'],
    }),
    target: Flags.string({
      char: 't',
      default: 'tag',
    }),
  }

  static args = [{
    name: 'keyword',
    required: true,
    description: 'Search keyword',
  }]

  public async run(): Promise<void> {
    const {args: {keyword}, flags: {target, format}} = await this.parse(SearchMembers)

    const member = await OrbitClient.members.searchBySource(target, keyword)
    if (format === 'json') {
      this.log(JSON.stringify(member))
      return
    }

    if (format === 'table') {
      const profileTable = new Table({head: ['Profiles', 'Name', 'location', 'Orbit score', 'Created at']})
      profileTable.push({
        ' ': [member.data.attributes.name, member.data.attributes.location, `Level: ${member.data.attributes.orbit_level}`, `${dayjs(member.data.attributes.created_at).format('YYYY/MM/DD')}`],
      }, {
        Languages: [member.data.attributes.languages.join(', ')],
      })
      this.log(profileTable.toString())

      const identities: {
        [sourceName: string]: string[]
      } = {}

      for (const identity of member.included) {
        const username = identity.attributes.username || identity.attributes.uid
        if (identities[identity.attributes.source]) {
          identities[identity.attributes.source].push(username)
        } else {
          identities[identity.attributes.source] = [username]
        }
      }

      const identityTable = new Table({head: ['Identities']})
      for (const identitySource of Object.entries(identities)) {
        identityTable.push({
          [identitySource[0]]: identitySource[1],
        })
      }

      this.log(identityTable.toString())
    }
  }
}
