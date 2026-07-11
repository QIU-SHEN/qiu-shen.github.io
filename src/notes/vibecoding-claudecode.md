---
title: vibecoding的使用帮助——claudecode
tags: AI, Vibecoding, Claude Code
date: 2026-07-08
---

# vibecoding的使用帮助——claudecode

## VScode中的使用介绍

### 窗口介绍

![image-20260617171817052](/notes/vibecoding-claudecode/image-20260617171817052.png)

### 编程模式介绍

![image-20260617171834581](/notes/vibecoding-claudecode/image-20260617171834581.png)

### 可能遇到的问题

#### Q1：我该怎么开始一个ai项目？

**选项1>** 我有需求文档 我有实现细节的计划

​	**A：** 直接将文件交给ai阅读 对话示例：“阅读一下这个文档”

**选项2>** 我没有需求文档 只是有一个想法

​	**A：** 将想法告诉ai让他先写一份计划 对话示例：“我想做一个每日打卡记录网站 帮我做一个计划”

#### Q2：我怎么让ai读取文件呢？

**方案1：**该方法可以附带多个文件

![image-20260617171855532](/notes/vibecoding-claudecode/image-20260617171855532.png)

**方案2：**将文件在此窗口中打开 聊天框下方会自动附带该文件 对话时将自动带上这个文件发给claude 该方法只能附带一份文件

![image-20260617171916932](/notes/vibecoding-claudecode/image-20260617171916932.png)

#### Q3：我购买的token的消耗量怎么查看？

**A：**在你购买token的网站一般会有对应查看方式 这里以kimi举例

![image-20260617171935628](/notes/vibecoding-claudecode/image-20260617171935628.png)

#### Q4：我做出的产品怎么可视化？

**A：**可以询问ai：“我们的产品是要做成网站的形式吗”
	“我怎么启动这个产品来使用？”

#### Q5：我怎么知道ai写的文档存到哪里了？

A：一般来讲会存到当前文件夹目录下 可以右键文件 选择

![image-20260617172001854](/notes/vibecoding-claudecode/image-20260617172001854.png)

#### Q6：什么是apikey?

**A：** 用来接入大模型的东西。比如你买的kimi的apikey 就接入claudecode负责给你进行编程

而如果你做的产品中也需要一个ai来进行工作 自然就也需要一个大模型的api来接入为你工作

#### Q7：我的产品中也需要ai来做分析，怎么办？

**A：**举例 我做一个每日计划ai 产品 功能为：ai分析我给他的事项，做出计划 那么你就需要一个大模型来作为这个任务的处理者 即需要接入api 可以接入deepseek chaigpt genimi等等 可以到deepseek官网购买并接入

![image-20260617172021257](/notes/vibecoding-claudecode/image-20260617172021257.png)

#### Q8：我对ai生成的功能不满意，怎么提出、修改我的需求？

**A：** 方案1> 按照每个点的细节发送消息 如 “帮我在屏幕右上角加一个设置按钮”

​	方案2> 使用计划模式![image-20260617172036698](/notes/vibecoding-claudecode/image-20260617172036698.png)对不满意的地方修改后按计划让他执行

#### Q9：可以直接截图然后告诉他怎么改吗？

**A：**可以。截图后直接ctrl+v粘贴到对话框中即可。

![image-20260617172058019](/notes/vibecoding-claudecode/image-20260617172058019.png)

#### Q10：claude告诉我需要配置......，需要安装......，我该怎么做？

**A：**发送消息：“你来进行配置，除非有我必须我要做的事”

#### Q11：怎样能减少token消耗？

**A：**尽量让ai只执行代码编写需求，把自己的需求点一定要描述清楚，不要只讲大框架。

可以隔一段时间使用`/compact`命令压缩上下文 能够一定程度减少token消耗![image-20260617172118013](/notes/vibecoding-claudecode/image-20260617172118013.png)

#### Q12：什么是上下文？

**A：**每次聊天都会将已经聊过的文字发给ai 这就是上下文，所以上下文越长 ai要分析的就越多。

#### Q13：我问错了问题/ 聊天界面卡死无法继续怎么办，可以回退吗？

**A：**可以，在聊天界面双击esc按键 选择需要回退到的消息即可。![image-20260606164643436](/notes/vibecoding-claudecode/image-20260606164643436.png)

