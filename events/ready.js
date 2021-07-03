
const event = async (client) => {
    client.logger.info(`${client.user.tag} is online!`)
}

module.exports = {
    event : {
        name: 'ready',
        run: event
    }
}
