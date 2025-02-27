const { Message, Client } = require('discord.js')

module.exports = {
    name: 'messageDelete',
    once: false,
    /**
     *
     * @param {Message} message
     * @param {Client} client
     */
    execute(message, client) {
        if (message.author.bot) return
        let snipes = client.snipes.snipes.get(message.channel.id) || []

        if (snipes.length > 5) snipes = snipes.slice(0, 4)

        snipes.unshift({
            msg: message,
            image: message.attachments.first()?.proxyURL || null,
            time: Date.now(),
        })

        client.snipes.snipes.set(message.channel.id, snipes)
    },
}
