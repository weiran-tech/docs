---
description: '安装短信监听功能，需先安装基础短信应用，再安装附加扩展，并添加监听权限。'
lastUpdated: '2026-06-22 17:23:17'
head:
  - - meta
    - name: 'og:title'
      content: 'Sms / 短信'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '安装短信监听功能，需先安装基础短信应用，再安装附加扩展，并添加监听权限。'
  - - meta
    - name: 'og:url'
      content: 'https://weiran.tech//wr-1.x/component/sms.html'
---
# Sms / 短信

## 安装

```Plaintext
composer require weiran/sms 1.0.x-dev
```

### 安装附加扩展

因为此扩展包仅仅为了封装 weiran framework 使用, 并没有附带的 composer 包, 所以需要功能正确执行, 需要自行安装

**Aliyun**

```Plaintext
    ...
    "alibabacloud/client": "^1.5",
    "alibabacloud/dysmsapi": "1.8.*",
    ...
```

更新你的依赖包 `composer update` 或者全新安装 `composer install`

### 添加监听

短信需要监听事件来进行发送, 需要自行补充到业务侧, 例如 System 模块在发送之后会触发 CaptchaSend 事件, 我们需要监听这个事件并触发自己的发送逻辑

在 ServiceProvider 中添加监听

```PHP
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

```PHP
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