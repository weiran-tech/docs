# 升级说明

## 4.1 - 4.2 升级说明

4.1 - 4.2 主要对严格模式进行升级, 所有升级到 4.2 包的用户建议将项目内容升级到严格模式

## 4.0 - 4.1 升级说明

本次升级目的是把 modules 加载更改为支持 PSR-4 的加载规范以便于可以运行单元测试和代码覆盖率测试

-   [x]目录命名 / 加载的路由命名
-   [x]生成模块
-   [x]数据库生成以及各种的 Make 生成

### 包批量改动

安装 composer 包 `poppy/code-generator 4.1`

```
$ composer require poppy/code-generator 4.1
```

重命名目录

```
$ php artisan py-code-generator:src-rename demo
```

移除所有的 modules 文件夹, 并进行 git 提交, 以防止大小写问题导致的命名失败情况

重命名 module -> modules 文件夹

添加 composer 自动加载, 并启用新命名空间 `composer dumpautoload`

```
    "autoload": {
        "psr-4": {
            "Demo\\": "modules/demo/src/"
        },
        "files": [
            "modules/demo/src/Classes/functions.php",
        ]
    },
```

移除 `modules/demo/manifest.json` 中的 `autoload` 自动加载字段, 自动加载的文件使用 composer 进行加载

### 模块调整

- 模块的数据库 `src/database/migrations` 加载移动到 `modules/demo/resources/migrations` 目录下
- 模块的 Seeder `src/database/seeds` 加载移动到 `src/Seeds` 目录下

### Framework

- 移除 `Poppy\Framework\Foundation\Bootstrap\RegisterClassLoader` 注册 ClassLoader
- 移除 `\Poppy\Framework\Classes\ClassLoader`
- 移除 `\Poppy\Framework\Classes\Mocker`, 测试使用自动化 + faker 去进行接口测试, 所以无需使用 Moker 进行接口返回
- 新生成的模块需要手动加载 PSR-4 规范并且目录已经按照新目录进行调整

```json
{
    "...": [],
    "autoload": {
        "psr-4": {
            "Demo\\": "modules/demo/src/",
            "Demo\\Tests\\": "modules/demo/tests/"
        }
    },
    "._.": []
}
```

### Core

- 移除 `phplint`, 使用 phpstan 作为默认静态代码工具

### System

- 废弃 `\Poppy\System\Http\Exception\Handler` 类, 异常处理改为 `\Poppy\Framework\Foundation\Exception\Handler`

对异常处理进行优化性改写, 移除重复 `dontReport` 异常, 对异常的提示进行多语言改写, 对模型提示提供 `poppy_friendly` 方法进行语言转义

## 3.2 -> 4.0 升级说明

### 建议

- 使用 `Guzzle\Client` 替代掉 `Curl\Curl`, 写法等均需要变动

### Framework

- **不兼容**

移除 `x_app` 函数, 此函数在 3.2 中废弃, 因为 nginx 无法从 json 中获取需要的数据, 需要显式使用 `x_header` 来获取

todo : 关于 Header 的定义需要完善

`jwt_token` 方法取消参数传递, 使用 jwt 的 `tymon.jwt` 来获取

`[2022-06-10]` 主 ServiceProvider `\Poppy\Framework\Support\PoppyServiceProvider` 变量 `$listens` 和 `$policies` 使用 array 强类型模式

- **可替代**

移除 `TestCase->poppyContainer()` 方法, 使用 `Container::getInstance()` 替代

移除 `Resp->data()` 方法, 使用 `Resp->custom()` 替代

移除 `get(), post()` 方法, 使用 `input()` 替代

- **调整**

`[2022-06-10]` 对于后置加载的 ServiceProvider, 需要继承 `\Illuminate\Contracts\Support\DeferrableProvider` 类, 取消 `$defer` 属性

### Core

- **不兼容**

因为 apidoc 升级导致无法生成 json , mgr-page 中无法使用新版来生成 apidoc 文档, 必须使用新版本才可以解析 json 数据, 使用 js `eval` 来解析

`ServiceArray` 改动 `key()` 方法需要强制返回 `string`

- **可替代**

因为 sami 维护, 无法生成新版本 php api 文档, 使用 doctum 替代 sami, 接口不变, 可重新生成

移除 `RdsNative->delTaggedKeys()` , 使用 `RdsNative->del()` 替代

移除 `sys_success()` 方法, 使用 `sys_info()` 替代

### System

- **不兼容**

`ApiSignContract` 方法 `sign` 增加参数 `$type` , 使该方法同时支持不同端签名

```diff
class DefaultApiSignProvider extends DefaultBaseApiSign
{
-    public function sign(array $params): string
+    public function sign(array $params, $type = 'user'): string
    {
        ...
    }
}
```

移除 `\Poppy\System\Classes\HtmlParser` 类, 不必封装过多无用的类, 以核心为主

移除 `SettingRepository` 的 `setReRead()`, `save()` 方法

此方法 `3.2` 已经重新改写为从缓存直接读取, 不使用静态变量

