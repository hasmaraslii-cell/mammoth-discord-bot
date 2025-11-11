import { ActivityFeed } from "../ActivityFeed";

const mockActivities = [
  {
    id: "1",
    type: "ban" as const,
    user: "SpammerUser#1234",
    moderator: "Admin#9999",
    reason: "Reklam spam",
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
  },
  {
    id: "2",
    type: "join" as const,
    user: "NewMember#5678",
    timestamp: new Date(Date.now() - 1000 * 60 * 15),
  },
  {
    id: "3",
    type: "mute" as const,
    user: "ToxicUser#4321",
    moderator: "Mod#7777",
    reason: "Küfür",
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
  },
];

export default function ActivityFeedExample() {
  return (
    <div className="p-4">
      <ActivityFeed activities={mockActivities} />
    </div>
  );
}
