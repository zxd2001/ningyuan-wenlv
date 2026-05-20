<template>
  <div>
    <!-- Page header -->
    <section class="relative h-72 lg:h-96 overflow-hidden bg-ink">
      <div class="absolute inset-0">
        <img
          src="/images/bajing/yifeng.jpg"
          alt="宁远县景点地图"
          class="w-full h-full object-cover"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/40"></div>
      </div>
      <div class="relative z-10 h-full flex items-end pb-12">
        <div class="container-site">
          <p class="text-white/60 text-sm tracking-widest uppercase mb-3">Discover</p>
          <h1 class="font-display text-4xl lg:text-5xl font-bold text-white mb-4">宁远县景点地图</h1>
          <p class="text-white/70 text-base max-w-xl">宁远县共 12 个镇、4 个瑶族乡，按镇域展示各景点分布与特色。</p>
        </div>
      </div>
    </section>

    <!-- Main Content: Town Detail + Map -->
    <section class="py-12 lg:py-16 bg-white">
      <div class="container-site">
        <div class="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-start">
          <!-- Left: Town Introduction & Spots -->
          <div class="lg:col-span-3">
            <!-- Town Header -->
            <div class="bg-paper rounded-sm p-6 mb-6">
              <div class="flex items-start justify-between mb-4">
                <div>
                  <span class="text-xs text-primary font-medium tracking-wider uppercase">{{ activeTown.county }}</span>
                  <h2 class="font-display text-2xl lg:text-3xl font-bold text-ink mt-1">{{ activeTown.name }}</h2>
                  <p class="text-ink-subtle text-sm mt-1 flex items-center gap-2">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    </svg>
                    {{ activeTown.location }}
                  </p>
                </div>
                <span class="px-3 py-1 bg-primary/10 text-primary text-xs rounded-sm">
                  {{ activeTown.tag }}
                </span>
              </div>
              <p class="text-ink-light leading-relaxed">{{ activeTown.description }}</p>
            </div>

            <!-- Spots List -->
            <div class="space-y-4">
              <div
                v-for="(spot, idx) in activeTown.spots"
                :key="idx"
                class="bg-white rounded-sm border border-ink-faint/20 overflow-hidden shadow-sm hover:shadow-card transition-all duration-300 group"
              >
                <div class="grid grid-cols-1 md:grid-cols-4 gap-0">
                  <div class="md:col-span-1 aspect-[4/3] md:aspect-auto overflow-hidden">
                    <img
                      :src="spot.image || '/images/placeholder.jpg'"
                      :alt="spot.name"
                      class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <div class="md:col-span-3 p-4 md:p-5">
                    <div class="flex items-start justify-between mb-2">
                      <div>
                        <h3 class="font-display text-base font-semibold text-ink group-hover:text-primary transition-colors">
                          {{ spot.name }}
                        </h3>
                        <span v-if="spot.level" class="text-xs text-primary">{{ spot.level }}</span>
                      </div>
                    </div>
                    <p class="text-ink-light text-sm leading-relaxed mb-3">{{ spot.description }}</p>
                    <div class="flex flex-wrap gap-2">
                      <span
                        v-for="hl in spot.highlights"
                        :key="hl"
                        class="text-2xs text-ink-subtle border border-ink-faint/40 px-2 py-0.5 rounded-sm"
                      >
                        {{ hl }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div v-if="activeTown.spots.length === 0" class="text-center py-8 text-ink-subtle">
                <p>该区域暂无收录景点</p>
              </div>
            </div>
          </div>

          <!-- Right: Interactive Town Map -->
          <div class="lg:col-span-2">
            <div class="bg-paper rounded-sm p-4 lg:p-6 shadow-sm sticky top-24">
              <h3 class="font-display text-lg font-semibold text-ink mb-2">宁远县地图</h3>
              <p class="text-ink-subtle text-xs mb-4">点击区域查看详情</p>

              <!-- Leaflet Map Container -->
              <div ref="mapContainer" class="w-full rounded-sm overflow-hidden" style="height: min(600px, 50vh);"></div>

              <!-- 镇名图例 -->
              <div class="mt-4 pt-4 border-t border-ink-faint/20">
                <div class="flex flex-wrap gap-2">
                  <button
                    v-for="town in towns"
                    :key="town.id"
                    class="flex items-center gap-1.5 px-2 py-1 text-xs rounded-sm transition-all duration-200"
                    :class="activeTownId === town.id ? 'bg-primary text-white' : 'bg-white text-ink-light hover:bg-primary/10'"
                    @click="selectTown(town.id)"
                  >
                    <span class="w-2 h-2 rounded-full" :style="{ backgroundColor: town.color }"></span>
                    <span>{{ town.name }}</span>
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch, nextTick } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { ningyuanGeoJSON, townCenters } from '@/data/ningyuanGeoJSON'

