// /menu.js: Demonstrates a multi-type select menu
const {
  SlashCommandBuilder,
  TextDisplayBuilder,
  ContainerBuilder,
  ActionRowBuilder,
  ChannelSelectMenuBuilder,
  StringSelectMenuBuilder,
  RoleSelectMenuBuilder,
  UserSelectMenuBuilder,
  MessageFlags,
} = require('discord.js');

module.exports = {
  // Define the slash command
  data: new SlashCommandBuilder()
    .setName('menu')
    .setDescription('Demonstrates multiple select menu types')
    .addStringOption(option =>
      option
        .setName('type')
        .setDescription('Select a menu type')
        .setRequired(true)
        .addChoices(
          { name: 'Channel', value: 'channel' },
          { name: 'Role', value: 'role' },
          { name: 'String', value: 'string' },
          { name: 'User', value: 'user' }
        )
    ),

  // Run function executed when the slash command is used
  run: async (client, interaction) => {
    const selectedType = interaction.options.getString('type');

    // Text block showing which type was selected
    const text = new TextDisplayBuilder()
      .setContent(`🛠 You selected **${selectedType}** menu type.\nThe menu is a demo of v2 components and won't perform actions.`);

    let menu;

    // ---------------- Menu Selection ----------------
    switch (selectedType) {
      case 'channel':
        // Channel select menu (can select text, voice, category, news, stage)
        menu = new ChannelSelectMenuBuilder()
          .setCustomId('menu_channel')
          .setPlaceholder('Select a channel')
          .setChannelTypes([0, 2, 4, 5, 13]);
        break;

      case 'role':
        // Role select menu
        menu = new RoleSelectMenuBuilder()
          .setCustomId('menu_role')
          .setPlaceholder('Select a role');
        break;

      case 'string':
        // String select menu with multiple options
        menu = new StringSelectMenuBuilder()
          .setCustomId('menu_string')
          .setPlaceholder('Select an option')
          .addOptions(
            { label: 'Option 1', value: 'option1' },
            { label: 'Option 2', value: 'option2' },
            { label: 'Option 3', value: 'option3' }
          );
        break;

      case 'user':
        // User select menu
        menu = new UserSelectMenuBuilder()
          .setCustomId('menu_user')
          .setPlaceholder('Select a user');
        break;

      default:
        // Fallback in case of invalid type
        return interaction.reply({
          content: 'Unknown menu type!',
          flags: MessageFlags.Ephemeral, // ephemeral using v2 flags
        });
    }

    // Add the menu to an action row (required for select menus)
    const row = new ActionRowBuilder().addComponents(menu);

    // Container for v2 components: text + action row
    const container = new ContainerBuilder()
      .setAccentColor(0x5865F2)    // optional accent color
      .addTextDisplayComponents(text)
      .addActionRowComponents(row);

    // Reply with the container
    await interaction.reply({
      flags: MessageFlags.IsComponentsV2, // required for v2 components
      components: [container],
    });

    // ---------------- GUIDE ----------------
    // 1. Slash Command: /menu
    // 2. Option 'type': User selects which menu type to display.
    // 3. TextDisplayBuilder: Shows which menu type was selected.
    // 4. Select Menus:
    //    - ChannelSelectMenuBuilder: Select a server channel.
    //    - RoleSelectMenuBuilder: Select a server role.
    //    - StringSelectMenuBuilder: Select from predefined string options.
    //    - UserSelectMenuBuilder: Select a user.
    // 5. ActionRowBuilder: Required wrapper for any menu/button component.
    // 6. ContainerBuilder: Holds text + action row for v2 components.
    // 7. Flags: MessageFlags.IsComponentsV2 required for v2; use MessageFlags.Ephemeral for ephemeral messages.
    // 8. Usage: User runs /menu → selects a type → sees demo menu.
    // 9. Customization: Add more options, change placeholder, or add more menus as needed.
  },
};
