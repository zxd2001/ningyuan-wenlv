<template>
  <div>
    <!-- Hero -->
    <section class="relative h-72 lg:h-96 overflow-hidden bg-gray-800">
      <div class="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=1920&q=80"
          alt="政务公开"
          class="w-full h-full object-cover"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/40"></div>
      </div>
      <div class="relative z-10 h-full flex items-end pb-12">
        <div class="container-site">
          <p class="text-white/60 text-sm tracking-widest uppercase mb-3">Government</p>
          <h1 class="font-display text-4xl lg:text-5xl font-bold text-white mb-4">政务公开</h1>
          <p class="text-white/70 text-base max-w-xl">信息公开、机构设置、政策文件、服务指南……透明政府，阳光政务。</p>
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

    <!-- 信息公开 -->
    <section v-show="activeTab === 'info'" class="py-12 bg-white">
      <div class="container-site">
        <div class="max-w-4xl mx-auto">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <!-- 机构信息 -->
            <div>
              <h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span class="w-2 h-6 bg-green-600 rounded-full"></span>
                机构设置
              </h3>
              <div class="bg-gray-50 rounded-lg p-5 mb-4">
                <h4 class="font-display font-semibold text-gray-900 mb-1">宁远县文化旅游广电体育局</h4>
                <p class="text-xs text-gray-500 mb-3">NINGYUAN COUNTY BUREAU OF CULTURE, TOURISM, RADIO AND TELEVISION, AND SPORTS</p>
                <div class="space-y-2 text-sm text-gray-600">
                  <div class="flex items-start gap-2">
                    <svg class="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    </svg>
                    <span>湖南省永州市宁远县九嶷大道1号县政府大楼</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <svg class="w-4 h-4 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                    </svg>
                    <span>0746-1234567</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <svg class="w-4 h-4 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                    </svg>
                    <span>lyxwlgj@ningyuan.gov.cn</span>
                  </div>
                </div>
              </div>

              <!-- 内设机构 -->
              <div>
                <h4 class="text-sm font-semibold text-gray-700 mb-3">内设机构</h4>
                <div class="grid grid-cols-2 gap-2">
                  <div v-for="dept in departments" :key="dept"
                       class="flex items-center gap-2 text-sm text-gray-600 py-2 border-b border-gray-100">
                    <span class="w-1.5 h-1.5 bg-green-500 rounded-full flex-shrink-0"></span>
                    {{ dept }}
                  </div>
                </div>
              </div>
            </div>

            <!-- 内设部门详情 -->
            <div>
              <h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span class="w-2 h-6 bg-green-600 rounded-full"></span>
                部门职能
              </h3>
              <div class="space-y-3">
                <div v-for="dept in deptDetails" :key="dept.name"
                     class="border border-gray-200 rounded-lg p-4 bg-white hover:shadow-md transition-shadow">
                  <h4 class="font-semibold text-gray-900 mb-1">{{ dept.name }}</h4>
                  <p class="text-xs text-gray-500 leading-relaxed">{{ dept.desc }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 政策文件 -->
    <section v-show="activeTab === 'policies'" class="py-12 bg-white">
      <div class="container-site">
        <div class="max-w-4xl mx-auto">
          <!-- 筛选 -->
          <div class="flex flex-wrap gap-2 mb-6">
            <button
              v-for="cat in policyCategories"
              :key="cat"
              @click="selectedPolicyCat = cat"
              class="px-4 py-2 text-sm border rounded transition-colors"
              :class="selectedPolicyCat === cat
                ? 'bg-green-600 text-white border-green-600'
                : 'bg-white text-gray-600 border-gray-300 hover:border-green-400'"
            >
              {{ cat }}
            </button>
          </div>

          <!-- 文件列表 -->
          <div class="space-y-3">
            <div v-for="doc in filteredPolicies" :key="doc.title"
                 class="flex items-center justify-between p-4 border border-gray-200 rounded-lg bg-white hover:shadow-sm transition-shadow cursor-pointer">
              <div class="flex items-start gap-3">
                <span class="w-8 h-8 bg-gray-100 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span class="text-xs text-gray-500">{{ doc.type }}</span>
                </span>
                <div>
                  <h4 class="text-sm font-medium text-gray-900 mb-1">{{ doc.title }}</h4>
                  <div class="flex items-center gap-3 text-xs text-gray-400">
                    <span>{{ doc.dept }}</span>
                    <span>{{ doc.date }}</span>
                  </div>
                </div>
              </div>
              <span class="text-xs px-2 py-0.5 border border-gray-300 rounded text-gray-500 flex-shrink-0">{{ doc.tag }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 服务指南 -->
    <section v-show="activeTab === 'service'" class="py-12 bg-white">
      <div class="container-site">
        <div class="max-w-4xl mx-auto">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <div v-for="service in services" :key="service.name"
                 class="border border-gray-200 rounded-lg p-5 bg-white hover:shadow-md transition-shadow">
              <div class="w-12 h-12 bg-green-600/10 rounded-lg flex items-center justify-center mb-4">
                <span class="text-2xl">{{ service.icon }}</span>
              </div>
              <h4 class="font-semibold text-gray-900 mb-2">{{ service.name }}</h4>
              <p class="text-xs text-gray-500 mb-3 leading-relaxed">{{ service.desc }}</p>
              <div class="flex items-center justify-between">
                <span class="text-xs text-gray-400">办理：{{ service.method }}</span>
                <button class="text-xs text-green-600 hover:underline">查看详情 →</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 联系我们 -->
    <section v-show="activeTab === 'contact'" class="py-12 bg-white">
      <div class="container-site">
        <div class="max-w-3xl mx-auto">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <!-- 联系信息 -->
            <div>
              <h3 class="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <span class="w-2 h-6 bg-green-600 rounded-full"></span>
                联系方式
              </h3>
              <div class="space-y-5">
                <div v-for="contact in contactInfo" :key="contact.label"
                     class="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                  <div class="w-10 h-10 bg-green-600/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <span class="text-xl">{{ contact.icon }}</span>
                  </div>
                  <div>
                    <div class="text-xs text-gray-400 mb-1">{{ contact.label }}</div>
                    <div class="text-sm text-gray-800">{{ contact.value }}</div>
                  </div>
                </div>
              </div>

              <div class="mt-8 p-5 bg-green-50 rounded-lg">
                <h4 class="font-semibold text-gray-900 mb-2">办公时间</h4>
                <div class="text-sm text-gray-600 space-y-1">
                  <div>周一至周五：上午 8:00 - 12:00</div>
                  <div>周一至周五：下午 14:30 - 17:30（夏令时 15:00 - 18:00）</div>
                  <div class="text-xs text-gray-400 mt-2">节假日不对外办公</div>
                </div>
              </div>
            </div>

            <!-- 意见反馈表单 -->
            <div>
              <h3 class="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <span class="w-2 h-6 bg-green-600 rounded-full"></span>
                意见反馈
              </h3>
              <form @submit.prevent="submitForm" class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">姓名</label>
                  <input v-model="form.name" type="text" placeholder="请输入姓名" class="input-field"/>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">联系电话</label>
                  <input v-model="form.phone" type="tel" placeholder="请输入手机号" class="input-field"/>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">咨询类型</label>
                  <select v-model="form.type" class="input-field">
                    <option value="">请选择</option>
                    <option value="旅游咨询">旅游咨询</option>
                    <option value="文化活动">文化活动</option>
                    <option value="投诉建议">投诉建议</option>
                    <option value="景区合作">景区合作</option>
                    <option value="其他">其他</option>
                  </select>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">留言内容</label>
                  <textarea v-model="form.message" rows="4" placeholder="请详细描述您的意见或问题" class="input-field resize-none"></textarea>
                </div>
                <button type="submit" class="btn-primary w-full">提交反馈</button>
                <p class="text-xs text-gray-400 text-center">我们将在3个工作日内回复您的留言</p>
              </form>
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
.input-field {
  width: 100%;
  padding: 0.625rem 0.875rem;
  border: 1px solid #d1d5db;
  border-radius: 0.25rem;
  font-size: 0.875rem;
  color: #111827;
  background-color: white;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
}
.input-field:focus {
  border-color: #16a34a;
  box-shadow: 0 0 0 2px rgba(22, 163, 74, 0.1);
}
</style>

<script setup>
import { ref, computed } from 'vue'

const activeTab = ref('info')

const navTabs = [
  { id: 'info', label: '信息公开' },
  { id: 'policies', label: '政策文件' },
  { id: 'service', label: '服务指南' },
  { id: 'contact', label: '联系我们' },
]

const departments = [
  '办公室', '规划发展股', '资源开发股', '市场管理股',
  '文化体育股', '文物管理所', '文化馆', '图书馆',
  '旅游执法大队', '体育中心',
]

const deptDetails = [
  { name: '办公室', desc: '综合协调机关政务，处理日常事务；负责文电、会务、机要、保密、档案等工作；负责人事、财务、后勤保障工作。' },
  { name: '规划发展股', desc: '拟订全县文化旅游广电体育发展中长期规划和年度计划；负责项目策划、招商引资和固定资产投资工作。' },
  { name: '资源开发股', desc: '负责全县旅游资源普查、规划与开发；指导重点旅游区域、重大项目的规划建设；推动全域旅游发展。' },
  { name: '市场管理股', desc: '负责旅游市场秩序监管，查处违法行为；受理旅游投诉，维护游客合法权益；推动旅游诚信体系建设。' },
  { name: '文化体育股', desc: '负责全县公共文化服务体系建设；组织指导群众性文化体育活动；管理体育场馆和全民健身设施。' },
  { name: '文物管理所', desc: '负责全县文物保护单位的管理与维修；组织考古调查和文物鉴定；开展文物宣传教育和合理利用工作。' },
  { name: '文化馆', desc: '组织公益性文艺演出、展览和培训活动；辅导乡镇文化站业务；收集整理非物质文化遗产。' },
  { name: '图书馆', desc: '提供文献借阅、数字资源服务；开展阅读推广活动；承担古籍保护与地方文献整理工作。' },
]

const policyCategories = ['全部', '法规规章', '规范性文件', '政策解读', '公示公告']
const selectedPolicyCat = ref('全部')

const policies = [
  { title: '宁远县促进旅游产业发展的若干措施（试行）', type: '规范性文件', dept: '文旅广体局', date: '2025-03-15', tag: '旅游' },
  { title: '关于加强九嶷山风景名胜区保护管理的通告', type: '规范性文件', dept: '文旅广体局', date: '2024-11-20', tag: '景区' },
  { title: '宁远县文化遗产保护专项资金管理办法', type: '规范性文件', dept: '文旅广体局', date: '2024-09-08', tag: '文物' },
  { title: '宁远县旅游投诉处理办法（试行）', type: '规范性文件', dept: '文旅广体局', date: '2024-07-01', tag: '投诉' },
  { title: '关于规范宁远文庙景区门票管理的公告', type: '公示公告', dept: '文旅广体局', date: '2025-01-10', tag: '公告' },
  { title: '宁远县2024年度旅游厕所建设方案', type: '公示公告', dept: '文旅广体局', date: '2024-05-22', tag: '旅游' },
  { title: '九嶷山舜帝陵祭祀管理办法（试行）', type: '规范性文件', dept: '文旅广体局', date: '2023-12-01', tag: '祭祀' },
  { title: '宁远县全民健身实施计划（2021-2025年）', type: '法规规章', dept: '文旅广体局', date: '2021-09-30', tag: '体育' },
]

const filteredPolicies = computed(() => {
  if (selectedPolicyCat.value === '全部') return policies
  return policies.filter(p => p.type === selectedPolicyCat.value)
})

const services = [
  { icon: '🗺️', name: '景区门票预约', desc: '九嶷山、宁远文庙、紫霞岩等主要景区在线预约购票', method: '线上+线下' },
  { icon: '🎫', name: '导游服务申请', desc: '预约持证导游，提供中英双语讲解服务', method: '线上预约' },
  { icon: '🏨', name: '旅游住宿推荐', desc: '合作酒店、民宿查询与预订协助', method: '电话咨询' },
  { icon: '🚌', name: '团队接待服务', desc: '机关企事业单位团队参观考察接待安排', method: '电话预约' },
  { icon: '🎭', name: '文化活动预约', desc: '非遗展演、文艺演出、文化讲座等预约参与', method: '线上报名' },
  { icon: '📜', name: '文物参观申请', desc: '重点文物保护单位考察、考古工地参观申请', method: '书面申请' },
  { icon: '⚠️', name: '旅游投诉受理', desc: '处理旅游消费纠纷，维护游客合法权益', method: '电话+线上' },
  { icon: '🤝', name: '招商合作咨询', desc: '旅游项目招商、文旅产业投资政策咨询', method: '面谈' },
  { icon: '📋', name: '证明文件办理', desc: '景区等级证明、活动审批文件等办理', method: '窗口办理' },
]

const contactInfo = [
  { icon: '📍', label: '地址', value: '湖南省永州市宁远县九嶷大道1号县政府大楼' },
  { icon: '📞', label: '旅游咨询', value: '0746-1234567' },
  { icon: '📧', label: '电子邮箱', value: 'lyxwlgj@ningyuan.gov.cn' },
  { icon: '🌐', label: '官方网站', value: 'www.ningyuan.gov.cn' },
  { icon: '💬', label: '微信公众号', value: '宁远县文化旅游' },
]

const form = ref({ name: '', phone: '', type: '', message: '' })

function submitForm() {
  if (!form.value.name || !form.value.message) {
    alert('请填写姓名和留言内容')
    return
  }
  alert('感谢您的反馈，我们会尽快处理！')
  form.value = { name: '', phone: '', type: '', message: '' }
}
</script>