const activeTownId = ref('wanjing')
const mapContainer = ref(null)
let map = null
let markers = {}

// 初始化 Leaflet 地图
onMounted(async () => {
  // 等待 DOM 准备好
  await nextTick()

  // 等待一小段时间确保容器已渲染
  setTimeout(() => {
    if (!mapContainer.value) {
      console.error('Map container not found')
      return
    }

    // 创建地图，中心点在宁远县
    // 宁远县范围：纬度 25.36°~25.98°, 经度 111.78°~112.17°
    // 中心约 25.67°, 111.97°
    map = L.map(mapContainer.value, {
      center: [25.67, 111.97],
      zoom: 9,
      minZoom: 8,
      maxZoom: 14,
      zoomControl: true,
      scrollWheelZoom: false
    })

  // 使用 OpenStreetMap 瓦片
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors',
    maxZoom: 18
  }).addTo(map)

  // 添加各镇标记点
  Object.entries(townCenters).forEach(([id, center]) => {
    const town = towns.find(t => t.id === id)
    if (!town) return

    // 创建自定义图标
    const icon = L.divIcon({
      className: 'custom-marker',
      html: `<div style="
        width: 14px;
        height: 14px;
        background-color: ${town.color};
        border: 2px solid white;
        border-radius: 50%;
        box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        opacity: 0.7;
      "></div>`,
      iconSize: [14, 14],
      iconAnchor: [7, 7],
      popupAnchor: [0, -8]
    })

    const marker = L.marker([center.lat, center.lng], { icon }).addTo(map)

    // 绑定弹出信息
    marker.bindPopup(`
      <div style="text-align: center; padding: 6px;">
        <strong style="color: ${town.color}">${town.name}</strong>
      </div>
    `)

    // 点击事件
    marker.on('click', () => {
      selectTown(id)
    })

    markers[id] = marker
  })

    // 高亮当前选中的镇
    highlightTown(activeTownId.value)
  }, 100)
})

// 监听选中镇的变化
watch(activeTownId, (newTownId) => {
  highlightTown(newTownId)
})

// 高亮显示选中的镇
function highlightTown(townId) {
  Object.entries(markers).forEach(([id, marker]) => {
    const center = townCenters[id]
    const town = towns.find(t => t.id === id)
    if (!center || !town) return

    const isActive = id === townId
    const size = isActive ? 20 : 14
    const opacity = isActive ? 1 : 0.6

    // 更新标记图标
    marker.setIcon(L.divIcon({
      className: 'custom-marker',
      html: `<div style="
        width: ${size}px;
        height: ${size}px;
        background-color: ${town.color};
        border: 3px solid ${isActive ? town.color : 'white'};
        border-radius: 50%;
        box-shadow: 0 ${isActive ? 4 : 2}px ${isActive ? 8 : 4}px rgba(0,0,0,0.4);
        opacity: ${opacity};
        transition: all 0.3s ease;
      "></div>`,
      iconSize: [size, size],
      iconAnchor: [size/2, size/2]
    }))

    // 打开选中镇的弹窗
    if (isActive) {
      marker.openPopup()
    }
  })

  // 如果地图已初始化，平滑移动到该区域
  if (map && townCenters[townId]) {
    const center = townCenters[townId]
    map.flyTo([center.lat, center.lng], 10, {
      duration: 0.8
    })
  }
}

