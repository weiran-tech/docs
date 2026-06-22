---
description: '使用composer安装poppy/ext-alipay扩展包，通过AopCertClient设置签名类型、应用ID、私钥、环境，并调用getPublicKey、getCertSN、getRootCertSN方法从证书中提取公钥和序列号，完成支付宝支付配置。'
lastUpdated: '2026-06-22 14:56:39'
head:
  - - meta
    - name: 'og:title'
      content: '支付宝支付'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: '使用composer安装poppy/ext-alipay扩展包，通过AopCertClient设置签名类型、应用ID、私钥、环境，并调用getPublicKey、getCertSN、getRootCertSN方法从证书中提取公钥和序列号，完成支付宝支付配置。'
  - - meta
    - name: 'og:url'
      content: 'https://weiran.tech//4.x/extension/alipay.html'
---
# 支付宝支付

## 安装

```Plaintext
composer require poppy/ext-alipay
```

更新你的依赖包 `composer update` 或者全新安装 `composer install`

## 使用

```PHP
$Aop = new AopCertClient();
$Aop->setSignType('RSA2');
$Aop->setAppId('app-id');
$Aop->setRsaPrivateKey('one-line-private-key');
$Aop->setEnv('production-or-sandbox');
$Aop->setAlipayrsaPublicKey($Aop->getPublicKey($alipayCertPath));//调用getPublicKey从支付宝公钥证书中提取公钥
$Aop->setAppCertSN($Aop->getCertSN($appCertPath));//调用getCertSN获取证书序列号
$Aop->setAlipayRootCertSN($Aop->getRootCertSN($rootCertPath));//调用getRootCertSN获取支付宝根证书序列号
$Aop->setIsCheckAlipayPublicCert(true);
return $Aop;
```

## Change Log

**3.2**

- 支持 composer 2.x

**3.0**

- 加入request 访问地址
- 加入单元测试
- 加入支付宝沙箱证书
- 加入两个基本使用方法
- 去除 app(‘files’) 使用