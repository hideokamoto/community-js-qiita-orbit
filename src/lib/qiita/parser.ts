import {QiitaPost} from '../../types'

export type ParsedQiitaPost = {
  title: string;
  url: string;
  created_at: string;
  username: string;
  profile_url: string;
  tags: string[];
  user: {
    github_login_name: string | null;
    linkedin_id: string | null;
    twitter_screen_name: string | null;
    website: string | null;
    organization_name: string | null;
    name: string | null;
    description: string | null;
    location: string | null;
  },

}
export const parseQiitaPosts = (posts: QiitaPost[]):Array<ParsedQiitaPost> => {
  return posts.filter(post => !post.private).map(post => ({
    title: post.title,
    url: post.url,
    created_at: post.created_at,
    username: post.user.id,
    profile_url: `https://qiita.com/${post.user.id}`,
    tags: post.tags.map(tag => {
      if (tag.name.toLocaleLowerCase().startsWith('stripe')) return tag.name
      return tag.name.toLocaleLowerCase()
    }),
    user: {
      github_login_name: post.user.github_login_name,
      linkedin_id: post.user.linkedin_id,
      twitter_screen_name: post.user.twitter_screen_name,
      website: post.user.website_url,
      organization_name: post.user.organization,
      name: post.user.name,
      description: post.user.description,
      location: post.user.location,
    },
  }))
}
