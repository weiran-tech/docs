---
description: '在资源开发过程中, 我们使用如下命令进行资源监听, webpack.mix.js 本不存在, 需要在 poppy/mgr-page/resources/libs/ 目录下复制 webpack.mix.sample.js 文件并更改名称, 将文件放置到你所喜欢的的位置均可, 其中的代理域名以本地开发为主在资源变动之后我们需要将打包后的文件反向复制到 mgr-page 这个包中, 用到以下命令这样进行包提交即可MgrPage 管理后台使用的是 js 加载方式, 如果使用 MgrPage, 则需要在更新 composer 组件之后运行以下命令进行强制更新或者将此命令加入 comp'
lastUpdated: '2024-01-29 19:50:00'
head: 
  - - meta
    - name: 'og:title'
      content: '管理后台'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '在资源开发过程中, 我们使用如下命令进行资源监听, webpack.mix.js 本不存在, 需要在 poppy/mgr-page/resources/libs/ 目录下复制 webpack.mix.sample.js 文件并更改名称, 将文件放置到你所喜欢的的位置均可, 其中的代理域名以本地开发为主在资源变动之后我们需要将打包后的文件反向复制到 mgr-page 这个包中, 用到以下命令这样进行包提交即可MgrPage 管理后台使用的是 js 加载方式, 如果使用 MgrPage, 则需要在更新 composer 组件之后运行以下命令进行强制更新或者将此命令加入 comp'
  - - meta
    - name: 'og:url'
      content: 'https://weiran.tech/3.x/component/mgr-page.html'
---
# 管理后台



## 开发

在资源开发过程中, 我们使用如下命令进行资源监听,  `webpack.mix.js`  本不存在, 需要在  `poppy/mgr-page/resources/libs/`  目录下复制  `webpack.mix.sample.js`  文件并更改名称, 将文件放置到你所喜欢的的位置均可, 其中的代理域名以本地开发为主

```
$ mix watch --mix-config=poppy/mgr-page/resources/libs/webpack.mix.js
```

在资源变动之后我们需要将打包后的文件反向复制到  `mgr-page`  这个包中, 用到以下命令

```
$ php artisan py-mgr-page:mix
```

这样进行包提交即可

## 资源发布

MgrPage 管理后台使用的是 js 加载方式, 如果使用 MgrPage, 则需要在更新 composer 组件之后运行以下命令进行强制更新

```xml
$ php artisan vendor:publish --force --tag=poppy-mix
```

或者将此命令加入 composer.json 文件中, 每次更新完成 composer 的时候都会自动进行一次发布

```json
{
    ...
    "scripts": {
        "post-update-cmd": [
            ...
            "php artisan vendor:publish --force --tag=poppy-mix"
            ...
        ],
    }
    ...
}
```

