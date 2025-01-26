---
description: ''
lastUpdated: '2023-12-11 18:45:00'
head: 
  - - meta
    - name: 'og:title'
      content: '文件目录树'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: ''
  - - meta
    - name: 'og:url'
      content: 'https://weiran.tech/1.x/tree.html'
---
# 文件目录树



> 本文件目录树支持 Laravel 5.1 版本

```
.
├── README.md         # 说明文档
├── app
│   ├── Channels      # 频道
│   ├── Console       # 命令行
│   │   ├── Commands        # 命令行 - 命令所在位置
│   │   └── Kernel.php      # 注册命令和计划任务
│   ├── Events        # 事件
│   │   ├── Auth          # 账号
│   │   ├── Cash          # 提现
│   │   ├── Charge        # 充值
│   │   ├── Order         # 订单
│   │   ├── Platform      # 平台事件
│   │   └── Rebate        # 返利
│   ├── Exceptions        # 异常处理
│   ├── Http
│   │   ├── Controllers   # 控制器
│   │   ├── Kernel.php
│   │   ├── Middleware    # 中间件
│   │   ├── Requests      # 表单请求(弱化)
│   │   ├── Routes        # 子路由注册
│   │   └── routes.php    # 路由入口文件
│   ├── Jobs          # 队列
│   │   ├── Dailian       # 平台
│   │   ├── Order         # 订单
│   │   ├── Pam           # 账号
│   │   ├── Up            # 上家发单
│   │   └── User          # 用户
│   ├── Lemon         # 柠檬框架核心类库
│   │   ├── Dailian       # 代练项目专用
│   │   ├── Repositories  # 核心库
│   │   └── Suit          # 配置/定义文件
│   ├── Listeners     # 事件监听(文件夹和事件匹配, 不详述)
│   │   ├── Auth
│   │   ├── Cash
│   │   ├── Charge
│   │   ├── Order
│   │   ├── Platform
│   │   └── Rebate
│   ├── Models        # 模型定义, 模型说明和字段参考模型注释
│   ├── Policies      # 策略定义文件, 命名和模型相匹配
│   ├── Providers     # 服务提供者
│   │   ├── AppServiceProvider.php      # 应用
│   │   ├── BusServiceProvider.php      # 命令
│   │   ├── EventServiceProvider.php    # 事件
│   │   ├── RouteServiceProvider.php    # 路由
│   │   └── SubUserServiceProvider.php  # 子用户
│   └── build.md
├── artisan
├── bootstrap     # 启动文件
│   ├── app.php
│   └── autoload.php
├── composer.json # composer
├── config        # 配置文件
├── database      # 数据库生成器(弱化)
├── public        # 主目录
│   └── index.php     # 入口文件
├── resources     # 资源文件
│   ├── docs          # 文档
│   ├── key           # 密钥
│   ├── lang          # 语言包
│   │   ├── en
│   │   └── zh
│   ├── sami          # sami 文档生成工具配置
│   ├── shell         # 上家通知脚本
│   ├── storage       # 存储
│   └── views         # 视图文件
├── server.php
├── storage       # 存储
│   ├── app           # 应用存储
│   ├── clockwork     # 插件 - clockwork
│   ├── console       # 命令行日志文件
│   ├── framework     # 框架缓存,session,视图
│   ├── logs          # 框架日志
│   ├── purifier
│   └── server
├── tests         # 自动化测试
└── vendor        # 第三方目录
```

