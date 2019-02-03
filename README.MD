[![](https://raw.githubusercontent.com/jaweii/vueg/master/image/vueg.JPG "LOGO")](https://raw.githubusercontent.com/jaweii/vueg/master/image/vueg.JPG)

## Example：

<img src="https://raw.githubusercontent.com/jaweii/Vueg----page-transition-plugin/master/image/GIF.gif" height="600"/>


## 使用方法

#### 安装插件

```js
npm i vueg --save
```

#### 引入插件
```js
import vueg from 'vueg'

Vue.use(vueg, new Router(), Options) // 传入实例化后的router，和插件的全局配置

```
#### 插件指令
插件注册了名为`v-transition`的指令，接收一个Options参数，其包含的配置优先级高于全局配置。

#### 启用插件：

为`router-view`添加`v-transition`指令后，该`router-view`下所有的页面都将启用动画：
```js
<router-view v-transition></router-view>
```
或，为`template`中的顶级标签添加`v-transition`指令后，该页面组件将启用动画效果:
```js
<template>
    <page v-transition>
    </page>
</template>
```

支持Nuxt。


---

## Options

```js
@property {number} duration 动画时长。默认为0.3
@property {string} enter 入场动画，默认为'fadeInRight'
@property {string} leave 离场动画，默认为'fadeInLeft'
@property {boolean} disableAtSameDepths 深度相同时禁用动画(通过url中的反斜杠数量/判断)。默认为false
@property {boolean} shadow 是否为入场页面添加阴影。默认为true
@property {Object} map 有时候通过url判断的转场类型可能并不是你想要的，这时你可以使用map选项。
指定路由A到路由A/B/C的转场类型是enter还是leave，覆盖通过url深度判断的转场类型。
下面例子表示，从名为`user-login`的路由到名为`user-regiseter`的路由转场，使用入场动画，顺序反转则使用离场动画。
从名为`user-login`的路由到名为`index`的路由转场，使用离场动画，顺序反转则使用入场动画。
从名为`user-login`的路由到名为`user-login-sms`的路由转场，禁用转场动画。
例子:`
map: {
 'user-login':{
  enter: ['user-register'],
  leave: ['index'],
  disable: ['user-login-sms']
  }
 }
 `
 默认为{}。

```

`enter`、`leave` 参数使用的animate.css的动画类名作为值，查看全部可用值，请访问：[https://daneden.github.io/animate.css](https://daneden.github.io/animate.css)。
另外插件自带了一个可用值 `touchPoint`，动画效果为页面从触摸(点击)点放大入场。

## 其他
为了方便使用者查看、修改源代码、提交PR，本插件直接导出包，未经webpack构建；而源码中使用了ES6语法，所以你的项目需要支持ES6语法(比如Array.includes)。 

## 协议
ISC