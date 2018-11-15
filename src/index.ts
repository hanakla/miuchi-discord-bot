import fs from 'fs'
import { join } from 'path'
import Discord from 'discord.js'

process.on('uncaughtException', e => { console.error(e.message) })
process.on('unhandledRejection', e => { console.error(e) })

const ASSET_DIR = join(__dirname, '../assets/')

const config = JSON.parse(fs.readFileSync(join(__dirname, '../config.json')).toString())

const client = new Discord.Client()
client.login(config.token)

client.on('message', async message => {
    if (message.author.bot) return

    if (message.guild && message.content === '!fuck') {
        if (!message.member.voiceChannel) return

        const connection = await message.member.voiceChannel.join()
        const file = Math.random() < 0.2 ? join(ASSET_DIR, 'ai-fuck.webm') : join(ASSET_DIR, 'fuck.webm')
        const dispatcher = connection.playFile(file)
        dispatcher.setVolume(0.09)
        dispatcher.on('end', () => {
            dispatcher.end()
            connection.disconnect()
        })
    }
})