#### Q14：我做出的产品如何部署上线，让所有人都看到？

A：阿里云学生认证后有免费300元额度，购买服务器按照教程部署使用。可以自行试试阿里云服务器部署教程。也可以问AI。



## 命令行常用命令介绍

| 命令                        | 用法                               |
| :-------------------------- | ---------------------------------- |
| `/init`                     | 初始化上下文 生成CLAUDE.md         |
| `/rename`                   | 给当前对话重命名                   |
| `/resume`                   | 查询历史记录                       |
| `/context`                  | 查看上下文占用                     |
| `/compact`                  | 压缩上下文                         |
| `/loop`                     | 创建循环后台任务                   |
| `/plan`                     | 查看计划模式写的计划               |
| `/plan open`                | 打开编辑计划文档                   |
| `/help`                     | 列出所有可用的斜杠指令及其简要说明 |
| `/clear`                    | 彻底清空记忆                       |
| `/simplify`                 | 代码简化与重构                     |
| `/code-review` 和 `/review` | 代码审查                           |
| `/run` 和 `/verify`         | 跑起来看看改对了没                 |
| `/batch`                    | 多任务并行编排                     |
| `/diff`                     | 查看 Claude 到底改了什么           |
| `/permissions`              | 管理工具权限                       |
| `/agent`                    | 打开完整的子代理管理界面           |
| `/btw`                      | 中途对话                           |

**详细介绍**

### /loop

**模式一：定时调度（Cron 模式）**

使用：`/loop [间隔] [任务描述]` 

```bash
/loop 30m /code-review         # 每 30 分钟跑一次代码审查
/loop 1h "跑一遍单元测试，看看有没有失败的"  # 每小时检查测试
/loop 5m "检查 GitHub 上开放的 PR 状态"    # 每 5 分钟看 PR 动态
```

**模式二：自主迭代（Agentic Loop）**

```bash
/loop "修复 auth 模块里所有失败的单元测试，直到全部通过"
/loop "把 src/legacy 下所有组件迁移到 Tailwind CSS，确保页面渲染正常"
/loop "实现支付宝支付模块，补上单元测试，确保全部通过"
```

普通模式下 Claude 写完代码就交给你了，报错你得自己贴回去。`/loop` 模式下，它自己读报错、自己改、自己重跑测试，全程不用你盯着。

**怎么管理任务**

直接用自然语言跟 Claude 说就行：

```bash
我现在有哪些定时任务？
停掉那个检查部署的任务
```

- **建议加上限。** 目标一直达不到它会一直跑。在指令里加一句"最多尝试 10 次"之类的约束。
- **写清停止条件。** 包括最多尝试次数和验收标准（测试全部通过/CI green/无 lint error）。

### /simplify

**不负责找逻辑 Bug。**

它主要看复用、简化、效率和抽象层级是否合适；如果你想找“代码有没有写错”，应该用 `/code-review`

> **工作机制**：三步
>
> **第一步：确定审查范围。** 通常围绕最近变更文件工作；不带参数时，它跑 `git diff` 拿增量变更；如果工作区没有未提交的修改，它会自动审查最近一次 commit。指定具体类名时（比如 `/simplify MarketDataService`），它会读取整个文件做全量审查。具体范围以当前 Claude Code 版本行为为准。
>
> **第二步：并行启动四个审查 Agent。** 不是串行地逐条检查，而是同时派出四个“审查员”，各自带着不同的视角去读同一份 diff：
>
> ![image-20260615205142841](/notes/vibecoding-claudecode/image-20260615205142841.png)
>
> **第三步：汇总并修复。** 四个 Agent 各自报告发现，Claude Code 会自动判断哪些是真问题、哪些是误报，然后应用它认为安全的清理类修复。

### /code-review 和 /review

`/code-review` 关注**正确性、边界条件和潜在 Bug**。需要审查 PR 时，再用 `/review` 指定 PR。

