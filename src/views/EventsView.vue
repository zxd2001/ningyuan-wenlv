<template>
  <div>
    <!-- Hero -->
    <section class="relative h-72 lg:h-96 overflow-hidden bg-ink">
      <div class="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1518623381003-17a5a0a89e84?w=1920&q=80"
          alt="活动日历"
          class="w-full h-full object-cover"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/40"></div>
      </div>
      <div class="relative z-10 h-full flex items-end pb-12">
        <div class="container-site">
          <p class="text-white/60 text-sm tracking-widest uppercase mb-3">Events</p>
          <h1 class="font-display text-4xl lg:text-5xl font-bold text-white mb-4">活动日历</h1>
          <p class="text-white/70 text-base max-w-xl">宁远全年精彩不断，从传统祭典到民俗节庆，每个月都有独特的风景与体验。</p>
        </div>
      </div>
    </section>

    <!-- Events grid -->
    <section class="py-16 lg:py-20 bg-paper">
      <div class="container-site">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            v-for="monthData in events"
            :key="monthData.month"
            class="bg-white rounded-sm overflow-hidden shadow-card"
          >
            <div class="flex items-center gap-4 p-5 border-b border-ink-faint/30 bg-paper-cream/50">
              <div class="text-primary font-display text-2xl font-bold">{{ monthData.month }}</div>
              <div class="h-px flex-1 bg-ink-faint/30"></div>
              <span class="text-ink-subtle text-xs">{{ monthData.events.length }}场活动</span>
            </div>
            <div class="divide-y divide-ink-faint/20">
              <div
                v-for="(event, index) in monthData.events"
                :key="event.name"
                class="p-5 hover:bg-paper-cream/30 transition-colors duration-200"
              >
                <div class="flex items-start gap-4">
                  <div class="flex-shrink-0 w-14 text-center">
                    <div class="text-primary font-display font-bold text-lg">{{ event.date.split(' ')[0] }}</div>
                    <div class="text-ink-subtle text-2xs">{{ event.date.split(' ')[1] || '' }}</div>
                  </div>
                  <div class="flex-1">
                    <h3 class="font-display font-semibold text-ink mb-1">{{ event.name }}</h3>
                    <p class="text-ink-light text-sm leading-relaxed mb-2">{{ event.desc }}</p>
                    <div class="flex items-center gap-2 text-ink-subtle text-xs">
                      <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                      </svg>
                      {{ event.location }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="py-16 bg-primary">
      <div class="container-site text-center">
        <h2 class="font-display text-2xl lg:text-3xl font-bold text-white mb-4">想了解更多活动资讯？</h2>
        <p class="text-white/70 text-sm mb-8">关注宁远县文化旅游网，第一时间获取最新活动预告与优惠信息</p>
        <button class="btn bg-white text-primary hover:bg-paper-cream">订阅活动通知</button>
      </div>
    </section>
  </div>
</template>

<script setup>
import { nyData } from '@/data/nyingyuan'
const events = nyData.events
</script>
