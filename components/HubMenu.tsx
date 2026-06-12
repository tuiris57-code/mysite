"use client";

import Link from "next/link";

interface HubMenuProps {
  visible: boolean;
}

const menuItems = [
  {
    label: "小工具",
    href: "/tools",
    position: { x: -180, y: -60 },
    enabled: true,
    icon: "🔧",
  },
  {
    label: "知识库",
    href: "/knowledge",
    position: { x: -180, y: 60 },
    enabled: true,
    icon: "📚",
  },
  {
    label: "关于我",
    href: "/aboutme",
    position: { x: 180, y: -60 },
    enabled: true,
    icon: "👋",
  },
  {
    label: "待开发",
    href: "#",
    position: { x: 180, y: 60 },
    enabled: false,
    icon: "🚧",
  },
];

export default function HubMenu({ visible }: HubMenuProps) {
  return (
    <>
      {menuItems.map((item, i) => {
        const delay = i * 80;
        return (
          <div
            key={item.label}
            className="absolute transition-all duration-500 ease-out"
            style={{
              left: "50%",
              top: "50%",
              transform: visible
                ? `translate(calc(-50% + ${item.position.x}px), calc(-50% + ${item.position.y}px)) scale(1)`
                : "translate(-50%, -50%) scale(0.6)",
              opacity: visible ? 1 : 0,
              transitionDelay: visible ? `${delay}ms` : "0ms",
              pointerEvents: visible ? "auto" : "none",
            }}
          >
            {item.enabled ? (
              <Link
                href={item.href}
                className="block no-underline"
              >
                <MenuCard {...item} />
              </Link>
            ) : (
              <MenuCard {...item} />
            )}
          </div>
        );
      })}
    </>
  );
}

function MenuCard({ label, icon, enabled }: { label: string; icon: string; enabled: boolean }) {
  return (
    <div
      className={`
        flex items-center gap-2 px-6 py-3 rounded-2xl font-serif text-lg
        transition-transform duration-200 whitespace-nowrap
        ${enabled
          ? "bg-coral text-white shadow-md hover:scale-105 cursor-pointer"
          : "bg-oat-dark text-teal/40 border-2 border-dashed border-teal/20 cursor-default"
        }
      `}
    >
      <span>{icon}</span>
      <span>{label}</span>
    </div>
  );
}