> **工作机制**：`/code-review`
>
> **第一步：拿到变更。** 它先跑 `git diff` 拿增量变更，或者根据你指定的 PR 读取远程变更。
>
> **第二步：并行分析。** Claude Code 并行审查变更，结合置信度过滤来减少误报。
>
> **第三步：输出分级报告。** 最后你会拿到一份分级的问题清单（Critical / High / Medium / Low），每个问题带具体行号、原因和修复建议。
>
> - `/code-review high`    # 只看高严重性问题 
> - `/code-review --fix`   # 审查并自动修复部分问题 
>
> 如果要审查具体 PR，用 `/review`
>
> - `/review `             # 审查当前分支对应 PR，或本地 PR 语境 
> - `/review 123`          # 审查指定 PR
>
> 文件级审查建议写成自然语言：比如“review src/auth/login.service.ts”。
>
> 审查完发现问题后，你可以直接说"修复所有 Critical 问题"，Claude 会根据审查建议自动改。
>
> ![image-20260615210229702](/notes/vibecoding-claudecode/image-20260615210229702.png)

### /run 和 /verify

`/run`

它会尝试启动当前项目，观察改动是否真的生效。比如你刚改了登录逻辑，`/run` 会把服务拉起来，你可以直接测试。

如果项目结构比较复杂，Claude 可能猜不对启动方式。这时候可以先用 `/run-skill-generator` 记录一次正确的启动流程，后面 `/run` 就会按这个流程来。

`/verify`

它比 `/run` 轻量，主要做构建和运行验证，确认改动是否符合预期。适合改完代码后快速检查有没有编译错误或明显运行时问题。

`/run-skill-generator`

普通 Node、Python、Java 项目，Claude 通常能从 README、`package.json`、`Makefile` 里推断启动方式。复杂项目就别赌它猜对，让 `/run-skill-generator` 跑一次，把正确的启动流程记下来。后面 `/run` 和 `/verify` 就不用再猜了。

### /batch

核心本质是多任务并行编排器，它的强大之处在于它能将一个复杂的"大需求"**自动拆解并并行执行**。

> - **任务拆解 (Task Decomposition)：** 当你说一个大任务或者多条需求的时候，Claude 并没有胡乱开始，而是将其逻辑拆分成独立的 **Unit（工作单元）**。
> - **并行工作 (Parallel Workers)：** Claude 会同时启动多个后台 Agent，分别处理不同的功能模块。
> - **独立工作区 (Independent Worktrees)：** 为了防止多个 Agent 同时修改代码导致冲突，Claude 为每个 Worker 创建了独立的 **Git Worktree**。这意味着它们在物理隔离的环境中修改代码，互不干扰。

**使用方法很简单**：

```bash
/batch  1、移除自选股界面，直接通过分析界面来管理，每一行股票的最右侧展示选项，支持删除和分组。
  2、自选股提取一个组件、K线展示和讨论室都单独提取一个组件出来。
  3、优化提示词管理，例如支持删除和重命名。
  4、历史记录目前支持10条记录，这块的设计优化一下。
```

> Claude 收到后会先给出拆分计划（通常 5～30 个 unit），经确认后在隔离 worktree 中并行执行，每个单元通常产出独立 PR。
>
> 每个 Worker 完成后，主进程会检查每个单元的改动，最终产出多个独立 PR（而非合并成一个大的 PR）。
>
> **风险提示**：`/batch` 适合边界清晰、模块相对独立的大任务；不适合强耦合核心链路一次性大改。共享文件（如 package.json、路由表、公共类型、数据库迁移脚本）容易冲突。使用前建议先 commit 干净工作区。

### /context

作为查看上下文内容的命令 在上下文管理中至关重要 下面我将用一个例子介绍如何使用这个命令

