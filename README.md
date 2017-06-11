## vueg ##
为vue-router添加转场效果，只需要在`<router-view v-transition></router-view>`加上`v-transition`，即可获得转场效果，并能够根据url级别(/)和历史记录判断是前进和后退。


----------


**效果图**：

![演示动态图][1]

----------
**使用方法**

0、安装

     npm i vueg -G

1、引入组件

     import Vue from 'vue' 
     import App from './App' 
     import router from './router'
     //  ↓↓↓↓↓↓↓↓↓↓↓↓
     import vueg from 'vueg' 	
     import 'vueg/css/transition.css'
     Vue.use(vueg)

2、在需要添加转场效果的`<router-view>`上添加v-transition即可，如：

    <template>
        <div id="app">
            <router-view v-transition></router-view>
        </div>
    </template>


  [1]: https://raw.githubusercontent.com/jaweii/vueg/master/image/GIF.gif

