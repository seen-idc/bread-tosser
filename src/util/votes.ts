import { MessageEmbed, User } from 'discord.js'

export function voteKickEmbed(user: User, author: User, votes: number, requiredVotes: number) {
  const embed = new MessageEmbed()
    .setColor('YELLOW')
    .setTitle(`Votekick **${user.tag}**`)
    .setDescription(
      `Votekick for **${user.tag}** \`${user.id}\`\nStarted by **${author.tag}** \`${author.id}\``
    )
    .addField('Votes', `\`\`\`yml\n${votes}/${requiredVotes}\`\`\``)
    .setFooter('Voting "no" will reduce the votes by 1')

  return embed
}

export function voteBanEmbed(user: User, author: User, votes: number, requiredVotes: number) {
  const embed = new MessageEmbed()
    .setColor('YELLOW')
    .setTitle(`Voteban **${user.tag}**`)
    .setDescription(
      `Voteban for **${user.tag}** \`${user.id}\`\nStarted by **${author.tag}** \`${author.id}\``
    )
    .addField('Votes', `\`\`\`yml\n${votes}/${requiredVotes}\`\`\``)
    .setFooter('Voting "no" will reduce the votes by 1')

  return embed
}

export function voteKickEmbedSuccess(
  user: User,
  author: User,
  votes: number,
  requiredVotes: number
) {
  const embed = new MessageEmbed()
    .setColor('GREEN')
    .setTitle(`Votekick **${user.tag}**`)
    .setDescription(
      `**${user.tag} has been kicked!**\nVotekick for **${user.tag}** \`${user.id}\`\nStarted by **${author.tag}** \`${author.id}\``
    )
    .addField('Votes', `\`\`\`diff\n + ${votes}/${requiredVotes}\`\`\``)
    .setFooter('Voting "no" will reduce the votes by 1')

  return embed
}

export function voteBanEmbedSuccess(
  user: User,
  author: User,
  votes: number,
  requiredVotes: number
) {
  const embed = new MessageEmbed()
    .setColor('GREEN')
    .setTitle(`Voteban **${user.tag}**`)
    .setDescription(
      `**${user.tag} has been banned!**\nVoteban for **${user.tag}** \`${user.id}\`\nStarted by **${author.tag}** \`${author.id}\``
    )
    .addField('Votes', `\`\`\`diff\n + ${votes}/${requiredVotes}\`\`\``)
    .setFooter('Voting "no" will reduce the votes by 1')

  return embed
}

export function voteKickEmbedFail(
  user: User,
  author: User,
  votes: number,
  requiredVotes: number,
  reason: string
) {
  const embed = new MessageEmbed()
    .setColor('RED')
    .setTitle(`Votekick **${user.tag}**`)
    .setDescription(
      `**${user.tag} has not been kicked!**\n**Reason:** ${reason}\nVotekick for **${user.tag}** \`${user.id}\`\nStarted by **${author.tag}** \`${author.id}\``
    )
    .addField('Votes', `\`\`\`diff\n${votes}/${requiredVotes}\`\`\``)
    .setFooter('Voting "no" will reduce the votes by 1')

  return embed
}

export function voteBanEmbedFail(
  user: User,
  author: User,
  votes: number,
  requiredVotes: number,
  reason: string
) {
  const embed = new MessageEmbed()
    .setColor('RED')
    .setTitle(`Voteban **${user.tag}**`)
    .setDescription(
      `**${user.tag} has not been banned!**\n**Reason:** ${reason}\nVoteban for **${user.tag}** \`${user.id}\`\nStarted by **${author.tag}** \`${author.id}\``
    )
    .addField('Votes', `\`\`\`diff\n${votes}/${requiredVotes}\`\`\``)
    .setFooter('Voting "no" will reduce the votes by 1')

  return embed
}
