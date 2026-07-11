# 部署说明

## 线上地址

- 生产站点：<https://personal-webpage-five-gules.vercel.app>
- 托管平台：Vercel
- Vercel 项目：`qiushen/personal-webpage`
- GitHub Pages 静态站点：<https://qiu-shen.github.io/>
- GitHub Pages 仓库：`QIU-SHEN/qiu-shen.github.io`

## 部署结构

```text
Vue 3 / Vite 前端
        ↓ 同域 POST /api/chat
Vercel Function（api/chat.js）
        ↓ 服务端携带 API Key
DeepSeek API
```

DeepSeek Key 只保存在 Vercel 的 Production 环境变量中，不使用 `VITE_` 前缀，也不会进入浏览器产物。

## 环境变量

| 名称 | 必填 | 用途 |
|---|---|---|
| `DEEPSEEK_API_KEY` | 是 | Vercel Function 调用 DeepSeek |
| `DEEPSEEK_MODEL` | 否 | 默认 `deepseek-v4-flash` |
| `ALLOWED_ORIGINS` | 否 | 前端与 API 分开部署时允许的完整 Origin，多个值用逗号分隔 |
| `VITE_CHAT_API_URL` | 否 | 前端单独部署时指向公开 API 代理地址 |

## 更新部署

当前目录已经通过 `.vercel/project.json` 连接到 Vercel 项目。修改完成并通过构建后执行：

```sh
npm run build
npx vercel@latest deploy --prod --yes
```

生产别名保持为 `https://personal-webpage-five-gules.vercel.app`。

## GitHub Pages 静态版本

`.github/workflows/deploy-pages.yml` 在 `master` 分支推送后自动构建并发布。该工作流设置：

```text
VITE_ENABLE_AI_ASSISTANT=false
VITE_USE_HASH_ROUTER=true
```

因此 GitHub Pages 版本不显示 AI 入口、不包含 `/api/chat` 调用，并使用 `/#/Project`、`/#/Notes/...` 等 Hash 路由避免静态托管刷新 404。Vercel 构建不设置这些变量，继续保留 AI 助手和 History 路由。

## 路由与安全

- `vercel.json` 将不存在的静态路径回退到 `index.html`，支持直接刷新 `/Project/...`、`/Notes/...` 等 Vue Router 路由。
- `/api/chat` 只接受 `POST`，限制历史数量、单条消息长度、总上下文长度和最大输出。
- 默认只接受同源浏览器请求；前后端分开部署时使用 `ALLOWED_ORIGINS` 明确放行。
- `.vercelignore` 排除本地环境文件、依赖目录和开发缓存。
