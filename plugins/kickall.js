module.exports = {
  name: "kickall",
  description: "Remove all members from a group (except admins)",
  category: "group",
  async execute(client, m, { isAdmin, groupMetadata, participants }) {
    if (!m.isGroup) return m.reply("This command is only for groups.");
    if (!isAdmin) return m.reply("You must be an admin to use this command.");

    const botNumber = client.user.id.split(":")[0] + "@s.whatsapp.net";
    const admins = groupMetadata.participants.filter(p => p.admin).map(p => p.id);

    for (const participant of participants) {
      if (!admins.includes(participant.id) && participant.id !== botNumber) {
        try {
          await client.groupParticipantsUpdate(m.chat, [participant.id], "remove");
        } catch (e) {
          console.error(`Failed to kick ${participant.id}:`, e);
        }
      }
    }

    m.reply("All non-admin members have been kicked.");
  },
};
