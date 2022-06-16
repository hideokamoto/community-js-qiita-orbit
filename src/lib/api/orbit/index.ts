import {OrbitActivities} from './activities'
import {OrbitAPIClient, OrbitAPIClientProps} from './api-client'
import {OrbitMembers} from './members'
import '../../env'
export class Orbit {
  public readonly workspace_name: string;
  public readonly members: OrbitMembers;
  public readonly activities: OrbitActivities;
  constructor(config: OrbitAPIClientProps) {
    const client = new OrbitAPIClient(config)
    this.workspace_name = config.workspaceName
    this.members = new OrbitMembers(client)
    this.activities = new OrbitActivities(client)
  }
}

export const OrbitClient = new Orbit({
  workspaceName: process.env.ORBIT_WS_NAME as string,
  apiKey: process.env.ORBIT_API_KEY as string,
})
