---
description: '检查 ServiceProvider 是否已加载 sentry/sentry-laravel 包，通过 composer 安装。在模块指定目录下创建异常监听 Handler 类，继承框架异常处理器，重写 report 方法，在非 local/test 环境下将异常上报至 Sentry，然后调用父类方法。'
lastUpdated: '2026-06-22 13:35:34'
head:
  - - meta
    - name: 'og:title'
      content: 'FAQ'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '检查 ServiceProvider 是否已加载 sentry/sentry-laravel 包，通过 composer 安装。在模块指定目录下创建异常监听 Handler 类，继承框架异常处理器，重写 report 方法，在非 local/test 环境下将异常上报至 Sentry，然后调用父类方法。'
  - - meta
    - name: 'og:url'
      content: 'https://weiran.tech//develop/faq.html'
---
# FAQ

## Laravel 相关

### Target **`[App\Services\UserRepositoryInterface]`** is not instantiable

查看下 ServiceProvider 是否已经加载

### 对接 sentry

**安装 `sentry/sentry-laravel` 包**

```Plaintext
composer require sentry/sentry-laravel
```

**新建异常监听**

这里文件位置放置在 `modules/{module}/src/http/foundation` 下

```PHP
<?php

namespace {Module}\Http\Foundation;

use Exception;

/**
 * poppy handler
 */
class Handler extends \Poppy\Framework\Http\Exception\Handler
{
    public function report(Exception $exception)
    {
        if (app()->bound('sentry') && $this->shouldReport($exception)) {
            if (!in_array(config('app.env'), ['local', 'test'])){
                app('sentry')->captureException($exception);
            }
        }
        parent::report($exception);
    }
}
```

**使用 Handler**

将错误监听修改为自定义的错误监控类

```PHP
$app->singleton(
        Illuminate\Contracts\Debug\ExceptionHandler::class,
        {Module}\Http\Foundation\Handler::class
);
```

这样便可以注册并收到异常

## 技巧

### I18N 验证 trans

验证 trans 文档是否正确

- 使用 phpstorm 搜索出所有所有 `trans('` 匹配的文档
- 使用 `open in window`打开
- 邮件根菜单选择 `Export to text file` 选择位置进行保存
- 运行命令 `php artisan py-core:inspect trans`