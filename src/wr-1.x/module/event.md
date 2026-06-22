---
description: '在事件驱动编程中，事件（Event）是系统或用户触发的动作，监听器（Listener）负责捕获并响应事件。事件监听定义明确了事件类型及其处理逻辑。合理的文件位置与命名规范（如按事件类别命名）有助于代码维护与扩展。'
lastUpdated: '2026-06-21 16:52:06'
head:
  - - meta
    - name: 'og:title'
      content: '事件'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '在事件驱动编程中，事件（Event）是系统或用户触发的动作，监听器（Listener）负责捕获并响应事件。事件监听定义明确了事件类型及其处理逻辑。合理的文件位置与命名规范（如按事件类别命名）有助于代码维护与扩展。'
  - - meta
    - name: 'og:url'
      content: 'https://weiran.tech//wr-1.x/module/event.html'
---
# 事件

## 文件位置及命名

事件放置在 `modules/{module}/Events` 文件夹中, 监听器放在 `modules/{module}/Listeners` 文件夹中

## 事件(Event)

1. 事件命名是 DoWhatEvent, 使用 Event 后缀
2. 事件属性数据修饰符为 public ,无需定义 get 方法

```PHP
<?php

declare(strict_types = 1);

namespace Weiran\Framework\Events;

class LocaleChanged
{
    /**
     * @var string
     */
    public string $locale;

    public function __construct(string $locale)
    {
        $this->locale = $locale;
    }
}
```

## 监听(Listener)

监听器放置位置在 `modules/{module}/Listeners/{EventFolder}` 这个文件夹下, 文件夹名称和事件的名称相符合. 事件监听器必须为 DoWhatListener, 事件中需要体现监听器的作用,并且必须是 `Listener` 后缀

```PHP
<?php 

declare(strict_types = 1);

namespace Order\Listeners\OrderBossIngCancel;

use Order\Events\OrderBossIngCancelEvent;
use Order\Models\OrderHunter;
use Weiran\Extension\NetEase\Im\Yunxin;
use System\Classes\Traits\ListenerTrait;
use User\Models\UserProfile;

/**
 * 订单IM - 老板取消订单
 */
class BossImListener
{
    use ListenerTrait;

    /**
     * @param OrderBossIngCancelEvent $event
     */
    public function handle(OrderBossIngCancelEvent $event)
    {
        /** @var OrderHunter $order */
        $order  = $event->order;
        $accid  = UserProfile::nickPic($order->account_id)['accid'];
        $yun    = new Yunxin();
        $Msg    = [
            // ...
        ];
        $result = $yun->sendMsg($Msg);

        $this->listenIm($event, self::class, $result);
    }
}
```

## 事件监听定义

事件监听放在 `{module}/src/ServiceProvider.php` 文件中, 如下定义

```PHP
protected $listens = [
    // 这里使用 子命名空间 来引入
    // 这里不使用 字符串 命名
    Event\LoginSuccessEvent::class               => [
        Listeners\LoginSuccess\LogListener::class,
    ],

    // 系统级别采用全命名空间引入
    \Weiran\Framework\Events\LocaleChanged::class => [
        //...
    ]
]
```