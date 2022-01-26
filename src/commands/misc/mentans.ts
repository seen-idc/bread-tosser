import { MessageEmbed, Client, GuildMember } from 'discord.js'
import { defCommand } from '../../util/commands'
import { SlashCommandBuilder } from '@discordjs/builders'
import {
  createAudioPlayer,
  createAudioResource,
  joinVoiceChannel,
  NoSubscriberBehavior,
} from '@discordjs/voice'

export default defCommand({
  name: 'mentans',
  aliases: ['latency'],
  cooldown: 3,
  description: 'MEN TANS NOW!',
  usage: '',
  category: 'misc',
  commandPreference: 'slash',
  run: async (client, message) => {
    message.reply('MENTANS NOW!')

    if (message.member?.voice) {
      let vc = message.member.voice.channel

      if (!vc || !vc.id || !vc.guild.id) return
      if (!vc.joinable) return

      const player = createAudioPlayer({
        behaviors: {
          noSubscriber: NoSubscriberBehavior.Stop,
        },
      })
      const resource = createAudioResource('./mentans.mp3')

      const connection = joinVoiceChannel({
        channelId: vc.id,
        guildId: vc.guild.id,
        adapterCreator: vc.guild.voiceAdapterCreator,
      })
      const sub = connection.subscribe(player)

      setTimeout(() => player.play(resource), 1000)

      if (sub) {
        setTimeout(() => {
          sub.unsubscribe()
          if (player) {
            player.stop()
          }

          if (connection) {
            connection.destroy()
          }
        }, 5000)
      }
    }
  },
  interaction: async (client, interaction) => {
    if (!interaction.isCommand()) return

    interaction.reply('MENTANS NOW!')

    if ((interaction.member as GuildMember).voice) {
      let vc = (interaction.member as GuildMember).voice.channel

      if (!vc || !vc.id || !vc.guild.id) return
      if (!vc.joinable) return

      const player = createAudioPlayer({
        behaviors: {
          noSubscriber: NoSubscriberBehavior.Stop,
        },
      })
      const resource = createAudioResource('./mentans.mp3')

      const connection = joinVoiceChannel({
        channelId: vc.id,
        guildId: vc.guild.id,
        adapterCreator: vc.guild.voiceAdapterCreator,
      })
      const sub = connection.subscribe(player)

      setTimeout(() => player.play(resource), 1000)

      if (sub) {
        setTimeout(() => {
          sub.unsubscribe()
          if (player) {
            player.stop()
          }

          if (connection) {
            connection.destroy()
          }
        }, 5000)
      }
    }
  },
  slashCommand: new SlashCommandBuilder().setName('mentans').setDescription('MEN TANS NOW!'),
})
