---
description: '因为此扩展包仅仅为了封装 weiran framework 使用, 并没有附带的 composer 包, 所以需要功能正确执行, 需要自行安装Aliyun更新你的依赖包 composer update 或者全新安装 composer install短信需要监听事件来进行发送, 需要自行补充到业务侧, 例如 System 模块在发送之后会触发 CaptchaSend 事件, 我们需要监听这个事件并触发自己的发送逻辑在 ServiceProvider 中添加监听使用 SendListener 事件来触发短信的发送'
lastUpdated: '2025-04-17 17:16:00'
head: 
  - - meta
    - name: 'og:title'
      content: 'Sms / 短信'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '因为此扩展包仅仅为了封装 weiran framework 使用, 并没有附带的 composer 包, 所以需要功能正确执行, 需要自行安装Aliyun更新你的依赖包 composer update 或者全新安装 composer install短信需要监听事件来进行发送, 需要自行补充到业务侧, 例如 System 模块在发送之后会触发 CaptchaSend 事件, 我们需要监听这个事件并触发自己的发送逻辑在 ServiceProvider 中添加监听使用 SendListener 事件来触发短信的发送'
  - - meta
    - name: 'og:url'
      content: 'https://weiran.tech/wr-1.x/component/sms.html'
---
# Sms / 短信



::: info  <img src="https://file.wulicode.com/notion/4c/4c35ed434c46e240a3970ff8eadebe76.svg" style="width:17px;position:relative;top:4px;border:none;display:inline;">  配置说明 : 需要 packeton 的私有包权限, 并且再 composer 中配置如下代码


```json
{
  "repositories": [
    {
      "type": "composer",
      "url": "https://packeton.kejinxia.com"
    }
  ]
}
```
:::

## 安装

```
composer require weiran/sms 1.0.x-dev
```

### 安装附加扩展

因为此扩展包仅仅为了封装 weiran framework 使用, 并没有附带的 composer 包, 所以需要功能正确执行, 需要自行安装

**Aliyun**

```
    ...
    "alibabacloud/client": "^1.5",
    "alibabacloud/dysmsapi": "1.8.*",
    ...
```

更新你的依赖包  `composer update`  或者全新安装  `composer install`

### 添加监听

短信需要监听事件来进行发送, 需要自行补充到业务侧, 例如 System 模块在发送之后会触发 CaptchaSend 事件, 我们需要监听这个事件并触发自己的发送逻辑

在 ServiceProvider 中添加监听

```php
class ServiceProvider extends WeiranServiceProvider
{

    protected array $listens = [
        CaptchaSendEvent::class     => [
            SendListener::class
        ],
    ];
}
```

使用 SendListener 事件来触发短信的发送

```php
class SendListener
{
    public function handle(CaptchaSendEvent $event): void
    {
        $Sms = app(SmsContract::class);
        if (!$Sms->send('captcha', $event->passport, [
            'code' => $event->captcha
        ])) {
            throw new ApplicationException($Sms->getError()->getMessage());
        }
    }
}
```



