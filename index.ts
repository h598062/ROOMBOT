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
import { customCommand, commands } from "./commands";

const envVars = dotenv.config({ path: "./bot.env" });
if (envVars.parsed === undefined) {
    console.error(".env file not found");
    const envstr = "DISCORD_TOKEN=\nBOT_ID=\nGUILD_ID=\n";
    fs.writeFile("./bot.env", envstr, (err) => {
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
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildMessages,
    ],
});

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, (c) => {
    console.log(`Ready! Logged in as ${c.user.tag}`);
});

// Slash command handling
client.on(Events.InteractionCreate, async (interaction) => {
    console.log(interaction);
    if (!interaction.isChatInputCommand()) return;
    const command = commands.get(interaction.commandName);
    if (!command) {
        console.error(
            `No command matching ${interaction.commandName} was found.`
        );
        return;
    }
    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({
            content: "There was an error while executing this command!",
            ephemeral: true,
        });
    }
});

// Autocomplete handling
client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isAutocomplete()) return;
    const command = commands.get(interaction.commandName);

    if (!command) {
        console.error(
            `No command matching ${interaction.commandName} was found.`
        );
        return;
    }

    try {
        if (command.autocomplete) {
            await command.autocomplete(interaction);
        } else {
            console.error(
                `Command ${interaction.commandName} is missing an autocomplete function`
            );
        }
    } catch (error) {
        console.error(error);
    }
});

// Log in to Discord with your client's token
client.login(envVars.parsed.DISCORD_TOKEN);
