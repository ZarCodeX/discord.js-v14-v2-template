// /button-3: Report-style button (external link)
const { 
  SlashCommandBuilder, 
  MessageFlags, 
  ButtonBuilder, 
  ButtonStyle, 
  ActionRowBuilder, 
  ContainerBuilder, 
  TextDisplayBuilder 
} = require('discord.js');

module.exports = {
  // Define the slash command
  data: new SlashCommandBuilder()
    .setName('button-3')
    .setDescription('Demonstrates a report-style button (external link).'),

  // Run function executed when the slash command is used
  run: async (client, interaction) => {
    // Create a link button that opens your support server
    const reportButton = new ButtonBuilder()
      .setLabel('Join Our Support Server')       // Button text
      .setStyle(ButtonStyle.Link)               // Link style button
      .setURL('https://discord.gg/6YVmxA4Qsf'); // URL it opens

    // Add the button to an ActionRowBuilder (required for Discord buttons)
    const row = new ActionRowBuilder().addComponents(reportButton);

    // Create a container to hold text and optionally other components
    const container = new ContainerBuilder()
      .setAccentColor(0x5865F2) // Optional accent color
      .addTextDisplayComponents(
        new TextDisplayBuilder().setContent('⚠️ Click below to report an issue.')
      );

    // Reply to the interaction
    await interaction.reply({
      flags: MessageFlags.IsComponentsV2, // Use v2 components
      components: [container, row],       // Send both container and action row
    });

    // ---------------- GUIDE ----------------
    // 1. Slash Command: /button-3
    // 2. Container: Displays the warning text in v2 style.
    // 3. Action Row: Holds the link button (Discord requires buttons inside ActionRowBuilder).
    // 4. Button: External link to a support server.
    // 5. Flags: MessageFlags.IsComponentsV2 is required for v2 components.
    // 6. Usage: User runs /button-3 → sees the text + click-able link button.
    // 7. Customization: Change the .setLabel() or .setURL() to your own text and link.
  },
};
