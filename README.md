## VUEG ##
为vue-router添加转场效果，只需要在`<router-view v-transition></router-view>`加上`v-transition`，即可获得转场效果，并能够根据url级别(/)和历史记录判断是前进和后退。


----------


**效果图**：

![此处输入图片的描述][1]

----------
**使用方法**

1、引入组件

     import Vue from 'vue' 
     import App from './App' 
     import router from './router'
     //  ↓↓↓↓↓↓↓↓↓↓↓↓
     import vueg from 'vueg' 	
     import './vueTransition.css'
     Vue.use(vueg)

2、在需要添加转场效果的`<router-view>`上添加v-transition即可，如：

    <template>
        <div id="app">
            <router-view v-transition></router-view>
        </div>
    </template>


  [1]: https://s.gravatar.com/avatar/2e02769272d50ee4330ba924f05fb025?size=496&default=retro

