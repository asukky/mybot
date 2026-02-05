const fs = require('fs');
const path = require('path');
const { Client, GatewayIntentBits, Collection } = require('discord.js');
const { GameService } = require('../services/GameService');
const { WorldService } = require('../services/WorldService');

class CultivationBot {
  constructor() {
    this.client = new Client({ intents: [GatewayIntentBits.Guilds] });
    this.world = new WorldService();
    this.game = new GameService(this.world);
    this.commands = new Collection();
  }

  loadCommands() {
    const commandDir = path.join(__dirname, '..', 'slashCommands');
    const files = fs.readdirSync(commandDir).filter((f) => f.endsWith('.js'));
    files.forEach((file) => {
      const command = require(path.join(commandDir, file));
      this.commands.set(command.data.name, command);
    });
  }

  async registerSlashCommands() {
    const payload = this.commands.map((c) => c.data.toJSON());
    await this.client.application.commands.set(payload);
    console.log(`Registered ${payload.length} commands.`);
  }

  start() {
    this.loadCommands();
    const token = process.env.DISCORD_TOKEN;
    if (!token) {
      console.error('Missing DISCORD_TOKEN in environment.');
      process.exit(1);
    }

    this.client.once('ready', async () => {
      console.log(`Bot online as ${this.client.user.tag}`);
      await this.registerSlashCommands();
    });

    this.client.on('interactionCreate', async (interaction) => {
      if (!interaction.isChatInputCommand()) return;
      const command = this.commands.get(interaction.commandName);
      if (!command) return;
      try {
        await command.execute(interaction, { game: this.game, world: this.world, client: this.client });
      } catch (error) {
        console.error(error);
        if (interaction.replied || interaction.deferred) {
          await interaction.followUp({ content: 'Command failed.', ephemeral: true });
        } else {
          await interaction.reply({ content: 'Command failed.', ephemeral: true });
        }
      }
    });

    this.client.login(token);
  }
}

module.exports = { CultivationBot };
