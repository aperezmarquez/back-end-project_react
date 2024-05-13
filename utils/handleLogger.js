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