移除 `pages.yaml` 的定义以及读取, 改用 mgr-page/mgr-app 的 Form 写法

相关影响 : `Module->pages()`, `Module/Repositories/ModulesPage`, `ModuleManager->pages()`

移除 `settings.yaml` 的定义以及读取, 不支持项目默认数据在 `settings.yaml` 的定义

相关影响 : `Module/Repositories/ModulesSetting`, `ModuleManager->settings()`

移除 `ui.yaml` 的定义以及读取, 不支持项目默认数据在 `ui.yaml` 的定义

相关影响 : 移除 `Module/Repositories/ModulesUi`, 移除 `ModuleManager->uis()`, 移除 `Classes\Contracts\UiContract`

移除 `ModuleManager->getExcepts()` 的定义以及读取(无相关用途)

移除 `\Poppy\System\Action\Pam::setPasswordById`, 使用 `\Poppy\System\Action\Pam::setPassword` 替代, 参数不一致, 需要注意

移除 `\Poppy\System\Classes\Contracts\UploadContract::type` , 使用 `\Poppy\System\Classes\Uploader\Uploader::kvExt` 替代, 参数有差异

移除 `\Poppy\System\Action\Pam::captchaLogin` , 参数 `platform` 替换为 guard 类型, `platform` 从 header 中进行取值

移除

```
\Poppy\System\Models\PamAccount::fetch()             :  多余的字段查询
\Poppy\System\Models\PamAccount::getIdByUsername()   :  频率低, 无用函数
\Poppy\System\Models\PamAccount::getTypeById()       :  频率低, 无用函数
```

Pam 中 loginCheck 移除 loginAllowIpCheck 方法(次级别调用), 会影响(ydl) 项目, 移除 `\System\Events\LoginSuccessEvent` 调用方法

```diff
public function loginCheck(string $passport, string $password, string $guard_name = PamAccount::GUARD_WEB): bool
{

-        event(new LoginBannedEvent($pam, $guard));

-        if (method_exists($this, 'loginAllowIpCheck') && !$this->loginAllowIpCheck()) {
-            $guard->logout();
-            return false;
-       }

-        // 兼容存在 system 模块事件
-        // deprecated 为了兼容 q2
-        if (class_exists('\System\Events\LoginSuccessEvent')) {
-            event(new \System\Events\LoginSuccessEvent($pam, $platform, $guard));
-            return true;
-        }
...
}
```

- **可替代**

移除 `ModuleManager->repository()`, 使用 `ModuleManager->modules()` 替代

移除 `sys_container`, 使用 `py_container` 替代

移除 `\Poppy\System\Classes\Abstracts\SysRouteServiceProvider` , 使用框架 `\Poppy\Framework\Application\RouteServiceProvider` 替代

移除 `\Poppy\System\Action\Pam::passportType` , 使用 `PamAccount::passportType()` 替代

移除 `\Poppy\System\Action\Verification::getHiddenStr` , 使用 `\Poppy\System\Action\Verification::getHidden` 替代, 因为返回不仅仅是字串, 可能还会有数组

移除 `\Poppy\System\Tests\Base\SystemTestCase::export` , 使用 `\Poppy\Framework\Application\TestCase::outputVariables` 替代, 使用 stream 打印数据, 可保证运行无异常提示

移除 `\Poppy\System\Events\LoginSuccessEvent` 的 platform 参数, 使用 `x-id` 替代

继承项目 `\Poppy\System\Http\Forms\Settings\FormSettingBase` 更新为 `Poppy\MgrPage\Classes\Form\FormSettingBase`, 同理 Grid 也会迁移, 这里是对页面的组织对
mgr-page 做的一个调整

**services 钩子改动**

移除 `poppy.system.html_top_nav` 更改为 `poppy.mgr-page.html_top_nav` 并移动到 mgr-page 中

移除 `poppy.system.html_cp` 更改为 `poppy.mgr-page.html_cp` 并移动到 mgr-page 中

移除 `poppy.system.settings` 更改为 `poppy.mgr-page.settings` 并移动到 mgr-page 中

移除 `poppy.system.custom_settings`, 此服务并入 `poppy.mgr-page.settings`

- **接口**

接口需要增加标准化参数 `x-type` 用来指定是前台用户还是后台用户, 默认是 `user`

- **重复**

移除 `JwtAuthGuard` , 和 Jwt 包数据重复

- **移除**

移除 `PamAccount->getJWTCustomClaims()` 的 `user.id` 返回, 改返回和 jwt 的 `sub` 一致, 不必再多余返回, 无兼容性问题

### Aliyun-Oss

- **可替代**

移除 `Action/ActSts` 类, 使用 `Sts` 类, 仅仅改动命名

移除 `Action/OssDefaultUploadProvider`, 使用 `Classes\Provider\OssDefaultUploadProvider`, 若依赖于 4.0 组件则此问题不必关注.

### MgrPage

- **可替代**

移除 `\Poppy\MgrPage\Classes\Form\Field\Number` 的 `min` 和 `max` 方法, 使用后端服务规则校验 `Rule::min`, `Rule::max`
