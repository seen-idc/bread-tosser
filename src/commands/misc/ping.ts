import { MessageEmbed, Client } from 'discord.js'
import { defCommand } from '../../util/commands'
import { SlashCommandBuilder } from '@discordjs/builders'

function createEmbed(client: Client) {
  const embed = new MessageEmbed()
    .setColor('NAVY')
    .setTitle('🏓 Pong!')
    .setDescription(
      `**Latency:** \`${client.ws.ping}ms\`\n**RAM:** \`${
        Math.floor((process.memoryUsage().heapTotal / 1024 / 1024) * 100) / 100
      } MB\``
    )

  return embed
}

export default defCommand({
  name: 'ping',
  aliases: ['latency'],
  cooldown: 3,
  description: 'Pong!',
  usage: '',
  category: 'misc',
  commandPreference: 'slash',
  run: async (client, message) => {
    message.reply({ embeds: [createEmbed(client)] })
  },
  interaction: async (client, interaction) => {
    if (!interaction.isCommand()) return

    interaction.reply({ embeds: [createEmbed(client)] })
  },
  slashCommand: new SlashCommandBuilder().setName('ping').setDescription('Pong!'),
})
