<template>
  <div class="home-page">
    <!-- ========== HERO SECTION ========== -->
    <section class="relative h-hero overflow-hidden bg-ink" style="margin-top: -1px;">
      <!-- Carousel slides -->
      <div
        class="absolute inset-0"
        v-for="(slide, index) in heroSlides"
        :key="slide.id"
        v-show="currentSlide === index"
      >
        <div
          class="absolute inset-0 bg-cover bg-center animate-ken-burns"
          :style="{ backgroundImage: `url(${slide.image})` }"
        ></div>
        <div class="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/50"></div>
      </div>

      <!-- Hero content -->
      <div class="relative z-10 h-full flex flex-col justify-end pb-16 lg:pb-24">
        <div class="container-site">
          <div class="max-w-3xl">
            <!-- Tag -->
            <div
              class="inline-flex items-center gap-2 px-3 py-1 mb-5 text-xs font-medium tracking-widest uppercase backdrop-blur-sm rounded-sm transition-all duration-700"
              :class="isSlideVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
              :style="{ transitionDelay: '0.1s' }"
            >
              <span class="w-5 h-px bg-white/80"></span>
              <span class="text-white/90">{{ currentSlideData?.tag }}</span>
            </div>

            <!-- Title -->
            <h1
              class="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight tracking-tight transition-all duration-700"
              :class="isSlideVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'"
              :style="{ transitionDelay: '0.2s' }"
            >
              {{ currentSlideData?.title }}
            </h1>

            <!-- Subtitle -->
            <p
              class="text-white/60 text-base md:text-lg font-light tracking-wide mb-3 transition-all duration-700"
              :class="isSlideVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
              :style="{ transitionDelay: '0.3s' }"
            >
              {{ currentSlideData?.subtitle }}
            </p>

            <!-- Description -->
            <p
              class="text-white/80 text-sm md:text-base leading-relaxed max-w-xl mb-8 transition-all duration-700"
              :class="isSlideVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
              :style="{ transitionDelay: '0.4s' }"
            >
              {{ currentSlideData?.description }}
            </p>

            <!-- CTA buttons -->
            <div
              class="flex flex-wrap items-center gap-3 transition-all duration-700"
              :class="isSlideVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
              :style="{ transitionDelay: '0.5s' }"
            >
              <router-link to="/planning" class="btn-primary bg-white text-primary hover:bg-paper-cream">
                <span>规划行程</span>
              </router-link>
              <router-link to="/destinations" class="btn-outline border-white/40 text-white hover:bg-white/10 hover:border-white">
                <span>探索目的地</span>
              </router-link>
            </div>
          </div>
        </div>
      </div>

      <!-- Carousel controls -->
      <div class="absolute bottom-8 right-8 lg:right-12 z-20 flex items-center gap-3">
        <button
          class="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white/70 hover:bg-white/10 hover:border-white/50 hover:text-white transition-all duration-300 backdrop-blur-sm"
          @click="prevSlide"
          aria-label="上一张"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
          </svg>
        </button>
        <div class="flex items-center gap-1.5">
          <button
            v-for="(_, i) in heroSlides"
            :key="i"
            class="h-1 rounded-full transition-all duration-500"
            :class="currentSlide === i ? 'w-8 bg-white' : 'w-1 bg-white/30'"
            @click="goToSlide(i)"
            :aria-label="`跳转到第${i + 1}张`"
          ></button>
        </div>
        <button
          class="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white/70 hover:bg-white/10 hover:border-white/50 hover:text-white transition-all duration-300 backdrop-blur-sm"
          @click="nextSlide"
          aria-label="下一张"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
          </svg>
        </button>
      </div>

      <!-- Scroll indicator -->
      <div class="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 hidden lg:flex flex-col items-center gap-2 text-white/50">
        <span class="text-2xs tracking-widest uppercase">Scroll</span>
        <div class="w-px h-8 bg-gradient-to-b from-white/50 to-transparent"></div>
      </div>
    </section>

    <!-- ========== 八景概览 ========== -->
    <section class="bg-primary py-5">
      <div class="container-site">
        <div class="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-white/80 text-sm">
          <div class="flex items-center gap-2">
            <span class="w-1.5 h-1.5 rounded-full bg-accent"></span>
            <span>印山春雨</span>
          </div>
          <div class="w-px h-4 bg-white/20 hidden sm:block"></div>
          <div class="flex items-center gap-2">
            <span class="w-1.5 h-1.5 rounded-full bg-accent"></span>
            <span>凤桥秋月</span>
          </div>
          <div class="w-px h-4 bg-white/20 hidden sm:block"></div>
          <div class="flex items-center gap-2">
            <span class="w-1.5 h-1.5 rounded-full bg-accent"></span>
            <span>南林丛桂</span>
          </div>
          <div class="w-px h-4 bg-white/20 hidden sm:block"></div>
          <div class="flex items-center gap-2">
            <span class="w-1.5 h-1.5 rounded-full bg-accent"></span>
            <span>东溪古松</span>
          </div>
          <div class="w-px h-4 bg-white/20 hidden sm:block"></div>
          <div class="flex items-center gap-2">
            <span class="w-1.5 h-1.5 rounded-full bg-accent"></span>
            <span>金泉试茗</span>
          </div>
          <div class="w-px h-4 bg-white/20 hidden sm:block"></div>
          <div class="flex items-center gap-2">
            <span class="w-1.5 h-1.5 rounded-full bg-accent"></span>
            <span>玉琯摩崖</span>
          </div>
          <div class="w-px h-4 bg-white/20 hidden sm:block"></div>
          <div class="flex items-center gap-2">
            <span class="w-1.5 h-1.5 rounded-full bg-accent"></span>
            <span>疑峰叠翠</span>
          </div>
          <div class="w-px h-4 bg-white/20 hidden sm:block"></div>
          <div class="flex items-center gap-2">
            <span class="w-1.5 h-1.5 rounded-full bg-accent"></span>
            <span>泠水涵青</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ========== ABOUT STRIP ========== -->
    <section class="py-20 lg:py-28 bg-white">
      <div class="container-site">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <p class="section-label">走进宁远</p>
            <h2 class="section-title mb-6">千年古邑 · 人文宁远</h2>
            <p class="text-ink-light leading-relaxed mb-6">
              宁远县位于湖南省南部、永州北端，面积2526平方公里，人口87万。这里是中华人文始祖舜帝的崩葬之地，九嶷山巍峨耸立，泠江泠泠东去。
            </p>
            <p class="text-ink-light leading-relaxed mb-8">
              宁远文庙是全国重点文物保护单位，舜帝陵祭祀文化延续千年。瑶族盘王节、宁远木雕、宁远山歌等非物质文化遗产丰富，是国家级历史文化名城。
            </p>
            <div class="grid grid-cols-3 gap-6 mb-8">
              <div class="text-center">
                <div class="text-2xl font-display font-bold text-primary">2526</div>
                <div class="text-xs text-ink-subtle mt-1">平方公里</div>
              </div>
              <div class="text-center">
                <div class="text-2xl font-display font-bold text-primary">87万</div>
                <div class="text-xs text-ink-subtle mt-1">常住人口</div>
              </div>
              <div class="text-center">
                <div class="text-2xl font-display font-bold text-primary">2000+</div>
                <div class="text-xs text-ink-subtle mt-1">年历史</div>
              </div>
            </div>
            <router-link to="/about" class="link-arrow">
              了解更多关于宁远
            </router-link>
          </div>
          <div class="relative">
            <div class="aspect-[4/3] rounded-sm overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80"
                alt="九嶷山风光"
                class="w-full h-full object-cover"
              />
            </div>
            <div class="absolute -bottom-6 -left-6 w-48 h-36 rounded-sm overflow-hidden shadow-elevated hidden lg:block">
              <img
                src="https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=400&q=80"
                alt="宁远文庙"
                class="w-full h-full object-cover"
              />
            </div>
            <div class="absolute -top-4 -right-4 bg-primary text-white px-5 py-3 hidden lg:block">
              <div class="text-xs font-light opacity-80">始于</div>
              <div class="text-xl font-display font-bold">宋乾德</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ========== FULL BANNER ========== -->
    <section class="relative h-80 lg:h-96 overflow-hidden">
      <div class="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1920&q=80"
          alt="舜帝陵"
          class="w-full h-full object-cover"
        />
        <div class="absolute inset-0 bg-ink/50"></div>
      </div>
      <div class="relative z-10 h-full flex items-center justify-center text-center">
        <div class="max-w-2xl px-6">
          <p class="text-white/60 text-sm tracking-widest uppercase mb-4">舜帝崩葬之地</p>
          <h2 class="font-display text-3xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            九嶷山舜帝陵<br/>中华民族的道德之源
          </h2>
          <p class="text-white/70 text-base leading-relaxed mb-8">
            自古以来，九嶷山舜帝陵便是中华民族祭祀先圣的神圣殿堂，每年清明、重阳，数以万计的华夏子孙前来祭祖寻根。
          </p>
          <router-link to="/culture" class="btn bg-white text-ink hover:bg-paper-cream">
            探索舜文化
          </router-link>
        </div>
      </div>
    </section>

    <!-- ========== 八景 ========== -->
    <section class="py-20 lg:py-28 bg-white">
      <div class="container-site">
        <div class="flex items-end justify-between mb-12">
          <div>
            <p class="section-label">宁远八景</p>
            <h2 class="section-title">徐旭旦·康熙宁远县志</h2>
          </div>
          <router-link to="/destinations" class="link-arrow hidden sm:inline-flex">
            查看详情
          </router-link>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div
            v-for="(scene, index) in eightSceneries"
            :key="scene.id"
            class="group block animate-on-scroll"
            :class="`stagger-${(index % 4) + 1}`"
          >
            <div class="relative aspect-square rounded-sm overflow-hidden mb-3">
              <img
                :src="scene.images[0]"
                :alt="scene.name"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div class="absolute inset-0 flex flex-col justify-end p-3">
                <h3 class="text-white font-display text-sm font-semibold leading-tight">{{ scene.name }}</h3>
              </div>
            </div>
            <p class="text-ink-light text-xs leading-relaxed line-clamp-2">{{ scene.location }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ========== ROUTES ========== -->
    <section class="py-20 lg:py-28 bg-paper">
      <div class="container-site">
        <div class="flex items-end justify-between mb-4">
          <div>
            <p class="section-label">行程规划</p>
            <h2 class="section-title">精选旅游线路</h2>
          </div>
          <router-link to="/planning" class="link-arrow hidden sm:inline-flex">
            更多路线
          </router-link>
        </div>
        <p class="section-desc mb-12">从一日精华到三日深度，总有一条线路适合您。</p>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <router-link
            v-for="(route, index) in routes"
            :key="route.id"
            to="/planning"
            class="group block bg-white rounded-sm overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-500 hover:-translate-y-1 animate-on-scroll"
            :class="`stagger-${index + 1}`"
          >
            <div class="relative h-48 overflow-hidden">
              <img
                :src="routeStops(route.id)[0]?.image || heroSlides[index % heroSlides.length].image"
                :alt="route.name"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div class="absolute bottom-4 left-4">
                <span class="inline-block px-2.5 py-1 bg-white/20 backdrop-blur-sm text-white text-2xs font-medium tracking-wider uppercase rounded-sm">
                  {{ route.duration }}
                </span>
              </div>
              <div class="absolute top-4 right-4">
                <span class="inline-block px-2.5 py-1 bg-accent/90 text-white text-2xs font-medium tracking-wider uppercase rounded-sm">
                  {{ route.tag }}
                </span>
              </div>
            </div>
            <div class="p-6">
              <h3 class="font-display text-lg font-semibold text-ink mb-2 group-hover:text-primary transition-colors">{{ route.name }}</h3>
              <p class="text-ink-light text-sm leading-relaxed mb-4">{{ route.description }}</p>
              <div class="flex flex-wrap gap-2 mb-4">
                <span
                  v-for="hl in route.highlights"
                  :key="hl"
                  class="text-2xs text-ink-subtle border border-ink-faint/50 px-2 py-0.5 rounded-sm"
                >
                  {{ hl }}
                </span>
              </div>
              <div class="flex items-center justify-between pt-4 border-t border-ink-faint/30">
                <span class="text-accent font-semibold text-sm">{{ route.price }}</span>
                <span class="text-ink-subtle text-xs flex items-center gap-1">
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                  </svg>
                  {{ route.suitable }}
                </span>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </section>

    <!-- ========== MAP SECTION ========== -->
    <section class="py-20 lg:py-28 bg-white">
      <div class="container-site">
        <div class="text-center mb-12">
          <p class="section-label">目的地地图</p>
          <h2 class="section-title">宁远景点分布</h2>
          <p class="section-desc mx-auto mt-4">宁远景点星罗棋布于2526平方公里土地上，从九嶷山巅到泠江之畔，等待您一一探访。</p>
        </div>
        <div class="relative rounded-sm overflow-hidden shadow-medium">
          <!-- Simplified SVG map -->
          <div class="aspect-[16/7] bg-gradient-to-br from-primary/5 via-paper to-accent/5 p-8">
            <div class="relative w-full h-full">
              <!-- Map background -->
              <svg viewBox="0 0 800 350" class="w-full h-full" preserveAspectRatio="xMidYMid meet">
                <!-- Simplified geographic representation -->
                <rect width="800" height="350" fill="none"/>

                <!-- Grid lines -->
                <g stroke="#2E8B57" stroke-width="0.3" opacity="0.1">
                  <line v-for="i in 8" :key="`h${i}`" :x1="0" :y1="i*40" :x2="800" :y2="i*40"/>
                  <line v-for="i in 10" :key="`v${i}`" :x1="i*80" :y1="0" :x2="i*80" :y2="350"/>
                </g>

                <!-- Mountain ranges (stylized) -->
                <path d="M50 300 Q150 200 250 250 Q350 180 450 220 Q550 160 650 200 Q700 180 760 210 L800 200 L800 350 L0 350 Z"
                      fill="#2E8B57" opacity="0.06"/>
                <path d="M0 320 Q100 260 200 280 Q300 240 400 270 Q500 230 600 260 Q700 240 800 270 L800 350 L0 350 Z"
                      fill="#2E8B57" opacity="0.04"/>

                <!-- River (泠江) -->
                <path d="M0 200 Q80 190 160 195 Q240 185 320 195 Q400 180 480 190 Q560 185 640 195 Q720 190 800 195"
                      stroke="#2E8B57" stroke-width="3" fill="none" opacity="0.2"/>

                <!-- Destinations -->
                <g v-for="dest in mapDestinations" :key="dest.id">
                  <!-- Pulse ring -->
                  <circle :cx="dest.x" :cy="dest.y" r="12" :fill="dest.color" opacity="0.1" class="animate-ping" style="animation-duration:3s"/>
                  <!-- Dot -->
                  <circle :cx="dest.x" :cy="dest.y" r="5" :fill="dest.color" opacity="0.8"/>
                  <circle :cx="dest.x" :cy="dest.y" r="3" fill="white"/>
                  <!-- Label -->
                  <text :x="dest.x + 10" :y="dest.y + 4" font-size="11" :fill="dest.color" font-weight="500" font-family="Noto Sans SC, sans-serif">
                    {{ dest.label }}
                  </text>
                </g>

                <!-- Legend -->
                <rect x="20" y="20" width="160" height="100" rx="4" fill="white" opacity="0.9"/>
                <text x="32" y="40" font-size="10" fill="#4a4a4a" font-weight="600" font-family="Noto Sans SC, sans-serif">宁远景点</text>
                <circle cx="36" cy="56" r="4" fill="#2E8B57"/>
                <text x="46" y="60" font-size="9" fill="#4a4a4a" font-family="Noto Sans SC, sans-serif">自然景观</text>
                <circle cx="36" cy="72" r="4" fill="#b8860b"/>
                <text x="46" y="76" font-size="9" fill="#4a4a4a" font-family="Noto Sans SC, sans-serif">历史文化</text>
                <circle cx="36" cy="88" r="4" fill="#c19a6b"/>
                <text x="46" y="92" font-size="9" fill="#4a4a4a" font-family="Noto Sans SC, sans-serif">古村古镇</text>
                <line x1="26" y1="105" x2="66" y2="105" stroke="#2E8B57" stroke-width="1.5" opacity="0.3"/>
                <text x="72" y="109" font-size="9" fill="#8a8a8a" font-family="Noto Sans SC, sans-serif">泠江</text>
              </svg>
            </div>
          </div>
        </div>
        <div class="mt-6 text-center">
          <router-link to="/destinations" class="btn-primary">
            查看完整地图
          </router-link>
        </div>
      </div>
    </section>

    <!-- ========== EVENTS ========== -->
    <section class="py-20 lg:py-28 bg-paper">
      <div class="container-site">
        <div class="flex items-end justify-between mb-12">
          <div>
            <p class="section-label">活动日历</p>
            <h2 class="section-title">精彩活动预告</h2>
          </div>
          <router-link to="/events" class="link-arrow hidden sm:inline-flex">
            全年活动一览
          </router-link>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <router-link
            v-for="(event, index) in upcomingEvents"
            :key="event.name + index"
            to="/events"
            class="group block bg-white rounded-sm overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-500 hover:-translate-y-1 animate-on-scroll"
            :class="`stagger-${(index % 3) + 1}`"
          >
            <div class="flex items-stretch">
              <div class="flex-shrink-0 w-20 bg-primary/5 flex flex-col items-center justify-center p-3">
                <div class="text-primary font-display text-2xl font-bold leading-none">{{ event.month }}</div>
              </div>
              <div class="flex-1 p-5">
                <h3 class="font-display text-base font-semibold text-ink mb-1 group-hover:text-primary transition-colors">{{ event.name }}</h3>
                <p class="text-ink-light text-sm leading-relaxed mb-2">{{ event.desc }}</p>
                <div class="flex items-center gap-2 text-ink-subtle text-xs">
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  </svg>
                  {{ event.location }}
                </div>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </section>

    <!-- ========== NEWS ========== -->
    <section class="py-20 lg:py-28 bg-white">
      <div class="container-site">
        <div class="flex items-end justify-between mb-12">
          <div>
            <p class="section-label">最新资讯</p>
            <h2 class="section-title">宁远动态</h2>
          </div>
          <router-link to="/about" class="link-arrow hidden sm:inline-flex">
            更多资讯
          </router-link>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <router-link
            v-for="(item, index) in newsItems"
            :key="item.id"
            to="/about"
            class="group block animate-on-scroll"
            :class="`stagger-${index + 1}`"
          >
            <div class="relative aspect-[16/9] rounded-sm overflow-hidden mb-4">
              <img
                :src="item.image"
                :alt="item.title"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <span class="absolute top-3 left-3 tag-primary text-2xs">{{ item.category }}</span>
            </div>
            <div class="text-ink-subtle text-xs mb-2">{{ item.date }}</div>
            <h3 class="font-display text-base font-semibold text-ink mb-2 group-hover:text-primary transition-colors line-clamp-2">{{ item.title }}</h3>
            <p class="text-ink-light text-sm leading-relaxed line-clamp-2">{{ item.excerpt }}</p>
          </router-link>
        </div>
      </div>
    </section>

    <!-- ========== CTA SECTION ========== -->
    <section class="py-20 lg:py-28 bg-primary">
      <div class="container-site text-center">
        <p class="text-white/60 text-sm tracking-widest uppercase mb-4">开始您的宁远之旅</p>
        <h2 class="font-display text-3xl lg:text-5xl font-bold text-white mb-6 leading-tight">
          探索千年古邑<br/>发现大美宁远
        </h2>
        <p class="text-white/70 text-base leading-relaxed max-w-xl mx-auto mb-10">
          从九嶷山巅到泠江之畔，从舜帝陵前到瑶乡深处，宁远等待着每一位旅者前来寻根问祖、修身养性。
        </p>
        <div class="flex flex-wrap items-center justify-center gap-4">
          <router-link to="/planning" class="btn bg-white text-primary hover:bg-paper-cream text-base px-8 py-4">
            规划我的行程
          </router-link>
          <router-link to="/transportation" class="btn border border-white/40 text-white hover:bg-white/10 text-base px-8 py-4">
            了解如何到达
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { nyData } from '@/data/nyingyuan'

const heroSlides = nyData.heroSlides
const currentSlide = ref(0)
const isSlideVisible = ref(false)
let autoPlayTimer = null

const currentSlideData = computed(() => heroSlides[currentSlide.value])

function nextSlide() {
  currentSlide.value = (currentSlide.value + 1) % heroSlides.length
  triggerAnimation()
}

function prevSlide() {
  currentSlide.value = (currentSlide.value - 1 + heroSlides.length) % heroSlides.length
  triggerAnimation()
}

function goToSlide(index) {
  currentSlide.value = index
  triggerAnimation()
}

function triggerAnimation() {
  isSlideVisible.value = false
  setTimeout(() => { isSlideVisible.value = true }, 50)
}

function startAutoPlay() {
  autoPlayTimer = setInterval(nextSlide, 6000)
}

function stopAutoPlay() {
  if (autoPlayTimer) clearInterval(autoPlayTimer)
}

onMounted(() => {
  isSlideVisible.value = true
  startAutoPlay()

  // Scroll animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible')
      }
    })
  }, { threshold: 0.1 })

  document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el))

  return () => observer.disconnect()
})

