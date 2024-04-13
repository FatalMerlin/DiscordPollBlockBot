const { Client, GatewayIntentBits } = require('discord.js');

require('dotenv').config();

function ensureEnv(envVarName) {
    if (!process.env[envVarName]) {
        console.log(envVarName + ' not configured, .env file missing?');
        process.exit(1);
    }
}

ensureEnv('DISCORD_TOKEN');
ensureEnv('CLIENT_ID');

const client = new Client({
    intents: [
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.MessageContent,
    ],
});

client.on('ready', () => {
    console.log('Logged in as ' + client.user.tag);
    client.on('messageCreate', (msg) => {
        if (msg.author.bot) return;

        const isPoll =
            msg.type === 0 &&
            msg.system === false &&
            msg.content === '' &&
            msg.embeds.length === 0 &&
            msg.components.length === 0 &&
            msg.attachments.size === 0 &&
            msg.stickers.size === 0 &&
            msg.position === 0 &&
            msg.roleSubscriptionData === null &&
            msg.resolved === null &&
            msg.webhookId === null &&
            msg.applicationId === null &&
            msg.activity === null &&
            msg.cleanContent === '';

        if (isPoll) {
            msg.reply('Polls are not allowed in this server!');
            msg.delete().catch(console.error);
        }
    });
});

client.login();
