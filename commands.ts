import {
    SlashCommandBuilder,
    Interaction,
    RESTPostAPIChatInputApplicationCommandsJSONBody,
} from "discord.js";

interface customCommand {
    data: SlashCommandBuilder;
    execute: (interaction: Interaction) => void;
}

const commandsJSON: RESTPostAPIChatInputApplicationCommandsJSONBody[] = [];

const pingCommand: customCommand = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Replies with Pong!"),
    async execute(interaction: Interaction) {
        if (interaction.isRepliable()) {
            await interaction.reply("Pong!");
        }
    },
};

commandsJSON.push(pingCommand.data.toJSON());

export { customCommand, commandsJSON, pingCommand };
