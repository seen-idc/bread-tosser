import { defEvent } from '../util/events'
import { commandError, handleMessageCommand } from '../util/handlers'

export default defEvent('messageCreate', async (client, message) => {
  handleMessageCommand(client, message).catch((e) => {
    message.reply({ embeds: [commandError(e.toString())] })
  })
})
