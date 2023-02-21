import {
    SlashCommandBuilder,
    Interaction,
    RESTPostAPIChatInputApplicationCommandsJSONBody,
    SlashCommandStringOption,
    APIApplicationCommandOptionChoice,
    Collection,
    range,
    RepliableInteraction,
} from "discord.js";

import * as fs from "fs";

interface CustomSlashCommandBuilder
    extends Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup"> {}

interface customCommand {
    data: SlashCommandBuilder | CustomSlashCommandBuilder;
    autocomplete?: (interaction: Interaction) => void;
    execute: (interaction: Interaction) => void;
}

const rom: { navn: string; plasser: number }[] = [];

const romnrfil = fs.readFileSync("./ROMKEY.csv", "utf-8");
romnrfil.split("\n").forEach((line) => {
    const s = line.split(",");
    rom.push({ navn: s[0], plasser: parseInt(s[2]) });
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

const simpleBook: customCommand = {
    data: new SlashCommandBuilder().setName("s").setDescription("ooo"),
    execute: async (interaction: Interaction) => {
        if (!interaction.isRepliable()) return;
    },
};

const bookCommand: customCommand = {
    data: new SlashCommandBuilder()
        .setName("book")
        .setDescription("Lar deg booke et grupperom på HVL")
        .addIntegerOption((option) =>
            option
                .setName("plasser")
                .setDescription("Hvor mange plasser ønsker du?")
                .setRequired(true)
                .setMaxValue(20)
                .setMinValue(4)
                .addChoices(
                    { name: "4 plasser", value: 4 },
                    { name: "6 plasser", value: 6 },
                    { name: "8 plasser", value: 8 },
                    { name: "10 plasser", value: 10 },
                    { name: "12 plasser", value: 12 },
                    { name: "14 plasser", value: 14 },
                    { name: "20 plasser", value: 20 }
                )
        )
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
                //.setAutocomplete(true)
                .addChoices(
                    { name: "kl 8", value: 8 },
                    { name: "kl 9", value: 9 },
                    { name: "kl 10", value: 10 },
                    { name: "kl 11", value: 11 },
                    { name: "kl 12", value: 12 },
                    { name: "kl 13", value: 13 },
                    { name: "kl 14", value: 14 },
                    { name: "kl 15", value: 15 },
                    { name: "kl 16", value: 16 },
                    { name: "kl 17", value: 17 },
                    { name: "kl 18", value: 18 },
                    { name: "kl 19", value: 19 },
                    { name: "kl 20", value: 20 },
                    { name: "kl 21", value: 21 }
                )
        )
        .addIntegerOption((option) =>
            option
                .setName("startmin")
                .setDescription("Velg minutt, kun hvert 15. min er mulig")
                .setRequired(true)
                .setMaxValue(45)
                .setMinValue(15)
                //.setAutocomplete(true)
                .addChoices(
                    { name: "00", value: 0 },
                    { name: "15", value: 15 },
                    { name: "30", value: 30 },
                    { name: "45", value: 45 }
                )
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
            const plasser = interaction.options.getInteger("plasser", true);
            const filtered = rom
                .filter(
                    (romnr) =>
                        romnr.navn.startsWith(focusedOption.value) &&
                        romnr.plasser === plasser
                )
                .map((obj) => obj.navn);
            await interaction.respond(
                filtered
                    .map((romnr) => ({ name: romnr, value: romnr }))
                    .slice(0, 25)
            );
            /* } else if (focusedOption.name === "starthr") {
            const starthrs = range(8, 21).map((num) => num.toString());
            const filtered = starthrs.filter((hr) =>
                hr.startsWith(focusedOption.value)
            );
            await interaction.respond(
                filtered.map((hr) => ({ name: hr, value: hr })).slice(0, 25)
            );
        } else if (focusedOption.name === "startmin") {
            const startmins = ["00", "15", "30", "45"];
            await interaction.respond(
                startmins
                    .map((mins) => ({ name: mins, value: mins }))
                    .slice(0, 25)
            ); */
        } else if (focusedOption.name === "sluttid") {
            const starthr = interaction.options.getInteger("starthr", true);
            const startmin = interaction.options.getInteger("startmin", true);
            const possiblehrs = range(starthr, starthr + 3);
            const mulige = possiblehrs
                .map((hr) => {
                    const s = hr.toString();
                    const sa = [];
                    if (hr !== starthr + 3 && hr !== starthr) {
                        sa.push(s + ":00", s + ":15", s + ":30", s + ":45");
                    } else if (hr === starthr) {
                        if (startmin == 0)
                            sa.push(s + ":15", s + ":30", s + ":45");
                        else if (startmin == 15) sa.push(s + ":30", s + ":45");
                        else if (startmin == 30) sa.push(s + ":45");
                    } else if (hr === starthr + 3) {
                        if (startmin == 0) sa.push(s + ":00");
                        else if (startmin == 15) sa.push(s + ":00", s + ":15");
                        else if (startmin == 30)
                            sa.push(s + ":00", s + ":15", s + ":30");
                        else if (startmin == 45)
                            sa.push(s + ":00", s + ":15", s + ":30", s + ":45");
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
            interaction.reply("eg e for dum, klarer ikkje gjøre nokke enno 😣");
        }
    },
};

const commandarr: customCommand[] = [];
commandarr.push(pingCommand, bookCommand, simpleBook);

const commands: Collection<string, customCommand> = new Collection();
for (const cmd of commandarr) {
    commands.set(cmd.data.name, cmd);
}

const commandsJSON: RESTPostAPIChatInputApplicationCommandsJSONBody[] =
    commandarr.map((cmd) => cmd.data.toJSON());

export { customCommand, commandsJSON, commands };
