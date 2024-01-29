---
description: 'default : 15列表默认的分页条数, 默认 15 条影响继承了Poppy，如果需要修改分页条数可以在控制器给$this->pagesize赋值default: 3000列表默认的最大分页条数，默认3000条影响继承了Poppydefault : []根据执行内容显示不同的视图模板(例成功/失败)接收视图地址 如 module::xx.folder.message可支持多个视图地址default : ‘网站名称’默认的网站名称, 作为默认信息会注入到 view 视图的 $_title中default : ‘网站描述’默认的网站描述信息,'
lastUpdated: '2024-01-29 18:41:00'
head: 
  - - meta
    - name: 'og:title'
      content: '框架配置'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'default : 15列表默认的分页条数, 默认 15 条影响继承了Poppy，如果需要修改分页条数可以在控制器给$this->pagesize赋值default: 3000列表默认的最大分页条数，默认3000条影响继承了Poppydefault : []根据执行内容显示不同的视图模板(例成功/失败)接收视图地址 如 module::xx.folder.message可支持多个视图地址default : ‘网站名称’默认的网站名称, 作为默认信息会注入到 view 视图的 $_title中default : ‘网站描述’默认的网站描述信息,'
---
# 框架配置



> 文件位置 config/poppy.php, key 为 framework

## 配置选项

### page_size

default : 15

列表默认的分页条数, 默认 15 条

影响继承了Poppy，如果需要修改分页条数可以在控制器给 `$this->pagesize` 赋值

### page_max

default: 3000

列表默认的最大分页条数，默认3000条

影响继承了Poppy

### message_template

default : []

根据执行内容显示不同的视图模板(例成功/失败)

接收视图地址 如  `module::xx.folder.message` 可支持多个视图地址

### title

default : ‘网站名称’

默认的网站名称, 作为默认信息会注入到 view 视图的  `$_title` 中

### description

default : ‘网站描述’

默认的网站描述信息, 作为默认信息会注入到 view 视图的  `$_description` 中

### prefix

default : ‘mgr-page’

后台的入口地址，默认mgr-page

