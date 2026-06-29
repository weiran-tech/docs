---
description: '完成项目环境配置的安装与初始化，包括配置项目文件、运行安装命令，确保基础环境就绪。'
lastUpdated: '2026-06-29 22:59:46'
head:
  - - meta
    - name: 'og:title'
      content: '安装'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '完成项目环境配置的安装与初始化，包括配置项目文件、运行安装命令，确保基础环境就绪。'
  - - meta
    - name: 'og:url'
      content: 'https://weiran.tech/3.x/project/install.html'
  - - meta
    - name: 'og:image'
      content: 'https://file.wulicode.com/feishu-images/ed74be29fa0336dd1cc70cf387078915.png'
---
# 安装

## 配置项目环境

默认项目中没有 `.env` 文件

### 项目配置文件

复制 `.env.example` 为 `.env`

```Plaintext
$ cp .env.example .env
```

配置数据库信息

```Plaintext
DB_HOST=127.0.0.1
DB_DATABASE=poppy_v1
DB_USERNAME=root
DB_PASSWORD=Poppy123456
```

配置域名

```Plaintext
URL_SITE=https://poppy-demo.wulicode.com
```

生成 app key, jwt key

```Plaintext
$ php artisan key:generate
$ php artisan jwt:secret
```

### 项目初始化以及安装

执行数据库 migrate

```Plaintext
$ php artisan poppy:migrate
```

系统安装并创建用户

```Plaintext
$ php artisan py-system:install
Start Install Lemon Framework!
Init UserRole Ing...
Init Role success
Install User Roles Success
Init Rbac Permission...
[poppy.core.PermissionCommand] Import permission Success!
Init Rbac Permission Success

$ php artisan py-system:user create_user

 Please input username!:
 > root_user

 Please input password!:
 > 123456

 Please input role name!:
 > root

User root_user created
```

安装完成访问 `https://poppy-demo.wulicode.com/mgr-page/login`

![](https://file.wulicode.com/feishu-images/ed74be29fa0336dd1cc70cf387078915.png)

登录之后的界面

![](https://file.wulicode.com/feishu-images/92f24eb91583b0db06c7924608ce7f51.png)

## Laravel Mix

系统后台集成 layui 作为后台 UI 界面, 元素的使用详见 www.layui.com

### 前台页面开发

前台页面依赖于 laravel-mix 来进行页面的开发. 下面会对以下的几个部分进行深入解析, 首先,我们先看下如何进行页面的布局和显示 常用文档 : [资源任务编译器 Laravel Mix](https://laravel-china.org/docs/laravel/5.5/mix/1307)

#### 文件的位置

```Plaintext
# sass 源文件的位置, 使用的样式文件是 web.scss
~/resources/assets/scss/

# 页面资源放置位置
~/module/resources/images

# 监听文件位置, 这里使用的组件是 laravel-mix , 详细文档查看 : https://github.com/JeffreyWay/laravel-mix
~/webpack.mix.js

# 生成 css 的位置
~/public/assets/css/

# 图片的位置
~/public/modules/{user|system|web}/images/

# 访问地址, 这里 {page} 代表需要布局的页面的名称
# 例如 : http://dev.play.com/develop/l/layout.m.homepage
http://{domain}/develop/l/{page}

# 页面命名, 页面命名为 `{page}.blade.php`, 这里支持多层文件夹
~/resources/views
```

#### 如何运行

```Plaintext
# 安装
$ npm install

# 开始监听 scss, 写的 css
$ npm run watch
```

### webpack.mix.js 的配置

```Plaintext

mix
   .browserSync({
       // 这里替换地址
       proxy : 'http://dev.{domain}.com/',
       files : [
           "public/resources/js/**/*.js",
           "public/resources/css/*.css",
           "modules/**/resources/views/**/*.blade.php",
           "modules/**/resources/mixes/**/*.js",
           "modules/**/resources/js/**/*.js"
       ]
   })
   .disableNotifications()
   .version()
   /*
   |--------------------------------------------------------------------------
   | develop & backend
   |--------------------------------------------------------------------------
   */
   /* system js
    * ---------------------------------------- */
   .combine([
           'modules/system/resources/libs/jquery/2.2.4/jquery.min.js',
           'modules/system/resources/libs/jquery/form/jquery.form.js',
           'modules/system/resources/libs/jquery/toastr/jquery.toastr.js',
           'modules/system/resources/libs/jquery/pjax/jquery.pjax.js',
           'modules/system/resources/libs/jquery/poshytip/jquery.poshytip.js',
           'modules/system/resources/libs/jquery/validation/jquery.validation.js',
           'modules/system/resources/libs/jquery/data-tables/jquery.data-tables.js',
           'modules/system/resources/libs/jquery/tokenize2/jquery.tokenize2.js',
           'modules/system/resources/libs/jquery/spinner/jquery.spinner.js',
           'modules/system/resources/libs/waves/waves.min.js',
           'modules/system/resources/libs/vue/vue.min.js',
           'modules/system/resources/libs/underscore/underscore.js',
           // hash, 加密使用 @ develop
           'modules/system/resources/libs/jshash/md5.min.js',
           'modules/system/resources/libs/jshash/sha1.min.js',
           // 粘贴板
           'modules/system/resources/libs/clipboard/clipboard.min.js',
           // 编辑器
           'modules/system/resources/libs/simditor/module.js',
           'modules/system/resources/libs/simditor/hotkeys.js',
           'modules/system/resources/libs/simditor/uploader.js',
           'modules/system/resources/libs/simditor/simditor.js',
           // 鼠标滑过提示
         'modules/system/resources/libs/popper.js/popper.min.js',
         'modules/system/resources/libs/bootstrap/js/util.js',
         'modules/system/resources/libs/bootstrap/js/tooltip.js',
           // 图片轮询显示
           'modules/system/resources/libs/jquery/fancybox/jquery.fancybox.min.js',
     ],
     'public/assets/js/system_vendor.js'
   )
   .combine([
           // editor
           'modules/system/resources/libs/ace/ace.js',
           'modules/system/resources/libs/jquery/backstretch/jquery.backstretch.min.js',
           'modules/system/resources/libs/poppy/util.js',
           'modules/system/resources/libs/poppy/cp.js',
           'modules/system/resources/libs/poppy/system/cp.js'
     ],
     'public/assets/js/system_cp.js'
   )
   /* system css
    * ---------------------------------------- */
   .sass(
     'modules/system/resources/scss/system.scss',
     'public/assets/css/system.css'
   )
   .copyDirectory('modules/system/resources/libs/layui', 'public/assets/layui')
   .copyDirectory('modules/system/resources/libs/easy-web', 'public/assets/easy-web')
   .copyDirectory('modules/system/resources/images/libs', 'public/assets/images/libs')
   .copyDirectory('modules/system/resources/images/system', 'public/assets/images/default')
   .copyDirectory('modules/system/resources/fonts/fontawesome', 'public/assets/font/fontawesome')
```