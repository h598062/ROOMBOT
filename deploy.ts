import { REST, Routes } from "discord.js";
import dotenv from "dotenv";
import * as fs from "fs";

import { commandsJSON } from "./commands";

const envVars = dotenv.config({ path: "./bot.env" });
if (!envVars.parsed) {
    console.error(".env file not found");
    const envstr = "DISCORD_TOKEN=\nBOT_ID=\nGUILD_ID=\n";
    fs.writeFile("./bot.env", envstr, (err) => {
        if (err) throw err;
    });
    console.log("Opprettet en bot.env fil som må fylles ut");
    throw new Error("No .env file found");
}
if (!envVars.parsed.DISCORD_TOKEN) {
    console.error("DISCORD_TOKEN is not defined");
    throw new Error("DISCORD_TOKEN is not defined");
}
if (!envVars.parsed.BOT_ID) {
    console.error("BOT_ID is not defined");
    throw new Error("BOT_ID is not defined");
}
if (!envVars.parsed.GUILD_ID) {
    console.error("GUILD_ID is not defined");
    throw new Error("GUILD_ID is not defined");
}

// Construct and prepare an instance of the REST module
const rest = new REST({ version: "10" }).setToken(envVars.parsed.DISCORD_TOKEN);

// and deploy your commands!
(() => {
    try {
        console.log(
            `Started refreshing ${commandsJSON.length} application (/) commands.`
        );

        // The put method is used to fully refresh all commands in the guild with the current set
        const data = rest.put(
            Routes.applicationGuildCommands(
                envVars.parsed.BOT_ID,
                envVars.parsed.GUILD_ID
            ),
            { body: commandsJSON }
        );

        console.log(
            `Successfully reloaded ${commandsJSON.length} application (/) commands.`
        );
    } catch (error) {
        // And of course, make sure you catch and log any errors!
        console.error(error);
    }
})();
