import React from "react";
import "./LeftMenu.css";

// Icon imports (You can replace these with actual icons or use a library like Font Awesome or Material Icons)
const icons = {
  profile: "👤",
  friends: "👥",
  memories: "⏳",
  saved: "📑",
  groups: "👪",
  video: "📹",
  marketplace: "🏪",
  feeds: "📰",
  events: "📅",
  adsManager: "📊",
  metaQuest: "🎮",
  seeMore: "⬇️",
};

// Left menu component
const LeftMenu = () => {
  const menuItems = [
    { icon: icons.friends, label: "Friends" },
    { icon: icons.memories, label: "Memories" },
    { icon: icons.saved, label: "Saved" },
    { icon: icons.groups, label: "Groups" },
    { icon: icons.video, label: "Video" },
    { icon: icons.marketplace, label: "Marketplace" },
    { icon: icons.feeds, label: "Feeds" },
    { icon: icons.seeMore, label: "See more" },
  ];

  return (
      <div className="left-menu">
        {menuItems.map((item, index) => (
            <div key={index} className="menu-item">
              <span className="menu-icon">{item.icon}</span>
              <span className="menu-label">{item.label}</span>
            </div>
        ))}
      </div>
  );
};

export default LeftMenu;