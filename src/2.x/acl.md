---
description: '在 .env 文件中添加或者启用开发者访问模式, 否则无法对账号进行管理访问地址:访问 : http://www.lartest.com/dev_home/cp访问总入口放置在: app/Lemon/Suit/Acl/develop.php 结构说明:访问单文件的入口在: app/Lemon/Suit/Acl/Develop 下, 我们看下 dev_api.php文件示例:lm_ 代表 Lemon Framework dev 代表开发'
lastUpdated: '2024-01-27 13:45:00'
head: 
  - - meta
    - name: 'og:title'
      content: '开发者模式/ACL'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '在 .env 文件中添加或者启用开发者访问模式, 否则无法对账号进行管理访问地址:访问 : http://www.lartest.com/dev_home/cp访问总入口放置在: app/Lemon/Suit/Acl/develop.php 结构说明:访问单文件的入口在: app/Lemon/Suit/Acl/Develop 下, 我们看下 dev_api.php文件示例:lm_ 代表 Lemon Framework dev 代表开发'
  - - meta
    - name: 'og:url'
      content: 'https://weiran.tech/2.x/acl.html'
  - - meta
    - name: 'og:image'
      content: 'https://file.wulicode.com/notion/89/89f524a44bdae09576b0adf4ec851544.png?x-oss-process=image/resize,m_mfit,w_400'
---
# 开发者模式/ACL



## 开启访问者模式

在  `.env`  文件中添加或者启用开发者访问模式, 否则无法对账号进行管理

```
# lemon enable develop
LM_EN_DEVELOP=true
```

访问地址:

- 访问地址 http://www.lartest.com/dev
- 添加访问账号 : http://www.lartest.com/dsk_cp
- 默认的访问账号密码是 : develop/develop

![](https://file.wulicode.com/notion/89/89f524a44bdae09576b0adf4ec851544.png)

## 开发者工具

访问 : http://www.lartest.com/dev_home/cp

### 访问入口的定义 

访问总入口放置在:  `app/Lemon/Suit/Acl/develop.php`  结构说明:

```
# name key 用作菜单时候的ID 值
'api'     => [
    'title' => '接口测试',    # 标题
    'param' => '',           # 附加参数, 使用 a=b形式进行添加 会组成 dev_api?a=b 访问地址
    'group' => [             # 分组, 用于接口的分组管理
        'dev_api',
    ],
],
```

访问单文件的入口在:  `app/Lemon/Suit/Acl/Develop`  下, 我们看下  `dev_api.php`

文件示例:

```
'title'     => '接口测试',    # 本组的标题
'route'     => 'dev_api',    # 路由名称
'operation' => [
    'auto' => [              # 操作, 会组成 dev_api/auto 的访问URL
        'title' => '自动',    # 本路由的命名,
        'menu'  => true,     # 是否是菜单项目(预留)
    ],
]
```

![](https://file.wulicode.com/notion/3a/3a369e3fc8b16f689358350a895523fb.png)

## 开发者插件

### 命名方式

`lm_`  代表 Lemon Framework  `dev`  代表开发

