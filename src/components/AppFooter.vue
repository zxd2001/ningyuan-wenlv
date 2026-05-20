<template>
  <footer class="bg-ink text-white/80">
    <!-- Main footer content -->
    <div class="container-site py-16">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
        <!-- Brand column -->
        <div class="lg:col-span-1">
          <div class="flex items-center gap-3 mb-5">
            <div class="w-9 h-9 rounded-sm overflow-hidden flex-shrink-0">
              <img src="/favicon.svg" alt="宁远文旅" class="w-full h-full object-contain">
            </div>
            <div>
              <div class="font-display font-semibold text-white text-base">宁远县文化旅游网</div>
              <div class="text-2xs tracking-widest uppercase text-white/50">Ningyuan Tourism</div>
            </div>
          </div>
          <p class="text-sm leading-relaxed text-white/60 mb-6 max-w-xs">
            宁远是舜帝崩葬之地，九嶷山巍峨耸立。探索宁远的历史文化、自然风光与民俗风情。
          </p>
          <div class="flex items-center gap-3">
            <a
              v-for="social in socials"
              :key="social.name"
              :href="social.href"
              class="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 hover:border-white/40 transition-all duration-300"
              :aria-label="social.name"
            >
              <span class="text-sm" v-html="social.icon"></span>
            </a>
          </div>
        </div>

        <!-- Quick links -->
        <div>
          <h4 class="text-white font-medium text-sm tracking-wider uppercase mb-5">快速链接</h4>
          <ul class="space-y-3">
            <li v-for="link in quickLinks" :key="link.path">
              <router-link
                :to="link.path"
                class="text-sm text-white/60 hover:text-white transition-colors duration-200"
              >
                {{ link.label }}
              </router-link>
            </li>
          </ul>
        </div>

        <!-- About links -->
        <div>
          <h4 class="text-white font-medium text-sm tracking-wider uppercase mb-5">走进宁远</h4>
          <ul class="space-y-3">
            <li v-for="link in aboutLinks" :key="link.path">
              <router-link
                :to="link.path"
                class="text-sm text-white/60 hover:text-white transition-colors duration-200"
              >
                {{ link.label }}
              </router-link>
            </li>
          </ul>
        </div>

        <!-- Contact column -->
        <div>
          <h4 class="text-white font-medium text-sm tracking-wider uppercase mb-5">联系我们</h4>
          <ul class="space-y-3">
            <li class="flex items-start gap-3">
              <svg class="w-4 h-4 mt-0.5 flex-shrink-0 text-primary/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
              <span class="text-sm text-white/60">湖南省永州市宁远县九疑大道1号</span>
            </li>
            <li class="flex items-center gap-3">
              <svg class="w-4 h-4 flex-shrink-0 text-primary/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
              </svg>
              <a href="tel:0746-1234567" class="text-sm text-white/60 hover:text-white transition-colors">0746-1234567</a>
            </li>
            <li class="flex items-center gap-3">
              <svg class="w-4 h-4 flex-shrink-0 text-primary/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
              <a href="mailto:info@ningyuan.gov.cn" class="text-sm text-white/60 hover:text-white transition-colors">info@ningyuan.gov.cn</a>
            </li>
          </ul>

          <div class="mt-6 pt-5 border-t border-white/10">
            <p class="text-xs text-white/40 mb-2">工作时间</p>
            <p class="text-sm text-white/60">周一至周五 08:30 - 17:30</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom bar -->
    <div class="border-t border-white/10">
      <div class="container-site py-5">
        <div class="flex flex-col md:flex-row items-center justify-between gap-3">
          <div class="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-white/40">
            <router-link to="/about" class="hover:text-white/60 transition-colors">关于网站</router-link>
            <span>|</span>
            <a href="#" class="hover:text-white/60 transition-colors">隐私政策</a>
            <span>|</span>
            <a href="#" class="hover:text-white/60 transition-colors">网站地图</a>
            <span>|</span>
            <router-link to="/about" class="hover:text-white/60 transition-colors">联系我们</router-link>
          </div>
          <div class="text-xs text-white/30">
            © {{ currentYear }} 宁远县文化旅游广电体育局 版权所有
          </div>
        </div>
      </div>
    </div>

    <!-- Government info bar -->
    <div class="border-t border-white/5 bg-black/20">
      <div class="container-site py-3">
        <div class="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-white/25">
          <span>宁远县人民政府</span>
          <span>|</span>
          <span>永州市文化旅游广电体育局</span>
          <span>|</span>
          <span>湖南省文化和旅游厅</span>
          <span>|</span>
          <a href="https://beian.miit.gov.cn" target="_blank" class="hover:text-white/40 transition-colors">湘ICP备2025000001号</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