```java
 /context
  ⎿  Context Usage
     ⛁ ⛁ ⛁ ⛁ ⛁ ⛁ ⛁ ⛁ ⛁ ⛁   deepseek-v4-pro
     ⛀ ⛀ ⛁ ⛀ ⛁ ⛁ ⛁ ⛁ ⛁ ⛁   79.4k/200k tokens (40%)  		  //已使用40% 健康状态
     ⛁ ⛁ ⛁ ⛁ ⛁ ⛁ ⛁ ⛁ ⛁ ⛁
     ⛁ ⛁ ⛁ ⛁ ⛁ ⛁ ⛁ ⛁ ⛁ ⛁   Estimated usage by category 		   // 分类使用明细
     ⛁ ⛀ ⛶ ⛶ ⛶ ⛶ ⛶ ⛶ ⛶ ⛶   ⛁ System prompt: 6.2k tokens (3.1%)   //系统基础指令
     ⛶ ⛶ ⛶ ⛶ ⛶ ⛶ ⛶ ⛶ ⛶ ⛶   ⛁ System tools: 15.1k tokens (7.5%)   //内置工具（run、verify、loop等）
     ⛶ ⛶ ⛶ ⛶ ⛶ ⛶ ⛶ ⛶ ⛶ ⛶   ⛁ Memory files: 68 tokens (0.0%) 	//你的 MEMORY.md 记忆文件
     ⛶ ⛶ ⛶ ⛶ ⛶ ⛶ ⛶ ⛶ ⛶ ⛶   ⛁ Skills: 3.3k tokens (1.6%) 	    //你加载的那些需求工程技能
     ⛶ ⛶ ⛶ ⛝ ⛝ ⛝ ⛝ ⛝ ⛝ ⛝   ⛁ Messages: 55.3k tokens (27.6%)   //对话历史（最大头）
     ⛝ ⛝ ⛝ ⛝ ⛝ ⛝ ⛝ ⛝ ⛝ ⛝   ⛶ Free space: 87.1k (43.5%)		 //还可以用的空间
                           ⛝ Autocompact buffer: 33k tokens (16.5%)   //自动压缩缓冲，满了会自动压缩旧消息
 Memory files · /memory
 └ C:\Users\DELL.claude\projects\D--git-agent-002\memory\MEMORY.md: 68 tokens
//memory文档的地址
 Skills · /skills
//这里会显示所有skill
```

### /agents

你可以创建**专门的 AI 子代理（Subagent）**，用于处理特定类型的任务，从而获得更好的上下文隔离、更强的约束控制和更高的执行效率。

子代理运行在**独立的上下文窗口**中，当 Claude 判断你的请求符合某个子代理的描述时，会自动将任务委托给它。

> *子代理只接收自身的系统提示和基础环境信息（如工作目录），**不会继承完整的 Claude Code 系统提示***，这保证了行为的纯净和可控。

#### 为什么要使用子代理

- **保留主对话上下文**：把探索、日志分析等"重任务"放到子代理中，主对话只接收结论摘要，不被大量中间输出淹没。
- **强制执行约束**：通过工具白名单或黑名单限制子代理的能力，例如只读分析、禁止执行危险命令。
- **行为专业化**：为特定领域（代码审查、调试、数据分析）设计专用 AI
- **控制成本**：将简单任务交给 Haiku，将复杂分析交给 Sonnet，通过环境变量 `CLAUDE_CODE_SUBAGENT_MODEL` 统一设置所有子代理使用的模型。
- **跨项目复用**：用户级子代理一次配置，所有项目可用。

#### 创建agent

**1 新建agent**

![image-20260618004428093](/notes/vibecoding-claudecode/image-20260618004428093.png)

​	1->仅对该项目创建
​	2->对全局项目创建

![image-20260618005516540](/notes/vibecoding-claudecode/image-20260618005516540.png)

使用claude推荐模板

- Manual configuration 手动配置

![image-20260618005847187](/notes/vibecoding-claudecode/image-20260618005847187.png)

**2 自然语言描述创建**

![image-20260618010022275](/notes/vibecoding-claudecode/image-20260618010022275.png)

**3 配置工具权限与模型**

- 只做代码审查 → 仅勾选只读工具（Read / Grep / Glob）
- 需要修改代码 → 保留 Edit / Write 工具
- 模型推荐选择 **Sonnet**，分析能力与执行速度较为均衡

直接选 Contiune 然后回车：

![image-20260618010403059](/notes/vibecoding-claudecode/image-20260618010403059.png)

- 接下来默认回车

**4 选择记忆范围（可选）**

- 选择 **User**：在 `~/.claude/agent-memory/` 建立持久记忆，跨所有项目积累经验
- 选择 **None**：不保留学习成果，每次任务从零开始

![image-20260618010642047](/notes/vibecoding-claudecode/image-20260618010642047.png)

**5 使用刚创建的代理**

![image-20260618010828741](/notes/vibecoding-claudecode/image-20260618010828741.png)

> 实际上Claude 会根据 `description` 字段自动判断任务是否适合某个子代理，无需在提示中手动指定

**6 好用的场景**

1 将产生大量中间输出的任务（如运行测试、扫描日志）放到子代理中，主对话只接收精简的结论：

```
使用子代理运行所有测试，只返回失败的测试和根因分析
```

2 同时启动多个子代理处理不同模块，大幅缩短分析时间：

