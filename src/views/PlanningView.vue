<template>
  <div>
    <!-- Hero -->
    <section class="relative h-72 lg:h-96 overflow-hidden bg-ink">
      <div class="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1920&q=80"
          alt="行程规划"
          class="w-full h-full object-cover"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/40"></div>
      </div>
      <div class="relative z-10 h-full flex items-end pb-12">
        <div class="container-site">
          <p class="text-white/60 text-sm tracking-widest uppercase mb-3">Plan Your Trip</p>
          <h1 class="font-display text-4xl lg:text-5xl font-bold text-white mb-4">行程规划</h1>
          <p class="text-white/70 text-base max-w-xl">从一日精华到三日深度，精心规划每一条线路，让您的宁远之旅不留遗憾。</p>
        </div>
      </div>
    </section>

    <!-- Duration filter -->
    <section class="sticky top-16 z-40 bg-white/95 backdrop-blur-md border-b border-ink-faint/50 shadow-soft">
      <div class="container-site">
        <div class="flex items-center gap-1 py-1">
          <button
            v-for="tab in durationTabs"
            :key="tab.value"
            class="px-5 py-3.5 text-sm font-medium whitespace-nowrap transition-all duration-200 border-b-2"
            :class="activeDuration === tab.value
              ? 'text-primary border-primary'
              : 'text-ink-light border-transparent hover:text-ink'"
            @click="activeDuration = tab.value"
          >
            {{ tab.label }}
          </button>
        </div>
      </div>
    </section>

    <!-- Routes -->
    <section class="py-16 lg:py-20 bg-paper">
      <div class="container-site">
        <div
          v-for="route in filteredRoutes"
          :key="route.id"
          class="bg-white rounded-sm overflow-hidden shadow-card mb-10 hover:shadow-card-hover transition-shadow duration-500"
        >
          <!-- Route header -->
          <div class="relative h-52 overflow-hidden">
            <img
              :src="routeHeaderImage(route.id)"
              :alt="route.name"
              class="w-full h-full object-cover"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
            <div class="absolute inset-0 flex flex-col justify-end p-8">
              <div class="flex items-center gap-3 mb-3">
                <span class="px-3 py-1 bg-accent/90 text-white text-xs font-medium tracking-wider uppercase rounded-sm">{{ route.tag }}</span>
                <span class="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs rounded-sm">{{ route.duration }}</span>
              </div>
              <h2 class="font-display text-2xl lg:text-3xl font-bold text-white mb-2">{{ route.name }}</h2>
              <p class="text-white/70 text-sm">{{ route.description }}</p>
            </div>
          </div>

          <!-- Route body -->
          <div class="p-8">
            <!-- Highlights & info -->
            <div class="flex flex-wrap items-center gap-4 mb-8 pb-6 border-b border-ink-faint/30">
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="hl in route.highlights"
                  :key="hl"
                  class="px-3 py-1 bg-paper-cream text-ink-light text-xs rounded-sm"
                >
                  {{ hl }}
                </span>
              </div>
              <div class="flex items-center gap-6 ml-auto">
                <div class="text-right">
                  <div class="text-accent font-display font-bold text-lg">{{ route.price }}</div>
                  <div class="text-ink-subtle text-xs">起/人</div>
                </div>
                <div class="text-right">
                  <div class="text-ink font-medium text-sm">{{ route.suitable }}</div>
                  <div class="text-ink-subtle text-xs">适宜季节</div>
                </div>
              </div>
            </div>

            <!-- Timeline -->
            <div class="relative pl-8">
              <div class="absolute left-3 top-0 bottom-0 w-px bg-ink-faint/40"></div>
              <div
                v-for="(stop, index) in route.stops"
                :key="index"
                class="relative mb-8 last:mb-0"
              >
                <div class="absolute -left-5 top-1.5 w-2.5 h-2.5 rounded-full bg-primary border-2 border-white shadow-sm"></div>
                <div class="flex items-start gap-4">
                  <div class="flex-shrink-0 w-20 text-primary font-medium text-sm">{{ stop.time }}</div>
                  <div>
                    <h4 class="font-display font-semibold text-ink mb-1">{{ stop.name }}</h4>
                    <p class="text-ink-light text-sm leading-relaxed">{{ stop.activity }}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- CTA -->
            <div class="mt-8 pt-6 border-t border-ink-faint/30 flex items-center justify-between">
              <div class="text-ink-subtle text-sm flex items-center gap-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                建议提前3天预约，节假日需提前1周
              </div>
              <button class="btn-primary">
                立即预约
              </button>
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

const activeDuration = ref('all')
const durationTabs = [
  { label: '全部线路', value: 'all' },
  { label: '一日游', value: '1日游' },
  { label: '两日游', value: '2日游' },
  { label: '三日游', value: '3日游' },
]

const filteredRoutes = computed(() => {
  if (activeDuration.value === 'all') return nyData.routes
  return nyData.routes.filter(r => r.duration === activeDuration.value)
})

const routeImages = {
  1: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80',
  2: 'https://images.unsplash.com/photo-1518623381003-17a5a0a89e84?w=1200&q=80',
  3: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=1200&q=80',
}

function routeHeaderImage(id) {
  return routeImages[id] || nyData.heroSlides[0].image
}
</script>
