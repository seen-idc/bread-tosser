import betterLogging from 'better-logging'
import { ShardingManager } from 'discord.js'
import dotenv from 'dotenv'

betterLogging(console)

// Handles exceptions for correcting later
process.on('uncaughtException', (e) => console.error(e.message))
process.on('unhandledRejection', (e) => console.error(e))

dotenv.config()

console.info('Starting bot..')

const manager = new ShardingManager('./build/main.js', { token: process.env.TOKEN })

manager.on('shardCreate', (shard) => console.info(`Created shard ${shard.id}`))

console.info('Spawning shards..')
manager.spawn()
