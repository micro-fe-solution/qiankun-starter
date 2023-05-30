<h1 align="center">
  Qiankun Starter
</h1>

低代码解决方案乾坤开发模版

> 提供乾坤在 【Umi3、Umi4、Vite、Webpack】【React、Vue、Svelte】等互为父子应用的场景验证

## 场景

- 父应用 Vite(React)
  - 子应用 Umi3
  - 子应用 Umi4
  - 子应用 Vite(React)
  - 子应用 Vite(Svelte)
  - 子应用 Vite(Vue3)
- 父应用 Umi3
  - 子应用 Umi3
  - 子应用 Umi4
  - 子应用 Vite(React)
  - 子应用 Vite(Svelte)
  - 子应用 Vite(Vue3)
- 父应用 Umi4
  - 子应用 Umi3
  - 子应用 Umi4
  - 子应用 Vite(React)
  - 子应用 Vite(Svelte)
  - 子应用 Vite(Vue3)

## ✨ 特性

- 🚀 【乾坤】微前端解决方案
- 💎 主流前端框架互为父子应用
- 🛡 TypeScript: 应用程序级 JavaScript 的语言

## ⌨️ 本地开发

```
# 安装依赖
pnpm i

# 启动 Vit(React) 父应用
pnpm start

# 启动 Umi3 父应用
pnpm start:umi3

# 启动 Umi4 父应用
pnpm start:umi4

# 启动所有子应用
pnpm start:subapps
```