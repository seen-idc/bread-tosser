import { SlashCommandBuilder } from '@discordjs/builders'
import { MessageActionRow, MessageButton, MessageComponentInteraction } from 'discord.js'

import { defCommand } from '../../util/commands'
import { voteKickEmbed, voteKickEmbedFail, voteKickEmbedSuccess } from '../../util/votes'

const slashCommandData = new SlashCommandBuilder()
  .setName('votekick')
  .setDescription('Vote kick a user')

slashCommandData.addUserOption((opt) => opt.setName('user').setDescription('User to kick'))

function requiredVotes(memberCount: number): number {
  if (memberCount <= 25) {
    return Math.floor(memberCount / 2)
  } else if (memberCount > 25 && memberCount <= 30) {
    return Math.floor(memberCount / 2.5)
  } else if (memberCount > 30 && memberCount <= 100) {
    return Math.floor(memberCount / 3.5)
  } else if (memberCount > 100 && memberCount <= 200) {
    return Math.floor(memberCount / 4)
  } else if (memberCount > 200) {
    return Math.floor(memberCount / 5)
  }

  return memberCount / 5
}

export default defCommand({
  name: 'votekick',
  category: 'moderation',
  cooldown: 60,
  usage: '<Category/Cmd>',
  description: 'Help command',
  commandPreference: 'message',
  aliases: ['vk'],
  run: async (client, message, args) => {
    if (!message.guild) return

    let voteRequirement = requiredVotes(message.guild.memberCount)
    let targetUser = message.mentions.users.first()

    if (!targetUser) {
      throw new Error('You did not mention a user!')
    }

    if (targetUser.bot) {
      throw new Error('You cannot votekick a bot!')
    }

    const row = new MessageActionRow().addComponents(
      new MessageButton().setCustomId('votekick-yes').setLabel('Yes').setStyle('PRIMARY'),
      new MessageButton().setCustomId('votekick-no').setLabel('No').setStyle('PRIMARY')
    )

    const endedRow = new MessageActionRow().addComponents(
      new MessageButton()
        .setCustomId('votekick-yes')
        .setLabel('Yes')
        .setStyle('SUCCESS')
        .setDisabled(true),
      new MessageButton()
        .setCustomId('votekick-no')
        .setLabel('No')
        .setStyle('DANGER')
        .setDisabled(true)
    )

    let votes = 0

    let voteMessage = await message.reply({
      embeds: [voteKickEmbed(targetUser, message.author, 0, voteRequirement)],
      components: [row],
    })

    let alreadyVoted: string[] = []
    let alreadyWarned: string[] = []

    const filter = (i: MessageComponentInteraction) =>
      i.message.id == voteMessage.id &&
      (i.customId == 'votekick-yes' || i.customId == 'votekick-no')

    const collector = message.channel.createMessageComponentCollector({
      filter,
      time: 2 * 60 * 1000,
    })

    collector.on('collect', async (i) => {
      if (!targetUser) {
        await i.update({
          content: 'The user no longer exists!',
          embeds: [],
          components: [endedRow],
        })
        collector.stop('User not found')
        return
      }

      if (alreadyVoted.includes(i.user.id)) {
        if (!alreadyWarned.includes(i.user.id)) {
          alreadyWarned.push(i.user.id)
          if (i.channel) {
            i.channel?.send(`<@${i.user.id}> You have already voted!`)
          }
        }
        return
      }

      if (i.customId == 'votekick-yes') {
        alreadyVoted.push(i.user.id)
        collector.resetTimer()
        votes++

        if (votes >= voteRequirement) {
          await i.update({
            embeds: [voteKickEmbedSuccess(targetUser, message.author, votes, voteRequirement)],
            components: [endedRow],
          })
          collector.stop()
          return
        }

        await i.update({
          embeds: [voteKickEmbed(targetUser, message.author, votes, voteRequirement)],
          components: [row],
        })
      } else if (i.customId == 'votekick-no') {
        alreadyVoted.push(i.user.id)
        collector.resetTimer()
        votes--
        await i.update({
          embeds: [voteKickEmbed(targetUser, message.author, votes, voteRequirement)],
          components: [row],
        })
      }
    })

    collector.on('end', async (collected) => {
      if (!targetUser) {
        await voteMessage.edit({
          content: 'The user no longer exists!',
          embeds: [],
          components: [endedRow],
        })
        return
      }

      if (votes >= voteRequirement) {
        await voteMessage.edit({
          embeds: [voteKickEmbedSuccess(targetUser, message.author, votes, voteRequirement)],
          components: [endedRow],
        })

        if (message.guild) {
          let user = await message.guild.members.fetch({
            user: targetUser,
          })

          if (user.kickable) {
            user.kick('Votekicked')
          }
        }

        return
      }

      if (votes < voteRequirement) {
        await voteMessage.edit({
          embeds: [
            voteKickEmbedFail(
              targetUser,
              message.author,
              votes,
              voteRequirement,
              'Not enough votes'
            ),
          ],
          components: [endedRow],
        })
        return
      }
    })
  },
  slashCommand: slashCommandData,
  interaction: async (client, interaction) => {
    if (!interaction.isCommand()) return
    if (!interaction.guild) return
    await interaction.reply({ content: 'Pong!' })
  },
})
