---
description: '~/app/Http/routes.phproutes.php 是框架加载路由的入口文件目录 ~/app/Http/Routes/路由命名的基本规则是 前缀 + 控制器蛇形写法 + . + 方法名的蛇形写法 例如：'
lastUpdated: '2024-01-29 15:41:00'
head: 
  - - meta
    - name: 'og:title'
      content: '路由 / 控制器'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '~/app/Http/routes.phproutes.php 是框架加载路由的入口文件目录 ~/app/Http/Routes/路由命名的基本规则是 前缀 + 控制器蛇形写法 + . + 方法名的蛇形写法 例如：'
  - - meta
    - name: 'og:image'
      content: 'https://file.wulicode.com/notion/d4/d49fcfdd41adfd0e6450cf0533e939f1.png?x-oss-process=image/resize,m_mfit,w_400'
---
# 路由 / 控制器



## 加载机制

### 加载流程图

![](https://file.wulicode.com/notion/d4/d49fcfdd41adfd0e6450cf0533e939f1.png)

### 分组模式

<table>
  <tr>
    <td>文件名</td>
    <td>前缀</td>
    <td>备注</td>
  </tr>
  <tr>
    <td>front.php</td>
    <td>front_</td>
    <td>网站前台</td>
  </tr>
  <tr>
    <td>desktop.php</td>
    <td>dsk_</td>
    <td>网站后台</td>
  </tr>
  <tr>
    <td>api.php</td>
    <td>api_</td>
    <td>app /接口部分</td>
  </tr>
  <tr>
    <td>develop.php</td>
    <td>dev_</td>
    <td>开发者平台</td>
  </tr>
  <tr>
    <td>wap.php</td>
    <td>wap_</td>
    <td>wap 端</td>
  </tr>
  <tr>
    <td>support.php</td>
    <td>support_</td>
    <td>公用的支持类函数</td>
  </tr>
</table>

## 路由

### 路由位置

`~/app/Http/routes.php`

### 路由文件名称

`routes.php`  是框架加载路由的入口文件

### 子路由位置

目录 ~/app/Http/Routes/

### 路由命名规则

路由命名的基本规则是  `前缀`  +  `控制器蛇形写法`  +  `.`  +  `方法名的蛇形写法`  例如：

```
Route::group([
    'namespace' => 'Front',
], function () {
    # 这里的路由命名是 front_test.show  front_ + test + . + show
    Route::controller('test', 'TestController', [
        # 方法名          # 路由的名称
        'getShow'         => 'front_test.show',
    ]);
});
```

## 控制器

### 控制器定义

- 控制器位置位于  `～/app/Http/Controllers/`  目录下
- 控制器命名采用分组模式， 首字母大写
- 路由名称和控制器名称匹配

