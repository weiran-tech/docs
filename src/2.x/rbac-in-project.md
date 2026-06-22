---
description: 'RBAC（基于角色的访问控制）通过角色关联权限，简化权限管理。项目中实现需定义前后台权限：后台按角色分配增删改查等操作权限；前台根据用户角色控制功能可见性。后台权限设定包含角色创建、权限分配及角色-权限映射关系，确保安全与灵活。'
lastUpdated: '2026-06-22 13:43:37'
head:
  - - meta
    - name: 'og:title'
      content: 'rbac 在项目中的实现'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'RBAC（基于角色的访问控制）通过角色关联权限，简化权限管理。项目中实现需定义前后台权限：后台按角色分配增删改查等操作权限；前台根据用户角色控制功能可见性。后台权限设定包含角色创建、权限分配及角色-权限映射关系，确保安全与灵活。'
  - - meta
    - name: 'og:url'
      content: 'https://weiran.tech//2.x/rbac-in-project.html'
  - - meta
    - name: 'og:image'
      content: 'https://file.wulicode.com/feishu-images/e6f0ec43e0407ad42c03dd05e946e382.png'
---
# rbac 在项目中的实现

## 什么是RBAC

RBAC（Role-Based Access Control ）基于角色的访问控制, RBAC认为授权实际就是who,what,how三者之间的关系，即who对what进行how的操作。

- Who,权限的拥用者或主体（如Principal、User、Group、Role、Actor等等）；
- what,权限针对的对象或资源（Resource、Class） ；
- How,具体的权限（Privilege,正向授权与负向授权）。

简单一点说吧就是，我们通过给角色授权，然后将附有权利的角色施加到某个用户身上，这样用户就可以实施相应的权利了。通过中间角色的身份，是权限管理更加灵活：角色的权利可以灵活改变，用户的角色的身份可以随着场所的不同而发生改变等。这样这套RBAC就几乎可以运用到所有的权限管理的模块上了。

## Rbac 权限模型

![](https://file.wulicode.com/feishu-images/e6f0ec43e0407ad42c03dd05e946e382.png)

## 前后台权限定义

### 后台角色/权限

**后台角色列表** - `root` : 超级管理员

**后台权限初始化** 导入 `acl/desktop` 的设置项目到权限表

```Plaintext
php artisan lemon:rbac init --type=desktop
```

### 后台角色/权限

**前台权限初始化** 导入 `acl/front` 的设置项目到权限表

```Plaintext
php artisan lemon:rbac init --type=front
```

## 后台权限设定

设定位置

![](https://file.wulicode.com/feishu-images/a107fcc514c69fd315877087758c7f94.jpg)