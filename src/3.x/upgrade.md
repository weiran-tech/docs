---
description: ''
lastUpdated: '2025-02-16 11:53:00'
head: 
  - - meta
    - name: 'og:title'
      content: '升级说明'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: ''
  - - meta
    - name: 'og:url'
      content: 'https://weiran.tech19c49524-d1e0-80b1-910d-f399ef031daa.html'
---
# 升级说明



## 3.2

- php 最低限制 7.4
- composer 版本  `2.*` 
- (framework) 放开 laravel 6.0 的限制至  `6.*` 

## 3.1 

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