onUnmounted(() => stopAutoPlay())

const featuredDestinations = computed(() => nyData.destinations.slice(0, 4))
const eightSceneries = computed(() => nyData.eightSceneries)
const cultureItems = computed(() => nyData.culture.slice(0, 3))
const routes = computed(() => nyData.routes)
const newsItems = computed(() => nyData.news.slice(0, 3))

const upcomingEvents = computed(() => {
  const allEvents = nyData.events.flatMap(m => m.events.map(e => ({ ...e, month: m.month })))
  return allEvents.slice(0, 6)
})

const mapDestinations = [
  { id: 1, x: 480, y: 120, label: '九嶷山', color: '#2E8B57' },
  { id: 2, x: 420, y: 180, label: '舜帝陵', color: '#b8860b' },
  { id: 3, x: 460, y: 200, label: '三分石', color: '#2E8B57' },
  { id: 4, x: 440, y: 160, label: '紫霞岩', color: '#2E8B57' },
  { id: 5, x: 300, y: 210, label: '宁远文庙', color: '#b8860b' },
  { id: 6, x: 350, y: 240, label: '下灌古村', color: '#c19a6b' },
  { id: 7, x: 380, y: 260, label: '平田古村', color: '#c19a6b' },
  { id: 8, x: 280, y: 195, label: '泠江', color: '#2E8B57' },
]

function routeStops(id) {
  const dest = nyData.destinations.find(d => d.id === id)
  return dest ? dest.images.map(img => ({ image: img })) : []
}
</script>
