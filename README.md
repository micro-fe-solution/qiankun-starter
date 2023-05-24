<h1 align="center">
  Qiankun Starter
</h1>

低代码解决方案乾坤开发模版

> 提供乾坤在 Umi3、Umi4、Vite等互为父子应用的场景验证

目前已实现场景

- 父应用 Vite(React)
  - 子应用 Umi4
  - 子应用 Vite(React)
- 父应用 Umi3
  - 子应用 Umi4
  - 子应用 Vite(React)
- 父应用 Umi4
  - 子应用 Umi4
  - 子应用 Vite(React)

⌨️ 本地开发

```
# 安装依赖
pnpm i

# 启动以 Vit(React) 为父应用的服务
pnpm start

# 启动以 Umi3 为父应用的服务
pnpm start:umi3

# 启动以 Umi4 为父应用的服务
pnpm start:umi4
```