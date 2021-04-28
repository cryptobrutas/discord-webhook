const discord = require('discord.js');
const MAX_MESSAGE_LENGTH = 40;

module.exports.send = (id, token, repo, branch, url, commits, size, report) => new Promise((resolve, reject) => {
    var client;
    console.log("Preparing Webhook...");
    try {
        client = new discord.WebhookClient(id, token);
    }
    catch (error) {
        reject(error.message);
        return;
    }

    client.send(createEmbed(repo, branch, url, commits, size, report)).then(() => {
        console.log("Successfully sent the message!");
        resolve();
    }, reject);
});

function createEmbed(repo, branch, url, commits, size, report) {
    console.log("Constructing Embed...");
    var latest = commits[0];

    var embed = new discord.RichEmbed()
                .setColor(0x00BB22)
                .setTitle(`*cryptobrutas* - \`${commits[0].author.username}\` pushed ${size} ${(size > 1) ? "commits" : "commit"} to ${repo}`)
                .setDescription(getChangeLog(commits, size))

    return embed;
}

function getChangeLog(commits, size) {
    var changelog = "";

    for (var i in commits) {
        var commit = commits[i];
        var sha = commit.id.substring(0, 6);
        var message = commit.message;
        changelog += `\`${sha}\` ${commit.message} - ${commit.author.username}\n`;
    }

    return changelog;
}