const currentYear = new Date().getFullYear()

const quickLinks = [
  { path: '/destinations', label: '目的地' },
  { path: '/culture', label: '文化体验' },
  { path: '/planning', label: '行程规划' },
  { path: '/food-lodging', label: '美食住宿' },
  { path: '/transportation', label: '交通指南' },
  { path: '/events', label: '活动日历' },
]

const aboutLinks = [
  { path: '/about', label: '走进宁远' },
  { path: '/about', label: '历史沿革' },
  { path: '/about', label: '行政区划' },
  { path: '/about', label: '走进宁远' },
  { path: '/about', label: '走进宁远' },
  { path: '/about', label: '走进宁远' },
]

const socials = [
  {
    name: '微信',
    href: '#',
    icon: '<svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 01.213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 00.167-.054l1.903-1.114a.864.864 0 01.717-.098 10.16 10.16 0 002.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 01-1.162 1.178A1.17 1.17 0 014.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 01-1.162 1.178 1.17 1.17 0 01-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 01.598.082l1.584.926a.272.272 0 00.14.047c.134 0 .24-.111.24-.247 0-.06-.023-.12-.038-.177l-.327-1.233a.582.582 0 01-.023-.156.49.49 0 01.201-.398C23.024 18.48 24 16.82 24 14.98c0-3.21-2.931-5.837-6.656-6.088V8.87c-.16-.008-.322-.012-.486-.012zm-2.53 3.274c.535 0 .969.44.969.982a.976.976 0 01-.969.983.976.976 0 01-.969-.983c0-.542.434-.982.97-.982zm4.844 0c.535 0 .969.44.969.982a.976.976 0 01-.969.983.976.976 0 01-.969-.983c0-.542.434-.982.969-.982z"/></svg>',
  },
  {
    name: '微博',
    href: '#',
    icon: '<svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M20.194 14.197c0 3.058-3.927 5.54-8.77 5.54-4.842 0-8.77-2.482-8.77-5.54 0-3.059 3.928-5.54 8.77-5.54 4.843 0 8.77 2.481 8.77 5.54zM10.338 17.64c.31.215.71.274 1.19.274.76 0 1.52-.365 1.52-1.01 0-.44-.24-.78-.63-1.06-.39-.28-.83-.43-1.28-.43-.98 0-1.77.77-1.77 1.74 0 .34.22.64.58.82l.39.18v.48zm-.08-3.63c.33 0 .61.11.86.3.25.19.41.46.41.78 0 .5-.41.92-.92.92-.5 0-.92-.42-.92-.92 0-.1.02-.19.05-.28h-.72c-.38 0-.69.31-.69.69 0 .38.31.69.69.69h.29c.02.11.05.21.05.31 0 .53-.42.96-.96.96s-.96-.43-.96-.96c0-.31.15-.59.4-.78.24-.19.55-.29.87-.29.6 0 1.11.35 1.32.85h.4c.42 0 .76-.34.76-.76 0-.42-.34-.76-.76-.76h-.35c-.02-.12-.05-.23-.05-.35 0-.57.45-1.04 1.02-1.04.58 0 1.05.47 1.05 1.04 0 .42-.27.78-.65.94l.09.44zm1.83-1.72c-1.95 0-3.53 1.59-3.53 3.54 0 1.95 1.58 3.53 3.53 3.53s3.53-1.58 3.53-3.53c0-1.95-1.58-3.54-3.53-3.54zm0 5.86c-1.28 0-2.32-1.04-2.32-2.32s1.04-2.32 2.32-2.32 2.32 1.04 2.32 2.32-1.04 2.32-2.32 2.32z"/></svg>',
  },
  {
    name: '抖音',
    href: '#',
    icon: '<svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>',
  },
]
</script>
