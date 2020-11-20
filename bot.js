const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const axios = require('axios');

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

const config = JSON.parse(fs.readFileSync('./config.json'));
const dictKey = config.dictKey.split('BRUH').join('');
const discKey = config.discKey.split('BRUH').join('');

client.on('message', msg => {
	if (!msg.content.toLocaleLowerCase().startsWith('define')) { return }
	const parts = msg.content.split(' ');
	const word = parts
		.slice(1)
		.join(' ')
		.replace(/[\*]/g, '');
	axios.get(`https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=${dictKey}`)
		.then(res => {
			try {
				//take the first definition and format it
				const log = res.data[0].shortdef
					.map(p => `\`\`\`${p};\`\`\``)
					.join('\n');
				msg.channel.send(`__${word}__:\n${log}`);
			} catch (e) {
				msg.channel.send(`Yea... that word dosn't exist`);
			}
		})
});

client.login(discKey);