import {
    Client,
    Events,
    GatewayIntentBits,
    InteractionType,
    Message,
    Collection,
    SlashCommandBuilder,
    ClientOptions,
    Interaction,
    RESTPostAPIChatInputApplicationCommandsJSONBody,
} from "discord.js";
import dotenv from "dotenv";
import * as fs from "fs";
import { customCommand, pingCommand } from "./commands";

class BetterClient extends Client {
    commands: Collection<String, customCommand>;
    constructor(options: ClientOptions) {
        super(options);
        this.commands = new Collection();
    }
}

const envVars = dotenv.config({ path: "./bot.env" });
if (envVars.parsed === undefined) {
    console.error(".env file not found");
    const envstr = "DISCORD_TOKEN=\nBOT_ID=\nGUILD_ID=\n";
    fs.writeFile("bot.env", envstr, (err) => {
        if (err) throw err;
    });
    console.log("Opprettet en bot.env fil som må fylles ut");
    throw new Error("No .env file found");
}
if (
    envVars.parsed.DISCORD_TOKEN === undefined ||
    envVars.parsed.DISCORD_TOKEN == ""
) {
    console.error("DISCORD_TOKEN is not defined");
    throw new Error("DISCORD_TOKEN is not defined");
}
if (envVars.parsed.BOT_ID === undefined || envVars.parsed.BOT_ID == "") {
    console.error("BOT_ID is not defined");
    throw new Error("BOT_ID is not defined");
}
if (envVars.parsed.GUILD_ID === undefined || envVars.parsed.GUILD_ID == "") {
    console.error("GUILD_ID is not defined");
    throw new Error("GUILD_ID is not defined");
}

// Create a new client instance
const client = new BetterClient({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildMessages,
    ],
});

client.commands.set(pingCommand.data.name, pingCommand);

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, (c) => {
    console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.on(Events.InteractionCreate, async (interaction) => {
    console.log(interaction);
    if (!interaction.isChatInputCommand()) return;
    const command = client.commands.get(interaction.commandName);
    if (!command) {
        console.error(
            `No command matching ${interaction.commandName} was found.`
        );
        return;
    }
    try {
        command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({
            content: "There was an error while executing this command!",
            ephemeral: true,
        });
    }
});

// Log in to Discord with your client's token
client.login(envVars.parsed.DISCORD_TOKEN);
