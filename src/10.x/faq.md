---
description: '查看下 ServiceProvider 是否已经加载安装 sentry/sentry-laravel 包新建异常监听这里文件位置放置在 modules/{module}/src/http/foundation 下使用 Handler将错误监听修改为自定义的错误监控类这样便可以注册并收到异常'
lastUpdated: '2025-01-23 00:20:00'
head: 
  - - meta
    - name: 'og:title'
      content: 'FAQ'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '查看下 ServiceProvider 是否已经加载安装 sentry/sentry-laravel 包新建异常监听这里文件位置放置在 modules/{module}/src/http/foundation 下使用 Handler将错误监听修改为自定义的错误监控类这样便可以注册并收到异常'
  - - meta
    - name: 'og:url'
      content: 'https://www.weiran.tech16449524-d1e0-815e-86ae-fa381d5171a5.html'
---
# FAQ



## Laravel 相关

### Target  **`[App\Services\UserRepositoryInterface]`**  is not instantiable

查看下 ServiceProvider 是否已经加载

### 对接 sentry

**安装**  **`sentry/sentry-laravel`**  **包**

```
composer require sentry/sentry-laravel
```

**新建异常监听**

这里文件位置放置在  `modules/{module}/src/http/foundation`  下

```php
// Handler.php
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

```php
// storage/bootstrap/app.php
$app->singleton(
	Illuminate\Contracts\Debug\ExceptionHandler::class,
	{Module}\Http\Foundation\Handler::class
);
```

这样便可以注册并收到异常

