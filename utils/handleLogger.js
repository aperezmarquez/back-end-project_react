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
