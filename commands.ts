import {
    SlashCommandBuilder,
    Interaction,
    RESTPostAPIChatInputApplicationCommandsJSONBody,
    SlashCommandStringOption,
    APIApplicationCommandOptionChoice,
    Collection,
    range,
} from "discord.js";

import * as fs from "fs";

interface CustomSlashCommandBuilder
    extends Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup"> {}

interface customCommand {
    data: SlashCommandBuilder | CustomSlashCommandBuilder;
    autocomplete?: (interaction: Interaction) => void;
    execute: (interaction: Interaction) => void;
}

const romnumre: string[] = [];

const romnrfil = fs.readFileSync("./ROMKEY.csv", "utf-8");
romnrfil.split("\n").forEach((line) => {
    const s = line.split(",")[0];
    romnumre.push(s);
});

const pingCommand: customCommand = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Replies with Pong!"),
    execute: async (interaction: Interaction) => {
        if (!interaction.isRepliable()) return;
        await interaction.reply("Pong!");
    },
};

const bookCommand: customCommand = {
    data: new SlashCommandBuilder()
        .setName("book")
        .setDescription("Lar deg booke et grupperom på HVL")
        .addStringOption((option) =>
            option
                .setName("romnr")
                .setDescription("Romnummer du ønsker å booke")
                .setRequired(true)
                .setMaxLength(4)
                .setMinLength(4)
                .setAutocomplete(true)
        )
        .addIntegerOption((option) =>
            option
                .setName("starthr")
                .setDescription("Start time for booking")
                .setRequired(true)
                .setMaxValue(21)
                .setMinValue(8)
                .setAutocomplete(true)
        )
        .addIntegerOption((option) =>
            option
                .setName("startmin")
                .setDescription("Velg minutt, kun hvert 15. min er mulig")
                .setRequired(true)
                .setMaxValue(45)
                .setMinValue(15)
                .setAutocomplete(true)
        )
        .addStringOption((option) =>
            option
                .setName("sluttid")
                .setDescription("Velg sluttidspunkt")
                .setRequired(true)
                .setMaxLength(5)
                .setMinLength(5)
                .setAutocomplete(true)
        ) as CustomSlashCommandBuilder,
    autocomplete: async (interaction: Interaction) => {
        if (!interaction.isAutocomplete()) return;
        const focusedOption = interaction.options.getFocused(true);
        if (focusedOption.name === "romnr") {
            if (focusedOption.value == "") {
                const startChars = [
                    "A",
                    "B",
                    "C",
                    "D",
                    "E",
                    "F",
                    "G",
                    "K",
                    "L",
                    "M",
                ];
                await interaction.respond(
                    startChars.map((startChar) => ({
                        name: startChar,
                        value: startChar,
                    }))
                );
                return;
            }
            const filtered = romnumre.filter((romnr) =>
                romnr.startsWith(focusedOption.value)
            );
            await interaction.respond(
                filtered
                    .map((romnr) => ({ name: romnr, value: romnr }))
                    .slice(0, 25)
            );
        } else if (focusedOption.name === "starthr") {
            const starthrs = range(8, 21).map((num) => num.toString());
            const filtered = starthrs.filter((hr) =>
                hr.startsWith(focusedOption.value)
            );
            await interaction.respond(
                filtered.map((hr) => ({ name: hr, value: hr })).slice(0, 25)
            );
        } else if (focusedOption.name === "startmin") {
            const startmins = ["15", "30", "45"];
            await interaction.respond(
                startmins
                    .map((mins) => ({ name: mins, value: mins }))
                    .slice(0, 25)
            );
        } else if (focusedOption.name === "sluttid") {
            const starthr = interaction.options.getString("starthr");
            const startmin = interaction.options.getString("startmin");
            const hrint = starthr !== null ? parseInt(starthr) : 8;
            const possiblehrs = range(hrint, hrint + 3);
            const mulige = possiblehrs
                .map((hr) => {
                    const s = hr.toString();
                    const sa = [];
                    if (hr !== hrint + 3 && hr !== hrint) {
                        sa.push(s + ":15", s + ":30", s + ":45");
                    } else if (hr === hrint) {
                        if (startmin == "15") sa.push(s + ":30", s + ":45");
                        else if (startmin == "30") sa.push(s + ":45");
                    } else if (hr === hrint + 3) {
                        if (startmin == "15") sa.push(s + ":15");
                        else if (startmin == "30")
                            sa.push(s + ":15", s + ":30");
                        else if (startmin == "45")
                            sa.push(s + ":15", s + ":30", s + ":45");
                    }
                    return sa;
                })
                .flat(1);
            const filtered = mulige.filter((tidspunkt) =>
                tidspunkt.startsWith(focusedOption.value)
            );
            await interaction.respond(
                filtered
                    .map((tidspunkt) => ({ name: tidspunkt, value: tidspunkt }))
                    .slice(0, 25)
            );
        }
    },
    execute: async (interaction: Interaction) => {
        if (interaction.isRepliable()) {
            console.log("woo");
        }
    },
};

const commandarr: customCommand[] = [];
commandarr.push(pingCommand, bookCommand);

const commands: Collection<string, customCommand> = new Collection();
for (const cmd of commandarr) {
    commands.set(cmd.data.name, cmd);
}

const commandsJSON: RESTPostAPIChatInputApplicationCommandsJSONBody[] =
    commandarr.map((cmd) => cmd.data.toJSON());

export { customCommand, commandsJSON, commands };
