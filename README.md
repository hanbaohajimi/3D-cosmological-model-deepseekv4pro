<p align="center">
  <h1 align="center">🌌 3D 宇宙模型 — 太阳系探索</h1>
  <p align="center"><strong>基于 Three.js + React + TypeScript 的交互式 3D 太阳系科普讲解网站</strong></p>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19-blue?logo=react" />
  <img src="https://img.shields.io/badge/Three.js-0.184-black?logo=three.js" />
  <img src="https://img.shields.io/badge/TypeScript-6.0-3178c6?logo=typescript" />
  <img src="https://img.shields.io/badge/Vite-8-646cff?logo=vite" />
</p>

---

## ✨ 特性

- 🌞 **完整太阳系**：太阳 + 8 大行星，真实天文学数据驱动轨道运动
- 🪐 **程序化纹理**：每颗行星独立 Canvas 2D 纹理（大红斑、土星环、地球海洋大陆、火星极冠等）
- ☄️ **小行星带**：柯克伍德空隙 + C/S/M 物质分类 + 幂律大小分布
- 🌌 **星空背景**：15,000 颗温度分色恒星 + 蓝紫星云团
- ⏱️ **时间轴**：模拟日期推进、跳转、「今天」按钮、播放/暂停/倍速
- 🛤️ **轨道可视化**：行星颜色轨道线、一键开关、悬停高亮
- 🎯 **相机飞行**：点击天体 → 平滑飞行 → 科普面板弹出
- 🏷️ **3D 标签**：选中行星后悬浮中英文名称
- 🎨 **深空暗黑 UI**：毛玻璃面板 `#0a0e1a` / 蓝白光晕 `#4fc3f7`
- 📱 **响应式**：移动端触摸手势、粒子降级、DPR 自适应
- 🌍 **中文科普**：每颗天体详细介绍 + 物理参数 + 探索任务

---

## 🚀 快速开始

```bash
git clone https://github.com/hanbaohajimi/3D-cosmological-model-deepseekv4pro.git
cd 3D-cosmological-model-deepseekv4pro
npm install
npm run dev
```

浏览器打开 `http://localhost:5173`

---

## 🎮 操作

| 操作 | 方式 |
|------|------|
| 旋转 | 鼠标拖拽 / 单指滑动 |
| 缩放 | 滚轮 / 双指捏合 |
| 天体详情 | 点击行星或太阳 |
| 快捷导航 | 底部行星卡片 |
| 暂停 | 控制栏 ⏯️ |
| 倍速 | 0.25x ~ 4x |
| 日期跳转 | 📅 → 选日期 |
| 轨道开关 | 左上角 Toggle |
| 重置视角 | 右上角按钮 |
| 关闭面板 | 点击遮罩 / 右键 |

---

## 🏗️ 技术栈

| 层 | 技术 |
|---|------|
| 框架 | React 19 |
| 3D | Three.js via `@react-three/fiber` |
| 工具 | `@react-three/drei` · `@react-three/postprocessing` |
| 状态 | Zustand |
| 动画 | Framer Motion |
| 样式 | Tailwind CSS 4 |
| 图标 | Lucide React |

---

## 📂 结构

```
src/
├── types/celestial.ts          # 类型
├── data/planets.ts             # 行星数据
├── data/educational.ts         # 科普内容
├── store/useUniverseStore.ts   # 状态管理
├── hooks/                      # usePlanetTexture, useDeviceDetect
├── utils/camera.ts             # 相机工具
├── components/
│   ├── Scene.tsx               # Canvas 包装
│   ├── camera/                 # CameraController
│   ├── effects/                # PostProcessing
│   ├── universe/               # Sun, Planet, AsteroidBelt, Starfield...
│   └── ui/                     # TopBar, PlanetNav, InfoPanel, Controls...
└── index.css                   # 全局样式 & 主题变量
```

---

## 📐 天文学数据

行星初始相位基于 **JPL 近似平黄经**（J2000.0 历元 + 9657 天 → 2026-06-10）。

轨道间距保留内行星线性比例，外行星按真实间距比缩放：

| 行星 | 轨道 (场景) | 真实 (AU) | 周期 |
|------|-----------|----------|------|
| 水星 | 6 | 0.39 | 88 d |
| 金星 | 11 | 0.72 | 225 d |
| 地球 | 16 | 1.00 | 365 d |
| 火星 | 24 | 1.52 | 687 d |
| 木星 | 55 | 5.20 | 11.9 y |
| 土星 | 100 | 9.54 | 29.5 y |
| 天王星 | 180 | 19.2 | 84.0 y |
| 海王星 | 250 | 30.1 | 164.8 y |

---

## ⏱️ 模拟时间

- 基准日：2026-06-10
- 1x = 1 真实秒 / 1 模拟天
- 日期跳转后行星即时重新计算位置

---

## 📄 License

MIT
