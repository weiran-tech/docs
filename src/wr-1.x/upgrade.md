---
description: '本文档包含升级说明、基础概念、命名空间、变更日志及事件处理等核心内容，旨在帮助用户快速掌握版本变更与关键功能。'
lastUpdated: '2026-06-21 16:52:09'
head:
  - - meta
    - name: 'og:title'
      content: '升级说明'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '本文档包含升级说明、基础概念、命名空间、变更日志及事件处理等核心内容，旨在帮助用户快速掌握版本变更与关键功能。'
  - - meta
    - name: 'og:url'
      content: 'https://weiran.tech//wr-1.x/upgrade.html'
---
# 升级说明

## 基础

### 命名空间

`Weiran` 对应的中文是蔚然, 取自蔚然成林, 寓意茂盛, 希望这个框架的基础上帮助发展的更好, 蒸蒸日上

### ChangeLog

- https://github.com/weiran-tech/framework/tags

## 事件

- 计划任务事件名称 `console.schedule` 更新为 `\Weiran\Framework\Events\WeiranSchedule`

```Plaintext
- app('events')->listen('console.schedule', function (Schedule $schedule) {
+ app('events')->listen(WeiranSchedule::class, function (Schedule $schedule) {
        
        // schedule
});
```