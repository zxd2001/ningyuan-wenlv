<template>
  <div>
    <!-- Hero -->
    <section class="relative h-72 lg:h-96 overflow-hidden bg-ink">
      <div class="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=1920&q=80"
          alt="宁远文化"
          class="w-full h-full object-cover"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/40"></div>
      </div>
      <div class="relative z-10 h-full flex items-end pb-12">
        <div class="container-site">
          <p class="text-white/60 text-sm tracking-widest uppercase mb-3">Culture</p>
          <h1 class="font-display text-4xl lg:text-5xl font-bold text-white mb-4">文化体验</h1>
          <p class="text-white/70 text-base max-w-xl">舜文化源远流长，瑶族风情浓郁独特，宁远拥有丰富的文化遗产与活态传承。</p>
        </div>
      </div>
    </section>

    <!-- Category tabs -->
    <section class="sticky top-16 z-40 bg-white/95 backdrop-blur-md border-b border-ink-faint/50 shadow-soft">
      <div class="container-site">
        <div class="flex items-center overflow-x-auto gap-1 py-1">
          <button
            v-for="tab in tabs"
            :key="tab.value"
            class="px-5 py-3.5 text-sm font-medium whitespace-nowrap transition-all duration-200 border-b-2"
            :class="activeTab === tab.value
              ? 'text-primary border-primary'
              : 'text-ink-light border-transparent hover:text-ink'"
            @click="activeTab = tab.value"
          >
            {{ tab.label }}
          </button>
        </div>
      </div>
    </section>

    <!-- Content -->
    <section class="py-16 lg:py-20">
      <div class="container-site">
        <!-- History intro -->
        <div class="mb-20">
          <div class="text-center mb-12">
            <p class="section-label">历史文化</p>
            <h2 class="section-title">舜帝与宁远</h2>
            <p class="section-desc mx-auto mt-4">
              宁远是中华人文始祖舜帝的崩葬之地，舜帝陵祭祀文化延续两千余年，是中国传统文化的重要源头。
            </p>
          </div>
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div class="aspect-[4/3] rounded-sm overflow-hidden">
              <img src="https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800&q=80" alt="舜帝陵" class="w-full h-full object-cover"/>
            </div>
            <div>
              <h3 class="font-display text-2xl font-semibold text-ink mb-4">舜帝陵</h3>
              <p class="text-ink-light leading-relaxed mb-4">
                九嶷山舜帝陵是中华民族共同敬仰的人文始祖安息之所。自汉代设庙祭祀以来，舜帝陵历经修缮扩建，形成了今日的恢弘规模。陵庙依山而建，轴线分明，碑刻林立，古松参天。
              </p>
              <p class="text-ink-light leading-relaxed mb-6">
                每年清明、重阳，祭祀大典在此举行，包括祭文诵读、乐舞告祭、三献礼等仪程，吸引海内外华人前来寻根问祖。
              </p>
              <div class="grid grid-cols-2 gap-4 mb-6">
                <div class="bg-paper-cream rounded-sm p-4">
                  <div class="text-primary font-display text-xl font-bold">2000+</div>
                  <div class="text-ink-subtle text-xs mt-1">年祭祀历史</div>
                </div>
                <div class="bg-paper-cream rounded-sm p-4">
                  <div class="text-primary font-display text-xl font-bold">省级</div>
                  <div class="text-ink-subtle text-xs mt-1">非物质文化遗产</div>
                </div>
              </div>
              <span class="tag-primary">舜帝祭典</span>
            </div>
          </div>
        </div>

        <div class="divider-line mb-20"></div>

        <!-- Culture items -->
        <div class="mb-20">
          <div class="text-center mb-12">
            <p class="section-label">非遗传承</p>
            <h2 class="section-title">活态文化遗产</h2>
            <p class="section-desc mx-auto mt-4">宁远现有省级以上非物质文化遗产十余项，每一项都是活着的历史记忆。</p>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div
              v-for="(item, index) in filteredCulture"
              :key="item.id"
              class="group bg-white rounded-sm overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-500 hover:-translate-y-1"
            >
              <div class="relative aspect-[4/3] overflow-hidden">
                <img :src="item.images[0]" :alt="item.name" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"/>
                <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <span class="absolute bottom-4 left-4 tag-primary">{{ item.tag }}</span>
              </div>
              <div class="p-5">
                <h3 class="font-display text-lg font-semibold text-ink mb-2 group-hover:text-primary transition-colors">{{ item.name }}</h3>
                <p class="text-ink-light text-sm leading-relaxed mb-4 line-clamp-3">{{ item.description }}</p>
                <div class="flex flex-wrap gap-1.5">
                  <span v-for="hl in item.highlights" :key="hl" class="text-2xs text-ink-subtle border border-ink-faint/40 px-2 py-0.5 rounded-sm">{{ hl }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="divider-line mb-20"></div>

        <!-- Notable figures -->
        <div>
          <div class="text-center mb-12">
            <p class="section-label">历史名人</p>
            <h2 class="section-title">宁远历史名人</h2>
          </div>
          <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
            <div
              v-for="fig in figures"
              :key="fig.name"
              class="text-center group"
            >
              <div class="w-20 h-20 mx-auto mb-4 rounded-full bg-paper-cream flex items-center justify-center overflow-hidden transition-all duration-300 group-hover:bg-primary/10">
                <div class="text-primary/30 font-display text-3xl font-bold">{{ fig.name[0] }}</div>
              </div>
              <h4 class="font-display text-base font-semibold text-ink mb-0.5">{{ fig.name }}</h4>
              <p class="text-accent text-xs font-medium mb-1">{{ fig.title }}</p>
              <p class="text-ink-subtle text-xs">{{ fig.dynasty }}</p>
              <p class="text-ink-light text-xs mt-1 leading-relaxed line-clamp-2">{{ fig.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { nyData } from '@/data/nyingyuan'

const activeTab = ref('all')
const tabs = [
  { label: '全部', value: 'all' },
  { label: '历史文化', value: 'history' },
  { label: '非遗传承', value: 'craft' },
  { label: '民俗节庆', value: 'festival' },
  { label: '民间艺术', value: 'folk' },
]

const filteredCulture = computed(() => {
  if (activeTab.value === 'all') return nyData.culture
  return nyData.culture.filter(c => c.category === activeTab.value)
})

const figures = nyData.figures
</script>
