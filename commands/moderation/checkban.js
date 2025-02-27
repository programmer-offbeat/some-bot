const { Message, Client } = require('discord.js')
module.exports = {
    name: 'checkban',
    aliases: ['cb', 'fhml'],
    /**
     *
     * @param {Message} message
     * @param {String[]} args
     * @param {Client} client
     * @returns
     */
    async execute(message, args, client) {
        const fh = client.guilds.cache.get('824294231447044197')
        if (message.guild.id !== '845215901657071647') return
        if (
            !message.member.roles.cache.has('848576301182877727') &&
            !message.member.roles.cache.has('848580138970251314')
        )
            return
        if (!args[0]) return message.channel.send('Please provide the user id.')

        const id =
            message.mentions.users.size > 0
                ? message.mentions.users.first().id
                : args[0]

        let ban =
            (await fh.bans.fetch(id).catch((e) => {
                message.channel.send(
                    `Either the provided user is not banned or the user id is invalid.`
                )
                return
            })) || null

        if (!ban) return

        message.channel.send({
            embeds: [
                {
                    title: 'Ban Info',
                    color: 'RED',
                    description: `User: \`${
                        ban.user ? ban.user.tag : 'Unknown'
                    }\`(\`${ban.user.id}\`)`,
                    fields: [
                        {
                            name: 'Reason',
                            value: ban.reason,
                        },
                    ],
                },
            ],
        })
    },
}
