// /separator: Demonstrates Separator component usage with text labels
const { 
  SlashCommandBuilder, 
  MessageFlags, 
  SeparatorBuilder, 
  ContainerBuilder, 
  TextDisplayBuilder 
} = require('discord.js');

module.exports = {
  // Define the slash command
  data: new SlashCommandBuilder()
    .setName('separator')
    .setDescription('Shows a visual separator/divider with text labels.'),

  // Run function executed when the slash command is used
  run: async (client, interaction) => {
    // ---------------- Text + Separator Examples ----------------
    // Each separator is preceded by a text label to indicate its type

    const textSmall = new TextDisplayBuilder().setContent('🔹 Small Divider');
    const smallDivider = new SeparatorBuilder().setDivider(true); // Visible line

    const textMedium = new TextDisplayBuilder().setContent('🔸 Medium Divider');
    const mediumDivider = new SeparatorBuilder().setDivider(true); // Visible line

    const textLarge = new TextDisplayBuilder().setContent('🔹 Large Divider');
    const largeDivider = new SeparatorBuilder().setDivider(true); // Visible line

    const textInvisible = new TextDisplayBuilder().setContent('⚪ Invisible Spacer');
    const invisibleSpacer = new SeparatorBuilder().setDivider(false); // Invisible spacing

    // ---------------- Container ----------------
    const container = new ContainerBuilder()
      .setAccentColor(0x5865F2)               // Optional accent color
      .addTextDisplayComponents(textSmall)    // Label for small divider
      .addSeparatorComponents(smallDivider)   // Small divider
      .addTextDisplayComponents(textMedium)   // Label for medium divider
      .addSeparatorComponents(mediumDivider)  // Medium divider
      .addTextDisplayComponents(textLarge)    // Label for large divider
      .addSeparatorComponents(largeDivider)   // Large divider
      .addTextDisplayComponents(textInvisible)// Label for invisible spacer
      .addSeparatorComponents(invisibleSpacer); // Invisible spacing separator

    // Reply with the container
    await interaction.reply({
      flags: MessageFlags.IsComponentsV2,  // Required for v2 components
      components: [container],
    });

    // ---------------- GUIDE ----------------
    // 1. Slash Command: /separator
    // 2. TextDisplayBuilder: Adds a text label above each separator.
    // 3. SeparatorBuilder: Creates visual dividers or spacers.
    //    - setDivider(true): Shows a visible line.
    //    - setDivider(false): Invisible spacing only.
    // 4. ContainerBuilder: Wraps all text + separators for v2 components.
    // 5. Flags: MessageFlags.IsComponentsV2 required for v2 components.
    // 6. Usage: User runs /separator → sees labeled small, medium, large dividers and an invisible spacer.
    // 7. Customization: Change labels, add more separators, or adjust divider visibility.
  },
};
