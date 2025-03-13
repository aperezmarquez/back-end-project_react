// LOGGER DEL CHAT A SLACK
const { IncomingWebhook } = require("@slack/webhook")

const webHook = new IncomingWebhook("https://hooks.slack.com/services/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")
const loggerStream = {
    write: message => {
        webHook.send({
            text: message
        })
    }
}

module.exports = loggerStream
