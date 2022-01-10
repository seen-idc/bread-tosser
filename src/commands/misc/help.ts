import { defCommand } from '../../util/commands'
import { SlashCommandBuilder } from '@discordjs/builders'
import { helpMain, helpForCategory } from '../../util/handlers'

const slashCommandData = new SlashCommandBuilder().setName('help').setDescription('Help command')

slashCommandData.addStringOption((opt) =>
  opt.setName('cat_or_cmd').setDescription('Category / Command')
)

export default defCommand({
  name: 'help',
  category: 'misc',
  cooldown: 3,
  usage: '<Category/Cmd>',
  description: 'Help command',
  commandPreference: 'slash',
  run: async (client, message, args) => {
    if (args.length > 0) {
      let cmd = args[0]

      message.reply({ embeds: [helpForCategory(cmd)] })
    } else {
      message.reply({ embeds: [helpMain()] })
    }
  },
  slashCommand: slashCommandData,
  interaction: async (client, interaction) => {
    if (!interaction.isCommand()) return
    let cmd = interaction.options.getString('cat_or_cmd')

    if (cmd) {
      interaction.reply({ embeds: [helpForCategory(cmd)] })
    } else {
      interaction.reply({ embeds: [helpMain()] })
    }
  },
})
