---
description: '该配置文件定义了Poppy框架的默认设置：列表分页条数默认15条，最大3000条；支持根据执行内容显示不同视图模板；默认网站名称为“网站名称”，描述为“网站描述”；后台入口地址默认为“mgr-page”。'
lastUpdated: '2026-06-22 14:35:15'
head:
  - - meta
    - name: 'og:title'
      content: '框架配置'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '该配置文件定义了Poppy框架的默认设置：列表分页条数默认15条，最大3000条；支持根据执行内容显示不同视图模板；默认网站名称为“网站名称”，描述为“网站描述”；后台入口地址默认为“mgr-page”。'
  - - meta
    - name: 'og:url'
      content: 'https://weiran.tech//4.x/framework/config.html'
---
# 框架配置

> 文件位置 config/poppy.php, key 为 framework

## 配置选项

### page_size

default : 15

列表默认的分页条数, 默认 15 条

影响继承了Poppy，如果需要修改分页条数可以在控制器给`$this->pagesize`赋值

### page_max

default: 3000

列表默认的最大分页条数，默认3000条

影响继承了Poppy

### message_template

default : []

根据执行内容显示不同的视图模板(例成功/失败)

接收视图地址 如 `module::xx.folder.message`可支持多个视图地址

### title

default : ‘网站名称’

默认的网站名称, 作为默认信息会注入到 view 视图的 `$_title`中

### description

default : ‘网站描述’

默认的网站描述信息, 作为默认信息会注入到 view 视图的 `$_description`中

### prefix

default : ‘mgr-page’

后台的入口地址，默认mgr-page