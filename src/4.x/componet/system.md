---
description: '该系统涵盖项目初始化、用户管理（用户类型、密码加密、通行证）、平台配置（验证码、跨域、上传、CSRF、签名等）、数据更新、访问地址、类命名规范（表名+改动+progress）、中间件（JwtAuthenticate、Ban、SSO）及扩展与组件设置。'
lastUpdated: '2026-06-22 17:29:31'
head:
  - - meta
    - name: 'og:title'
      content: '系统'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '该系统涵盖项目初始化、用户管理（用户类型、密码加密、通行证）、平台配置（验证码、跨域、上传、CSRF、签名等）、数据更新、访问地址、类命名规范（表名+改动+progress）、中间件（JwtAuthenticate、Ban、SSO）及扩展与组件设置。'
  - - meta
    - name: 'og:url'
      content: 'https://weiran.tech//4.x/componet/system.html'
  - - meta
    - name: 'og:image'
      content: 'https://file.wulicode.com/feishu-images/fcd2dd1be9016d7fc5e5686ea5a0a6cf.png'
---
# 系统

## 定义

## 操作

```Plaintext
# 项目初始化
$ php artisan py-system:install

# 用户部分
$ php artisan py-system:user {slug}
```

## 用户

本系统基于角色的权限访问控制（Role-Based Access Control）

### 用户类型

根据使用分为三种用户类型(默认)

```Plaintext
user            # 前台用户
develop         # 开发者用户
backend         # 后台用户
```

对于用户的类型区分我们使用 Header 来进行区分, Header 的名称是 `x-type` 来进行区分, 区分的层级为

```Plaintext
1. 中间件参数 [web, backend, develop, jwt, jwt_backend, jwt_web, jwt_develop]
2. Header参数 [user/backend/develop]
```

参数的类型便是用户的类型, 这里的数据和 guard 起到映射关系, 但无需一致

根据使用到的用户的类型我们应当分为这几项

Guard : web,backend,develop Type : user, backend, develop

```Plaintext
用户 - api (jwt) 驱动
用户 - web 驱动
开发 - web 驱动
后端 - web 驱动
后端 - api (jwt) 驱动
```

每一种用户定义的角色分为三种

```Plaintext
root     : 后台超级管理员
user     : 前台普通用户
develop  : 开发者
```

### 密码加密方式

```Plaintext
$password     : 原始密码
$reg_datetime : 注册时间(datetime) 类型
$randomKey    : 六位随机值
md5(sha1($password . $reg_datetime) . $randomKey);
```

### 通行证约定

| id | int(10) |  |
|-|-|-|
| username | varchar(45) | 字母数字下划线中文, 冒号(英文,子用户使用) |
| mobile | varchar(45) | 手机号, 格式 86-15555555555, 国别手机号 |
| email | varchar(50) | 邮箱 |

因为以上这些可以作为通行证, 所以必须是经过认证的才可以写入这个数据表, 否则无法进行写入

### 平台

平台遵循标准化, x-id: 定义为设备 ID

## 配置

> 本模块的配置是注入到 poppy.php 文件中, 以下的所有配置均可配置 key 是 poppy.system

### captcha_register

- Type : `bool`
- Default: `true`
- Since: `4.2.51`

是否允许通过手机号 + 验证码进行直接注册并登录, 默认开启, 可以通过 env 变量 `PY_SYS_CAPTCHA_LOGIN` 进行快捷设定

### cross_origin

- Type : `string|array`
- Default :

接口请求的时候可以对来源进行设定, 防止 web 端跨域访问资源, 这里的来源可以为 `*` 或者数组, 数组为类似于 `http://poppy.wulicode.com` 这种形式, 如果是网址则只能填写一个完整字串, 或者多个网址, 使用数组进行设定

```Plaintext
'cross_origin'      => [
    'http://poppy.wulicode.com'
],
```

### platform

> 4.0

- Type : `array`
- Default : `[]`

接口请求的时候可以对注册平台进行设定, 用来扩充注册账号的平台

```Plaintext
'platform'      => [
    'harmony' => '鸿蒙'
],
```

### cross_headers

- Type : `string`
- Default : `''`

允许的 Header, 可以允许设定前端访问的时候指定的 Header 可以通过浏览器跨域验证, 多个参数使用 `,` 分隔

```Plaintext
cross_headers => 'X-APP-VERSION'
```

### demo

- Type : `bool`
- Default : `false`

演示模式, 开启则无法上传文件, 修改密码

### upload_image_district

- Type : `array`
- Default : `['default' => 1080,'avatar' => 300,]`

上传图片大小限制, 根据接口上传的 `image_type` 类型对图片进行短边压缩

```Plaintext
'upload_image_district' => [
    'default' => 1920,
    'avatar'  => 300,
    ...
],
```

### csrf_except

- Type : `array`
- Default : `[]`

