---
description: 'MgrApp模块中表单公共项目的Checkbox/多选类型，用于在表单中实现多选字段，支持用户选择多个选项。该类型定义了选项数据的结构与交互方式。'
lastUpdated: '2026-06-22 14:14:51'
head:
  - - meta
    - name: 'og:title'
      content: '⚠️ MgrApp 模块'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'MgrApp模块中表单公共项目的Checkbox/多选类型，用于在表单中实现多选字段，支持用户选择多个选项。该类型定义了选项数据的结构与交互方式。'
  - - meta
    - name: 'og:url'
      content: 'https://weiran.tech//3.x/component/mgr-app.html'
---
# ⚠️ MgrApp 模块

::: warning ⚠️
此项目未应用
:::

## 表单公共项目

### 表单项目

```JSON
{
        "fields": [{}],
        "action": "//demo/form/Checkbox",
        "method": "POST",
        "buttons": ["reset", "submit"]
}
```

`fields`  : 当前返回的所有组合字段 `action`  : 提交的 URL `method`  : 提交方法 `buttons` : 允许的按钮内容

### 表单公共字段

```JSON
{
        "name": "checkbox_required",
        "type": "checkbox",
        "value": ["a"],
        "label": "Checkbox",
        "placeholder": "请选择",
        "rules": ["required"],
        "help": "必选 至少一项",
        "options": [
                {
                        "key": "a",
                        "value": "Name"
                }
        ]
}
```

`name`  : 表单提交的字段名称 `type`  : 表单的类型 `value` : 提交的值 `label` : 显示的标题标签内容 `placeholder`  : 占位符 `rules` : 提交的规则 `help` : 帮助文本 `options` : 选项值, 当是 checkbox/radio/select 等存在多选信息的时候存在此项目

## 表单项目

### Checkbox / 多选

```JSON
{
    '...',
    "display": "inline",
    "check_all": "N"
}
```

`display` : 显示样式 [inline|单行;stack|多行] `check_all` : 是否显示多选按钮 [Y|N]

## Type 类型说明

```Plaintext
form         : 表单
setting      : 设置
grid         : 列表
dialog       : 弹窗/Iframe 渲染. 里边的类型可能是form/setting 中的任意一种
static-table : 静态表格
board        : 看板类型/用于主页的数据显示(待定)
```