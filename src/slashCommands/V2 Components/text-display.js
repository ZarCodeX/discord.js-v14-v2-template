// /text-display: Demonstrates a TextDisplay component
const { 
  SlashCommandBuilder, 
  MessageFlags, 
  TextDisplayBuilder, 
  ContainerBuilder, 
  SeparatorBuilder 
} = require('discord.js');

module.exports = {
  // Define the slash command
  data: new SlashCommandBuilder()
    .setName('text-display')
    .setDescription('Shows a TextDisplay component with Markdown.'),

  run: async (client, interaction) => {
    // ---------------- TextDisplay ----------------
    // TextDisplayBuilder holds static text, supports Markdown formatting
    const text = new TextDisplayBuilder()
      .setContent('📝 **This is a TextDisplay component.**\nSupports Markdown formatting.');

    // ---------------- Separator ----------------
    // Optional visual divider between components
    // Removed SeparatorSpacingSize to avoid validation errors
    const separator = new SeparatorBuilder().setDivider(true);

    // ---------------- Container ----------------
    // Wrap the text and separator in a ContainerBuilder for v2 components
    const container = new ContainerBuilder()
      .setAccentColor(0x5865F2)       // Optional accent color
      .addTextDisplayComponents(text)  // Add the text block
      .addSeparatorComponents(separator); // Add the separator

    // ---------------- Reply ----------------
    // Send the container to the user
    await interaction.reply({
      flags: MessageFlags.IsComponentsV2, // Required for v2 components
      components: [container],
    });

    // ---------------- GUIDE ----------------
    // 1. Slash Command: /text-display
    // 2. TextDisplayBuilder:
    //    - Holds static text.
    //    - Supports Markdown (bold, italic, code blocks, emojis).
    //    - Can be combined with other components inside a ContainerBuilder.
    // 3. SeparatorBuilder:
    //    - Adds a visible line divider between components.
    //    - setDivider(true): shows the line.
    //    - setDivider(false): invisible spacing (optional).
    // 4. ContainerBuilder:
    //    - Wraps TextDisplay and Separator components for v2.
    //    - You can add multiple TextDisplay, Separator, Button, Section, or MediaGallery components.
    // 5. Flags: MessageFlags.IsComponentsV2 required for v2 components.
    // 6. Usage:
    //    - User runs /text-display → sees a Markdown-styled text block with a divider below.
    // 7. Customization:
    //    - Change text content, add emojis, code blocks, or combine multiple TextDisplay blocks.
    //    - Add more separators, buttons, or sections as needed.
  },
};
