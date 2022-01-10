import { Awaitable, Client, ClientEvents } from 'discord.js'

export interface BotEvent<K extends keyof ClientEvents> {
  event: K
  run: EventRun<K>
}

export type EventRun<K extends keyof ClientEvents> = (
  client: Client,
  ...args: ClientEvents[K]
) => Awaitable<void>

export function defEvent<K extends keyof ClientEvents>(event: K, run: EventRun<K>): BotEvent<K> {
  return {
    event: event,
    run: run,
  }
}