支持 Laravel 的路由过滤的方式来移除匹配的路由不进行 csrf 验证. 参考 : [CSRF 保护](https://learnku.com/docs/laravel/6.x/csrf/5137)

### uncrypt_cookies

- Type : `array`
- Default : `[]`

使用 laravel cookie 进行设定时, 设定的 cookie 不进行加密输出, 方便 js 进行读取, 共享数据

### password_provider

- Type : `string`
- Default : `''`

密码加载器, 这里这里设定密码算法, 为了保护用户数据安全, 特设定此方式来保护密码计算 默认是 `\Poppy\System\Classes\Auth\Password\DefaultPasswordProvider::class` 替换该实现方式需要实现 `\Poppy\System\Classes\Contracts\PasswordContract::class` 约定.

### user_location

- Type : `string`
- Default : `''`

登录跳转地址, 使用默认的 `web-auth` guard 做验证则需要设定此配置, 当验证失败, 自动跳转到此路径, 这里是路径, 不是路由地址

### route_hide

- Type : `array`
- Default : `[]`

隐藏路由, 后台可以隐藏的路由, 写在这里, 后台列表不予显示

### prefix

- Type : `string`
- Default : `mgr-page`

后台默认登陆入口

### api_enable_sign

- Type : `bool`
- Default : `true`

是否启用 api 签名验证

### api_sign_provider

接口签名算法, 需要实现 `\Poppy\System\Classes\Contracts\ApiSignContract:class` 约定

### ⚠️  payment_types

- Type : `array`
- Default : `[]`

> deprecated : 4.2 

支付类型, 业务侧自行定义, 和框架无关

### sso_group

- Type : `array`
- Default : `[]`

sso 单点登录的分组, 默认数据为

```Plaintext
[
    'app:kicked' => ['android', 'ios'],
    'web.unlimited' => ['h5', 'webapp', 'mp']
];
```

### enable_email

- Type : `bool`
- Default : `false`

是否启用邮箱, 默认关闭, 关闭后账号列表不展示邮箱列, 可以通过环境变量 `PY_SYS_ENABLE_EMAIL` 开启

## ⚠️ 数据更新

> 推荐使用命令行方式更新, 速度快, 可以后台执行

### 访问地址

```Plaintext
http://xxx.com/mgr-page/develop
点击 数据表更新
参数
[
  'method' => '模型名.类名',// 类名多个单词通过 '_' 拼接
];
```

### 类的编写

在每个模块下 progress 文件夹下(没有新建)编写

```PHP
# 类命名规范 数据表名+改动(自定义)+progress
class OrderHunterResultProgress implements Progress
{
  use FixTrait;

  /**
   * @return array fix
   */
  public function handle(): array
  {
    // 初始化 fix
    $this->fixInit();
    // 指定每次更新的条数
    $this->fix['section'] = 100;
    // 重新清理掉缓存
    if (!$this->fix['cached']) {
      $this->fix['cached'] = 1;
    }

    $Db = OrderHunter::where('first_result', '!=', '');

    if (!$this->fix['total']) {
      $this->fix['total'] = $Db->count();
    }
    if (!$this->fix['max']) {
      $this->fix['max'] = $Db->max('id');
    }
    if (!$this->fix['min']) {
      $this->fix['min'] = $Db->min('id');
    }

    // ↑↑↑↑↑↑↑↑↑↑↑   获取参数

    // 剩余数
    $this->fix['left'] = $Db->whereRaw('id > ?', [$this->fix['start']])
      ->count('id');

    $this->fix['lastId'] = $this->fix['start'];

    if ($this->fix['left']) {
      // 业务逻辑
      $left_items = OrderHunter::whereRaw('id >= ?', [$this->fix['start']])
        ->where('first_result', '!=', '')
        ->take($this->fix['section'])
        ->orderBy('id', 'asc')
        ->get(['id']);
      foreach ($left_items as $item) {
        self::normal($item->id);
        $this->fix['lastId'] = $item->id + 1;
      }
    }

    return $this->fix;
  }
}
```

## 中间件

### JwtAuthenticate

作用

- 校验 token 是否合法(不涉及到数据库查询, 校验 Token 合法性)
- 校验 用户密码是否符合, 在拿到授权之后, 对比 salt, 验证是否合法

流程参考

![](https://file.wulicode.com/feishu-images/fcd2dd1be9016d7fc5e5686ea5a0a6cf.png)

### Ban

对用户进行 IP/设备的封禁

如果是前台用户, 放到所有请求之前 如果是后台用户, 放到所有请求之后(需要放过管理员)

## SSO(单点登录)

单点登录, 用于 Pam 的设备登录类型限定, 用于设备和设备之间的踢下线, 分组定义限制如下

```PHP
'sso_group'             => [
    'app:kicked'    => ['android', 'ios'],
    'web:unlimited' => ['h5', 'webapp', 'android_h5', 'ios_h5'],
],
```

如上的定义, `kicked` 代表组内互踢, `unlimited` 代表不进行限制(也不会去记录用户的 Token 数据)

## 设置

**命名**

命名会注入到 Laravel config 中

命名分为扩展, 组件, 建议命名如下

```Plaintext
# 扩展的命名
ext-aliyun::push.access_key

# 组件设置
py-system::permission.prefix
```