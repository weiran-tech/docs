---
description: '事件放置在 modules/{module}/Events 文件夹中, 监听器放在 modules/{module}/Listeners 文件夹中监听器放置位置在 modules/{module}/Listeners/{EventFolder} 这个文件夹下, 文件夹名称和事件的名称相符合. 事件监听器必须为 DoWhatListener, 事件中需要体现监听器的作用,并且必须是 Listener 后缀事件监听放在 {module}/src/ServiceProvider.php 文件中, 如下定义'
lastUpdated: '2025-01-23 00:21:00'
head: 
  - - meta
    - name: 'og:title'
      content: '事件'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '事件放置在 modules/{module}/Events 文件夹中, 监听器放在 modules/{module}/Listeners 文件夹中监听器放置位置在 modules/{module}/Listeners/{EventFolder} 这个文件夹下, 文件夹名称和事件的名称相符合. 事件监听器必须为 DoWhatListener, 事件中需要体现监听器的作用,并且必须是 Listener 后缀事件监听放在 {module}/src/ServiceProvider.php 文件中, 如下定义'
  - - meta
    - name: 'og:url'
      content: 'https://weiran.tech/10.x/module/event.html'
---
# 事件



## 文件位置及命名

事件放置在  `modules/{module}/Events`  文件夹中, 监听器放在  `modules/{module}/Listeners`  文件夹中

## 事件(Event)

- 事件命名是 DoWhatEvent, 使用 Event 后缀
- 事件属性数据修饰符为 public ,无需定义 get 方法

```php
<?php

declare(strict_types = 1);

namespace Poppy\Framework\Events;


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

监听器放置位置在  `modules/{module}/Listeners/{EventFolder}`  这个文件夹下, 文件夹名称和事件的名称相符合. 事件监听器必须为 DoWhatListener, 事件中需要体现监听器的作用,并且必须是  `Listener`  后缀

```php
<?php 

declare(strict_types = 1);

namespace Order\Listeners\OrderBossIngCancel;

use Order\Events\OrderBossIngCancelEvent;
use Order\Models\OrderHunter;
use Poppy\Extension\NetEase\Im\Yunxin;
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

事件监听放在  `{module}/src/ServiceProvider.php`  文件中, 如下定义

```php
protected $listens = [
    // 这里使用 子命名空间 来引入
    // 这里不使用 字符串 命名
    Event\LoginSuccessEvent::class               => [
        Listeners\LoginSuccess\LogListener::class,
    ],

    // 系统级别采用全命名空间引入
    \Poppy\Framework\Events\LocaleChanged::class => [
        //...
    ]
]
```

