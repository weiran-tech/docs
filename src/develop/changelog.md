---
description: ''
lastUpdated: '2024-01-29 14:46:00'
head: 
  - - meta
    - name: 'og:title'
      content: '更新日志'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: ''
  - - meta
    - name: 'og:url'
      content: 'https://weiran.tech/develop/changelog.html'
---
# 更新日志



## 4.x

- []支持自定义的模型查询, 方便 SQL 优化
- []导出支持大数据量查询, 直接从数据库中导出数据

### 4.2

- 支持严格模式
- (mgr-page) 移除 fontawesome 字体, 使用 bootstrap icons
- (mgr-page) 增加 bootstrap-icons
- (mgr-page) 支持用户密码的复杂配置
- (mgr-page) 支持后台绑定手机号, 支持后台手机号和用户名的切换登录

### 4.1

- (module) 使用 PSR 规范加载模块

### 4.0

- (framework) 移除框架的文件加载
- (framework) 移除 Mocker, 采用 seldom 自动化接口测试框架
- (framework) sami 文档生成工具替换为 doctum
- (system) 异常处理推荐  `Framework`  的  `Handler` 
- (system) 分离 system 的 mgr-page
- (system) 移除  `ui.yaml`  文件定义
- (system) 移除  `JwtAuthGuard`  和  `jwt`  包重复
- (core) 接口使用 js eval 来执行, 来源自 apidoc 升级
- (module) migration 目录和 seeds 目录变更
- (ext) 加入 phpstan 进行静态代码分析

## 3.x

### 3.2

- php 最低限制 7.4
- composer 版本  `2.*` 
- (framework) 放开 laravel 6.0 的限制至  `6.*` 

### 3.1

- (framework) 支持安装
- (framework) 去除 Addon 加载
- (framework) 支持 poppy/文件夹配置
- (framework) 支持 manifest 文件扫描配置用于加载
- (framework) 扩展使用 ext.php 文件来加载配置,降低层级加载
- (framework) 取消 composer 之外的文件加载
- (framework) PoppyTrait 更改为 pyXx 模式, Poppy Function Rename
- (framework) Symfony error FatalErrorException => FatalError
- (framework) Remove lang/zh/http.php
- (framework) Add parse_seo function
- (framework) Remove str-helper generator
- (framework) Remove web-helper
- (framework) Remove PoppyServiceProvider@registerConsoleCommand
- (framework) 更改为强类型(Strong Type)
- (framework) remove  `Http\Middlewares\CrossPreflight`  : 使用  `EnableCrossRequest`  替代
- (framework) Event  `PoppyOptimized`  move to  `src\Events`  folder
- (framework) 模块支持 composer poppy 文件夹加载, poppy.xxx 为 composer 模块, module.xx 为自定义业务逻辑模块
- (framework) Resp 内置参数  `_json` ,  `_location` ,  `_time` ,  `_forget` ,  `_time`  更改为下划线前缀
- (framework)  `Rule::password()`  和 Laravel 框架的  `password`  规则冲突, 新增  `Rule::simplePwd()`  方法来进行基本的密码校验
- (core) 支持权限分离
- (core) 分离 rbac -> core
- (core) 分离 module -> core
- (core) Add Rds 缓存系列工具
- (system) 分离数据库和 system 模块
- (system) 上传图片组件默认不需要配置 token, 如果后台使用可以直接进行使用
- (system) 上传图片支持定义张数, 默认为 3 张
- (system) 加入黑白名单风险防控
- (system) 单用户登录
- (system) 封装 form, 支持 配置方式来调用 Form
- (system) poppy 设置使用 hook 方式
- (system) 加入退出登录接口
- (system) 验证码支持后台定义过期时间以及长度
- (system) 缓存使用 PyXxDef 定义
- (system) 重写持久化
- (system) 是否自动解封用户采用后台配置
- (system) Aliyun Oss 临时授权支持
- (system) Menu 访问简化, 支持域名生成
- (system) 支持 layui 动态表格并可以用 ListX 生成
- (system) 使用 x_app 来获取 app 定义的信息
- (system) Token 使用 jwt 进行验证
- (system) 默认使用国际号码来进行存储
- (system) 支持 Mock 工具
- (system) Sign 签名支持自定义
- (system) 支持上传配置和安装 aliyun-oss 组件
- (system) 拆离组件包到 Core 模块
- (aliyun-push) Ali 推送支持配置访问
- (mgr-page) 从system 中进行拆离
- (mgr-page) 规整加载模版
- (mgr-page) 上传加入签名, 使用 system 接口进行上传
- (mgr-page) 管理平台样式升级为 layui 最新版, 移除 easyweb 多余事件
- (mgr-page) 重写 progress
- (mgr-page) 支持右键新窗口打开页面
- (mgr-page) 定义缓存分组
- (mgr-page) 支持风险拦截
- (mgr-page) develop 平台支持token 传递

## 2.x

- (framework) for laravel 6.0
- (framework) remove agmotto
- (framework) Support Module Loader

## 1.x

- (framework) for laravel 5.5
- (framework) Remove  `cache_name`  function
- (framework) Remove similar function with laravel
- (framework) Resp
- (extension) Move Pinyin Component to Package
- (extension) Doc command remove to System module
- (extension) Add Document for command
- (framework) Delete Graphql
- (framework) Add phplint
- (framework) Add php-cs-fixer

