---
description: '这个版本从 Poppy 4.2 升级到 Poppy 10'
lastUpdated: '2025-01-24 17:19:00'
head: 
  - - meta
    - name: 'og:title'
      content: '升级说明'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '这个版本从 Poppy 4.2 升级到 Poppy 10'
  - - meta
    - name: 'og:url'
      content: 'https://weiran.tech/10.x/upgrade.html'
---
# 升级说明



这个版本从 Poppy 4.2 升级到 Poppy 10

## 事件

- 计划任务事件名称  `console.schedule`  更新为  `\Poppy\Framework\Events\PoppySchedule`  

```diff
- app('events')->listen('console.schedule', function (Schedule $schedule) {
+ app('events')->listen(PoppySchedule::class, function (Schedule $schedule) {
	
	// schedule
});
```

## TODO

- [ ] 框架支持 CAS, 支持多应用的核心对接, 实现 PHP 的中心化

