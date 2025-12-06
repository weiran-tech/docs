---
description: '1.0.2025110117011.0.083114511.0.082710141.0.081916311.0.072615291.0.062517151.0.06181915本版本将 Poppy 的命名空间统一更改为 Weiran , Weiran 对应的中文是蔚然, 取自蔚然成林, 寓意茂盛, 希望这个框架的基础上帮助发展的更好, 蒸蒸日上'
lastUpdated: '2025-11-01 17:18:00'
head: 
  - - meta
    - name: 'og:title'
      content: '升级说明'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '1.0.2025110117011.0.083114511.0.082710141.0.081916311.0.072615291.0.062517151.0.06181915本版本将 Poppy 的命名空间统一更改为 Weiran , Weiran 对应的中文是蔚然, 取自蔚然成林, 寓意茂盛, 希望这个框架的基础上帮助发展的更好, 蒸蒸日上'
  - - meta
    - name: 'og:url'
      content: 'https://weiran.tech/wr-1.x/upgrade.html'
---
# 升级说明



## 1.0

**1.0.202511011701**

- 移除 bootstap 依赖 / Dropdown 支持
- 修复后台列表的隐藏问题

**1.0.08311451**

-  `aliyun-oss`  接口支持 sts 授权临时目录

**1.0.08271014**

- Sts 升级为 aliyun 的最新包, 写法不一致导致的 Sts 错误
- Sts 授权支持子目录

**1.0.08191631**

-  `PageInfo`  的分页  `abs`  问题
- 获取不到上一页为  `null`  的问题

**1.0.07261529**

- 修改自动维护时间为数据库自维护

**1.0.06251715**

-  `alibabacloud/sts-20150401`  1.1.5 版本存在  `Error: Call to undefined method Darabonba\OpenApi\Utils::getEndpointRules()`  错误, 固定版本解决
- 重写 aliyun-oss 中的变量读取方式, 支持单元测试变量覆盖
- 业务层依赖可以更改为  `1.0.*`  来引用

**1.0.06181915**

- 变量提取到运行时
- 版本根据日期以及发布时间来定义

## 基础

### 命名空间

本版本将  `Poppy`  的命名空间统一更改为  `Weiran`  ,  `Weiran`  对应的中文是蔚然, 取自蔚然成林, 寓意茂盛, 希望这个框架的基础上帮助发展的更好, 蒸蒸日上

## 事件

- 计划任务事件名称  `console.schedule`  更新为  `\Poppy\Framework\Events\WeiranSchedule`  

```diff
- app('events')->listen('console.schedule', function (Schedule $schedule) {
+ app('events')->listen(WeiranSchedule::class, function (Schedule $schedule) {
	
	// schedule
});
```

## 1.0 

- (framework) 因为不常用, 所以移除 ini 解析器, Xml 解析器
- (framework) 接口支持 Swagger / OpenApi 3.0 

## TODO

- [ ] 框架支持 CAS, 支持多应用的核心对接, 实现 PHP 的中心化
- [ ] 支持自定义的模型查询, 方便 SQL 优化
- [ ] 导出支持大数据量查询, 直接从数据库中导出数据
- [ ] 使用 Request 替代 input 进行权限的校验



```shell
Cannot make 'Faker\Generator': Class 'Poppy\Faker\Provider\zh_CN\Barcode' not found.
Cannot make 'Illuminate\Bus\DynamoBatchRepository': Trying to access array offset on value of type null
Cannot make 'Illuminate\Contracts\Auth\Authenticatable': Cannot create instance for 'Illuminate\Contracts\Auth\Authenticatable', received 'null'
Cannot make 'auth.password.broker': Illuminate\Auth\Passwords\PasswordBroker::__construct(): Argument #2 ($users) must be of type Illuminate\Contracts\Auth\UserProvider, null given, called in /Users/duoli/Projects/dl.poppy/weiran-v1/vendor/laravel/framework/src/Illuminate/Auth/Passwords/PasswordBrokerManager.php on line 70
Cannot make 'cache.psr6': Class 'Symfony\Component\Cache\Adapter\Psr16Adapter' not found.
Cannot make 'clockwork.swift': Method Illuminate\Mail\Mailer::getSwiftMailer does not exist.
Cannot make 'clockwork.twig': Target class [twig] does not exist.
Cannot make 'env': Class 'local' not found.
Cannot make 'tymon.jwt.provider.jwt.namshi': Class 'Tymon\JWTAuth\Providers\JWT\Namshi' not found.
```

