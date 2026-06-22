---
description: '开启开发者模式，通过ACL控制访问者权限，使用`lemon enable develop`命令激活。开发者工具定义访问入口，其中name和key作为菜单ID使用，插件采用特定命名方式。'
lastUpdated: '2026-06-22 13:40:54'
head:
  - - meta
    - name: 'og:title'
      content: '开发者模式 ACL'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '开启开发者模式，通过ACL控制访问者权限，使用`lemon enable develop`命令激活。开发者工具定义访问入口，其中name和key作为菜单ID使用，插件采用特定命名方式。'
  - - meta
    - name: 'og:url'
      content: 'https://weiran.tech//2.x/acl.html'
  - - meta
    - name: 'og:image'
      content: 'https://file.wulicode.com/feishu-images/9a3eae7ec1234b4fec8a57d7199abc73.png'
---
# 开发者模式 ACL

## 开启访问者模式

在 `.env` 文件中添加或者启用开发者访问模式, 否则无法对账号进行管理

```Plaintext
# lemon enable develop
LM_EN_DEVELOP=true
```

访问地址:

- 访问地址 http://www.lartest.com/dev
- 添加访问账号 : http://www.lartest.com/dsk_cp
- 默认的访问账号密码是 : develop/develop![](https://file.wulicode.com/feishu-images/9a3eae7ec1234b4fec8a57d7199abc73.png)

## 开发者工具

访问 : http://www.lartest.com/dev_home/cp

### 访问入口的定义

访问总入口放置在: `app/Lemon/Suit/Acl/develop.php` 结构说明:

```Plaintext
# name key 用作菜单时候的ID 值
'api'     => [
    'title' => '接口测试',    # 标题
    'param' => '',           # 附加参数, 使用 a=b形式进行添加 会组成 dev_api?a=b 访问地址
    'group' => [             # 分组, 用于接口的分组管理
        'dev_api',
    ],
],
```

访问单文件的入口在: `app/Lemon/Suit/Acl/Develop` 下, 我们看下 `dev_api.php`

文件示例:

```Plaintext
'title'     => '接口测试',    # 本组的标题
'route'     => 'dev_api',    # 路由名称
'operation' => [
    'auto' => [              # 操作, 会组成 dev_api/auto 的访问URL
        'title' => '自动',    # 本路由的命名,
        'menu'  => true,     # 是否是菜单项目(预留)
    ],
]
```

![](https://file.wulicode.com/feishu-images/27ffa69395715d715a00d0d57a80946d.png)

## 开发者插件

### 命名方式

`lm_` 代表 Lemon Framework `dev` 代表开发