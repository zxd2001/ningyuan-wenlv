<template>
  <div>
    <!-- Hero -->
    <section class="relative h-72 lg:h-96 overflow-hidden bg-ink">
      <div class="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80"
          alt="美食住宿"
          class="w-full h-full object-cover"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/40"></div>
      </div>
      <div class="relative z-10 h-full flex items-end pb-12">
        <div class="container-site">
          <p class="text-white/60 text-sm tracking-widest uppercase mb-3">Food & Stay</p>
          <h1 class="font-display text-4xl lg:text-5xl font-bold text-white mb-4">美食住宿</h1>
          <p class="text-white/70 text-base max-w-xl">品味宁远味道，感受瑶乡风情。无论是地道小吃还是精品民宿，都能让您的旅途回味无穷。</p>
        </div>
      </div>
    </section>

    <!-- Tabs -->
    <section class="sticky top-16 z-40 bg-white/95 backdrop-blur-md border-b border-ink-faint/50 shadow-soft">
      <div class="container-site">
        <div class="flex items-center gap-1 py-1">
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

    <!-- Food section -->
    <section v-if="activeTab === 'food'" class="py-16 lg:py-20 bg-paper">
      <div class="container-site">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          <div
            v-for="food in foods"
            :key="food.name"
            class="bg-white rounded-sm overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-500 hover:-translate-y-1"
          >
            <div class="aspect-[4/3] bg-paper-cream flex items-center justify-center">
              <div class="text-center p-6">
                <div class="text-4xl mb-3">{{ foodEmoji(food.name) }}</div>
                <span class="tag-primary text-2xs">{{ food.category }}</span>
              </div>
            </div>
            <div class="p-5">
              <h3 class="font-display text-base font-semibold text-ink mb-2">{{ food.name }}</h3>
              <p class="text-ink-light text-sm leading-relaxed mb-3 line-clamp-2">{{ food.desc }}</p>
              <div class="flex items-center justify-between pt-3 border-t border-ink-faint/30">
                <span class="text-accent font-medium text-sm">{{ food.price }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Lodging section -->
    <section v-if="activeTab === 'lodging'" class="py-16 lg:py-20 bg-paper">
      <div class="container-site">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="hotel in hotels"
            :key="hotel.name"
            class="bg-white rounded-sm overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-500 hover:-translate-y-1"
          >
            <div class="relative aspect-[16/10] bg-paper-cream overflow-hidden">
              <div class="absolute inset-0 flex items-center justify-center">
                <div class="text-center">
                  <div class="text-5xl mb-2">{{ hotelEmoji(hotel.category) }}</div>
                  <span class="tag-primary text-2xs">{{ hotel.category }}</span>
                </div>
              </div>
              <div class="absolute top-3 right-3">
                <span class="px-2.5 py-1 bg-accent/90 text-white text-xs font-medium rounded-sm">{{ hotel.category }}</span>
              </div>
            </div>
            <div class="p-5">
              <h3 class="font-display text-lg font-semibold text-ink mb-2">{{ hotel.name }}</h3>
              <p class="text-ink-subtle text-xs mb-2 flex items-center gap-1">
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                </svg>
                {{ hotel.address }}
              </p>
              <p class="text-ink-light text-sm leading-relaxed mb-4 line-clamp-2">{{ hotel.desc }}</p>
              <div class="flex items-center justify-between pt-3 border-t border-ink-faint/30">
                <div>
                  <span class="text-accent font-display font-bold text-lg">{{ hotel.price }}</span>
                </div>
                <button class="btn-outline text-xs py-1.5 px-4">查看详情</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { nyData } from '@/data/nyingyuan'

const activeTab = ref('food')
const tabs = [
  { label: '特色美食', value: 'food' },
  { label: '住宿推荐', value: 'lodging' },
]

const foods = nyData.foods
const hotels = nyData.hotels

function foodEmoji(name) {
  const map = {
    '宁远血鸭': '🦆', '瑶家腊肉': '🥓', '九嶷山笋': '🎋',
    '宁远米酒': '🍶', '瑶族长桌宴': '🍽️', '下灌豆腐': '🧈',
    '辣椒酿': '🌶️', '桐子叶糍粑': '🍡',
  }
  return map[name] || '🍴'
}

function hotelEmoji(category) {
  const map = { '四星级': '🏨', '精品民宿': '🏡', '瑶家客栈': '⛺', '精品客栈': '🏠' }
  return map[category] || '🏨'
}
</script>
