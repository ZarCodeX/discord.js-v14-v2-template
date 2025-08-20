// /section: Demonstrates Section + Thumbnail component
const { 
  SlashCommandBuilder, 
  MessageFlags, 
  SectionBuilder, 
  TextDisplayBuilder, 
  ThumbnailBuilder, 
  ContainerBuilder 
} = require('discord.js');

module.exports = {
  // Define the slash command
  data: new SlashCommandBuilder()
    .setName('section-and-thumbnail')
    .setDescription('Shows a Section component with optional thumbnail.'),

  // Run function executed when the slash command is used
  run: async (client, interaction) => {
    // ---------------- Section ----------------
    // SectionBuilder groups multiple text blocks and can include a thumbnail
    const section = new SectionBuilder()
      .addTextDisplayComponents(
        new TextDisplayBuilder().setContent('📄 **Section Title**'),             // Title text
        new TextDisplayBuilder().setContent('This is a section description with a thumbnail.') // Description text
      )
      .setThumbnailAccessory(
        new ThumbnailBuilder({ 
          media: { url: client.user.displayAvatarURL({ size: 512, extension: 'png' }) } 
        }) // Adds the bot's avatar as a thumbnail
      );

    // ContainerBuilder wraps the section for v2 components
    const container = new ContainerBuilder()
      .setAccentColor(0x5865F2)   // Optional container accent color
      .addSectionComponents(section);

    // Reply to the interaction with the container
    await interaction.reply({
      flags: MessageFlags.IsComponentsV2, // Required for v2 components
      components: [container],
    });

    // ---------------- GUIDE ----------------
    // 1. Slash Command: /section-and-thumbnail
    // 2. SectionBuilder: Groups text blocks and optional thumbnail together.
    // 3. TextDisplayBuilder: Each block of text in the section.
    // 4. ThumbnailBuilder: Adds an image (thumbnail) to the section.
    // 5. ContainerBuilder: Wraps section(s) for v2 components.
    // 6. Flags: MessageFlags.IsComponentsV2 required for v2 components.
    // 7. Usage: User runs /section-and-thumbnail → sees a section with title, description, and bot avatar thumbnail.
    // 8. Customization: Change text content, add more TextDisplayBuilders, or use a custom thumbnail URL.
  },
};
