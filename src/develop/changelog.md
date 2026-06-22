---
description: '该版本修复了alibabacloud/sts版本锁定问题，及1.1.5版本的调用错误；改进aliyun-oss支持STS临时目录授权、变量延迟读取，并统一项目版本定义；移除Apidoc、Clockwork等功能，优化短信服务商动态切换及登录入口隐藏。'
lastUpdated: '2026-06-22 17:33:45'
head:
  - - meta
    - name: 'og:title'
      content: '更新日志'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '该版本修复了alibabacloud/sts版本锁定问题，及1.1.5版本的调用错误；改进aliyun-oss支持STS临时目录授权、变量延迟读取，并统一项目版本定义；移除Apidoc、Clockwork等功能，优化短信服务商动态切换及登录入口隐藏。'
  - - meta
    - name: 'og:url'
      content: 'https://weiran.tech//develop/changelog.html'
---
# 更新日志

## 4.2

### **4.2.114**

- `alibabacloud/sts-20150401` 存在使用不当问题, 不再锁定版本
- `aliyun-oss` 支持 sts 授权临时目录

### **4.2.112**

- 移除 `Apidoc` , 生成监听以及 `Console` 上报的功能
- 修复了 Resp 类中 `Session**::**previousUrl()` 的部分方法
- 移除了 `Clockwork` 和 `Progress` 相关的控制器和视图
- 框架登录增加变量 `poppy.mgr-page.account_login` 用来隐藏登录入口

### **4.2.104**

- `alibabacloud/sts-20150401` 1.1.5 版本存在 `Error: Call to undefined method Darabonba\OpenApi\Utils::getEndpointRules()` 错误, 固定版本解决
- 重写 aliyun-oss 中的变量读取方式, 支持单元测试变量覆盖

### **4.2.103**

> 自这个版本起, 所有的项目均采用同样的版本定义

**poppy/sms**

- 变量不在初始化中获取, 减少内存读取
- 短信发送服务商可以不重启即可更换

**poppy/aliyun-oss**

- 变量移动到使用时候获取

**poppy/aliyun-push**

- 变量移动到使用时候获取

**poppy/mgr-page**

- 变量移动到使用时候获取

**poppy/system**

- 变量移动到使用时候获取
- 移除 Develop 类
- 更改密钥为命令行配置, 依赖于环境变量, 不依赖于缓存

**poppy/ext-alipay**

- 移除 ExtensionServiceProvider 加载项

### 4.2.102

**poppy/system (4.2.102)**

- 修复 `The "" file does not exist or is not readable` 错误, 对上传的图片未进行有效性判定

### 4.2.85

**poppy/system (4.2.85)**

- captcha 发送进行类型验证, 手机号 int 类型无法传值

**poppy/ext-ip_store (4.2.2)**

- 更新最新版纯真库, 支持 poppy.php 进行配置, 默认为 mon17

**poppy/aliyun-oss (4.2.5)**

- 支持 env 单元测试, 只保留 putObject STS 授权,移除 put\*

### 4.2.0

- 支持严格模式
- (mgr-page) 移除 fontawesome 字体, 使用 bootstrap icons
- (mgr-page) 增加 bootstrap-icons
- (mgr-page) 支持用户密码的复杂配置
- (mgr-page) 支持后台绑定手机号, 支持后台手机号和用户名的切换登录
- 支持自定义的模型查询, 方便 SQL 优化
- 导出支持大数据量查询, 直接从数据库中导出数据

## 4.1

### 4.1.0

- (module) 使用 PSR 规范加载模块

## 4.0

### 4.0.0

- (framework) 移除框架的文件加载
- (framework) 移除 Mocker, 采用 seldom 自动化接口测试框架
- (framework) sami 文档生成工具替换为 doctum
- (system) 异常处理推荐 `Framework` 的 `Handler`
- (system) 分离 system 的 mgr-page
- (system) 移除 `ui.yaml` 文件定义
- (system) 移除 `JwtAuthGuard` 和 `jwt` 包重复
- (core) 接口使用 js eval 来执行, 来源自 apidoc 升级
- (module) migration 目录和 seeds 目录变更
- (ext) 加入 phpstan 进行静态代码分析

## 3.x

### 3.2.0

- php 最低限制 7.4
- composer 版本 `2.*`
- (framework) 放开 laravel 6.0 的限制至 `6.*`

### 3.1.0

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
- (framework) remove `Http\\Middlewares\\CrossPreflight` : 使用 `EnableCrossRequest` 替代
- (framework) Event `PoppyOptimized` move to `src\\Events` folder
- (framework) 模块支持 composer poppy 文件夹加载, [poppy.xxx](http://poppy.xxx/) 为 composer 模块, module.xx 为自定义业务逻辑模块
- (framework) Resp 内置参数 `_json` , `_location` , `_time` , `_forget` , `_time` 更改为下划线前缀
- (framework) `Rule::password()` 和 Laravel 框架的 `password` 规则冲突, 新增 `Rule::simplePwd()` 方法来进行基本的密码校验
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

### 2.0.0

本次升级 Laravel 框架并支持模块加载

- (framework) for laravel 6.0
- (framework) remove agmotto
- (framework) Support Module Loader

## 1.x

### 1.0.0

对本地框架包进行包发布封装, 支持 composer

- (framework) for laravel 5.5
- (framework) Remove `cache_name` function
- (framework) Remove similar function with laravel
- (framework) Resp
- (extension) Move Pinyin Component to Package
- (extension) Doc command remove to System module
- (extension) Add Document for command
- (framework) Delete Graphql
- (framework) Add phplint
- (framework) Add php-cs-fixer