<template>
  <header
    ref="headerRef"
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
    :class="[
      isScrolled
        ? 'bg-white/95 backdrop-blur-md shadow-soft py-0'
        : 'bg-transparent py-5'
    ]"
  >
    <!-- Top bar -->
    <div
      v-if="!isScrolled"
      class="absolute top-0 left-0 right-0 h-8 flex items-center justify-center bg-primary/80 backdrop-blur-sm"
    >
      <div class="container-site flex items-center justify-between">
        <div class="flex items-center gap-6 text-white/90 text-xs">
          <span class="flex items-center gap-1.5">
            <span class="w-1.5 h-1.5 rounded-full bg-accent animate-pulse"></span>
            宁远 · 九嶷山 · 舜帝寝陵
          </span>
          <span class="hidden sm:inline">湖南省永州市宁远县</span>
        </div>
        <div class="flex items-center gap-4 text-white/90 text-xs">
          <a href="tel:0746-1234567" class="hover:text-accent transition-colors">0746-1234567</a>
          <span class="w-px h-3 bg-white/30"></span>
          <button
            class="hover:text-accent transition-colors"
            @click="toggleLanguage"
          >
            {{ currentLang === 'zh' ? 'EN' : '中文' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Main nav -->
    <nav
      class="container-site"
      :class="isScrolled ? 'h-16' : 'pt-8'"
    >
      <div class="flex items-center justify-between h-full">
        <!-- Logo -->
        <router-link
          to="/"
          class="flex items-center gap-3 group"
        >
          <div
            class="w-9 h-9 rounded-sm overflow-hidden flex-shrink-0 transition-transform duration-300 group-hover:scale-105"
          >
            <img src="/favicon.svg" alt="宁远文旅" class="w-full h-full object-contain">
          </div>
          <div>
            <div
              class="font-display font-semibold text-base leading-none transition-colors duration-300"
              :class="isScrolled ? 'text-ink' : 'text-white'"
            >
              宁远县文化旅游网
            </div>
            <div
              class="text-2xs tracking-widest uppercase transition-colors duration-300"
              :class="isScrolled ? 'text-ink-subtle mt-0.5' : 'text-white/70'"
            >
              Ningyuan Tourism
            </div>
          </div>
        </router-link>

        <!-- Desktop navigation -->
        <div class="hidden lg:flex items-center gap-1">
          <router-link
            v-for="item in navItems"
            :key="item.path"
            :to="item.path"
            class="nav-link relative px-4 py-2 text-sm font-medium transition-colors duration-300"
            :class="isScrolled ? 'text-ink-light hover:text-primary' : 'text-white/90 hover:text-white'"
            active-class="nav-link-active"
          >
            {{ item.label }}
          </router-link>
        </div>

        <!-- Right actions -->
        <div class="flex items-center gap-3">
          <!-- Search button -->
          <button
            class="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300"
            :class="isScrolled
              ? 'bg-paper-cream text-ink-light hover:bg-primary hover:text-white'
              : 'bg-white/20 backdrop-blur-sm text-white hover:bg-white/30'"
            @click="toggleSearch"
            aria-label="搜索"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.35-4.35"/>
            </svg>
          </button>

          <!-- Mobile menu button -->
          <button
            class="lg:hidden w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300"
            :class="isScrolled
              ? 'bg-paper-cream text-ink-light'
              : 'bg-white/20 backdrop-blur-sm text-white'"
            @click="toggleMobileMenu"
            aria-label="菜单"
          >
            <svg v-if="!isMobileOpen" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
            <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
      </div>
    </nav>

    <!-- Search overlay -->
    <transition name="fade">
      <div
        v-if="isSearchOpen"
        class="absolute top-full left-0 right-0 bg-white/98 backdrop-blur-md border-t border-ink-faint/50 shadow-medium"
      >
        <div class="container-site py-5">
          <div class="relative max-w-2xl mx-auto">
            <input
              ref="searchInputRef"
              type="text"
              placeholder="搜索景区、线路、活动..."
              class="w-full pl-5 pr-12 py-3.5 text-base bg-paper-cream rounded-sm border border-ink-faint/80 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
              v-model="searchQuery"
              @keydown.escape="toggleSearch"
            />
            <button class="absolute right-3 top-1/2 -translate-y-1/2 text-ink-subtle hover:text-primary transition-colors">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.35-4.35"/>
              </svg>
            </button>
          </div>
          <div class="mt-3 text-center">
            <span class="text-xs text-ink-subtle">热门：</span>
            <button
              v-for="kw in hotKeywords"
              :key="kw"
              class="mx-1.5 text-xs text-ink-light hover:text-primary transition-colors"
              @click="searchQuery = kw"
            >
              {{ kw }}
            </button>
          </div>
        </div>
      </div>
    </transition>

    <!-- Mobile menu -->
    <transition name="slide-down">
      <div
        v-if="isMobileOpen"
        class="lg:hidden bg-white border-t border-ink-faint/50 shadow-medium"
      >
        <div class="container-site py-4">
          <div class="flex flex-col divide-y divide-ink-faint/30">
            <router-link
              v-for="item in navItems"
              :key="item.path"
              :to="item.path"
              class="flex items-center justify-between py-3.5 text-base font-medium text-ink hover:text-primary transition-colors"
              @click="isMobileOpen = false"
            >
              {{ item.label }}
              <svg class="w-4 h-4 text-ink-subtle" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
              </svg>
            </router-link>
          </div>
          <div class="mt-4 pt-4 border-t border-ink-faint/30">
            <div class="flex items-center gap-4 text-sm text-ink-light">
              <a href="tel:0746-1234567" class="flex items-center gap-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
                0746-1234567
              </a>
              <button @click="toggleLanguage" class="flex items-center gap-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"/>
                </svg>
                {{ currentLang === 'zh' ? 'English' : '中文' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </header>

  <!-- Spacer when scrolled -->
  <div v-if="isScrolled" class="h-16"></div>
</template>

<script setup>
import { ref, watch, nextTick, onMounted, onUnmounted } from 'vue'
import { useWindowScroll } from '@vueuse/core'

const { y: scrollY } = useWindowScroll()

const isScrolled = computed(() => scrollY.value > 60)
const isSearchOpen = ref(false)
const isMobileOpen = ref(false)
const searchQuery = ref('')
const searchInputRef = ref(null)
const currentLang = ref('zh')

const hotKeywords = ['九嶷山', '舜帝陵', '文庙', '古村', '瑶族', '一日游', '杜鹃花']

const navItems = [
  { path: '/', label: '首页' },
  { path: '/destinations', label: '目的地' },
  { path: '/culture', label: '文化体验' },
  { path: '/planning', label: '行程规划' },
  { path: '/food-lodging', label: '美食住宿' },
  { path: '/transportation', label: '交通指南' },
  { path: '/events', label: '活动日历' },
  { path: '/about', label: '走进宁远' },
  { path: '/government', label: '政务公开' },
]

function toggleSearch() {
  isSearchOpen.value = !isSearchOpen.value
  if (isSearchOpen.value) {
    nextTick(() => searchInputRef.value?.focus())
  }
}

function toggleMobileMenu() {
  isMobileOpen.value = !isMobileOpen.value
}

function toggleLanguage() {
  currentLang.value = currentLang.value === 'zh' ? 'en' : 'zh'
}

// Close mobile menu on route change
import { computed } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
watch(() => route.path, () => { isMobileOpen.value = false })

// Close search on route change
watch(() => route.path, () => { isSearchOpen.value = false })

// Keyboard shortcut
function handleKeydown(e) {
  if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
    e.preventDefault()
    toggleSearch()
  }
}

onMounted(() => document.addEventListener('keydown', handleKeydown))
onUnmounted(() => document.removeEventListener('keydown', handleKeydown))
</script>

<style scoped>
.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%) scaleX(0);
  width: 20px;
  height: 2px;
  background: currentColor;
  transition: transform 0.3s ease;
}

.nav-link:hover::after,
.nav-link-active::after {
  transform: translateX(-50%) scaleX(1);
}

.nav-link-active {
  @apply text-primary;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

.slide-down-enter-active, .slide-down-leave-active {
  transition: all 0.35s cubic-bezier(0.25, 0.1, 0.25, 1);
}
.slide-down-enter-from, .slide-down-leave-to {
  opacity: 0;
  transform: translateY(-16px);
  max-height: 0;
}
.slide-down-enter-to, .slide-down-leave-from {
  max-height: 600px;
}
</style>
