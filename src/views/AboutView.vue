<template>
  <div>
    <!-- Hero -->
    <section class="relative h-72 lg:h-96 overflow-hidden bg-ink">
      <div class="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80"
          alt="走进宁远"
          class="w-full h-full object-cover"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/40"></div>
      </div>
      <div class="relative z-10 h-full flex items-end pb-12">
        <div class="container-site">
          <p class="text-white/60 text-sm tracking-widest uppercase mb-3">About Ningyuan</p>
          <h1 class="font-display text-4xl lg:text-5xl font-bold text-white mb-4">走进宁远</h1>
          <p class="text-white/70 text-base max-w-xl">千年古邑，人文渊薮。历史、方言、民族、戏剧……宁远等你细读。</p>
        </div>
      </div>
    </section>

    <!-- 导航栏 -->
    <section class="sticky top-16 z-40 bg-white border-b border-gray-200 shadow-sm">
      <div class="container-site">
        <div class="flex items-center gap-0 py-0 overflow-x-auto scrollbar-hide">
          <button
            v-for="tab in navTabs"
            :key="tab.id"
            @click="activeTab = tab.id"
            class="flex-shrink-0 px-5 py-4 text-sm font-medium border-b-2 transition-colors"
            :class="activeTab === tab.id
              ? 'text-green-600 border-green-600'
              : 'text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300'"
          >
            {{ tab.label }}
          </button>
        </div>
      </div>
    </section>

    <!-- 历史 -->
    <section v-show="activeTab === 'history'" class="py-12 bg-paper">
      <div class="container-site">
        <div class="max-w-4xl mx-auto">
          <div class="text-center mb-12">
            <h2 class="text-2xl font-display font-bold text-ink mb-2">宁远历史沿革</h2>
            <p class="text-ink-subtle text-sm">从旧石器时代到当代，一条纵贯万年的历史文脉</p>
          </div>

          <!-- 时间轴 -->
          <div class="relative">
            <div class="absolute left-8 top-0 bottom-0 w-px bg-primary/20"></div>

            <!-- 分期标签（时代分隔线） -->
            <div v-for="era in historyEras" :key="era.name">
              <!-- 时代标题 -->
              <div class="relative flex items-center mb-6 mt-8 first:mt-0">
                <div class="absolute left-8 transform -translate-x-1/2 z-10 w-4 h-4 rounded-full border-2 border-white shadow bg-primary"></div>
                <div class="ml-16 flex items-center gap-2 px-3 py-1 rounded text-xs font-medium bg-primary/10 text-primary">
                  {{ era.name }}
                </div>
              </div>

              <!-- 该时代的事件 -->
              <div class="space-y-6 ml-8">
                <div v-for="event in era.events" :key="event.year" class="relative pl-12">
                  <div class="absolute left-0 w-6 h-px bg-primary/30 mt-2.5"></div>
                  <div class="absolute left-0 top-1 w-2 h-2 rounded-full bg-primary"></div>
                  <div class="text-xs font-mono mb-1 text-primary">{{ event.year }}</div>
                  <div class="border border-ink-faint p-4 bg-white hover:border-primary transition-colors">
                    <h4 class="font-semibold text-ink mb-1">{{ event.title }}</h4>
                    <p class="text-ink-light text-xs leading-relaxed">{{ event.desc }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="divider-line my-16"></div>

          <div class="divider-line my-16"></div>

          <!-- 历史人物 -->
          <div class="mb-12">
            <div class="flex items-center justify-between mb-6">
              <h3 class="text-lg font-semibold text-ink">历史名人</h3>
              <span class="text-xs text-ink-subtle">共 {{ historyFigures.length }} 位</span>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div v-for="person in historyFigures" :key="person.name"
                   class="border border-ink-faint overflow-hidden hover:border-primary transition-colors">
                <div class="h-48 overflow-hidden bg-paper-50">
                  <img
                    v-if="person.img"
                    :src="`/images/figures/${person.img}`"
                    :alt="person.name"
                    class="w-full h-full object-cover"
                  />
                  <div v-else class="w-full h-full flex items-center justify-center">
                    <span class="text-ink-faint text-4xl font-display font-bold">{{ person.name[0] }}</span>
                  </div>
                </div>
                <div class="p-4">
                  <div class="flex items-center justify-between mb-1">
                    <h4 class="font-semibold text-ink text-base">{{ person.name }}</h4>
                    <span v-if="person.tag" class="border border-primary text-primary text-xs px-2 py-0.5 whitespace-nowrap">{{ person.tag }}</span>
                  </div>
                  <p class="text-xs text-primary mb-2">{{ person.dynasty }}</p>
                  <p class="text-xs text-ink-subtle leading-relaxed line-clamp-3">{{ person.desc }}</p>
                </div>
              </div>
              <!-- 等等 -->
              <div class="border border-dashed border-ink-faint overflow-hidden flex flex-col items-center justify-center p-6 text-center hover:border-primary transition-colors group">
                <p class="text-lg text-ink-faint group-hover:text-primary transition-colors">等</p>
                <p class="text-xs text-ink-subtle mt-1">更多历史名人陆续收录</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 方言 -->
    <section v-show="activeTab === 'dialect'" class="py-12 bg-paper">
      <div class="container-site">
        <div class="max-w-5xl mx-auto">
          <!-- 标题 -->
          <div class="text-center mb-8">
            <h2 class="text-2xl font-display font-bold text-ink mb-1">宁远方言</h2>
            <p class="text-ink-subtle text-sm">{{ dialectTypeLabels[dialectType] }}，共收录 {{ currentDialectWords.length }} 条词汇</p>
          </div>

          <!-- 方言类型切换 -->
          <div class="flex flex-wrap justify-center gap-2 mb-8">
            <button
              v-for="(label, key) in dialectTypeLabels"
              :key="key"
              @click="dialectType = key; dialectKeyword = ''"
              class="px-4 py-2 text-sm transition-colors"
              :class="dialectType === key
                ? 'bg-primary text-white'
                : 'border border-ink-faint text-ink hover:border-primary'"
            >
              {{ label.split('（')[0] }}
            </button>
          </div>

          <!-- 详细介绍 -->
          <div class="space-y-6 mb-10">
            <!-- 基本概况（动态） -->
            <div class="border-l-4 border-primary pl-4">
              <h3 class="font-semibold text-ink mb-2">{{ dialectTypeLabels[dialectType] }}</h3>
              <div v-if="dialectType === 'pinghua'" class="space-y-1 text-sm text-ink-subtle">
                <p>宁远平话（当地叫"打土谈"）是湖南宁远县的湘南土话，不属于广西平话；全县第二大方言，使用人口约32–34万（占40%–50%）。</p>
                <p><span class="text-ink font-medium">分布：</span>主要在舜陵、天堂、冷水、清水桥、柏家坪、禾亭、中和、水市、湾井等乡镇。</p>
                <p><span class="text-ink font-medium">地位：</span>濒危方言，列入国家首批《濒危语言志》出版计划。</p>
                <p><span class="text-ink font-medium">周边关系：</span>被西南官话（宁远官话）包围，北临湘语、南接粤语、东近赣语，周边县市基本听不懂。</p>
              </div>
              <div v-else-if="dialectType === 'guanhua'" class="space-y-1 text-sm text-ink-subtle">
                <p>宁远官话属于西南官话湘南片，是全县通用语言，官方、学校等正式场合均使用宁远官话。</p>
                <p><span class="text-ink font-medium">地位：</span>宁远县的官方通用语言。</p>
                <p><span class="text-ink font-medium">使用范围：</span>全县通用，党政机关、学校、媒体等正式场合。</p>
              </div>
              <div v-else-if="dialectType === 'yaoyu'" class="space-y-1 text-sm text-ink-subtle">
                <p>宁远瑶语又称勉语，属苗瑶语族瑶语支，不是汉语，主要由过山瑶族使用。</p>
                <p><span class="text-ink font-medium">语系：</span>苗瑶语族 &rarr; 瑶语支 &rarr; 勉语</p>
                <p><span class="text-ink font-medium">分布：</span>九嶷山、棉花坪、桐木漯等瑶族聚居乡镇。</p>
                <p><span class="text-ink font-medium">特点：</span>与宁远平话完全不同语言，无亲属关系，但有少量借词交流。</p>
              </div>
              <div v-else-if="dialectType === 'qita'" class="space-y-1 text-sm text-ink-subtle">
                <p>湘南土话里更小众的支系，主要分布在宁远县部分乡镇，使用人口较少。</p>
                <p><span class="text-ink font-medium">张胡贺土话：</span>分布在冷水镇部分村。</p>
                <p><span class="text-ink font-medium">王骆单土话：</span>分布在太平镇部分村。</p>
                <p><span class="text-ink font-medium">下坠土话：</span>分布在太平镇下坠一带。</p>
                <p><span class="text-ink font-medium">张家土话：</span>分布在宁远张家一带。</p>
              </div>
            </div>

            <!-- 收起/展开按钮（仅平话显示） -->
            <div v-if="showDetailedSections" class="flex justify-center">
              <button
                @click="introExpanded = !introExpanded"
                class="flex items-center gap-2 px-4 py-2 text-sm text-primary border border-primary/30 hover:border-primary transition-colors"
              >
                <span>{{ introExpanded ? '收起' : '展开' }}详细介绍</span>
                <svg
                  class="w-4 h-4 transition-transform"
                  :class="{ 'rotate-180': introExpanded }"
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>

            <!-- 二至九、详细内容（仅平话） -->
            <div v-if="showDetailedSections && introExpanded" class="space-y-6">

            <!-- 二、归属与形成 -->
            <div class="border-l-4 border-primary pl-4">
              <h3 class="font-semibold text-ink mb-2">二、归属与形成</h3>
              <div class="space-y-1 text-sm text-ink-subtle">
                <p><span class="text-ink font-medium">归属：</span>学界暂归湘南土话，独立方言岛；有赣语底层、古汉语成分，与广西平话无关。</p>
                <p><span class="text-ink font-medium">形成：</span>秦汉置县、唐宋移民（赣、粤、桂）、长期封闭交融而成，保留大量中古音、上古词。</p>
              </div>
            </div>

            <!-- 三、语音特点 -->
            <div class="border-l-4 border-primary pl-4">
              <h3 class="font-semibold text-ink mb-2">三、语音特点（核心）</h3>
              <div class="space-y-1 text-sm text-ink-subtle">
                <p><span class="text-ink font-medium">声母：</span>19个，含普通话无的v、z、ŋ；古全浊声母清化，平送仄不送。</p>
                <p><span class="text-ink font-medium">韵母：</span>40+，鼻化韵、入声韵丰富，保留古汉语韵尾。</p>
                <p><span class="text-ink font-medium">声调：</span>6个（五度标记）：阴平35、阳平24、上声33、阴去55、阳去21、入声213。</p>
                <p><span class="text-ink font-medium">特色：</span>有入声、连读变调复杂、文白异读多、"十里不同音"。</p>
              </div>
            </div>

            <!-- 四、九嶷文字 -->
            <div class="border-l-4 border-primary pl-4">
              <h3 class="font-semibold text-ink mb-2">四、九嶷文字</h3>
              <p class="text-sm text-ink-subtle leading-relaxed">
                由于宁远平话对应的汉字过于难正字，比如"yi ma me de"（意思是"吃饭没有"）正字是"食糜勿得"，过于困难。因此制作新文字——九嶷文——来代替汉字书写。
              </p>
              <div class="mt-3 bg-paper-50 border border-ink-faint p-3 text-sm">
                <p class="text-ink font-medium mb-1">九嶷文简介</p>
                <ul class="text-ink-subtle space-y-1">
                  <li>• 类型：人造新文字（全音素文字）</li>
                  <li>• 发明者：宁远本地人 钟旭东</li>
                  <li>• 用途：用九嶷文书写宁远平话，解决正字困难问题</li>
                  <li>• 特点：全音素文字，每个字符对应一个音素</li>
                </ul>
              </div>
            </div>

            <!-- 五、内部分区 -->
            <div class="border-l-4 border-primary pl-4">
              <h3 class="font-semibold text-ink mb-2">五、内部分区（4小片）</h3>
              <div class="grid grid-cols-2 gap-2 mt-2">
                <div class="bg-paper-50 p-2 text-sm">
                  <span class="text-primary font-medium">东路片</span>
                  <span class="text-ink-subtle">舜陵、天堂、冷水 — 县城主流，最易懂</span>
                </div>
                <div class="bg-paper-50 p-2 text-sm">
                  <span class="text-primary font-medium">北路片</span>
                  <span class="text-ink-subtle">清水桥、鲤溪、柏家坪 — 口音硬，古音重</span>
                </div>
                <div class="bg-paper-50 p-2 text-sm">
                  <span class="text-primary font-medium">西路片</span>
                  <span class="text-ink-subtle">中和 — 受桂北影响大</span>
                </div>
                <div class="bg-paper-50 p-2 text-sm">
                  <span class="text-primary font-medium">南路片</span>
                  <span class="text-ink-subtle">水市、湾井 — 接近蓝山土话</span>
                </div>
              </div>
            </div>

            <!-- 六、词汇特点 -->
            <div class="border-l-4 border-primary pl-4">
              <h3 class="font-semibold text-ink mb-2">五、词汇特点</h3>
              <div class="space-y-2 text-sm text-ink-subtle">
                <div>
                  <span class="text-ink font-medium">保留古语：</span>
                  <span>食（吃）、饮（喝）、行（走）、睇（看）、屋（房子）</span>
                </div>
                <div>
                  <span class="text-ink font-medium">特色词：</span>
                  <span>吃饭=蚁麻、爸爸/妈妈=爹爹/耶耶、叔叔=满满</span>
                </div>
                <div>
                  <span class="text-ink font-medium">亲属称谓：</span>
                  <span>自成体系，与瑶语、官话均不同</span>
                </div>
              </div>
            </div>

            <!-- 七、语法特点 -->
            <div class="border-l-4 border-primary pl-4">
              <h3 class="font-semibold text-ink mb-2">七、语法特点</h3>
              <div class="grid grid-cols-3 gap-2 mt-2">
                <div class="bg-paper-50 p-2 text-sm">
                  <span class="text-primary font-medium">语序</span>
                  <p class="text-ink-subtle">SOV倾向（如"饭吃了"）</p>
                </div>
                <div class="bg-paper-50 p-2 text-sm">
                  <span class="text-primary font-medium">量词</span>
                  <p class="text-ink-subtle">丰富，专用量词多</p>
                </div>
                <div class="bg-paper-50 p-2 text-sm">
                  <span class="text-primary font-medium">虚词</span>
                  <p class="text-ink-subtle">独特，如咯、哒、啵</p>
                </div>
              </div>
              <p class="text-sm text-ink-subtle mt-2">重叠：名词、动词、形容词重叠发达（如"包包、走走、红红"）</p>
            </div>

            <!-- 八、现状与传承 -->
            <div class="border-l-4 border-primary pl-4">
              <h3 class="font-semibold text-ink mb-2">八、现状与传承</h3>
              <div class="space-y-1 text-sm text-ink-subtle">
                <p><span class="text-ink font-medium">使用：</span>中老年人为主；年轻人听得懂、不会说，转用官话/普通话。</p>
                <p><span class="text-ink font-medium">濒危：</span>断代明显，仅家庭、集市、老人圈使用；无文字，靠口传。</p>
                <p><span class="text-ink font-medium">保护：</span>已出版《湖南宁远平话》（商务印书馆），记录语音、词汇、语法与民间文学。</p>
              </div>
            </div>

            <!-- 九、与宁远瑶语的区别 -->
            <div class="border-l-4 border-primary pl-4">
              <h3 class="font-semibold text-ink mb-2">九、与宁远瑶语的区别</h3>
              <div class="grid grid-cols-2 gap-3 mt-2">
                <div class="bg-primary/5 border border-primary/20 p-3 text-sm">
                  <div class="font-semibold text-primary mb-1">宁远平话</div>
                  <p class="text-ink-subtle">汉语方言，湘南土话，汉民族使用</p>
                </div>
                <div class="bg-primary/5 border border-primary/20 p-3 text-sm">
                  <div class="font-semibold text-primary mb-1">宁远瑶语</div>
                  <p class="text-ink-subtle">勉语（瑶语支），瑶族（过山瑶）使用，属苗瑶语族</p>
                </div>
              </div>
              <p class="text-sm text-ink-subtle mt-2">关系：长期共存、少量借词，完全不同语言。</p>
            </div>
          </div>
          </div>

          <!-- 词汇搜索与列表（仅平话） -->
          <div v-if="dialectType === 'pinghua'">
          <!-- 搜索 -->
          <div class="border border-ink-faint p-5 mb-6">
            <div class="relative max-w-md">
              <span class="absolute left-3 top-1/2 -translate-y-1/2 text-ink-subtle text-sm">搜索</span>
              <input
                v-model="dialectKeyword"
                type="text"
                placeholder="搜索方言词、普通话、拼音或英文..."
                class="w-full pl-10 pr-10 py-2.5 border border-ink-faint text-sm focus:outline-none focus:border-primary"
              />
              <button v-if="dialectKeyword" @click="dialectKeyword = ''"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-ink-subtle hover:text-ink text-xs">清除</button>
            </div>
            <div v-if="dialectKeyword" class="mt-3 flex items-center gap-3 text-xs text-ink-subtle">
              <span>找到 {{ filteredWords.length }} 条</span>
              <button @click="dialectKeyword = ''" class="text-primary hover:underline">清除筛选</button>
            </div>
          </div>

          <!-- 单词卡列表 -->
          <div v-if="filteredWords.length">
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              <div
                v-for="w in displayedWords"
                :key="w.iid || w.word"
                class="border border-ink-faint p-4 cursor-pointer transition-colors"
                :class="selectedWord?.iid === w.iid ? 'border-primary bg-primary/5' : 'hover:border-primary'"
                @click="selectedWord = selectedWord?.iid === w.iid ? null : w"
              >
                <div class="flex items-start justify-between mb-2">
                  <div class="flex-1 min-w-0">
                    <div class="text-base text-ink leading-tight truncate" style="font-family: 'NingyuanPinghua', 'Microsoft YaHei', sans-serif;">{{ w.word }}</div>
                    <div v-if="w.dialect" class="text-xs text-primary mt-0.5 truncate">{{ w.dialect }}</div>
                  </div>
                  <button
                    @click.stop="playAudio(w.iid)"
                    class="flex-shrink-0 ml-2 w-7 h-7 flex items-center justify-center rounded-full transition-colors"
                    :class="playingIid === w.iid ? 'bg-primary text-white' : 'bg-paper-50 text-ink-subtle hover:bg-primary hover:text-white'"
                  >
                    <svg v-if="playingIid !== w.iid" xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
                    </svg>
                    <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                    </svg>
                  </button>
                </div>
                <div class="flex items-center gap-2">
                  <span class="text-xs text-ink-subtle">{{ w.mandarin }}</span>
                  <span v-if="w.phonetic" class="text-xs text-ink-faint">/{{ w.phonetic }}/</span>
                </div>
                <div v-if="selectedWord?.iid === w.iid" class="mt-3 pt-3 border-t border-ink-faint space-y-1">
                  <p v-if="w.usage" class="text-xs text-ink-light">
                    <span class="text-ink-subtle">用法：</span>{{ w.usage }}
                  </p>
                  <p v-if="w.english" class="text-xs text-ink-subtle">
                    {{ w.english }}
                  </p>
                </div>
              </div>
            </div>

            <!-- 加载更多 -->
            <div v-if="displayedCount < filteredWords.length" class="text-center mt-8">
              <button @click="displayedCount += 30"
                class="px-6 py-2.5 border border-ink-faint text-ink-subtle text-sm hover:border-primary hover:text-primary transition-colors">
                加载更多 ({{ filteredWords.length - displayedCount }})
              </button>
            </div>
          </div>

          <!-- 无结果 -->
          <div v-else class="text-center py-16 text-ink-subtle">
            <p class="text-sm mb-3">未找到相关词汇</p>
            <button @click="dialectKeyword = ''" class="text-xs text-primary hover:underline">清除筛选</button>
          </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 民族 -->
    <section v-show="activeTab === 'ethnicity'" class="py-12 bg-paper">
      <div class="container-site">
        <div class="max-w-5xl mx-auto">
          <div class="text-center mb-8">
            <h2 class="text-2xl font-display font-bold text-ink mb-2">民族风情</h2>
            <p class="text-ink-subtle text-sm">汉瑶共居，多元文化交融</p>
          </div>

          <!-- 汉瑶切换 -->
          <div class="flex justify-center mb-10">
            <div class="inline-flex border border-ink-faint">
              <button @click="hanTab = 'han'"
                class="px-6 py-2.5 text-sm font-medium transition-colors"
                :class="hanTab === 'han' ? 'bg-primary text-white' : 'text-ink hover:bg-paper-50'">
                汉族
              </button>
              <button @click="hanTab = 'yao'"
                class="px-6 py-2.5 text-sm font-medium transition-colors"
                :class="hanTab === 'yao' ? 'bg-primary text-white' : 'text-ink hover:bg-paper-50'">
                瑶族
              </button>
            </div>
          </div>

          <!-- ===== 汉族 ===== -->
          <div v-if="hanTab === 'han'">
            <!-- 汉族概览 -->
            <div class="bg-primary text-white p-8 mb-8">
              <h3 class="font-display font-bold text-2xl mb-3">宁远汉族</h3>
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                <div class="bg-primary-600 rounded p-4">
                  <div class="text-primary-200 text-xs mb-1">总人口</div>
                  <div class="font-medium">约86–87万</div>
                </div>
                <div class="bg-primary-600 rounded p-4">
                  <div class="text-primary-200 text-xs mb-1">占比</div>
                  <div class="font-medium">约95%</div>
                </div>
                <div class="bg-primary-600 rounded p-4">
                  <div class="text-primary-200 text-xs mb-1">分布</div>
                  <div class="font-medium">遍布全县</div>
                </div>
              </div>
              <p class="text-primary-200 text-sm leading-relaxed mt-4">
                宁远汉族是秦汉至明清多次中原移民与古百越、楚地先民融合的结果，2200年建制史（秦设冷道、舂陵二县，宋定名宁远）。
                汉瑶呈"平原汉族、山区瑶族"格局，舜德文化与儒家文教是汉族文化的核心底色。
              </p>
            </div>

            <!-- 汉族文化六特点 -->
            <div class="mb-10">
              <h3 class="font-display font-bold text-xl text-ink mb-6">汉族文化特点</h3>
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div v-for="item in hanCulture" :key="item.title"
                     class="border border-ink-faint p-5 hover:border-primary transition-colors cursor-pointer"
                     @click="activeCulture = activeCulture === item.title ? null : item.title">
                  <h4 class="font-semibold text-ink mb-2 flex items-center justify-between">
                    <span>{{ item.title }}</span>
                    <svg class="w-4 h-4 text-ink-subtle transition-transform"
                         :class="{ 'rotate-180': activeCulture === item.title }"
                         fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </h4>
                  <p class="text-ink-subtle text-sm leading-relaxed">{{ item.brief }}</p>
                  <div v-if="activeCulture === item.title" class="mt-3 pt-3 border-t border-ink-faint text-xs text-ink-light leading-relaxed">
                    {{ item.detail }}
                  </div>
                </div>
              </div>
            </div>

            <!-- 姓氏宗族 -->
            <div class="border border-ink-faint p-6 mb-8">
              <h3 class="font-display font-bold text-lg text-ink mb-4">主要姓氏宗族</h3>
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                <div v-for="surname in hanSurnames" :key="surname.name"
                     class="bg-paper-50 p-4">
                  <div class="font-medium text-ink mb-1">{{ surname.name }}</div>
                  <div class="text-xs text-ink-subtle leading-relaxed">{{ surname.desc }}</div>
                </div>
              </div>
            </div>

            <!-- 历史名人 -->
            <div class="border border-ink-faint p-6 mb-8">
              <h3 class="font-display font-bold text-lg text-ink mb-4">历史名人</h3>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div v-for="famous in hanFamous" :key="famous.name"
                     class="flex items-start gap-3 p-3 hover:bg-paper-50 transition-colors">
                  <div class="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span class="text-primary font-bold text-sm">{{ famous.name[0] }}</span>
                  </div>
                  <div>
                    <div class="font-medium text-ink text-sm">{{ famous.name }}</div>
                    <div class="text-xs text-ink-subtle">{{ famous.title }} — {{ famous.desc }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- ===== 瑶族 ===== -->
          <div v-if="hanTab === 'yao'">
            <!-- 瑶族概览 -->
            <div class="bg-primary text-white p-8 mb-8">
              <h3 class="font-display font-bold text-2xl mb-3">宁远瑶族</h3>
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                <div class="bg-primary-600 rounded p-4">
                  <div class="text-primary-200 text-xs mb-1">民族支系</div>
                  <div class="font-medium">过山瑶（盘瑶）</div>
                </div>
                <div class="bg-primary-600 rounded p-4">
                  <div class="text-primary-200 text-xs mb-1">人口</div>
                  <div class="font-medium">约3.2万人</div>
                </div>
                <div class="bg-primary-600 rounded p-4">
                  <div class="text-primary-200 text-xs mb-1">主要分布</div>
                  <div class="font-medium">九嶷山、棉花坪、桐木漯、五龙山</div>
                </div>
              </div>
              <p class="text-primary-200 text-sm leading-relaxed mt-4">
                宁远瑶族属盘瑶，按居住地域划分属"过山瑶"，通称"盘瑶"。瑶族是山地民族，依山而居，说"棉"语，始祖为盘王。
                早在西汉时期，瑶族即入宁远九嶷山。明清时期，九嶷山、棉花坪、桐木漯、五龙山等山区已成宁远瑶族主要聚居地。
              </p>
            </div>

            <!-- 瑶族文化十二特点 -->
            <div class="mb-10">
              <h3 class="font-display font-bold text-xl text-ink mb-6">瑶族文化特点</h3>
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div v-for="item in yaoCulture" :key="item.title"
                     class="border border-ink-faint p-5 hover:border-primary transition-colors cursor-pointer"
                     @click="activeCulture = activeCulture === item.title ? null : item.title">
                  <h4 class="font-semibold text-ink mb-2 flex items-center justify-between">
                    <span>{{ item.title }}</span>
                    <svg class="w-4 h-4 text-ink-subtle transition-transform"
                         :class="{ 'rotate-180': activeCulture === item.title }"
                         fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </h4>
                  <p class="text-ink-subtle text-sm leading-relaxed">{{ item.brief }}</p>
                  <div v-if="activeCulture === item.title" class="mt-3 pt-3 border-t border-ink-faint text-xs text-ink-light leading-relaxed">
                    {{ item.detail }}
                  </div>
                </div>
              </div>
            </div>

            <!-- 瑶族文化传承 -->
            <div class="border border-ink-faint p-6 mb-8">
              <h3 class="font-display font-bold text-lg text-ink mb-4">瑶族文化传承与保护</h3>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div v-for="item in yaoHeritage" :key="item.title" class="bg-paper-50 p-4">
                  <div class="font-medium text-ink mb-1">{{ item.title }}</div>
                  <div class="text-ink-subtle text-xs leading-relaxed">{{ item.desc }}</div>
                </div>
              </div>
            </div>
          </div>

          <!-- 民族构成 -->
          <div class="border border-ink-faint p-6">
            <h3 class="font-semibold text-ink mb-6">宁远民族构成</h3>
            <div class="space-y-3">
              <div v-for="group in ethnicGroups" :key="group.name" class="flex items-center gap-4">
                <span class="w-20 text-sm text-ink flex-shrink-0">{{ group.name }}</span>
                <div class="flex-1 bg-ink-faint rounded-full h-2 overflow-hidden">
                  <div class="h-full rounded-full transition-all duration-700"
                       :class="group.color || 'bg-primary'"
                       :style="{ width: group.pct + '%' }"></div>
                </div>
                <span class="text-sm text-ink-subtle w-12 text-right">{{ group.pct }}%</span>
              </div>
            </div>
            <p class="text-xs text-ink-subtle mt-3">全县总人口约86–87万，汉族约82万，瑶族等少数民族约4–5万（主要集中在九嶷山、棉花坪、桐木漯、五龙山4个民族乡）。</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 戏剧 -->
    <section v-show="activeTab === 'opera'" class="py-12 bg-paper">
      <div class="container-site">
        <div class="max-w-4xl mx-auto">

          <!-- 页头 -->
          <div class="text-center mb-10">
            <h2 class="text-2xl font-display font-bold text-ink mb-2">宁远戏剧</h2>
            <p class="text-ink-subtle text-sm">以花灯戏（市级非遗）和祁剧（县级非遗）为两大主干，扎根湘南乡土</p>
          </div>

          <!-- 花灯戏 -->
          <div class="mb-8">
            <!-- 标题栏 -->
            <div class="flex items-center gap-3 mb-4">
              <div class="w-1 h-7 bg-primary rounded"></div>
              <h3 class="font-display font-bold text-lg text-ink">宁远花灯戏</h3>
              <span class="text-xs text-primary border border-primary px-2 py-0.5 rounded">永州市级非遗</span>
            </div>

            <!-- 视频为主：全宽大视频 + 下方信息 -->
            <div class="bg-white border border-ink-faint overflow-hidden">
              <!-- 视频区 -->
              <div class="relative">
                <video
                  :src="huadengxiVideo"
                  controls
                  class="w-full aspect-video object-cover"
                />
              </div>

              <!-- 下方信息 -->
              <div class="p-5">
                <div class="flex flex-wrap gap-x-6 gap-y-1 mb-3 text-xs">
                  <span class="text-ink-subtle"><span class="font-medium text-ink">别称</span> 彩调、对子调、地花鼓</span>
                  <span class="text-ink-subtle"><span class="font-medium text-ink">历史</span> 明末由衡阳传入，约500年</span>
                  <span class="text-ink-subtle"><span class="font-medium text-ink">非遗</span> 2014年永州市第三批非遗</span>
                </div>
                <p class="text-ink-light text-sm leading-relaxed mb-3">
                  花灯戏与昆曲、湘剧、花鼓戏、祁剧并列为湘南五个剧种，初为唱民歌，后演变成为唱做结合载歌载舞的戏曲艺术形式。清代和民国非常盛行，是宁远汉族最原生剧种，剧目反映下层劳动人民生活，唱词质朴自然，是真正的乡村自然文化。
                </p>
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs mb-3">
                  <div><span class="text-primary font-medium">●</span> <span class="text-ink">表演</span>：吸取民间舞蹈、武术、说唱艺术，载歌载舞</div>
                  <div><span class="text-primary font-medium">●</span> <span class="text-ink">唱腔</span>：灯调民歌，五声音阶，用宁远平话演唱</div>
                  <div><span class="text-primary font-medium">●</span> <span class="text-ink">角色</span>："二小""三小"为主，小丑、花旦最出彩</div>
                </div>
                <div>
                  <div class="text-xs text-ink-subtle mb-2">经典剧目</div>
                  <div class="flex flex-wrap gap-1.5">
                    <span v-for="t in ['《赶子牧羊》','《泥蟆拐取乐》','《打鸟》','《观花偷桃》','《萝卜菜上寿》']" :key="t"
                          class="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded">{{ t }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 祁剧 -->
          <div class="mb-8">
            <div class="flex items-center gap-3 mb-4">
              <div class="w-1 h-7 bg-primary rounded"></div>
              <h3 class="font-display font-bold text-lg text-ink">宁远祁剧</h3>
              <span class="text-xs text-ink-subtle border border-ink-subtle px-2 py-0.5 rounded">宁远县级非遗</span>
            </div>

            <div class="bg-white border border-ink-faint p-5">
              <div class="flex flex-wrap gap-x-6 gap-y-1 mb-3 text-xs">
                <span class="text-ink-subtle"><span class="font-medium text-ink">别称</span> 祁阳班子、楚南戏</span>
                <span class="text-ink-subtle"><span class="font-medium text-ink">历史</span> 明代中叶源于祁阳，清代传入宁远</span>
              </div>
              <p class="text-ink-light text-sm leading-relaxed mb-3">
                湖南历史最久、流布最广剧种，清代传入宁远后成为官方与庙会主流大戏。2023年列入宁远县级非遗，县文化馆设祁剧传承班，传承人蒋雪亮等定期授艺。
              </p>
              <div class="space-y-1 text-xs text-ink-light mb-3">
                <span class="mr-3"><span class="text-primary">●</span> 唱腔：高腔（高亢激昂）、弹腔（南北路）、昆腔（典雅），真假声结合</span>
                <span class="mr-3"><span class="text-primary">●</span> 表演：生旦净末丑行当齐全，程式严谨，武功扎实，袍带戏见长</span>
                <span><span class="text-primary">●</span> 语言：官话为主，杂以永州方言，字正腔圆</span>
              </div>
              <div>
                <div class="text-xs text-ink-subtle mb-2">经典剧目</div>
                <div class="flex flex-wrap gap-1.5">
                  <span v-for="t in ['《打金枝》','《穆桂英大破天门阵》','《金锁奇缘》','《草桥关》','《黄鹤楼》']" :key="t"
                        class="text-xs px-2 py-0.5 bg-ink/5 text-ink rounded">{{ t }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- 其他小戏 -->
          <div class="mb-8">
            <div class="flex items-center gap-3 mb-4">
              <div class="w-1 h-7 bg-primary rounded"></div>
              <h3 class="font-display font-bold text-lg text-ink">其他地方小戏</h3>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div class="bg-white border border-ink-faint p-4">
                <div class="text-sm font-medium text-ink mb-1">零陵花鼓戏</div>
                <p class="text-xs text-ink-light leading-relaxed mb-2">流行于宁远北部、东部，清末由地花鼓、车马灯演变而来，以扇花、矮步为基本功。</p>
                <div class="text-xs text-ink-subtle">《打零陵婆》《唐雄飞坐监》</div>
              </div>
              <div class="bg-white border border-ink-faint p-4">
                <div class="text-sm font-medium text-ink mb-1">宁远瑶戏（过山瑶）</div>
                <p class="text-xs text-ink-light leading-relaxed mb-2">瑶族口头戏剧，唱瑶语，跳长鼓舞，演盘王故事，无文字剧本。</p>
                <div class="text-xs text-ink-subtle">《盘王大歌》《瑶家坐歌堂》</div>
              </div>
              <div class="bg-white border border-ink-faint p-4">
                <div class="text-sm font-medium text-ink mb-1">现代小戏</div>
                <p class="text-xs text-ink-light leading-relaxed mb-2">新中国后创作，祁剧/花灯戏+现代题材，反映当代生活。</p>
                <div class="text-xs text-ink-subtle">《扶贫队员》《六大嫂学宪法》</div>
              </div>
            </div>
          </div>

          <!-- 传承与现状 -->
          <div class="bg-white border border-ink-faint p-5">
            <div class="flex items-center gap-2 mb-4">
              <span class="text-primary">●</span>
              <h3 class="font-display font-bold text-ink">传承与现状</h3>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div class="flex gap-3 text-sm">
                <span class="text-primary font-medium shrink-0 w-16">核心阵地</span>
                <span class="text-ink-light text-xs">文庙古街戏台、下灌村戏台、县文化馆剧场，周末/节庆常态化演出</span>
              </div>
              <div class="flex gap-3 text-sm">
                <span class="text-primary font-medium shrink-0 w-16">传承困境</span>
                <span class="text-ink-light text-xs">老龄化严重、年轻观众流失，花灯戏尤甚</span>
              </div>
              <div class="flex gap-3 text-sm">
                <span class="text-primary font-medium shrink-0 w-16">保护措施</span>
                <span class="text-ink-light text-xs">非遗申报、文化馆免费培训、进校园进乡村</span>
              </div>
              <div class="flex gap-3 text-sm">
                <span class="text-primary font-medium shrink-0 w-16">文旅融合</span>
                <span class="text-ink-light text-xs">古街戏台"赶闹子"，戏曲+市集激活人气</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- 服装 -->
    <section v-show="activeTab === 'clothing'" class="py-12 bg-paper">
      <div class="container-site">
        <div class="max-w-4xl mx-auto">
          <div class="text-center mb-12">
            <h2 class="text-2xl font-display font-bold text-ink mb-2">传统服饰</h2>
            <p class="text-ink-subtle text-sm">瑶族服饰精雕细琢，承载千年文化符号</p>
          </div>

          <div class="mb-12">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <div>
                <img
                  src="https://images.unsplash.com/photo-1518623381003-17a5a0a89e84?w=600&q=80"
                  alt="瑶族服饰"
                  class="w-full aspect-[4/3] object-cover"
                />
              </div>
              <div class="flex flex-col justify-center">
                <h3 class="font-display font-bold text-xl text-ink mb-4">瑶族传统服饰</h3>
                <p class="text-ink-light text-sm leading-relaxed mb-4">
                  宁远瑶族服饰是国家级非物质文化遗产，以精细的刺绣、独特的图案和鲜艳的色彩著称。
                  瑶族女性服饰尤为精美，头帕、上衣、绑腿均绣有繁复的几何纹样，承载着瑶族的历史与信仰。
                </p>
                <div class="flex flex-wrap gap-2">
                  <span v-for="tag in yaoClothingTags" :key="tag"
                        class="px-3 py-1 border border-primary text-primary text-xs">
                    {{ tag }}
                  </span>
                </div>
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <div v-for="feature in clothingFeatures" :key="feature.title"
                   class="text-center border border-ink-faint p-4 hover:border-primary transition-colors">
                <h4 class="font-medium text-ink text-sm mb-1">{{ feature.title }}</h4>
                <p class="text-ink-subtle text-xs">{{ feature.desc }}</p>
              </div>
            </div>
          </div>

          <div class="divider-line my-12"></div>

          <div>
            <h3 class="text-lg font-semibold text-ink mb-6">汉族传统服饰</h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div class="border border-ink-faint p-5">
                <h4 class="font-medium text-ink mb-2">明清民国时期</h4>
                <p class="text-ink-light text-sm leading-relaxed">
                  宁远汉族传统服饰以蓝布、青布为主，男女均着大襟衫。清代男性剃发留辫，着长袍马褂；
                  民国后改易西服、中山装，民间仍以传统便装为主。
                </p>
              </div>
              <div class="border border-ink-faint p-5">
                <h4 class="font-medium text-ink mb-2">节日盛装</h4>
                <p class="text-ink-light text-sm leading-relaxed">
                  婚嫁、祭祀等重要场合，汉族男子着大襟长衫、戴礼帽，女子着绣花衣裙、戴银饰。
                  舜帝陵祭典中，执事人员着传统礼服，庄严肃穆。
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 红白 -->
    <section v-show="activeTab === 'rituals'" class="py-12 bg-paper">
      <div class="container-site">
        <div class="max-w-4xl mx-auto">
          <div class="text-center mb-12">
            <h2 class="text-2xl font-display font-bold text-ink mb-2">红白喜事</h2>
            <p class="text-ink-subtle text-sm">婚丧嫁娶，礼俗相沿，承载人情与文化记忆</p>
          </div>

          <!-- 红事 -->
          <div class="mb-12">
            <div class="flex items-center gap-3 mb-6">
              <div class="w-10 h-10 border border-primary rounded-full flex items-center justify-center">
                <span class="text-primary text-sm">婚</span>
              </div>
              <h3 class="font-display font-bold text-xl text-ink">婚嫁习俗</h3>
            </div>
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h4 class="text-sm font-semibold text-ink mb-3 uppercase tracking-wider">传统婚俗流程</h4>
                <div class="space-y-3">
                  <div v-for="(step, idx) in weddingSteps" :key="step.name"
                       class="flex items-start gap-4 p-3 border border-ink-faint">
                    <span class="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">{{ idx + 1 }}</span>
                    <div>
                      <div class="font-medium text-ink text-sm">{{ step.name }}</div>
                      <div class="text-xs text-ink-subtle mt-0.5">{{ step.desc }}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="border border-ink-faint p-6">
                <h4 class="text-sm font-semibold text-ink mb-4">婚俗特点</h4>
                <ul class="space-y-3">
                  <li v-for="point in weddingFeatures" :key="point" class="flex items-start gap-3 text-sm text-ink-light">
                    <span class="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 flex-shrink-0"></span>
                    {{ point }}
                  </li>
                </ul>
                <div class="mt-6 pt-4 border-t border-ink-faint">
                  <div class="text-xs text-ink-subtle">瑶族婚俗更具特色：</div>
                  <p class="text-xs text-ink-light mt-1">瑶族传统婚姻保留"上门"（入赘）习俗，新郎步行迎亲，不坐轿不鸣炮，仪式简朴而庄重。</p>
                </div>
              </div>
            </div>
          </div>

          <div class="divider-line my-12"></div>

          <!-- 白事 -->
          <div>
            <div class="flex items-center gap-3 mb-6">
              <div class="w-10 h-10 bg-ink rounded-full flex items-center justify-center">
                <span class="text-white text-sm">丧</span>
              </div>
              <h3 class="font-display font-bold text-xl text-ink">丧葬习俗</h3>
            </div>
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h4 class="text-sm font-semibold text-ink mb-3 uppercase tracking-wider">传统丧礼流程</h4>
                <div class="space-y-3">
                  <div v-for="(step, idx) in funeralSteps" :key="step.name"
                       class="flex items-start gap-4 p-3 bg-paper-50 border border-ink-faint">
                    <span class="w-6 h-6 bg-ink text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">{{ idx + 1 }}</span>
                    <div>
                      <div class="font-medium text-ink text-sm">{{ step.name }}</div>
                      <div class="text-xs text-ink-subtle mt-0.5">{{ step.desc }}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="bg-paper-50 border border-ink-faint p-6">
                <h4 class="text-sm font-semibold text-ink mb-4">丧葬特点</h4>
                <ul class="space-y-3">
                  <li v-for="point in funeralFeatures" :key="point" class="flex items-start gap-3 text-sm text-ink-light">
                    <span class="w-1.5 h-1.5 bg-ink rounded-full mt-1.5 flex-shrink-0"></span>
                    {{ point }}
                  </li>
                </ul>
                <div class="mt-6 pt-4 border-t border-ink-faint">
                  <div class="text-xs text-ink-subtle">瑶族丧俗更独特：</div>
                  <p class="text-xs text-ink-light mt-1">瑶族行土葬，葬礼中唱诵《盘王大歌》，设歌堂对歌三日，送葬队伍浩荡，"还盘王愿"祭祀仪式庄严神秘。</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.scrollbar-hide::-webkit-scrollbar { display: none; }
.scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
</style>

<script setup>
import { ref, computed, watch } from 'vue'
import { allDialectWords } from '@/data/dialectWords.js'
import huadengxiVideo from '@/video/huadengxi.MP4'

const activeTab = ref('history')

// ===== 方言类型 =====
const dialectType = ref('pinghua')
const dialectTypeLabels = {
  pinghua: '宁远平话（"打土谈"）',
  guanhua: '宁远官话（西南官话湘南片）',
  yaoyu: '宁远瑶语（勉语 / 过山瑶）',
  qita: '其他土话'
}

// ===== 方言介绍收起/展开 =====
const introExpanded = ref(false)
const activeCulture = ref(null)
const hanTab = ref('han')

// ===== 汉族 =====
const hanCulture = [
  {
    title: '历史源流',
    brief: '中原南迁 + 本土融合，2200年建制史。',
    detail: '宁远汉族是秦汉至明清多次中原移民与古百越、楚地先民融合的结果。先秦至秦汉：中原华夏入湘南，设县管理，舜帝南巡葬九嶷奠定"德孝文化"根基。魏晋南北朝：北方战乱，陇西李氏（李道辨）等士族南迁，定居下灌、湾井，成为宁远最早大族之一。唐宋：江西、福建移民大量迁入，李、欧阳、石、柏四大宗族成型；唐代出湖广第一状元李郃（下灌），宋代出特科状元乐雷发，文风鼎盛。明清："江西填湖广"，赣语族群迁入，与本地土话融合；湘军兴起，石家洞石氏、平田欧阳氏成为湘军重要力量。'
  },
  {
    title: '方言体系',
    brief: '官话为通用语，平话为传统母语（濒危）。',
    detail: '汉族语言分两大体系：宁远官话（西南官话湘南片）：县城、官方、学校通用，接近永州话，全县汉族互通。宁远平话（湘南土话，濒危）：汉族传统母语，分东、南、西、北四路，互不通畅——北路平话（柏家坪、清水桥）：代表点平田村（欧阳氏聚居）；东路平话（舜陵、天堂、冷水）；西路平话（中和镇）：与赣语相似度高；南路平话（水市、湾井）。另有小众土话：冷水张胡贺土话、太平王骆单土话、下坠土话等，仅村落内使用。'
  },
  {
    title: '姓氏宗族',
    brief: '四大姓主导，唐宋南迁后裔，聚族而居。',
    detail: '宁远汉族宗族意识极强，大姓多为唐宋南迁后裔，聚族而居、单姓村普遍。李姓（第一大姓，约9万人）：下灌、李仕湾为主；始祖李道辨（南齐）、李千护（后唐）。欧阳姓（北路第一大族）：平田村（清水桥）为主；清代湘军主力，民国军官辈出。石姓（石家洞）：湘军发祥地；名人：石焕章（湘军疑勇营统领）、石树勋（国民党将领）。柏姓（柏家坪）：北大门望族；名人：革命烈士柏忍。其他大姓：王、张、刘、陈、杨等。'
  },
  {
    title: '舜德文化',
    brief: '九嶷山舜帝陵为"中华第一古陵"，舜帝祭典为国家非遗。',
    detail: '舜帝陵是宁远汉族文化的精神核心，舜帝"德孝"思想深刻影响宁远民间。汉族以"德孝"为核心价值观，祭祖、敬老传统浓厚。九疑山舜帝陵为"中华第一古陵"，舜帝祭典（秋季公祭）为国家非物质文化遗产，全县汉族人共同参与。'
  },
  {
    title: '文教传统',
    brief: '宁远文庙为全国第二大孔庙，历史出2状元、84进士。',
    detail: '宁远文庙为全国第二大孔庙（国保），是中南区最早、最大的文庙，历史出2名状元、84名进士，湖广各县之首。民间重读书、重功名，尊师重教风气浓厚。李郃为唐代湖广第一状元，乐雷发为宋代特科状元，至今仍为宁远人津津乐道。'
  },
  {
    title: '民俗生活',
    brief: '节庆、饮食、建筑多元一体，汉瑶交融。',
    detail: '节庆：春节（祭祖、舞龙舞狮）、清明（族墓祭扫）、端午、中秋、舜帝祭典（秋季公祭）。饮食：宁远血鸭、酿豆腐、状元水丸子、米粉、糍粑为汉族特色，重酸辣、香鲜。建筑：传统青砖黛瓦、马头墙、宗族祠堂（如李氏宗祠、欧阳氏宗祠），聚族而居、祠宇林立。性格：重宗族、讲礼数、勤劳务实、崇文尚武，受舜德影响，民风淳朴、重德孝。非遗文化：九疑派古琴（杨宗稷）、高源土陶（宋代）、宁远花灯戏、竹编、木雕；汉瑶共融：酿豆腐、血鸭、米粉、糍粑、龙狮舞。'
  },
]

const hanSurnames = [
  { name: '李姓', desc: '第一大姓，约9万人，主居下灌、李仕湾；始祖李道辨（南齐）、李千护（后唐）；名人：唐状元李郃、民国中将李韫珩。' },
  { name: '欧阳姓', desc: '北路第一大族，主居平田村（清水桥）；清代湘军主力，民国军官辈出，与曾国藩湘军渊源深厚。' },
  { name: '石姓', desc: '石家洞，湘军发祥地；名人：石焕章（湘军疑勇营统领）、石树勋（国民党将领）。' },
  { name: '柏姓', desc: '柏家坪，北大门望族；名人：革命烈士柏忍。' },
  { name: '王姓', desc: '分布广泛，大姓之一，部分聚居于太平镇，与王骆单土话分布相关。' },
  { name: '张姓', desc: '分布广泛，主居张家及冷水镇部分村，与张胡贺土话分布相关。' },
  { name: '刘姓', desc: '分布广泛，宁远重要姓氏之一。' },
  { name: '陈姓', desc: '分布广泛，县城及各乡镇均有分布。' },
  { name: '杨姓', desc: '九疑派古琴传承家族（杨宗稷）所在，民国时期文化望族。' },
]

const hanFamous = [
  { name: '李郃', title: '唐·湖广第一状元', desc: '字子玄，下灌人，大和二年进士第一，官至贺州刺史，居室匾"居取其地"。' },
  { name: '乐雷发', title: '宋·特科状元', desc: '南宋特科状元，宁远人，工诗，其遗诗收入《雪砖丛稿》。' },
  { name: '李韫珩', title: '民国·中将', desc: '宁远人，国民党中将，曾任军职。' },
  { name: '石焕章', title: '清·湘军统领', desc: '石家洞人，湘军疑勇营统领，随曾国藩征战。' },
  { name: '石树勋', title: '民国·将领', desc: '石家洞人，国民党将领。' },
  { name: '柏忍', title: '革命烈士', desc: '柏家坪人，为革命事业英勇牺牲。' },
  { name: '杨宗稷', title: '民国·古琴大家', desc: '九疑派古琴创始人，著《琴学丛书》，为中国古琴艺术作出重要贡献。' },
]

// 当前类型对应的词汇（目前仅平话有词汇数据）
const currentDialectWords = computed(() => {
  if (dialectType.value === 'pinghua') return allDialectWords
  return []
})

// 是否显示详细章节（仅平话）
const showDetailedSections = computed(() => dialectType.value === 'pinghua')

// ===== 方言 =====
const dialectKeyword = ref('')
const selectedWord = ref(null)
const displayedCount = ref(30)

const filteredWords = computed(() => {
  const kw = dialectKeyword.value.trim().toLowerCase()
  if (!kw) return allDialectWords
  return allDialectWords.filter(w =>
    (w.word && w.word.toLowerCase().includes(kw)) ||
    (w.dialect && w.dialect.toLowerCase().includes(kw)) ||
    (w.mandarin && w.mandarin.toLowerCase().includes(kw)) ||
    (w.english && w.english.toLowerCase().includes(kw)) ||
    (w.phonetic && w.phonetic.toLowerCase().includes(kw))
  )
})
const displayedWords = computed(() => filteredWords.value.slice(0, displayedCount.value))

watch(dialectKeyword, () => { displayedCount.value = 30 })

// 音频基础URL
const AUDIO_BASE_URL = 'https://mp-5f8886e4-4529-4ac6-8f2e-10ea93c64b69.cdn.bspapp.com/嶷文-宁远平话/宁远平话音频/'

const currentAudio = ref(null)
const playingIid = ref(null)

function playAudio(iid) {
  if (currentAudio.value) {
    currentAudio.value.pause()
    currentAudio.value = null
  }
  if (playingIid.value === iid) {
    playingIid.value = null
    return
  }
  const src = AUDIO_BASE_URL + 'ch' + iid + '.mp3'
  const audio = new Audio(src)
  audio.play().catch(() => {})
  currentAudio.value = audio
  playingIid.value = iid
  audio.onended = () => {
    playingIid.value = null
    currentAudio.value = null
  }
}

const navTabs = [
  { id: 'history', label: '历史' },
  { id: 'dialect', label: '方言' },
  { id: 'ethnicity', label: '民族' },
  { id: 'opera', label: '戏剧' },
  { id: 'clothing', label: '服装' },
  { id: 'rituals', label: '红白' },
]

// ===== 历史 =====
const historyTimeline = [
  // ---- 史前 ----
  { year: '旧石器', title: '华南古人类活动区', desc: '道县福岩洞发现8—12万年前晚期智人化石；九嶷山、泠江流域有3—5万年古人类活动，打制石器、采集狩猎。' },
  { year: '新石器', title: '南岭稻作文明节点', desc: '1.2万年前道县玉蟾岩出土世界最早栽培稻；7000—5000年前泠江、舂陵江两岸形成聚落，属大溪—屈家岭—石家河文化过渡区。' },
  // ---- 上古 ----
  { year: '约前3000', title: '苍梧古国', desc: '北至湘南、南抵桂东粤西，九嶷山为北部核心，仓吾族所建，《山海经》《史记》载"苍梧之野"。' },
  { year: '约前500—前391', title: '苍梧越（百越一支）', desc: '楚入岭南后，百越族系的苍梧越人在宁远九嶷山一带繁衍生息，留有几何纹米字陶片、段石棒等遗存；青铜文化遗物丰富，是岭南越文化的典型分布区。' },
  { year: '约前2200', title: '舜葬九嶷', desc: '《史记》载舜"南巡狩，崩于苍梧之野，葬于江南九疑"。九嶷山商周至汉祭祀遗迹、碑刻证实祭祀传统延续两千余年。' },
  { year: '前391年', title: '楚灭苍梧、设苍梧郡', desc: '楚将吴起南平百越，灭苍梧古国北部，宁远入楚，设苍梧郡・九疑邑。' },
  { year: '前219年', title: '秦置九疑县', desc: '秦废苍梧郡，置九疑县（治今蓝山），宁远首次纳入中央王朝郡县体系，《汉书・地理志》记载。' },
  // ---- 中古 ----
  { year: '前111年', title: '西汉：泠道・营道・舂陵侯国', desc: '汉武帝置零陵郡，析九疑县设泠道县、营道县；前45年封刘买为舂陵节侯（治柏家坪），宁远为舂陵刘氏开基祖地。' },
  { year: '8年', title: '新莽改制', desc: '改泠道为泠陵、营道为九疑亭、舂陵为舂陵县，属九疑郡。' },
  { year: '25年', title: '东汉：舜陵祭祀升级', desc: '恢复旧名，舂陵并入泠道。刘秀称帝后尊刘买为皇高祖，宁远舂陵为东汉皇族祖源，舜帝陵祭祀规格提升。' },
  { year: '265年', title: '三国吴：设营阳郡', desc: '263年析泠道置舂阳县；265年置营阳郡（治营道），宁远首次成为郡治所在地。' },
  { year: '265—589', title: '晋—南北朝', desc: '西晋舂阳改舂陵；东晋营阳郡迁治泠道；南北朝三县建制稳定，属湘州。' },
  { year: '589年', title: '隋：泠道・舂陵并入营道', desc: '废营阳郡，泠道、舂陵并入营道县（治冷水），属永州。三县合一。' },
  { year: '621—705年', title: '唐：定名延唐', desc: '621年营道改唐兴县；690年改武盛县；705年定名延唐县，属道州。808年李郃（湖广首位状元）、乐雷发（特科状元）出生宁远。' },
  { year: '964年', title: '北宋：定名宁远', desc: '乾德二年延唐县改名宁远县，寓意"绥靖南疆、远方安宁"，沿用至今，属荆湖南路道州。' },
  { year: '1127—1368', title: '南宋—元', desc: '南宋属道州，乐雷发上书抗金；元属湖广行省道州路，汉瑶杂居，建制稳定。' },
  // ---- 明清 ----
  { year: '1639年', title: '明：析置新田县', desc: '析东北部置新田县，宁远县域定型。瑶民起义频发，设卫所镇压。属永州府道州。' },
  { year: '1644—1912', title: '清：改土归流・祭祀复兴', desc: '属湖南省衡永郴桂道永州府。推行改土归流，汉瑶融合。重修舜帝陵、文庙，祭祀制度化。' },
  // ---- 近代 ----
  { year: '1927—1931', title: '民国：阳明县', desc: '1927年析宁远、祁阳、新田、桂阳边境置阳明县（治柏家坪）；1931年撤销，归还原县。' },
  { year: '1944年', title: '抗战沦陷', desc: '日军侵占宁远，县政府迁九嶷山。' },
  { year: '1949.11.17', title: '和平解放', desc: '宁远和平解放，属永州专区。' },
  // ---- 现代 ----
  { year: '1952—1995', title: '新中国建制沿革', desc: '1952年属湘南行政区；1954年属零陵专区；1995年零陵撤地设市，宁远属永州市。' },
  { year: '2004年', title: '恢复舜帝陵公祭', desc: '恢复舜帝陵公祭大典，祭祀文化复兴。' },
  { year: '2020年后', title: '交通腾飞・文旅崛起', desc: '二广、厦蓉高速通车；广清永高铁宁远站在建，预计2030年通车，宁远迈入高铁时代。' },
]

const historyEras = [
  {
    name: '史前',
    color: '#8B5CF6',
    events: [
      { year: '旧石器时代', title: '华南古人类活动区', desc: '道县福岩洞发现8—12万年前晚期智人化石；九嶷山、泠江流域有3—5万年古人类活动，打制石器、采集狩猎。' },
      { year: '新石器时代', title: '南岭稻作文明节点', desc: '1.2万年前道县玉蟾岩出土世界最早栽培稻；7000—5000年前泠江、舂陵江两岸形成聚落，属大溪—屈家岭—石家河文化过渡区。' },
    ]
  },
  {
    name: '上古先秦',
    color: '#F59E0B',
    events: [
      { year: '约前3000', title: '苍梧古国', desc: '北至湘南、南抵桂东粤西，九嶷山为北部核心，仓吾族所建，《山海经》《史记》载"苍梧之野"。' },
      { year: '约前500—前391', title: '苍梧越（百越一支）', desc: '楚入岭南后，百越族系的苍梧越人在宁远九嶷山繁衍生息，留有几何纹米字陶片、段石棒等遗存；青铜文化遗物丰富，是岭南越文化的典型分布区。' },
      { year: '约前2200', title: '舜葬九嶷', desc: '《史记》载舜"南巡狩，崩于苍梧之野，葬于江南九疑"。九嶷山商周至汉祭祀遗迹、碑刻证实祭祀传统延续两千余年。' },
      { year: '前391年', title: '楚灭苍梧、设苍梧郡', desc: '楚将吴起南平百越，灭苍梧古国北部，宁远入楚，设苍梧郡・九疑邑。' },
      { year: '前219年', title: '秦置九疑县', desc: '秦废苍梧郡，置九疑县（治今蓝山），宁远首次纳入中央王朝郡县体系。' },
    ]
  },
  {
    name: '秦汉魏晋',
    color: '#10B981',
    events: [
      { year: '前111年', title: '西汉：泠道・营道・舂陵侯国', desc: '汉武帝置零陵郡，析九疑县设泠道县、营道县；前45年封刘买为舂陵节侯（治柏家坪），宁远为舂陵刘氏开基祖地。' },
      { year: '8年', title: '新莽改制', desc: '改泠道为泠陵、营道为九疑亭、舂陵为舂陵县，属九疑郡。' },
      { year: '25年', title: '东汉：舜陵祭祀升级', desc: '恢复旧名。刘秀称帝后尊刘买为皇高祖，宁远舂陵为东汉皇族祖源，舜帝陵祭祀规格提升。' },
      { year: '265年', title: '三国吴：设营阳郡', desc: '263年析泠道置舂阳县；265年置营阳郡（治营道），宁远首次成为郡治所在地。' },
      { year: '265—589年', title: '晋—南北朝', desc: '西晋舂阳改舂陵；东晋营阳郡迁治泠道；南北朝三县建制稳定，属湘州。' },
      { year: '589年', title: '隋：并入营道', desc: '废营阳郡，泠道、舂陵并入营道县（治冷水），属永州，三县合一。' },
    ]
  },
  {
    name: '唐宋元明',
    color: '#EF4444',
    events: [
      { year: '621—705年', title: '唐：定名延唐', desc: '621年营道改唐兴县；690年改武盛县；705年定名延唐县，属道州。808年李郃（湖广首位状元）、乐雷发（特科状元）出生宁远。' },
      { year: '964年', title: '北宋：定名宁远', desc: '乾德二年延唐县改名宁远县，寓意"绥靖南疆、远方安宁"，沿用至今，属荆湖南路道州。' },
      { year: '1127—1368年', title: '南宋—元', desc: '南宋属道州，乐雷发上书抗金；元属湖广行省道州路，汉瑶杂居，建制稳定。' },
      { year: '1639年', title: '明：析置新田县', desc: '析东北部置新田县，宁远县域定型。瑶民起义频发，设卫所镇压。属永州府道州。' },
      { year: '1644—1912年', title: '清：改土归流・祭祀复兴', desc: '属湖南省衡永郴桂道永州府。推行改土归流，汉瑶融合。重修舜帝陵、文庙，祭祀制度化。' },
    ]
  },
  {
    name: '近代当代',
    color: '#3B82F6',
    events: [
      { year: '1927—1931年', title: '民国：阳明县', desc: '1927年析宁远、祁阳、新田、桂阳边境置阳明县（治柏家坪）；1931年撤销，归还原县。' },
      { year: '1944年', title: '抗战沦陷', desc: '日军侵占宁远，县政府迁九嶷山。' },
      { year: '1949.11.17', title: '和平解放', desc: '宁远和平解放，属永州专区。' },
      { year: '1952—1995年', title: '新中国建制沿革', desc: '1952年属湘南行政区；1954年属零陵专区；1995年零陵撤地设市，宁远属永州市。' },
      { year: '2004年', title: '恢复舜帝陵公祭', desc: '恢复舜帝陵公祭大典，祭祀文化复兴。' },
      { year: '2020年后', title: '交通腾飞・文旅崛起', desc: '二广、厦蓉高速通车；广清永高铁宁远站在建，预计2030年通车，宁远迈入高铁时代。' },
    ]
  },
]

const historyFigures = [
  {
    name: '舜帝', dynasty: '约前2200年',
    img: 'shundi.png',
    tag: '人文始祖',
    desc: '五帝之一，名重华，葬于宁远九嶷山。夏建舜帝陵，历代官方主祭，宁远因此成为中华民族"德孝之源"与道德精神圣地。',
  },
  {
    name: '李郃', dynasty: '唐代 808—872',
    img: 'lihe.png',
    tag: '湖广首位状元',
    desc: '宁远湾井镇下灌村人。太和二年（828）状元，湖广有史可查第一位状元。发明叶子戏（麻将鼻祖），官至吏部侍郎，著《李贺州集》多咏九疑山水。',
  },
  {
    name: '乐雷发', dynasty: '南宋 1208—1283',
    img: 'yueleifa.png',
    tag: '特科状元',
    desc: '宁远桐木漹一带人。南宋特科状元，江湖诗派代表，诗风雄奇，多写九疑风物。代表作《雪矶丛稿》入选《四库全书》，与文天祥友善，力主抗金。',
  },
  {
    name: '杨宗稷', dynasty: '清末民初 1865—1933',
    img: 'yangzongji.png',
    tag: '九嶷派古琴创始人',
    desc: '宁远人，字时百。清末民初琴学宗师，集古琴大成，创立九嶷琴派，影响深远。著《琴学丛书》43卷，为近代琴学经典；弟子管平湖为当代琴坛泰斗。',
  },
  {
    name: '姜爱林', dynasty: '清末 1890—1911',
    img: 'jiangailin.png',
    tag: '辛亥革命烈士',
    desc: '宁远永安乡浪石桥村人。1907年投身反清，1909年举义，加入同盟会，随黄兴参与广州起义。1911年被捕就义，为永州首位辛亥革命烈士。',
  },
  {
    name: '柏忍', dynasty: '近代 1898—1929',
    img: 'bairen.png',
    tag: '革命烈士',
    desc: '宁远柏家坪镇人，女，中共早期党员，被誉为"湖南秋瑾"。1927年参加秋收起义，任宁远农协骨干。1929年被捕，坚贞不屈，酷刑牺牲，年仅31岁。',
  },
  {
    name: '李韫珩', dynasty: '民国 1877—1948',
    img: 'liyunyang.png',
    tag: '陆军中将',
    desc: '宁远礼仕湾人，国民革命军陆军中将。保定军校毕业，北伐名将，参加淞沪会战任第十六军军长。抗战期间屡立战功，为北伐、抗日名将。',
  },
  {
    name: '乐天宇', dynasty: '现代 1900—1984',
    img: 'yuetianyu.png',
    tag: '农林科学家',
    desc: '宁远舜陵街道麻池塘村人，中共早期革命家、农林科学家。1924年入党，毛泽东战友。延安时期发现开发南泥湾，大生产运动功臣。新中国后任北京农业大学等校领导，农林泰斗。',
  },
  {
    name: '阙汉骞', dynasty: '民国 1902—1972',
    img: 'quehanqian.png',
    tag: '抗日名将',
    desc: '宁远清水桥一带人，黄埔四期，抗战名将。参加淞沪、徐州、武汉、长沙会战。1945年代表中国军队接收台北，任台湾防卫副司令。',
  },
  {
    name: '欧进萍', dynasty: '当代 1959—',
    img: 'oujinping.png',
    tag: '中国工程院院士',
    desc: '宁远人，中国工程院院士，结构工程专家，在结构抗震与防灾减灾领域作出杰出贡献，代表宁远籍科学家的最高成就。',
  },
  {
    name: '欧阳昌琼', dynasty: '当代',
    img: 'ouyangchangqiong.png',
    tag: '全国人大',
    desc: '宁远人，全国人大常委会委员、副秘书长，在国家立法与政务领域发挥重要作用。',
  },
  {
    name: '蒋劲夫', dynasty: '当代',
    img: 'jiangjinfu.png',
    tag: '影视演员',
    desc: '宁远天堂人，中国内地影视演员，毕业于北京电影学院，代表作有《轩辕剑之天之痕》《步步惊情》等，2018年4月3日清明回家祭祖。',
  },
]

// ===== 民族 =====
const yaoCulture = [
  {
    title: '建筑文化',
    brief: '依山而建的吊脚楼、木板房及土墙楼，干栏式结构。',
    detail: '吊脚楼分上下两层，上层是客堂、卧室和走廊，下层做猪、牛等牲畜棚和堆放生产农具或杂物。木板房及土墙楼一般是"四封三间"两边飘杉（附楼），现保存完整的木楼在牛亚岭、紫荆、上毛漯、上庄源、茶坪源等地。'
  },
  {
    title: '服饰文化',
    brief: '宁远有"九疑瑶"、"西洞瑶"、"宝寨瑶"三种传统瑶族服饰。',
    detail: '九疑瑶：聚居于九嶷山、鲁观一带；西洞瑶：聚居于棉花坪、柏家坪镇唐家漯、中和镇白云山、慕投一带；宝寨瑶：聚居于桐木漯、洋塘、五龙山一带。瑶族服装以家织粗布染蓝靛色，绒线刺绣，有老、少、青之分，有单独的出嫁服装和绣花鞋，不同之处主要是头饰、服装式样、花纹、首饰、佩戴等存在差异，每逢重大节庆瑶族同胞都着盛装。'
  },
  {
    title: '婚俗文化',
    brief: '瑶族传统婚俗分请媒、相亲、看家、定亲、送日子、举办婚礼六步。',
    detail: '瑶族特有习俗"耍嫁"：瑶妹出嫁前一两个月由父母安排到舅舅、姑姑或姐姐家玩，绣花或做家务。做婚酒需五天五夜，礼仪繁多：第一天尝酒；第二天迎亲，背新娘、送亲、抢亲，七十二拜拜堂成亲；第三天祝酒认亲；第四天送亲家客；第五天送贺客。整个婚酒坐歌堂昼夜歌声不断。'
  },
  {
    title: '歌舞文化',
    brief: '瑶族无文字，通过瑶歌口口相传，《盘王大歌》世代传唱。',
    detail: '瑶歌种类繁多，有盘王歌、山歌、劳动歌、出路歌、情缘歌、酒茶烟歌、出嫁歌、孝歌等。坐歌堂最为隆重，分三种形式：九疑瑶以高音唱为主；西洞瑶以中音轻唱为主（二胡调）；宝寨瑶以吟唱为主。瑶族传统舞蹈有盘王舞（奏铛）、长鼓舞、花伞舞、香火草龙舞、竹竿舞等，以长鼓舞最为普遍。'
  },
  {
    title: '乐器文化',
    brief: '主要有唢呐、鼓、大铜锣、碗锣、竹笛、竹笙等。',
    detail: '瑶族传统乐队是婚酒、节庆中不可或缺的组成部分，唢呐高亢热烈，鼓点激昂，配合瑶歌形成独特的音乐风格。'
  },
  {
    title: '祭祀文化',
    brief: '瑶族信仰道教，信鬼神，有度戒、还盘王愿等重要祭祀仪式。',
    detail: '祭祀仪式包括度戒（成年礼）、还盘王愿（分还家愿、还宗族愿、还集体愿）、祭家神、祭庙神、祭山神、祭天神、祭水神等。度戒最为隆重，古时男女青年都要参与，七天七夜，法师二十多位。瑶族丧俗特别，要做道场一个晚上、法师开路，现九疑山瑶民还保存着焚尸的传统习俗。'
  },
  {
    title: '忌俗文化',
    brief: '瑶族有丰富的忌日习俗，涵盖农事、生活各方面。',
    detail: '正月初五送懒神日（迎财神）；正月初六、十六、二十六忌老鼠日（老鼠嫁女）；正月初十、二十、三十忌风神日；二月初一忌鸟神日（赶鸟节），做糍粑插田间喂鸟；三月初一忌雷神日；三月初三忌蝗虫日（开耕节）；三月初四忌野猪日；四月初八牛生日，给牛休息一天，戴红花、帮牛洗澡。'
  },
  {
    title: '节庆文化',
    brief: '瑶族节日众多，以春节和十月十六盘王节最为隆重。',
    detail: '主要节日：大年初一春节；正月十五元宵节；二月初一赶鸟节；三月初三开耕节；五月初五端午节；六月初六半年节/尝新节；七月十四木林节；八月十五中秋节；九月初九重阳敬老节；十月初十庆丰节；十月十六盘王节；冬至节；十二月二十四过小年；十二月三十过大年。'
  },
  {
    title: '瑶药文化',
    brief: '瑶族人民在恶劣自然环境下创造了瑶医药，形成独具特色的医药体系。',
    detail: '瑶医药中的火攻疗法、拔脓疗法对疑难杂症疗效显著，与中西医结合治疗毒蛇咬伤、跌打损伤也有很好疗效。'
  },
  {
    title: '美食文化',
    brief: '瑶族美食独特，有瓜箪酒、拖缸酒、腊八肉、走油菜、腌鱼、打油茶等。',
    detail: '特色美食包括：瓜箪酒、拖缸酒、腊八肉、走油菜、腌鱼、打油茶、艾叶粑粑、打糍粑、饭豆粑、干禾饭、竹筒饭、干笋衣等以及各种绿色食品、土特产。'
  },
  {
    title: '酒宴文化',
    brief: '瑶族酒宴礼节厚重，长桌宴（盘王宴）一桌16人，德高望重者必上坐。',
    detail: '瑶族人热情好客、重亲情，酒宴种类繁多：结婚宴、诞生宴、寿诞宴、新居落成宴、乔迁宴、金榜题名宴、抖筛宴（成年礼）、奏铛宴等。大宴席中坐歌堂或民族风情表演必不可少，瑶族唢呐乐队是标配，席间讲"祝酒词"。50岁以上开始做寿宴，男性逢十、女性逢一叫大生日（冲喜延寿）。'
  },
  {
    title: '礼仪文化',
    brief: '瑶族十分好客，外人进瑶家，不论认识与否都主动招呼，视若亲人。',
    detail: '客人进门沏茶递水，端凳请座，留家就餐必好酒好菜招待。礼节：就餐时筷子不能架在碗上，不能交叉放桌上，喝完酒不能倒扣酒杯；用碗喝茶、用大碗装菜、猪肉切大块是对客人的尊重；斟酒、敬酒、敬茶、献烟、上菜必须从餐桌上席开始。'
  },
]
const yaoHeritage = [
  {
    title: '非遗保护',
    desc: '瑶族传统婚礼、过山瑶祭祖礼仪、九疑山瑶歌、瑶族草龙舞、瑶族打油茶等已入选永州市非物质文化遗产名录，并积极申报省级非遗。'
  },
  {
    title: '出版专著',
    desc: '已出版《九疑瑶歌》《宝寨瑶歌》《走进瑶山》等11部专著和影像制品，以及《魅力瑶乡》画册。'
  },
  {
    title: '节会活动',
    desc: '举办九疑山舜文化旅游节、瑶乡农民艺术节、九疑山民歌节、湘南三市六县八瑶族乡盘王节暨瑶族坐歌堂等系列活动。'
  },
  {
    title: '民族文化示范乡',
    desc: '九嶷山乡和桐木漯乡被打造为民族文化示范乡，建设民族文化广场，创办瑶文化促进会，推动民族文化进乡村、进社区、进学校。'
  },
  {
    title: '民族文化名村',
    desc: '牛亚岭村（瑶族传统婚礼和瑶舞）、大地坪村（长鼓舞和草龙舞）、龙源新村（坐歌堂）、棉花坪完小（竹竿舞）、陈家湾村（宝寨瑶歌）等特色品牌已培育成型。'
  },
  {
    title: '文化传承人',
    desc: '培育了瑶族婚礼赵有富、过山瑶祭祖习俗盘根发、长鼓舞盘秀成、草龙舞盘保古、九疑瑶歌盘日妹、宝寨瑶歌赵六妹等一批本土民族文化传承人。'
  },
]
const ethnicGroups = [
  { name: '汉族', pct: 95, color: 'bg-primary' },
  { name: '瑶族', pct: 3.5, color: 'bg-primary' },
  { name: '其他民族', pct: 1.5, color: 'bg-primary' },
]

// ===== 戏剧 =====
const operas = [
  {
    name: '祁剧',
    aka: '祁阳戏·楚南戏',
    type: '地方大戏',
    representative: '《大破天门阵》《薛仁贵征东》',
    desc: '祁剧是宁远及湘南地区最流行的剧种，唱腔高亢激越，表演粗犷有力，以武戏见长。清中叶随移民传入宁远，至今仍是农村节庆必备。',
    singing: '以[高腔]和[昆腔]为主，高腔粗犷有力，昆腔婉转悠扬，道白用宁远官话，音乐粗犷，锣鼓喧天。',
  },
  {
    name: '宁远花鼓戏',
    aka: '花鼓灯',
    type: '民间小戏',
    representative: '《刘海砍樵》《补锅》',
    desc: '宁远花鼓戏以地方民歌小调为基础，融合祁剧唱腔，形成独具特色的地方小戏。以反映农村生活为主，语言诙谐，通俗易懂，深受群众喜爱。',
    singing: '以地方民歌小调为主，如[宁远调][十字调]，曲调轻快流畅，富有乡土气息，多以胡琴伴奏。',
  },
]
const folkArts = [
  { name: '木雕', desc: '宁远木雕以祠堂庙宇装饰为主，技法精湛，题材多为吉祥图案、神话人物。' },
  { name: '傩戏', desc: '古老祭祀戏剧，戴面具表演，驱邪祈福，今仍在部分乡村留存。' },
  { name: '山歌', desc: '田间地头即兴演唱，男女对歌，语言生动，比兴巧妙。' },
  { name: '龙狮舞', desc: '逢年过节必有龙灯、狮子表演，场面热烈，寄托美好祝愿。' },
]

// ===== 服装 =====
const yaoClothingTags = ['五彩刺绣', '盘王印图案', '银饰', '头帕', '绑腿', '对襟', '过膝']
const clothingFeatures = [
  { title: '五彩刺绣', desc: '以红、黄、绿、白、黑五色丝线，绣出盘王印等民族图腾' },
  { title: '精美头饰', desc: '瑶族女性头戴花帕，缀以银牌、银铃，行走时叮当作响' },
  { title: '银饰点缀', desc: '项圈、手镯、耳环均为手工打制，造型古朴大方' },
  { title: '图案寓意', desc: '方形图案代表田地，十字纹象征桥梁，花卉寓意丰收' },
]

// ===== 红白 =====
const weddingSteps = [
  { name: '提媒', desc: '男家请媒人携礼至女家提亲，若女家收礼则有意' },
  { name: '合八字', desc: '请算命先生合男女双方生辰八字，无冲克方可议婚' },
  { name: '下定', desc: '男家送聘礼（布料、首饰、酒肉）至女家，女家回礼' },
  { name: '送日子', desc: '男家确定婚期后，通知女家，亲友开始筹备' },
  { name: '迎亲', desc: '婚日新郎率迎亲队伍至女家，女家兄弟背新娘上轿' },
  { name: '拜堂', desc: '新娘至男家后，拜天地、拜高堂、夫妻对拜' },
]
const weddingFeatures = [
  '宁远传统婚俗保留"三媒六礼"古风，聘礼讲究"四样"或"六样"齐全',
  '迎亲队伍鸣炮奏乐，途经亲友家门须放鞭炮迎接，以示庆贺',
  '婚宴必上"十大碗"，以扣肉、米粉肉等为主，席间猜拳行令',
  '新婚三日无大小，新娘可以戏耍新郎及家人，气氛热闹',
  '瑶族婚俗另有"歌堂哭嫁"传统，新娘出嫁前数日与女伴对歌',
]
const funeralSteps = [
  { name: '停尸', desc: '亡者断气后，移至正厅铺设草席，覆以白布，家属守夜' },
  { name: '入殓', desc: '为亡者整理仪容，更换寿衣（男三件女五件），入棺封盖' },
  { name: '设灵', desc: '灵柩前设灵堂，挂挽幛，摆供品，孝子孝孙戴孝守灵' },
  { name: '做法事', desc: '请道士或僧人诵经超度，做法事一至三日不等' },
  { name: '送葬', desc: '孝子摔老盆，抬棺出行，送葬队伍鸣炮奏乐，绕街而行' },
  { name: '安葬', desc: '棺木入土，堆土成坟，此后三日每日上坟祭扫"复山"' },
]
const funeralFeatures = [
  '宁远传统丧礼隆重繁复，一般需三天，道士诵经超度，鼓乐相伴',
  '"摔老盆"是出殡前重要仪式，由孝子将瓦盆摔碎，寓"岁岁平安"',
  '送葬途中每经路口、桥头均须燃放鞭炮，意为为亡者开路',
  '下葬后"七七"内，孝子不理发、不赴宴，以示哀思',
  '瑶族丧俗保留"歌堂"传统，亲友相聚对歌三日，以歌代哭送别',
]
</script>
