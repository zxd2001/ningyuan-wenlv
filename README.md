# 宁远县文化旅游网 - 宁远文旅

舜帝崩葬之地，九嶷山国家森林公园所在地。探索宁远的历史文化、自然风光、旅游景点、精品线路。

## 在线访问

网站已部署至 GitHub Pages：[https://yourusername.github.io/ningyuan-wenlv/](https://yourusername.github.io/ningyuan-wenlv/)

> 请将 `yourusername` 替换为你的 GitHub 用户名

## 技术栈

- Vue 3 + Composition API
- Vite
- Tailwind CSS
- Vue Router
- Leaflet（地图）
- Axios

## 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产版本
npm run preview
```

## 项目结构

```
src/
├── views/           # 页面组件
│   ├── HomeView.vue         # 首页
│   ├── DestinationsView.vue # 目的地/景点
│   ├── CultureView.vue      # 文化体验
│   ├── PlanningView.vue     # 行程规划
│   ├── FoodLodgingView.vue  # 美食住宿
│   ├── TransportationView.vue# 交通指南
│   ├── EventsView.vue       # 活动日历
│   ├── AboutView.vue        # 走进宁远
│   └── GovernmentView.vue    # 政务公开
├── components/      # 公共组件
├── router/          # 路由配置
└── data/            # 静态数据
public/
└── images/          # 图片资源
    ├── jiuyi/       # 九嶷山景点图片
    ├── wengmiao/    # 文庙图片
    ├── bajing/      # 八景图片
    └── ...          # 其他分类图片
```

## 部署

本项目配置了 GitHub Actions，每次推送到 `main` 分支会自动构建并部署到 GitHub Pages。

如需手动部署，请运行：

```bash
# Windows
npm run deploy:win

# macOS / Linux
npm run deploy:unix
```
