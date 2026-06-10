import type { CelestialBody } from '@/types/celestial';

// Scale: 1 AU ≈ 16 scene units (Earth orbit)
// Sizes are stylized for visibility but proportional to real radii
export const planets: CelestialBody[] = [
  {
    id: 'mercury',
    name: '水星', nameEn: 'Mercury', type: 'planet',
    radius: 0.5, realRadiusKm: 2439.7,
    orbitRadius: 6, orbitSpeed: 4.15, rotationSpeed: 0.005,
    color: '#b0b0b0', axialTilt: 0.03,
    description: '水星是太阳系中最小的行星，也是距离太阳最近的行星。',
    funFacts: ['水星没有大气层保护，昼夜温差可达 600°C', '水星的一天约等于地球的 59 天', '水星内核占体积的 55%，远超其他行星', '尽管离太阳最近，水星并非太阳系最热的行星'],
  },
  {
    id: 'venus',
    name: '金星', nameEn: 'Venus', type: 'planet',
    radius: 1.0, realRadiusKm: 6051.8,
    orbitRadius: 11, orbitSpeed: 3.0, rotationSpeed: 0.003,
    color: '#e8cda0', axialTilt: 2.64,
    description: '金星是太阳系最亮的行星，与地球大小最相似，被称为"姊妹星"。',
    funFacts: ['金星表面温度高达 465°C，是太阳系最热的行星', '金星是唯一逆向自转的行星——太阳从西边升起', '金星的一天（243 地球日）比一年（225 天）还长', '金星表面可能有活跃的火山活动'],
  },
  {
    id: 'earth',
    name: '地球', nameEn: 'Earth', type: 'planet',
    radius: 1.1, realRadiusKm: 6371,
    orbitRadius: 16, orbitSpeed: 2.4, rotationSpeed: 0.02,
    color: '#4a90d9', axialTilt: 0.41, atmosphereColor: '#66aaff',
    description: '地球是太阳系中已知唯一存在生命的天体，71% 的表面被液态水覆盖。',
    funFacts: ['地球是太阳系中密度最大的天体', '地球内核温度约 5500°C，与太阳表面相仿', '大气中的氧气主要来自海洋浮游植物', '地球精确自转周期为 23 小时 56 分 4 秒'],
  },
  {
    id: 'mars',
    name: '火星', nameEn: 'Mars', type: 'planet',
    radius: 0.6, realRadiusKm: 3389.5,
    orbitRadius: 24, orbitSpeed: 2.0, rotationSpeed: 0.018,
    color: '#d44a1a', axialTilt: 0.44,
    description: '火星因其氧化铁表面呈红色，被称为"红色星球"。拥有太阳系最高的山——奥林帕斯山。',
    funFacts: ['奥林帕斯山高约 21.9 公里，是太阳系最高峰', '沙尘暴可覆盖整个火星，持续数月', '火星有两颗极小卫星：火卫一和火卫二', '火星上的日落是蓝色的'],
  },
  {
    id: 'jupiter',
    name: '木星', nameEn: 'Jupiter', type: 'planet',
    radius: 3.5, realRadiusKm: 69911,
    orbitRadius: 55, orbitSpeed: 1.3, rotationSpeed: 0.04,
    color: '#c4b69c', axialTilt: 0.05,
    stripeColors: ['#d4c5a9', '#c4b69c', '#b8a080', '#d4c5a9', '#a08060', '#c4b69c', '#d4c5a9'],
    description: '木星是太阳系最大的行星，质量是其他行星总和的 2.5 倍。大红斑是一个持续数百年的超级风暴。',
    funFacts: ['大红斑比地球还大，已持续至少 350 年', '木星有 95 颗已知卫星', '木星磁场是地球的 20000 倍', '木星一天仅约 10 小时，自转最快'],
  },
  {
    id: 'saturn',
    name: '土星', nameEn: 'Saturn', type: 'planet',
    radius: 2.5, realRadiusKm: 58232,
    orbitRadius: 100, orbitSpeed: 0.95, rotationSpeed: 0.035,
    color: '#e8d5a0', axialTilt: 0.47,
    hasRings: true, ringColor: '#d4c090', ringInnerRadius: 3.0, ringOuterRadius: 5.0,
    description: '土星以壮观环系统闻名，由水冰碎片和岩石尘埃组成，宽度可达 28 万公里，厚度仅约 20 米。',
    funFacts: ['土星密度低于水，理论上可漂浮水面', '土星环宽度 28 万公里，厚仅 20 米', '土卫六是太阳系唯一有浓密大气层的卫星', '土星北极有独特的六边形风暴'],
  },
  {
    id: 'uranus',
    name: '天王星', nameEn: 'Uranus', type: 'planet',
    radius: 1.5, realRadiusKm: 25362,
    orbitRadius: 180, orbitSpeed: 0.68, rotationSpeed: 0.025,
    color: '#7ec8e3', axialTilt: 1.71,
    description: '天王星轴倾角约 98°，几乎横躺在轨道上"滚动"前进，是第一颗用望远镜发现的行星。',
    funFacts: ['轴倾角约 98°，几乎是横躺运行', '1781 年由威廉·赫歇尔用望远镜发现', '有 13 个暗环，远不如土星环壮观', '绕太阳一圈需 84 个地球年'],
  },
  {
    id: 'neptune',
    name: '海王星', nameEn: 'Neptune', type: 'planet',
    radius: 1.4, realRadiusKm: 24622,
    orbitRadius: 250, orbitSpeed: 0.55, rotationSpeed: 0.023,
    color: '#4169e1', axialTilt: 0.49,
    description: '海王星是唯一通过数学预测发现的行星，拥有太阳系最强风暴，风速超 2100 km/h。',
    funFacts: ['唯一通过数学预测而非直接观测发现的行星', '风速可达 2100 km/h，太阳系最快', '海卫一表面温度约 -235°C', '从发现至今只公转了一圈半（165 年/圈）'],
  },
];

export const sunData: CelestialBody = {
  id: 'sun', name: '太阳', nameEn: 'Sun', type: 'star',
  radius: 3.0, realRadiusKm: 696340,
  orbitRadius: 0, orbitSpeed: 0, rotationSpeed: 0.008,
  color: '#ffcc00', isGlowing: true, axialTilt: 0.13,
  description: '太阳是太阳系中心天体，一颗黄矮星，通过核聚变每秒转化 6 亿吨氢为氦，占太阳系总质量 99.86%。',
  funFacts: ['核心温度高达 1500 万°C', '光到达地球约 8 分 20 秒', '每秒将约 6 亿吨氢转化为氦', '寿命约 100 亿年，已走过约 46 亿年'],
};