const towns = [
  // 县城4个街道
  { id: 'shunling', name: '舜陵街道', color: '#c19a6b', county: '县城核心', location: '宁远县城', tag: '行政中心', description: '舜陵街道是宁远县城的核心区域，毗邻舜帝陵，是全县政治文化中心。' },
  { id: 'tongshan', name: '桐山街道', color: '#8B4513', county: '县城东部', location: '宁远县城', tag: '商业中心', description: '桐山街道是县城商业繁华地带，有传统商业街区。' },
  { id: 'wenmiao', name: '文庙街道', color: '#DAA520', county: '县城中心', location: '宁远县城', tag: '文化古建', description: '文庙街道因宁远文庙而得名，是儒家文化的核心区。' },
  { id: 'dongxi', name: '东溪街道', color: '#4682B4', county: '县城东部', location: '宁远县城', tag: '宜居宜游', description: '东溪街道环境优美，是县城宜居区域。' },
  // 镇
  { id: 'lengshui', name: '冷水镇', color: '#6B8E23', county: '汉文化重镇', location: '县城西北', tag: '历史古迹', description: '冷水镇是宁远汉文化重镇，有泠道故城遗址（汉代古城，国保单位），以及"凤桥秋月"古景原址。' },
  { id: 'wanjing', name: '湾井镇', color: '#b8860b', county: '文旅第一镇', location: '县城南，九嶷山北麓', tag: '文旅重镇', description: '湾井镇是宁远县文旅第一镇，拥有下灌古村、灌溪仙境等著名景点，是江南状元的故乡，也是麻将"叶子戏"发源地。' },
  { id: 'shuishi', name: '水市镇', color: '#15722e', county: '南部门户', location: '县城西南', tag: '湖光山色', description: '水市镇位于县城西南，是宁远南部门户。镇内有水市水库、九嶷湖湿地公园，潇水十八湾风光秀美。' },
  { id: 'baijaping', name: '柏家坪镇', color: '#DAA520', county: '北部门户', location: '县城正北', tag: '秦汉遗址', description: '柏家坪镇是北部门户，有舂陵侯城遗址（秦汉时期，国保单位），以及著名的柏家坪板鸭特产。' },
  { id: 'heting', name: '禾亭镇', color: '#CD853F', county: '中部丘陵', location: '县城中东', tag: '古村田园', description: '禾亭镇位于县城中东，以禾亭古街、琵琶村古民居著称，还有"东溪古松"古景所在。' },
  { id: 'renhe', name: '仁和镇', color: '#D2691E', county: '田园古村', location: '县城东南', tag: '生态田园', description: '仁和镇位于县城东南，有保存完整的古坪村古村落，以及美丽的仁和万亩稻田风光。' },
  { id: 'qingshuiqiao', name: '清水桥镇', color: '#2E8B57', county: '北部生态', location: '县城东北', tag: '山水森林', description: '清水桥镇位于县城东北，有清水桥水库（垂钓、露营胜地），以及邻近的桐木漯万亩杜鹃花海。' },
  { id: 'lixi', name: '鲤溪镇', color: '#4682B4', county: '东北山地', location: '县城东北', tag: '溶洞古村', description: '鲤溪镇位于县城东北，有白云岩大型溶洞、明代大冠堡古堡遗址、永安古村等景点。' },
  { id: 'taiping', name: '太平镇', color: '#DC143C', county: '东部平缓', location: '县城东', tag: '红色+田园', description: '太平镇位于县城东，有太平古战场（历史遗迹），以及秋冬时节漫山的万亩油茶基地。' },
  { id: 'zhonghe', name: '中和镇', color: '#9932CC', county: '西部山地', location: '县城西', tag: '瑶乡风情', description: '中和镇位于县城西，是瑶族聚居地，有中和瑶族古寨（吊脚楼、瑶锦、长鼓舞），以及深山中的高枧水库。' },
  { id: 'baoan', name: '保安镇', color: '#708090', county: '西北边陲', location: '县城西北', tag: '古桥古道', description: '保安镇位于县城西北，有明代保安古桥（石拱桥），以及保存完好的义重村清代建筑群。' },
  { id: 'tiantang', name: '天堂镇', color: '#8B4513', county: '西南边陲', location: '县城西南', tag: '溶洞+温泉', description: '天堂镇位于县城西南，有桃花岩（乘船入洞，地下河、钟乳石），大阳洞天然溶洞，以及待开发的天堂温泉。' },
  // 瑶族乡
  { id: 'jiuyishan', name: '九疑瑶族乡', color: '#4A7C59', county: '核心景区', location: '县城南', tag: '必去景区', description: '九疑瑶族乡是宁远旅游核心景区所在，有舜帝陵、玉琯岩、紫霞岩、三分石、永福寺等必去景点。' },
  { id: 'mianhuaping', name: '棉花坪瑶族乡', color: '#228B22', county: '高山茶园', location: '县域南部', tag: '瑶寨瀑布', description: '棉花坪瑶族乡有高山茶园、瑶族村寨、瀑布群，是体验瑶族文化的绝佳之地。' },
  { id: 'wulongshan', name: '五龙山瑶族乡', color: '#006400', county: '原始森林', location: '县域西南', tag: '峡谷溪流', description: '五龙山瑶族乡有原始森林、峡谷、溪流和丰富野生动植物，是户外探险的理想之地。' },
  { id: 'tongmupiao', name: '桐木漯瑶族乡', color: '#556B2F', county: '高山杜鹃', location: '县域北部', tag: '杜鹃花海', description: '桐木漯瑶族乡有汉皇殿万亩杜鹃花海，4-5月高山杜鹃盛开，还有风车云海景观。' },
]