```
并行使用子代理分别分析认证模块、数据库模块和 API 模块，汇总后给出整体架构建议
```

3 将复杂工作流拆分为多个专职代理，按顺序传递结果：

```
先用 code-reviewer 找出问题，再用 optimizer 子代理修复这些问题
```

### 几个容易被忽略的辅助命令

如果任务已经聊了很久，但还想继续推进，可以用：

```bash
/compact 只保留当前重构目标、已完成改动、剩余 TODO、关键约束
```

`/compact` 会总结当前会话，释放一部分上下文。大任务中途做一次 compact，但一定要给它明确的保留范围，不要只裸跑 `/compact`。

启动时

- 智能自动模式（推荐日常使用）claude --permission-mode auto
- 完全放权模式（沙盒/CI 环境）claude --permission-mode bypassPermissions

已经启动 Claude Code 后，不用退出，按 Shift + Tab 循环切换：

- ask →plan → default → ask → ...

**开发流程**

1. 需求阶段：BRD + **PRD** + 原型图
2. 设计阶段：架构图 + 数据库设计 + API文档 + 时序图
3. 开发阶段：源代码 + 单元测试 + 代码评审记录
4. 测试阶段：测试计划 + 测试用例 + 缺陷报告 + 测试报告
5. 部署阶段：发布清单 + 配置脚本 + 回滚预案
6. 运维阶段：监控大盘 + 告警规则 + 运维手册

**一个稳健的工作流是这样的**：

> 1. `/context` 先看上下文是否健康
> 2. `/permissions` 检查权限设置是否合理
> 3. `/batch` 把大需求拆成多个独立任务
> 4. `/loop` 处理需要反复验证的复杂任务
> 5. `/simplify` 清理冗余代码和技术债
> 6. `/code-review` 做正确性审查
> 7. 涉及登录、支付、权限、上传、Webhook 等敏感模块，再跑 `/security-review`
> 8. 如果已经有 PR，再用 `/review` 做 PR 级审查
> 9. `/verify` 快速验证改动是否有编译或运行时问题
> 10. `/diff` 人工确认改动
> 11. 最后跑测试、提交 PR
>
> 这一套走下来，能显著减少机械操作，但关键节点仍要看计划、看 diff、跑测试、做最终 review。

本文参考文档：

