import axios from 'axios'
import {QiitaPost} from '../../types'

export const listQiitaPostsByTag = async (tag: string): Promise<QiitaPost[]> => {
  const respone = await axios.get(`https://qiita.com/api/v2/tags/${tag}/items`)
  return respone.data as QiitaPost[]
}
