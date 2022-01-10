import { defEvent } from '../util/events'
import { handleSlashCommand, commandError } from '../util/handlers'

export default defEvent('interactionCreate', async (client, interaction) => {
  handleSlashCommand(client, interaction).catch((e) => {
    if (interaction.isCommand()) interaction.reply({ embeds: [commandError(e.toString())] })
  })
})