const townSpots = {
  wanjing: [
    { name: '下灌古村', level: '国家AAAA级景区', image: '/images/xiaguan/1.jpg', description: '江南第一村、状元故里（唐状元李郃），麻将"叶子戏"发源地。有状元楼、古街巷、李氏宗祠等。', highlights: ['状元故里', '古街巷', '宗祠文化', '非遗传承'] },
    { name: '灌溪仙境（十里画廊）', level: '', image: '/images/lingjiang/1.jpg', description: '泠江河沿岸，青山、碧水、稻田、古桥。东江村油菜花、热气球露营。', highlights: ['泠江河', '油菜花', '热气球', '露营'] },
    { name: '翰林祠', level: '国保单位', image: '/images/placeholder.jpg', description: '位于久安背村，清代大型古民居，国保单位。', highlights: ['清代古建', '国保单位', '木雕艺术'] },
    { name: '云龙坊 + 王氏虚堂', level: '国保单位', image: '/images/placeholder.jpg', description: '位于路亭村，明代石牌坊，国保单位。', highlights: ['明代石牌坊', '国保单位', '古建艺术'] },
  ],
  shuishi: [
    { name: '九嶷湖湿地公园', level: '', image: '/images/shuishi/1.jpg', description: '水市水库湖泊水面开阔、山水相映，是垂钓、露营、环湖骑行的好去处。', highlights: ['湖面开阔', '垂钓露营', '环湖骑行'] },
    { name: '潇水十八湾', level: '', image: '/images/shuishi/2.jpg', description: '河道曲折、两岸青山，是自驾、徒步观景的绝佳路线，"潇水涵青"古景核心段。', highlights: ['潇水涵青', '自驾观光', '徒步'] },
    { name: '烈士陵园', level: '', image: '/images/placeholder.jpg', description: '红色教育基地，纪念革命先烈。', highlights: ['红色教育', '历史纪念'] },
  ],
  lengshui: [
    { name: '泠道故城遗址', level: '国保单位', image: '/images/lengshui/1.jpg', description: '汉代古城遗址，国保单位。保留有夯土城墙、护城河遗迹，是研究汉代地方政治的重要遗址。', highlights: ['汉代古城', '国保单位', '夯土城墙'] },
    { name: '凤桥秋月（古景原址）', level: '', image: '/images/lengshui/2.jpg', description: '泠江河古凤桥遗址，位于文庙附近河段。秋夜月色依旧优美，是"凤桥秋月"古景所在。', highlights: ['凤桥秋月', '古景', '泠江河'] },
  ],
  baijaping: [
    { name: '舂陵侯城遗址', level: '国保单位', image: '/images/baijaping/1.jpg', description: '秦汉时期舂陵侯国都城遗址，国保单位。保留有夯土城垣、宫殿基址，是研究汉代侯国制度的重要遗址。', highlights: ['秦汉遗址', '国保单位', '侯国都城'] },
    { name: '柏家坪板鸭', level: '', image: '/images/placeholder.jpg', description: '柏家坪特产美食，传统工艺制作，可体验农家制作。', highlights: ['特产美食', '传统工艺', '农家体验'] },
    { name: '舂陵江风光', level: '', image: '/images/lingjiang/1.jpg', description: '河流平缓、两岸田园风光秀丽，适合自驾游览。', highlights: ['田园风光', '自驾', '自然'] },
  ],
  heting: [
    { name: '禾亭古街', level: '', image: '/images/heting/1.jpg', description: '湘南传统骑楼老街，青石板路、老店铺，保留传统商业街风貌。', highlights: ['传统骑楼', '青石板路', '老街'] },
    { name: '琵琶村古民居', level: '', image: '/images/heting/2.jpg', description: '清代民居建筑群，木雕、石雕工艺精美，具有较高的艺术价值。', highlights: ['清代民居', '木雕', '石雕'] },
    { name: '东溪古松（古景）', level: '', image: '/images/heting/3.jpg', description: '泠江河畔松林，清幽自然，是"东溪古松"古景所在。', highlights: ['东溪古松', '古景', '松林'] },
  ],
  renhe: [
    { name: '古坪村', level: '', image: '/images/renhe/1.jpg', description: '清代古村落，完整保留青砖黛瓦、风火墙、石板巷、古井等传统建筑元素。', highlights: ['古村落', '青砖黛瓦', '石板巷'] },
    { name: '仁和万亩稻田', level: '', image: '/images/renhe/2.jpg', description: '春看油菜花、夏赏稻田绿的田园风光，是摄影爱好者的打卡地。', highlights: ['田园风光', '稻田', '摄影'] },
  ],
  qingshuiqiao: [
    { name: '清水桥水库', level: '', image: '/images/qingshuiqiao/1.jpg', description: '青山环抱、水质清澈，是垂钓、露营的绝佳场所。', highlights: ['垂钓', '露营', '山水'] },
    { name: '桐木漯万亩杜鹃', level: '', image: '/images/tongmupiao/1.jpg', description: '4-5月高山杜鹃花海、风车云海景观，靠近清水桥镇的高山之巅。', highlights: ['杜鹃花海', '风车云海', '高山'] },
    { name: '瑶族村寨', level: '', image: '/images/placeholder.jpg', description: '可体验瑶寨风情、长桌宴等传统民俗文化。', highlights: ['瑶族风情', '长桌宴', '民俗'] },
  ],
  lixi: [
    { name: '白云岩', level: '', image: '/images/lixi/1.jpg', description: '大型天然溶洞，内有石笋、石柱、地下河等喀斯特景观。', highlights: ['溶洞', '石笋', '地下河'] },
    { name: '大冠堡', level: '', image: '/images/lixi/2.jpg', description: '明代古堡遗址，位于山顶，视野开阔，可俯瞰周边山水。', highlights: ['明代古堡', '山顶', '视野开阔'] },
    { name: '永安古村', level: '', image: '/images/lixi/3.jpg', description: '湘南传统村落，有古桥、古祠等历史建筑。', highlights: ['古村', '古桥', '古祠'] },
  ],
  taiping: [
    { name: '太平古战场', level: '', image: '/images/taiping/1.jpg', description: '太平军与清军激战地，留有历史遗迹，是研究太平天国历史的重要地点。', highlights: ['历史遗迹', '太平天国', '战场'] },
    { name: '万亩油茶基地', level: '', image: '/images/taiping/2.jpg', description: '秋冬时节油茶花漫山遍野，银白花海蔚为壮观。', highlights: ['油茶花', '秋冬', '花海'] },
  ],
  zhonghe: [
    { name: '中和瑶族古寨', level: '', image: '/images/zhonghe/1.jpg', description: '瑶族聚居村寨，有吊脚楼、瑶锦、长鼓舞等民族文化。', highlights: ['瑶族', '吊脚楼', '长鼓舞'] },
    { name: '高枧水库', level: '', image: '/images/zhonghe/2.jpg', description: '深山湖泊，环境静谧清幽，是避世休闲的好去处。', highlights: ['深山湖泊', '静谧', '避世'] },
  ],
  baoan: [
    { name: '保安古桥', level: '', image: '/images/baoan/1.jpg', description: '明代石拱桥，横跨泠江支流，造型古朴典雅。', highlights: ['明代', '石拱桥', '古建'] },
    { name: '义重村古民居', level: '', image: '/images/baoan/2.jpg', description: '清代建筑群，保存完好，具有较高的历史和艺术价值。', highlights: ['清代', '古民居', '保存完好'] },
  ],
  tiantang: [
    { name: '桃花岩', level: '', image: '/images/tiantang/1.jpg', description: '位于海江村，需乘船入洞，地下河、钟乳石景观，有"桃花源"意境。', highlights: ['乘船入洞', '钟乳石', '地下河'] },
    { name: '大阳洞', level: '', image: '/images/tiantang/2.jpg', description: '天然溶洞，石景奇特，形态各异。', highlights: ['溶洞', '石景', '奇特'] },
    { name: '天堂温泉', level: '', image: '/images/placeholder.jpg', description: '天然温泉资源，目前待开发。', highlights: ['温泉', '待开发'] },
  ],
  jiuyishan: [
    { name: '舜帝陵', level: '全国重点文保', image: '/images/shundi/1.jpg', description: '中华第一古陵，舜帝崩葬之地。历代帝王祭祀不绝，是海内外华夏子孙祭祖朝拜圣地。', highlights: ['舜帝', '古陵', '祭祀'] },
    { name: '玉琯岩', level: '全国重点文保', image: '/images/bajing/yuguan.jpg', description: '保存完好，有汉代蔡邕等名人题刻，为全国重点文物保护单位。', highlights: ['摩崖石刻', '汉代题刻', '国保'] },
    { name: '紫霞岩', level: '', image: '/images/jiuyi/1.jpg', description: '大型喀斯特溶洞，钟乳石景观丰富。', highlights: ['溶洞', '钟乳石', '喀斯特'] },
    { name: '三分石', level: '', image: '/images/jiuyi/2.jpg', description: '九嶷山标志性景点，三块巨石并立，传说为舜帝所化。', highlights: ['三分石', '标志景点', '传说'] },
    { name: '永福寺', level: '', image: '/images/jiuyi/3.jpg', description: '千年古刹，香火鼎盛，是礼佛祈福的好去处。', highlights: ['古刹', '祈福', '佛教'] },
  ],
  mianhuaping: [
    { name: '高山茶园', level: '', image: '/images/mianhuaping/1.jpg', description: '瑶乡高山生态茶园，产制优质茶叶。', highlights: ['茶园', '高山', '茶叶'] },
    { name: '瑶族村寨', level: '', image: '/images/mianhuaping/2.jpg', description: '体验原汁原味的瑶族生活方式和文化。', highlights: ['瑶族', '民俗', '文化'] },
    { name: '瀑布群', level: '', image: '/images/mianhuaping/3.jpg', description: '山间瀑布群，水量充沛，景观壮美。', highlights: ['瀑布', '山水', '自然'] },
  ],
  wulongshan: [
    { name: '原始森林', level: '', image: '/images/wulongshan/1.jpg', description: '保存完好的原始森林，生态资源丰富。', highlights: ['原始森林', '生态', '自然'] },
    { name: '峡谷溪流', level: '', image: '/images/wulongshan/2.jpg', description: '大峡谷和清澈溪流，是溯溪、探险的好去处。', highlights: ['峡谷', '溪流', '探险'] },
    { name: '野生动植物', level: '', image: '/images/placeholder.jpg', description: '保护区内野生动植物资源丰富，是科考的好地方。', highlights: ['野生动植物', '科考', '生态'] },
  ],
  tongmupiao: [
    { name: '汉皇殿万亩杜鹃', level: '', image: '/images/tongmupiao/1.jpg', description: '4-5月高山杜鹃花海，漫山遍野蔚为壮观。', highlights: ['杜鹃', '花海', '春季'] },
    { name: '风车云海', level: '', image: '/images/tongmupiao/2.jpg', description: '高山风车与云海交相辉映，宛如仙境。', highlights: ['风车', '云海', '高山'] },
  ],
  // 县城街道景点
  shunling: [
    { name: '舜帝陵', level: '全国重点文保', image: '/images/shundi/1.jpg', description: '中华第一古陵，舜帝崩葬之地。历代帝王祭祀不绝，是海内外华夏子孙祭祖朝拜圣地。', highlights: ['舜帝', '古陵', '祭祀'] },
  ],
  wenmiao: [
    { name: '宁远文庙', level: '全国第二大孔庙', image: '/images/wengmiao/1.jpg', description: '全国第二大孔庙，始建于宋乾德三年（公元965年），是湖南省现存规模最大、保存最完整的文庙建筑群。', highlights: ['孔庙', '古建筑', '儒家文化'] },
  ],
  tongshan: [
    { name: '宁远商业老街', level: '', image: '/images/placeholder.jpg', description: '县城繁华商业地带，传统与现代交融。', highlights: ['商业', '老街', '现代'] },
  ],
  dongxi: [
    { name: '泠江风光带', level: '', image: '/images/lingjiang/1.jpg', description: '泠江河畔风光秀丽，是县城居民休闲散步的好去处。', highlights: ['泠江', '风光', '休闲'] },
  ],
}

const activeTown = computed(() => {
  const town = towns.find(t => t.id === activeTownId.value) || towns[0]
  return {
    ...town,
    spots: townSpots[activeTownId.value] || []
  }
})

const selectTown = (townId) => {
  activeTownId.value = townId
}
</script>

