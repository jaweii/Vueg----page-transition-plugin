![LOGO][2]


## VUEG ##

just need to add `Vue.use(vueg)` ,vue-router will have a transition effect.

----------


## Demo ： ##

**[live demo](https://jaweii.github.io/vueg/example/dist/#/)** | **[GitHub](https://github.com/jaweii/vueg)**

![演示动态图][1]

Practical application：

![演示动态图][3]

----------
## Usage 

0、Installation

     npm i vueg -G

1、Get Started

     import Vue from 'vue' 
     import App from './App' 
     import router from './router'

     //  ↓↓↓↓↓↓↓↓↓↓↓↓
     import vueg from 'vueg'    
     import 'vueg/css/transition-min.css'
     Vue.use(vueg, router)     // Note that this row should be after "router = new VueRouter ()".   
                                   

Now app already has a transition effect.   


2、you can add `v-transition="false"` to disable the effect:  

    <template>
        <div id="app">
            <router-view v-transition="false"></router-view>
        </div>
    </template>
    
    
----------
## 配置项 / Config ##
        const options={  
            duration: '0.3',              // `animation-duration`  
            firstEntryDisable: false,     // When the value is true, in the process of the user into the app, app no transition effect,the default is false  
            firstEntryDuration: '.6',     //
            forwardAnim: 'fadeInRight',   // Forward transition effect,the default is fadeInRight  
            backAnim: 'fadeInLeft',       // Back transition effect,the default is fadeInLeft  
            sameDepthDisable: false,      // When the url depth is the same, the effect is disabled,the default is false   
            tabs: [{
                    name:'home'
                },{
                    name:'my'
                }],                       // the default is [],'name' is the name of the route,to achieve in the app click on the tab,the page horizontal transition effects,such as tabs[1] to tab [0],will use the backAnim effect,tabs[1] to tabs[2],will use the forwardAnim effect
            tabsDisable: false,           // when the value is true,disable the effect of the page in tabs,the default is false  
            disable: false,               // disable transition effect,the default is false,nested route default is true  
        }  
        Vue.use(vueg, router,options)

  
`ForwardAnim` 、 ` backAnim` provide the following values:
      
    `touchPoint` // The page is enlarged from the touch point  
        
    And the value provided by animate.css  
    `bounce`  
    `flash`  
    `pulse`  
    `rubberBand`  
    `shake`  
    `headShake`  
    `swing`  
    ...Omitted...  
    `slideInDown`  
    `slideInLeft`  
    `slideOutDown`  
    `slideOutLeft`  
    `slideOutRight`  
    `slideOutUp`  

Preview the effect, and see all available values, visit: https://daneden.github.io/animate.css/   
  
options can also be configured in the `data` of each component,for example:

        data(){
            return {
                vuegConfig:{                   // All configuration of `options` can be written in this object, covering the global configuration
                    forwardAnim:'bounceInUp',  
                    disable:false              // For nested route, the default is to disable effect,if you wan to enable transition effect, You need to configure `disable` for` false` in the` data.vuegConfig` of the component 
                }
        }
    }




  [1]: https://raw.githubusercontent.com/jaweii/vueg/master/image/GIF.gif
  [2]: https://raw.githubusercontent.com/jaweii/vueg/master/image/vueg.JPG
  [3]: https://raw.githubusercontent.com/jaweii/vueg/master/image/GIF33.gif
