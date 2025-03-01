---
description: '这个版本从 Poppy 4.2 升级到 Weiran 1.0本版本将 Poppy 的命名空间统一更改为 Weiran , Weiran 对应的中文是蔚然, 取自蔚然成林, 寓意茂盛, 希望这个框架的基础上帮助发展的更好, 蒸蒸日上'
lastUpdated: '2025-02-16 17:29:00'
head: 
  - - meta
    - name: 'og:title'
      content: '升级说明'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '这个版本从 Poppy 4.2 升级到 Weiran 1.0本版本将 Poppy 的命名空间统一更改为 Weiran , Weiran 对应的中文是蔚然, 取自蔚然成林, 寓意茂盛, 希望这个框架的基础上帮助发展的更好, 蒸蒸日上'
  - - meta
    - name: 'og:url'
      content: 'https://weiran.tech/wr-1.x/upgrade.html'
---
# 升级说明



这个版本从 Poppy 4.2 升级到 Weiran 1.0

## 基础

### 命名空间

本版本将  `Poppy`  的命名空间统一更改为  `Weiran`  ,  `Weiran`  对应的中文是蔚然, 取自蔚然成林, 寓意茂盛, 希望这个框架的基础上帮助发展的更好, 蒸蒸日上

## 事件

- 计划任务事件名称  `console.schedule`  更新为  `\Poppy\Framework\Events\PoppySchedule`  

```diff
- app('events')->listen('console.schedule', function (Schedule $schedule) {
+ app('events')->listen(PoppySchedule::class, function (Schedule $schedule) {
	
	// schedule
});
```

## 1.0 

- (framework) 因为不常用, 所以移除 ini 解析器, Xml 解析器

## TODO

- [ ] 框架支持 CAS, 支持多应用的核心对接, 实现 PHP 的中心化
- [ ] 接口规范变更, 支持 Swagger 接口模式
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

