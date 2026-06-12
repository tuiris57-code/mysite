"use client";

import { useState } from "react";

export default function Character({ onHoverChange }: { onHoverChange?: (hovered: boolean) => void }) {
  const [hovered, setHovered] = useState(false);

  const handleEnter = () => {
    setHovered(true);
    onHoverChange?.(true);
  };
  const handleLeave = () => {
    setHovered(false);
    onHoverChange?.(false);
  };

  return (
    <div
      className="relative cursor-pointer select-none"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      style={{ width: 280, height: 360 }}
    >
      <svg
        viewBox="0 0 280 360"
        width="280"
        height="360"
        fill="none"
        stroke="#2F5D62"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* 托腮思考 pose */}
        <g
          className="transition-opacity duration-500"
          style={{ opacity: hovered ? 0 : 1 }}
        >
          {/* 头发 - 卷发到下巴 */}
          <path d="M100 60 C70 55, 55 80, 58 120 C55 140, 60 160, 75 170" />
          <path d="M180 60 C210 55, 225 80, 222 120 C225 140, 220 160, 205 170" />
          {/* 卷发纹理 左 */}
          <path d="M62 110 C55 120, 58 135, 65 140" />
          <path d="M68 130 C60 140, 63 155, 72 158" />
          {/* 卷发纹理 右 */}
          <path d="M218 110 C225 120, 222 135, 215 140" />
          <path d="M212 130 C220 140, 217 155, 208 158" />
          {/* 头部轮廓 */}
          <ellipse cx="140" cy="100" rx="55" ry="60" />
          {/* 刘海 */}
          <path d="M85 85 C100 60, 130 50, 140 55 C150 50, 180 60, 195 85" />
          <path d="M95 80 C110 65, 130 58, 140 62" />
          <path d="M140 62 C155 58, 175 65, 185 80" />
          {/* 眼睛 */}
          <circle cx="120" cy="105" r="3" fill="#2F5D62" stroke="none" />
          <circle cx="160" cy="105" r="3" fill="#2F5D62" stroke="none" />
          {/* 眉毛 */}
          <path d="M110 95 C115 91, 125 91, 130 95" />
          <path d="M150 95 C155 91, 165 91, 170 95" />
          {/* 嘴巴 - 微笑 */}
          <path d="M130 125 C135 130, 145 130, 150 125" />
          {/* 腮红 */}
          <ellipse cx="108" cy="118" rx="8" ry="5" fill="#D9776A" fillOpacity="0.25" stroke="none" />
          <ellipse cx="172" cy="118" rx="8" ry="5" fill="#D9776A" fillOpacity="0.25" stroke="none" />
          {/* 脖子 */}
          <path d="M130 158 L130 175" />
          <path d="M150 158 L150 175" />
          {/* 身体 - 上半身 */}
          <path d="M130 175 C100 180, 80 200, 75 240" />
          <path d="M150 175 C180 180, 200 200, 205 240" />
          {/* 衣领 */}
          <path d="M120 178 L140 195 L160 178" />
          {/* 左手托腮 */}
          <path d="M75 240 C70 220, 80 200, 95 195 C100 190, 108 175, 115 165" />
          {/* 右手放桌上 */}
          <path d="M205 240 C210 245, 200 250, 180 250 L160 250" />
          {/* 桌面线 */}
          <path d="M50 250 L230 250" strokeWidth="2" />
        </g>

        {/* 打招呼 pose */}
        <g
          className="transition-opacity duration-500"
          style={{ opacity: hovered ? 1 : 0 }}
        >
          {/* 头发 - 卷发到下巴 */}
          <path d="M100 60 C70 55, 55 80, 58 120 C55 140, 60 160, 75 170" />
          <path d="M180 60 C210 55, 225 80, 222 120 C225 140, 220 160, 205 170" />
          {/* 卷发纹理 */}
          <path d="M62 110 C55 120, 58 135, 65 140" />
          <path d="M68 130 C60 140, 63 155, 72 158" />
          <path d="M218 110 C225 120, 222 135, 215 140" />
          <path d="M212 130 C220 140, 217 155, 208 158" />
          {/* 头部轮廓 */}
          <ellipse cx="140" cy="100" rx="55" ry="60" />
          {/* 刘海 */}
          <path d="M85 85 C100 60, 130 50, 140 55 C150 50, 180 60, 195 85" />
          <path d="M95 80 C110 65, 130 58, 140 62" />
          <path d="M140 62 C155 58, 175 65, 185 80" />
          {/* 眼睛 - 眯眯笑 */}
          <path d="M113 105 C118 100, 125 100, 128 105" />
          <path d="M152 105 C157 100, 164 100, 167 105" />
          {/* 眉毛 */}
          <path d="M110 95 C115 91, 125 91, 130 95" />
          <path d="M150 95 C155 91, 165 91, 170 95" />
          {/* 嘴巴 - 开心大笑 */}
          <path d="M125 123 C132 133, 148 133, 155 123" />
          <path d="M130 128 C135 125, 145 125, 150 128" />
          {/* 腮红 */}
          <ellipse cx="108" cy="118" rx="9" ry="6" fill="#D9776A" fillOpacity="0.35" stroke="none" />
          <ellipse cx="172" cy="118" rx="9" ry="6" fill="#D9776A" fillOpacity="0.35" stroke="none" />
          {/* 脖子 */}
          <path d="M130 158 L130 175" />
          <path d="M150 158 L150 175" />
          {/* 身体 */}
          <path d="M130 175 C100 180, 80 200, 75 240" />
          <path d="M150 175 C180 180, 200 200, 205 240" />
          {/* 衣领 */}
          <path d="M120 178 L140 195 L160 178" />
          {/* 右手挥手 */}
          <path d="M205 240 C215 220, 225 200, 235 180" />
          <path d="M235 180 C238 172, 240 165, 237 160" />
          {/* 挥手的手掌 */}
          <path d="M232 160 C228 155, 237 150, 242 155" />
          <path d="M237 160 C235 153, 243 148, 247 154" />
          <path d="M242 162 C242 155, 249 152, 250 158" />
          {/* 挥手动态线 */}
          <path d="M250 150 L258 145" strokeWidth="1.5" />
          <path d="M252 158 L260 156" strokeWidth="1.5" />
          <path d="M250 166 L258 170" strokeWidth="1.5" />
          {/* 左手自然下垂 */}
          <path d="M75 240 C70 250, 72 260, 80 265" />
          {/* 桌面线 */}
          <path d="M50 250 L230 250" strokeWidth="2" />
        </g>
      </svg>

      {/* 对话气泡 */}
      <div
        className="absolute -top-2 -right-16 transition-all duration-500 font-serif"
        style={{
          opacity: hovered ? 1 : 0,
          transform: hovered ? "translateY(0) scale(1)" : "translateY(10px) scale(0.8)",
        }}
      >
        <div className="bg-white/80 rounded-2xl px-4 py-2 text-teal text-sm shadow-sm border border-teal/10">
          你好呀！✨
        </div>
      </div>
    </div>
  );
}
