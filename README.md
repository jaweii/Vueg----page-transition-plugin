![LOGO][2]


## VUEG ##

为vue-router添加转场效果，只需要在`<router-view v-transition></router-view>`加上`v-transition`，即可获得转场效果，并能够根据url级别(/)和历史记录判断是前进和后退。

just need to add `v-transition` in the `<router-view v-transition></router-view>`,vue-router will have a transition effect.

----------


## 效果图 / Demo ##：

![演示动态图][1]

----------
## 使用方法 / Usage ##

0、安装 / Installation

     npm i vueg -G

1、引入插件 / Get Started

     import Vue from 'vue' 
     import App from './App' 
     import router from './router'
     //  ↓↓↓↓↓↓↓↓↓↓↓↓
     import vueg from 'vueg'    
     import 'vueg/css/transition-min.css'
     Vue.use(vueg, router)


2、在需要添加转场效果的`<router-view>`上添加v-transition即可，如：

    <template>
        <div id="app">
            <router-view v-transition></router-view>
        </div>
    </template>
    
    
----------
## 配置项 ##
        const options={  
            duration: '0.3', //转场动画时长，默认为0.3  
            firstEntryDisable: false, //值为true时禁用首次进入的渐进动画，默认为false  
            firstEntryDuration: '.6', //首次进入渐进动画时长，默认为.6  
            forwardAnim: 'fadeInRight', //前进动画，默认为fadeInRight  
            backAnim: 'fadeInLeft', //后退动画，默认为fedeInLeft  
            sameDepthDisable: false, //url级别相同时禁用动画，默认为false  
            tabs: [{
                    name:'home'
                },{
                    name:'my'
                }], //默认为[]，name对应路由的name,以实现类似app中点击tab页面水平转场效果，如tab[1]到tab[0]  ，会使用backAnim动画，tab[1]到tab[2]，会使用forwardAnim动画  
            tabsDisable: false, //值为true时，tabs间的转场没有动画，默认为false  
            disable: false, //禁用转场动画，默认为false    
        }  
        Vue.use(vueg, router,options)

`forwardAnim` 、 `backAnim` 提供以下值：  
bounce  
flash  
pulse  
rubberBand  
shake  
headShake  
swing  
....略...  
slideInDown  
slideInLeft  
slideOutDown  
slideOutLeft  
slideOutRight  
slideOutUp  
预览效果，以及查看全部可用值，请访问：https://daneden.github.io/animate.css/


options还可以在每个组件的data中配置，举例：  

        data(){
            return {
                vugConfig:{  
                    forwardAnim:'bounceInUp',//options所有配置可以写在这个对象里，会覆盖全局的配置
                }
        }
    }


  [1]: https://raw.githubusercontent.com/jaweii/vueg/master/image/GIF.gif
  [2]: https://raw.githubusercontent.com/jaweii/vueg/master/image/vueg.JPG

