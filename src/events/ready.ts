import { defEvent } from '../util/events'
import { registerSlashCommands } from '../util/handlers'

export default defEvent('ready', (client) => {
  console.log(`Shard ${client.shard?.ids} Ready! Logged in as ${client.user?.tag}`)
  registerSlashCommands()
})