1> [Claude Code 核心命令详解：simplify、code-review、loop、batch、run、verify | JavaGuide](https://javaguide.cn/ai-coding/practices/claudecode-commands.html)

## Vibecoding技巧总结

### 先把 Git 准备好

让 Agent 改代码前，先看工作区：

```bash
git status --short
```

确认干净后，再给当前任务单独开分支：

```bash
git switch -c feat/order-export
```

AI 改完后，别急着看它的总结，先看仓库自己怎么说：

```bash
git diff --stat
git diff
```

`git diff --stat` 看影响面，`git diff` 看细节。确认没问题之后，再分块暂存和提交

```bash
git add -p
git commit -m "feat: add order export"
```

一个提交只做一件事。能分块提交就分块提交，后面 Review、回滚、定位问题都会轻很多。AI 说“我只改了导出逻辑”，不如 diff 可信。

改坏了也尽量用可控回滚：

```bash
# 丢弃某个未提交文件的修改
git restore path/to/file

# 撤销已经暂存的文件
git restore --staged path/to/file

# 已经提交并推送过，优先生成反向提交
git revert <commit>
```

`git reset --hard` 不是什么禁术，但别随手交给 Agent。除非当前分支就是一次性实验分支，否则它很容易把没保存好的改动一起抹掉。

并行任务可以用 `git worktree` 隔离：

```bash
git worktree add ../project-order-export -b feat/order-export
git worktree add ../project-refactor-user -b feat/refactor-user
```

一个 Agent 一个目录、一个分支、一个任务。这样它们即使乱改，也只会乱在自己的工作区里。

### 开工前先把范围写窄

你需要让 AI 做什么，尽量说得具体一些，不要让它自己猜。

例：帮我实现导出订单功能。

不如在开工前花几分钟写轻量 Spec：

```bash
## 目标

实现订单导出接口，支持按时间范围导出 CSV。

## 约束

- 单次最多导出 5000 条
- 时间范围不能超过 31 天
- 只能导出当前租户的数据
- 查询必须走 order_tenant_time_idx
- 导出失败要记录失败原因，不能只返回 unknown error

## 验收

- 正常导出 CSV，字段顺序为 order_no、amount、status、created_at
- 超过 5000 条返回明确错误
- 越权租户数据不能被导出
- 单元测试覆盖无数据、越权、超过条数、超过时间范围 4 种情况
```

小任务写清楚目标、约束和验收就够了；中等任务再补接口格式、错误码、表结构；大一点的需求，再拆成 `requirements.md`、`design.md`、`tasks.md`。没必要一上来就把流程拉满，不然你会先被文档劝退。

### 拿到需求的工作流程

1 建立prd需求文档
2 建立数据库表与字段 人工审核一下
3 建立接口文档 人工审核一下 需要哪些功能都一次性建立好
4 按照接口文档开发后端
5 测试接口 可人工可ai
6 开发前端
7 单元测试

### 模型的选择与使用

>**第一步**，让 Claude Opus 4.6 / Opus 4.7 这类顶级模型读需求和代码库。 只让它做方案、列风险、拆任务，不让它急着写代码。 
>
>**第二步**，方案确认后，把一个个 Task 丢给 DeepSeek V4-Pro / GLM5.1 或同级低价模型。 让它按任务编码、补测试、跑命令，做完之后给出 diff 摘要。
>
> **第三步**，把 git diff 交回 Claude Opus 4.6 / Opus 4.7。 这次只让它 Review：Bug、越权风险、事务边界、性能问题、测试缺口。

代码审计也可以这么干。先让便宜模型扫一遍项目，把疑似问题列出来；再让强模型复核这些问题到底成不成立。直接让高价模型全量扫，当然也不是不行，就是钱烧得快，收益未必成比例。

### 上下文处理

**第一，别把仓库一股脑塞进去。**

**第二，长任务要及时压缩。**

**第三，关键进展要落到文件里。** 比如让 Agent 在长任务中维护一份 `NOTES.md` 或任务 handoff

一个会话只处理一个任务；超过两次纠正还不对，就开新会话；
新会话只带当前 Spec、相关文件、失败日志、验收命令和上一轮 handoff。

文档也可以当上下文用。AI 改了多个模块后，让它补一份变更说明：新增了什么接口，改了哪些表或索引，关键业务规则是什么，如何验证，如何回滚。这样就可以下次继续开发时能直接喂给 AI。

**流程推荐**：

1. 新建分支，先确认工作区是干净的。
2. 写一份轻量 Spec，把目标、约束、验收标准说清楚。
3. 看看有没有合适的 Skill，比如 TDD、Code Review、前端设计、网页调研。
4. 先让顶级模型出方案，只讨论方案，不急着写代码。
5. 方案确认后，再让低价模型按 Task 一步步实现。
6. 每完成一个 Task，就跑测试、看 diff，然后小步提交。
7. 当前 diff 稳住后，再让顶级模型做一次 Review。
8. 修掉 Review 里合理的问题，再跑一遍测试。
9. 合并前，人工看关键 diff。涉及数据、权限、支付、定时任务这类改动时，再补一下文档、回滚方案或者灰度说明。



需求文档 -> 页面原型 -> 修改文档 -> 接口文档 -> 分模块开始开发

```cmd
setx HTTP_PROXY "http://127.0.0.1:7897"
setx HTTPS_PROXY "http://127.0.0.1:7897"
```

## 更多使用介绍

### CLAUDE.md 的使用

CLAUDE.md是 Claude Code 的项目/用户级指令文件，是给 Claude Code 的持久指令和上下文，用于告诉 AI 助手如何在这个项目中工作，本质是一份 **AI 行为规范**。

> 这个文档是需要你来维护的。
>
> 每次对话claude将带上这个文档的内容 遵循内容约定。
>
> 常见内容包括：
>
> - Claude 容易猜错的规则
> - 代码里读不出来的约定
> - 团队必须遵守的规范
> - 技术栈版本、常用命令、架构取舍、项目坑点

#### 放在哪里

最常用的也就是直接放在项目目录下

`./CLAUDE.md` 或 `./.claude/CLAUDE.md ` 

| 位置                                    | 用法                                         |
| --------------------------------------- | -------------------------------------------- |
| `~/.claude/CLAUDE.md `                  | 这里可以放自己的个人偏好 对所有项目生效      |
| `./CLAUDE.md` 或 `./.claude/CLAUDE.md ` | 整个项目的规范                               |
| `./subdir/CLAUDE.md`                    | 访问该目录文件时按需加载，不在会话开始时注入 |
| `./CLAUDE.local.md`                     | 开发多人项目的本地个人规范 加到gitignore里   |

#### 初始化和维护

新项目可以先运行：`/init`

可以用 `/memory` 看当前会话到底加载了哪些 `CLAUDE.md`、`CLAUDE.local.md` 和 rules 文件

**推荐的 CLAUDE.md 结构**

```md
# 项目约定

## 技术栈
- 前端：Next.js 15、TypeScript 5.7、Tailwind CSS 4
- 后端：Node.js 22、Prisma 6
- 测试：Vitest 3.2

## 代码规范
- 始终使用函数式 React 组件
- 文件名使用 kebab-case
- 测试文件与源码放在同一目录

## 常用命令
- 构建：`pnpm build`
- 测试：`pnpm test`
- 启动开发服务器：`pnpm dev`

## API 约定
- 所有 API 路由以 `/api/v1/` 开头
- 错误响应格式：`{ error: string, code: number }`
```

**写好 CLAUDE.md 的黄金法则**

> **要这样写:**
>
> - 使用祈使句和简短列表，而非叙述性段落
> - 包含具体的版本号和命令
> - 加入代码示例（5 行示例胜过 50 字说明）
> - 控制在 **200 行以内**
>
>  **避免这样写：**
>
> - 模糊指令如"遵循最佳实践"或"写干净的代码"
> - 过多通用规则（只放这个项目独有的约定）
> - 过时的信息（建议每月审查一次）

### Code Intelligence 插件

它本质上是给 Claude 接了一套语言服务器能力，让它能直接看类型错误、找符号定义、查引用关系，而不是每次都靠 `Read 文件 + grep 文本` 搜一大片文件。

**安装步骤**

1. 在 Claude Code 里直接装：

```
/plugin install typescript-lsp@claude-plugins-official
/reload-plugins
```

2. 安装不同语言对应不同的 server：

   | 插件                | 你要装的二进制               |
   | :------------------ | :--------------------------- |
   | `typescript-lsp`    | `typescript-language-server` |
   | `pyright-lsp`       | `pyright`                    |
   | `gopls-lsp`         | `gopls`                      |
   | `rust-analyzer-lsp` | `rust-analyzer`              |
   | `jdtls-lsp`         | `jdtls`                      |

​	TypeScript 的装法：

```bash
npm i -g typescript typescript-language-server
```

### MCP 介绍

MCP 是 Anthropic 推出的一套开放的标准化协议，专为**解决AI 与外部工具协作**的核心痛点而生。

MCP 的核心逻辑：不要让 AI 去逐一学习所有工具的使用规则，而是让所有工具都提供一个统一的接口给 AI。

连接 MCP 服务器后，你可以让 Claude Code：

- 从 JIRA/工单系统获取需求并开发功能、创建 GitHub PR
- 分析 Sentry 监控数据、定位生产环境错误
- 查询 PostgreSQL/MySQL 等数据库数据
- 基于 Figma 设计更新代码、自动化生成邮件草稿等

### Skills 介绍

Skill 就是一份能被 Agent 按需加载的任务说明。它不是插件，也不是 MCP 工具本身，而是把某类任务的流程、约束、检查项和踩坑经验写进 `SKILL.md`。

#### superpower

Superpowers 把整个软件开发过程编排成七个阶段，每个阶段有明确的「入口条件」和「出口条件」——你不走完当前阶段，就不让你进入下一个。

```text
头脑风暴 → 设计确认 → 工作区隔离 → 编写计划 → 子代理开发 → 代码审查 → 分支收尾
```

> 1> 当你告诉 Claude「帮我做一个 XX 功能」时，Superpowers 不会让它直接动手。它会启动苏格拉底式对话，通过递进式提问挖掘需求细节
>
> 2> 需求澄清后，Claude 把设计方案拆成小块，逐块让你确认。
>
> 3> 设计确认后，Claude 自动创建一个 Git Worktree
>
> 4> Claude 把设计方案拆解成具体的实施计划。每个任务包含：
>
> - **精确的文件路径**：不是「大概在 src 下面的某个地方」，而是 `src/services/PermissionService.ts`
> - **完整的实现步骤**：按顺序列出每一步该做什么
> - **明确的验收标准**：怎样才算完成
>
> 5> 对于每个任务，Claude 会**创建一个全新的子代理**来执行。为什么不让一个 Claude 一路做到底？因为**上下文污染**——对话越长，AI 的判断力越差。新鲜的子代理只接收当前任务的描述和必要的上下文，不会被之前的对话历史干扰。
>
> 6> 所有任务完成后，一个独立的审查子代理对**整个代码库**做最终审查。它不是只看最后改的几行，而是从全局视角评估变更的影响。
>
> 7> 审查通过后，Claude 会问你怎么处理这个分支：
>
> ```text
> 所有任务完成，测试通过率 100%。
> 下一步选择：
> 1. 创建 Pull Request（推荐）
> 2. 本地合并到 main 分支
> 3. 保留分支，稍后处理
> 4. 丢弃这个 worktree
> ```

**目录结构**

```text
superpowers/
├── skills/                          # 所有技能文件
│   ├── brainstorming/
│   │   └── SKILL.md                 # 头脑风暴技能
│   ├── test-driven-development/
│   │   └── SKILL.md                 # TDD 技能
│   ├── systematic-debugging/
│   │   └── SKILL.md                 # 系统化调试技能
│   ├── subagent-driven-development/
│   │   └── SKILL.md                 # 子代理开发技能
│   ├── writing-plans/
│   │   └── SKILL.md                 # 编写计划技能
│   ├── using-git-worktrees/
│   │   └── SKILL.md                 # Git Worktree 技能
│   ├── requesting-code-review/
│   │   └── SKILL.md                 # 请求审查技能
│   ├── receiving-code-review/
│   │   └── SKILL.md                 # 接收审查技能
│   ├── finishing-a-development-branch/
│   │   └── SKILL.md                 # 分支收尾技能
│   ├── dispatching-parallel-agents/
│   │   └── SKILL.md                 # 并行代理调度技能
│   ├── verification-before-completion/
│   │   └── SKILL.md                 # 完成前验证技能
│   ├── writing-skills/
│   │   ├── SKILL.md                 # 编写新技能的元技能
│   │   └── anthropic-best-practices.md
│   └── using-superpowers/
│       └── SKILL.md                 # 框架使用说明
├── agents/                          # 代理配置
├── commands/                        # CLI 命令
├── docs/                            # 文档
├── .claude-plugin/                  # Claude Code 插件配置
├── .cursor-plugin/                  # Cursor 插件配置
└── README.md
```

**注意：**技能不需要手动调用，它们根据上下文自动触发

Superpowers 最强大的地方之一是它的**可扩展性**。你可以用内置的 `writing-skills` 元技能来创建自己的技能。

## 一些有用的扩展

### 将claudecode连接到手机

github项目

> [cc-connect](https://github.com/chenhg5/cc-connect)

![image-20260618224822476](/notes/vibecoding-claudecode/image-20260618224822476.png)

**通过 AI Agent 安装配置（推荐）**

> **最简单的方式** — 把这段话发给 Claude Code 或其他 AI 编码 Agent，它会帮你完成整个安装和配置过程：

```
请参考 https://raw.githubusercontent.com/chenhg5/cc-connect/refs/heads/main/INSTALL.md 帮我安装和配置 cc-connect
```

### Headroom

一个开源的 **LLM token 压缩层**，专门用于压缩 AI Agent 读取的所有内容——工具输出、日志、RAG 检索结果、文件和对话历史——在发送给 LLM 之前进行智能压缩。

核心价值：**同样的答案，只用 5-40% 的 token**。对于每天大量使用 AI 编程助手（Claude Code、Cursor、Codex 等）的开发者来说，这意味着 **API 成本直接降低 60-95%**。

#### 安装 Headroom

**Python 安装**

安装完整版本（包含 proxy、MCP、ML 等所有功能）

```
pip install "headroom-ai[all]"
```

> 注意 要预先安装 VS

```
# 检查版本和功能
headroom --version
```

**启动**

如果你已经在使用某个 AI 编程助手，只需一条命令即可启用 Headroom：

```
# 包装 Claude Code
headroom wrap claude
```



```
# 运行性能测试，查看当前环境的压缩效果
headroom perf
```



### serena















