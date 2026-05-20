<template>
  <div>
    <!-- Hero -->
    <section class="relative h-72 lg:h-96 overflow-hidden bg-gray-900">
      <img
        src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1920&q=80"
        alt="交通指南"
        class="w-full h-full object-cover"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/40"></div>
      <div class="relative z-10 h-full flex items-end pb-12">
        <div class="container-site">
          <h1 class="font-display text-4xl lg:text-5xl font-bold text-white mb-3">交通指南</h1>
          <p class="text-white/70 text-base">宁远交通便利，高速、高铁、班车均可抵达，是湘南山区的交通枢纽。</p>
        </div>
      </div>
    </section>

    <!-- 导航栏 -->
    <section class="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
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

    <!-- 公交 -->
    <section v-show="activeTab === '公交'" class="py-8 bg-white">
      <div class="container-site">
        <h2 class="text-xl font-semibold text-gray-900 mb-6">公交</h2>

        <!-- 搜索 -->
        <div class="relative max-w-lg mx-auto mb-8">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="搜索线路或站点名称..."
            class="w-full px-4 py-3 pl-10 bg-white border border-gray-300 rounded text-sm text-gray-900 focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600"
          />
          <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
        </div>

        <!-- 统计 -->
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
          <div class="text-center p-4 border border-gray-200 rounded">
            <div class="text-2xl font-bold text-green-600">{{ cityCount }}</div>
            <div class="text-xs text-gray-500 mt-1">城区公交</div>
          </div>
          <div class="text-center p-4 border border-gray-200 rounded">
            <div class="text-2xl font-bold text-green-600">{{ suburbanCount }}</div>
            <div class="text-xs text-gray-500 mt-1">城乡公交</div>
          </div>
          <div class="text-center p-4 border border-gray-200 rounded">
            <div class="text-2xl font-bold text-green-600">{{ villageCount }}</div>
            <div class="text-xs text-gray-500 mt-1">镇村支线</div>
          </div>
          <div class="text-center p-4 border border-gray-200 rounded">
            <div class="text-2xl font-bold text-green-600">{{ totalCount }}</div>
            <div class="text-xs text-gray-500 mt-1">线路总数</div>
          </div>
        </div>

        <!-- 城区公交 -->
        <div class="mb-10">
          <h3 class="text-base font-semibold text-gray-700 mb-4">城区公交 · 共{{ cityCount }}条</h3>
          <div class="space-y-4">
            <div
              v-for="route in filteredCityRoutes"
              :key="route.id"
              class="border border-gray-200 rounded-lg p-5"
            >
              <div class="flex flex-wrap items-center gap-4 mb-3">
                <span class="inline-block px-3 py-1 bg-green-600 text-white text-sm font-bold rounded">{{ route.name }}</span>
                <span class="text-sm text-gray-700 font-medium">{{ route.start }}</span>
                <button
                  @click="toggleDirection(route.id)"
                  class="p-1.5 rounded hover:bg-green-50 transition-colors flex-shrink-0"
                  :title="reversedRoutes[route.id] ? '切换为正向' : '切换为反向'"
                >
                  <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"/>
                  </svg>
                </button>
                <span class="text-sm text-gray-700 font-medium">{{ route.end }}</span>
                <span v-if="route.time" class="ml-auto text-xs text-gray-400">{{ route.time }}</span>
                <span class="ml-auto text-sm text-green-600 font-semibold">{{ route.price }}</span>
              </div>
              <div class="flex flex-wrap items-center gap-1.5 text-sm text-gray-500 leading-relaxed">
                <template v-if="!reversedRoutes[route.id]">
                  <span
                    v-for="(stop, idx) in route.stops"
                    :key="'f-' + idx"
                    class="flex items-center"
                  >
                    <span
                      class="px-1 rounded"
                      :class="isStopHighlighted(stop) ? 'bg-yellow-100 text-green-700 font-semibold' : ''"
                    >{{ stop }}</span>
                    <svg v-if="idx < route.stops.length - 1" class="w-3 h-3 text-gray-300 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                    </svg>
                  </span>
                </template>
                <template v-else>
                  <span
                    v-for="(stop, idx) in [...route.stops].reverse()"
                    :key="'r-' + idx"
                    class="flex items-center"
                  >
                    <span
                      class="px-1 rounded"
                      :class="isStopHighlighted(stop) ? 'bg-yellow-100 text-green-700 font-semibold' : ''"
                    >{{ stop }}</span>
                    <svg v-if="idx < route.stops.length - 1" class="w-3 h-3 text-gray-300 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                    </svg>
                  </span>
                </template>
              </div>
            </div>
          </div>
        </div>

        <!-- 城乡公交 -->
        <div class="mb-10">
          <h3 class="text-base font-semibold text-gray-700 mb-4">城乡公交 · 共{{ suburbanCount }}条</h3>
          <div class="space-y-4">
            <div
              v-for="route in filteredSuburbanRoutes"
              :key="route.id"
              class="border border-gray-200 rounded-lg p-5"
            >
              <div class="flex flex-wrap items-center gap-4 mb-3">
                <span class="inline-block px-3 py-1 bg-green-600 text-white text-sm font-bold rounded">{{ route.name }}</span>
                <span class="text-sm text-gray-700 font-medium">{{ route.start }}</span>
                <button
                  @click="toggleDirection(route.id)"
                  class="p-1.5 rounded hover:bg-green-50 transition-colors flex-shrink-0"
                  :title="reversedRoutes[route.id] ? '切换为正向' : '切换为反向'"
                >
                  <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"/>
                  </svg>
                </button>
                <span class="text-sm text-gray-700 font-medium">{{ route.end }}</span>
                <span v-if="route.time" class="ml-auto text-xs text-gray-400">{{ route.time }}</span>
                <span class="ml-auto text-sm text-green-600 font-semibold">{{ route.price }}</span>
              </div>
              <div class="flex flex-wrap items-center gap-1.5 text-sm text-gray-500 leading-relaxed">
                <template v-if="!reversedRoutes[route.id]">
                  <span
                    v-for="(stop, idx) in route.stops"
                    :key="'f-' + idx"
                    class="flex items-center"
                  >
                    <span
                      class="px-1 rounded"
                      :class="isStopHighlighted(stop) ? 'bg-yellow-100 text-green-700 font-semibold' : ''"
                    >{{ stop }}</span>
                    <svg v-if="idx < route.stops.length - 1" class="w-3 h-3 text-gray-300 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                    </svg>
                  </span>
                </template>
                <template v-else>
                  <span
                    v-for="(stop, idx) in [...route.stops].reverse()"
                    :key="'r-' + idx"
                    class="flex items-center"
                  >
                    <span
                      class="px-1 rounded"
                      :class="isStopHighlighted(stop) ? 'bg-yellow-100 text-green-700 font-semibold' : ''"
                    >{{ stop }}</span>
                    <svg v-if="idx < route.stops.length - 1" class="w-3 h-3 text-gray-300 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                    </svg>
                  </span>
                </template>
              </div>
            </div>
          </div>
        </div>

        <!-- 镇村支线 -->
        <div>
          <h3 class="text-base font-semibold text-gray-700 mb-4">镇村便民支线 · 共{{ villageCount }}条</h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div
              v-for="route in busRoutes.village"
              :key="route.id"
              class="border border-gray-200 rounded-lg p-4"
            >
              <div class="flex items-center gap-2 mb-3">
                <span class="inline-block px-2 py-0.5 bg-green-600 text-white text-xs font-bold rounded">{{ route.name }}</span>
              </div>
              <div class="text-sm text-gray-500 space-y-1">
                <div>{{ route.start }} → {{ route.end }}</div>
                <div class="text-green-600 font-semibold">{{ route.price }}</div>
              </div>
              <p class="mt-2 text-xs text-gray-400">招手即停，村村通达</p>
            </div>
          </div>
        </div>

        <div v-if="filteredRoutesCount === 0 && searchQuery" class="text-center py-8 text-gray-400 text-sm">
          未找到"{{ searchQuery }}"相关线路
        </div>
      </div>
    </section>

    <!-- 大巴 -->
    <section v-show="activeTab === '大巴'" class="py-8 bg-white">
      <div class="container-site">
        <h2 class="text-xl font-semibold text-gray-900 mb-6">大巴</h2>

        <div class="flex flex-wrap gap-2 mb-5">
          <button
            v-for="station in busStations"
            :key="station"
            @click="selectedStation = station"
            class="px-4 py-2 text-sm border rounded transition-colors"
            :class="selectedStation === station
              ? 'bg-green-600 text-white border-green-600'
              : 'bg-white text-gray-600 border-gray-300 hover:border-green-400'"
          >
            {{ station }}
          </button>
        </div>

        <div class="border border-gray-200 rounded overflow-hidden">
          <table class="w-full text-sm">
            <thead>
              <tr class="bg-green-600 text-white">
                <th class="px-4 py-3 text-left font-medium w-24">发车</th>
                <th class="px-4 py-3 text-left font-medium">目的地</th>
                <th class="px-4 py-3 text-left font-medium w-28">用时</th>
                <th class="px-4 py-3 text-left font-medium">备注</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="bus in filteredBuses"
                :key="bus.id"
                class="border-t border-gray-100 hover:bg-green-50/50 transition-colors"
              >
                <td class="px-4 py-3">
                  <span class="font-mono text-green-600 font-semibold">{{ bus.departure }}</span>
                </td>
                <td class="px-4 py-3 text-gray-800">{{ bus.to }}</td>
                <td class="px-4 py-3 text-gray-500">{{ bus.duration }}</td>
                <td class="px-4 py-3 text-gray-400 text-xs">{{ bus.note || '—' }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p class="mt-3 text-xs text-gray-400">票价信息请以车站当日公布为准。海口线为3天1班。</p>
      </div>
    </section>

    <!-- 火车 -->
    <section v-show="activeTab === '火车'" class="py-8 bg-white">
      <div class="container-site">
        <h2 class="text-xl font-semibold text-gray-900 mb-6">火车</h2>

        <div class="border border-gray-200 rounded overflow-hidden">
          <table class="w-full text-sm">
            <thead>
              <tr class="bg-gray-800 text-white">
                <th class="px-4 py-3 text-left font-medium">站点</th>
                <th class="px-4 py-3 text-left font-medium">类型</th>
                <th class="px-4 py-3 text-left font-medium">经过线路</th>
                <th class="px-4 py-3 text-left font-medium">距宁远</th>
                <th class="px-4 py-3 text-left font-medium">用途</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="station in nyData.nearbyStations"
                :key="station.name"
                class="border-t border-gray-100 hover:bg-gray-50 transition-colors"
              >
                <td class="px-4 py-3">
                  <div class="font-medium text-gray-900 flex items-center gap-1.5">
                    {{ station.name }}
                    <span
                      v-if="station.duration && (station.duration.includes('2027') || station.duration.includes('在建'))"
                      class="inline-block px-1.5 py-0.5 bg-amber-100 text-amber-700 text-xs font-medium rounded"
                    >在建</span>
                    <span
                      v-else-if="station.name.includes('规划')"
                      class="inline-block px-1.5 py-0.5 bg-gray-200 text-gray-600 text-xs font-medium rounded"
                    >规划</span>
                  </div>
                  <div class="text-xs text-gray-400">{{ station.city }}</div>
                </td>
                <td class="px-4 py-3">
                  <span
                    class="inline-block px-2 py-0.5 text-xs font-medium rounded"
                    :class="{
                      'bg-blue-100 text-blue-700': station.type.includes('高铁'),
                      'bg-gray-100 text-gray-600': !station.type.includes('高铁') && !station.usage.includes('基本停运'),
                      'bg-red-100 text-red-600': station.usage.includes('基本停运') || station.usage.includes('少用')
                    }"
                  >{{ station.type }}</span>
                </td>
                <td class="px-4 py-3 text-gray-500 text-xs">{{ station.lines }}</td>
                <td class="px-4 py-3 text-gray-500">{{ station.distance }} · {{ station.duration }}</td>
                <td class="px-4 py-3 text-gray-500 text-xs">{{ station.usage }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p class="mt-4 text-sm text-gray-500">
          建议：乘坐高铁推荐选择<strong class="text-gray-700">永州站</strong>（80km，约1小时10分）或<strong class="text-gray-700">郴州西站</strong>（90km，约1小时20分）。
        </p>
      </div>
    </section>

    <!-- 航空 -->
    <section v-show="activeTab === '航空'" class="py-8 bg-white">
      <div class="container-site">
        <h2 class="text-xl font-semibold text-gray-900 mb-6">航空</h2>

        <div class="border border-gray-200 rounded overflow-hidden">
          <table class="w-full text-sm">
            <thead>
              <tr class="bg-gray-800 text-white">
                <th class="px-4 py-3 text-left font-medium">机场</th>
                <th class="px-4 py-3 text-left font-medium">代码</th>
                <th class="px-4 py-3 text-left font-medium">等级</th>
                <th class="px-4 py-3 text-left font-medium">距宁远</th>
                <th class="px-4 py-3 text-left font-medium">自驾</th>
                <th class="px-4 py-3 text-left font-medium">说明</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="opt in airplaneOptions"
                :key="opt.code"
                class="border-t border-gray-100 hover:bg-gray-50 transition-colors"
              >
                <td class="px-4 py-3 font-medium text-gray-900">{{ opt.to }}</td>
                <td class="px-4 py-3">
                  <span class="font-mono text-green-600 font-semibold">{{ opt.code }}</span>
                </td>
                <td class="px-4 py-3 text-gray-500">{{ opt.level }}</td>
                <td class="px-4 py-3 text-gray-500">{{ opt.distance }}</td>
                <td class="px-4 py-3 text-gray-500">{{ opt.duration }}</td>
                <td class="px-4 py-3 text-gray-400 text-xs">{{ opt.desc }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- 公路 -->
    <section v-show="activeTab === '公路'" class="py-8 bg-white">
      <div class="container-site">
        <h2 class="text-xl font-semibold text-gray-900 mb-6">公路</h2>

        <!-- 高速公路 -->
        <div class="mb-8">
          <h3 class="text-base font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <span class="inline-block w-6 h-6 bg-black text-white text-xs rounded flex items-center justify-center font-bold">高</span>
            高速公路
          </h3>
          <div class="border border-gray-200 rounded overflow-hidden">
            <table class="w-full text-sm">
              <thead>
                <tr class="bg-black text-white">
                  <th class="px-4 py-3 text-left font-medium">编号</th>
                  <th class="px-4 py-3 text-left font-medium">名称</th>
                  <th class="px-4 py-3 text-left font-medium">走向</th>
                  <th class="px-4 py-3 text-left font-medium">宁远出入口</th>
                  <th class="px-4 py-3 text-left font-medium">连接城市</th>
                  <th class="px-4 py-3 text-left font-medium">备注</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="road in roadData.highways"
                  :key="road.code"
                  class="border-t border-gray-100 hover:bg-gray-100 transition-colors"
                >
                  <td class="px-4 py-3">
                    <span class="font-mono font-bold text-black">{{ road.code }}</span>
                  </td>
                  <td class="px-4 py-3 font-medium text-gray-800">{{ road.name }}</td>
                  <td class="px-4 py-3 text-gray-500">{{ road.direction }}</td>
                  <td class="px-4 py-3 text-gray-500">{{ road.exits }}</td>
                  <td class="px-4 py-3 text-gray-600 text-xs">
                    <div v-if="road.citiesNorth || road.citiesEast">
                      <span class="text-gray-400">北/东：</span>{{ road.citiesNorth || road.citiesEast }}
                    </div>
                    <div v-if="road.citiesSouth || road.citiesWest">
                      <span class="text-gray-400">南/西：</span>{{ road.citiesSouth || road.citiesWest }}
                    </div>
                  </td>
                  <td class="px-4 py-3">
                    <span v-if="road.building" class="inline-block px-2 py-0.5 bg-amber-100 text-amber-700 text-xs rounded">{{ road.note }}</span>
                    <span v-else class="text-gray-400 text-xs">{{ road.note || '—' }}</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- 国道 -->
        <div class="mb-8">
          <h3 class="text-base font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <span class="inline-block w-6 h-6 bg-gray-700 text-white text-xs rounded flex items-center justify-center font-bold">国</span>
            国道
          </h3>
          <div class="border border-gray-200 rounded overflow-hidden">
            <table class="w-full text-sm">
              <thead>
                <tr class="bg-gray-700 text-white">
                  <th class="px-4 py-3 text-left font-medium">编号</th>
                  <th class="px-4 py-3 text-left font-medium">名称</th>
                  <th class="px-4 py-3 text-left font-medium">走向</th>
                  <th class="px-4 py-3 text-left font-medium">宁远段</th>
                  <th class="px-4 py-3 text-left font-medium">连接城市</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="road in roadData.nationalRoads"
                  :key="road.code"
                  class="border-t border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <td class="px-4 py-3">
                    <span class="font-mono font-bold text-gray-700">{{ road.code }}</span>
                  </td>
                  <td class="px-4 py-3 font-medium text-gray-800">{{ road.name }}</td>
                  <td class="px-4 py-3 text-gray-500">{{ road.direction }}</td>
                  <td class="px-4 py-3 text-gray-500 text-xs">{{ road.ningyuanSection }}</td>
                  <td class="px-4 py-3 text-gray-600 text-xs">
                    <div v-if="road.citiesEast">东：{{ road.citiesEast }}</div>
                    <div v-if="road.citiesWest">西：{{ road.citiesWest }}</div>
                    <div v-if="road.citiesSouth">南：{{ road.citiesSouth }}</div>
                    <div v-if="road.citiesNorth">北：{{ road.citiesNorth }}</div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- 省道 -->
        <div>
          <h3 class="text-base font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <span class="inline-block w-6 h-6 bg-black text-white text-xs rounded flex items-center justify-center font-bold">省</span>
            省道
          </h3>
          <div class="border border-gray-200 rounded overflow-hidden">
            <table class="w-full text-sm">
              <thead>
                <tr class="bg-black text-white">
                  <th class="px-4 py-3 text-left font-medium">编号</th>
                  <th class="px-4 py-3 text-left font-medium">路线</th>
                  <th class="px-4 py-3 text-left font-medium">用途</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="road in roadData.provincialRoads"
                  :key="road.code"
                  class="border-t border-gray-100 hover:bg-gray-100 transition-colors"
                >
                  <td class="px-4 py-3">
                    <span class="font-mono font-bold text-black">{{ road.code }}</span>
                  </td>
                  <td class="px-4 py-3 text-gray-800">{{ road.route }}</td>
                  <td class="px-4 py-3 text-gray-500">{{ road.usage }}</td>
                </tr>
              </tbody>
            </table>
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
import { ref, computed } from 'vue'
import { nyData } from '@/data/nyingyuan'
import { busRoutes, routeStats } from '@/data/busRoutes'

const roadData = computed(() => {
  const road = nyData.transport.find(t => t.type === 'road')
  return {
    highways: road?.highways || [],
    nationalRoads: road?.nationalRoads || [],
    provincialRoads: road?.provincialRoads || [],
  }
})

const airplaneOptions = computed(() => {
  const airplane = nyData.transport.find(t => t.type === 'airplane')
  return airplane?.options || []
})

const cityCount = routeStats.city
const suburbanCount = routeStats.suburban
const villageCount = routeStats.village
const totalCount = routeStats.total

const activeTab = ref('公交')

const navTabs = [
  { id: '公交', label: '公交' },
  { id: '大巴', label: '大巴' },
  { id: '火车', label: '火车' },
  { id: '航空', label: '航空' },
  { id: '公路', label: '公路' },
]

const busStations = ['宁远汽车站', '宁远湘运汽车站', '宁远客运中心站']
const selectedStation = ref('宁远汽车站')

const filteredBuses = computed(() => {
  return nyData.intercityBus.filter(bus => bus.from === selectedStation.value)
})

const searchQuery = ref('')
const reversedRoutes = ref({})

const toggleDirection = (routeId) => {
  reversedRoutes.value[routeId] = !reversedRoutes.value[routeId]
}

const isStopHighlighted = (stop) => {
  if (!searchQuery.value) return false
  return stop.toLowerCase().includes(searchQuery.value.toLowerCase())
}

const filteredCityRoutes = computed(() => {
  if (!searchQuery.value) return busRoutes.city
  const q = searchQuery.value.toLowerCase()
  return busRoutes.city.filter(route =>
    route.name.toLowerCase().includes(q) ||
    route.fullName.toLowerCase().includes(q) ||
    route.start.toLowerCase().includes(q) ||
    route.end.toLowerCase().includes(q) ||
    route.stops.some(stop => stop.toLowerCase().includes(q))
  )
})

const filteredSuburbanRoutes = computed(() => {
  if (!searchQuery.value) return busRoutes.suburban
  const q = searchQuery.value.toLowerCase()
  return busRoutes.suburban.filter(route =>
    route.name.toLowerCase().includes(q) ||
    route.fullName.toLowerCase().includes(q) ||
    route.start.toLowerCase().includes(q) ||
    route.end.toLowerCase().includes(q) ||
    route.stops.some(stop => stop.toLowerCase().includes(q))
  )
})

const filteredRoutesCount = computed(() => {
  return filteredCityRoutes.value.length + filteredSuburbanRoutes.value.length
})
</script>
