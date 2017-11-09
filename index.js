<<<<<<< Updated upstream
"use strict";var transition={};transition.install=function(t,n){function e(){var t=this.$el.classList;if(t){var n=[];Object.keys(t).forEach(function(e){n.push(t[e])});var e=!1;if(n.map(function(t){"animated"===t&&(e=!0)}),e){var a=document.createElement("div");a.id="vueg-background";var i=m.default;if(i){var o=i.$data.vuegConfig;if(o&&Object.keys(o).forEach(function(t){f[t]=o[t]}),f.disable)return;var r=document.getElementById("vueg-background");r||(i.$el.parentElement.appendChild(a),r=a),r.innerHTML="",r.classList=[],r.appendChild(this.$el)}}}}function a(){return!(!this.vuegConfig||!1!==this.vuegConfig.disable)||(!m||!m.default||m.default._uid===this._uid)}function i(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this;if(a.call(t)&&t&&!1!==l.value&&d){var n=this.$el;if(n&&n.parentElement){r(),Object.keys(s).forEach(function(t){f[t]=s[t]});var e=this.$data.vuegConfig;e&&Object.keys(e).forEach(function(t){f[t]=e[t]}),f.disable&&(u=""),f.shadow&&(n.style.boxShadow="0 3px 10px rgba(0, 0, 0, .156863), 0 3px 10px rgba(0, 0, 0, .227451)"),"first"===u&&(n.style.animationDuration=f.firstEntryDuration+"s",n.classList.add("fadeIn")),u&&(n.style.animationDuration=f.duration+"s"),n.classList.add("animated");var i=["touchPoint"],o=void 0;switch(u){case"forward":o=f.forwardAnim;break;case"back":o=f.backAnim}o&&n.classList.add(o);var c=void 0,m=document.head||document.getElementsByTagName("head")[0],v=void 0;if((c=document.getElementById("vueg-style"))||((c=document.createElement("style")).type="text/css",c.id="vueg-style",m.appendChild(c)),-1!==i.findIndex(function(t){return t===o}))switch(o){case"touchPoint":var p={x:document.documentElement.clientWidth/2,y:document.documentElement.clientHeight/2};v=".touchPoint{\n                                max-height:"+document.documentElement.clientHeight+"px!important;\n                                overflow:hidden;\n                                animation-name:touchPoint;\n                                position: relative;\n                                animation-timing-function: linear;\n                            }\n                            @keyframes touchPoint {\n                                from {\n                                    opacity:0.5;\n                                    transform: scale3d(0, 0, 0);\n                                    left:"+(-p.x+h.x)+"px;\n                                    top:"+(-p.y+h.y)+"px;\n                                }\n                                to{ \n                                    opacity:1;\n                                    transform: scale3d(1, 1, 1);\n                                    left:0;\n                                    top:0;\n                                }\n                            }";var g=document.createTextNode(v);c.appendChild(g)}setTimeout(function(){n.classList.remove(f.forwardAnim),n.classList.remove(f.backAnim),n.style.animationDuration="0s";var t=document.getElementById("vueg-background");t&&(t.innerHTML=""),-1!==i.findIndex(function(t){return t===o})&&(c.innerHTML="")},1e3*f.duration+300),setTimeout(function(){n.classList.remove("fadeIn")},1e3*f.firstEntryDuration)}}}function o(t){"mousedown"===t.type?(h.x=t.pageX,h.y=t.pageY):(h.x=t.touches[0].pageX,h.y=t.touches[0].pageY)}function r(){f={duration:"0.3",firstEntryDisable:!1,firstEntryDuration:".6",forwardAnim:"fadeInRight",backAnim:"fadeInLeft",sameDepthDisable:!1,tabs:[],tabsDisable:!1,disable:!1,shadow:!0}}var s=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},d=void 0,c=void 0,u=void 0,l={},f=void 0,m=void 0,h={x:0,y:0};r(),t.directive("transition",{bind:function(t,n,e,a){l=n}}),t.mixin({mounted:i,activated:i,beforeDestroy:e,deactivated:e}),n.beforeEach(function(t,n,e){d=t;var a=t.path.split("/").length,i=n.path.split("/").length;if("/"!==t.path.charAt(t.path.length-1)&&(a+=1),"/"!==n.path.charAt(n.path.length-1)&&(i+=1),u=a>i?"forward":"back",a===i&&(u=c===t.path?"back":"forward",f.sameDepthDisable&&(u=""),c=n.path),t.path===n.path&&t.path===c&&(u="first"),f.firstEntryDisable&&(u=""),n.name&&t.name){var o=f.tabs.findIndex(function(t){return t.name===n.name}),r=f.tabs.findIndex(function(n){return n.name===t.name});f.tabsDisable||-1===o||-1===r?-1!==o&&-1!==r&&(u=""):(r>o&&(u="forward"),r<o&&(u="back"),r===o&&(u=""))}var s=t.matched[0];m=s&&s.instances?s.instances:null,e()}),document.addEventListener("mousedown",o),document.addEventListener("touchstart",o)},module.exports=transition;
=======
let transition = {}
transition.install = (Vue, router, options = {}) => {
    let route, lastPath, transitionType, binding = {},
        op

    function _initOptions() {
        //默认配置
        op = {
            duration: '0.3', //动画时长
            firstEntryDisable: false, //值为true时禁用首次进入的渐进动画
            firstEntryDuration: '.6', //首次进入渐进动画时长
            forwardAnim: 'fadeInRight', //前进动画
            backAnim: 'fadeInLeft', //后退动画
            sameDepthdisable: false, //url级别相同时禁用动画
            tabs: [], //name填写对应路由的name,以实现类似app中点击tab页面水平转场效果，如tab[1]到tab[0]，会使用forwardAnim动画，tab[1]到tab[2]，会使用backAnim动画
            tabsDisable: false, //值为true时，tabs间的转场没有动画
            disable: false, //禁用转场动画
            vueEl: 'app' //new Vue({el: '#app'),vue所挂在元素的ID，默认为app，此配置用于保持转场时的“底色”
        }
    }
    _initOptions()

    Vue.directive('transition', {
        bind(el, _binding, vnode, oldVnode) {
            binding = _binding
        }
    })

    //旧组件退出后会被销毁，所以建个容器，在销毁后重新挂在上去，作为“底色”
    function setBackground() {

        let bacgrEle = document.createElement('div')
        bacgrEle.id = 'vug-background'
            //每次重新挂载vue都会情况被挂载元素，所有每次都要再添加进去
        if (!document.getElementById('vug-background'))
            document.getElementById(op.vueEl).appendChild(bacgrEle)
        let vugBac = document.getElementById('vug-background')
        // console.log(document.documentElement.clientHeight)
        // vugBac.style.maxHeight = document.documentElement.clientHeight + 'px'
        vugBac.innerHTML = ''
        vugBac.classList = []
        vugBac.appendChild(this.$el)
    }

    Vue.mixin({
        beforeCreate() {
            route = this.$route
        },
        mounted: addEffect,
        activated: addEffect,
        destroyed: setBackground,
        deactivated: setBackground
    })

    router.beforeEach((to, from, next) => {
        let toDepth = to.path.split('/').length
        let fromDepth = from.path.split('/').length
        if (to.path.charAt(to.path.length - 1) !== '/')
            toDepth += 1
        if (from.path.charAt(from.path.length - 1) !== '/')
            fromDepth += 1
        transitionType = toDepth > fromDepth ? 'forward' : 'back'

        //深度相同
        if (toDepth === fromDepth) {
            if (lastPath === to.path) {
                transitionType = 'back'
            } else {
                transitionType = 'forward'
            }
            //深度相同时禁用动画
            if (op.sameDepthdisable)
                transitionType = ''

            lastPath = from.path
        }

        //首次进入无效果
        if (to.path === from.path && to.path === lastPath)
            transitionType = 'first'

        //关闭首次进入渐进动画
        if (op.firstEntryDisable)
            transitionType = ''

        //tabs转场控制
        if (from.name && to.name) {
            let fromIndex = op.tabs.findIndex(item => {
                    return item.name === from.name
                }),
                toIndex = op.tabs.findIndex(item => {
                    return item.name === to.name
                })
            if (!op.tabsDisable && fromIndex !== -1 && toIndex !== -1) {
                //启用tabs控制
                if (toIndex > fromIndex)
                    transitionType = 'forward'
                if (toIndex < fromIndex)
                    transitionType = 'back'
                if (toIndex === fromIndex)
                    transition = ''
            } else {
                //tabs禁用动画
                if (fromIndex !== -1 && toIndex !== -1)
                    transitionType = ''
            }
        }
        //禁用转场动画配置
        if (op.disable)
            transition = ''

        next()
    })

    function addEffect(vm = this) {
        if (!vm)
            return
        let el = vm.$el
        if (binding.value === false)
            return
        if (!route)
            return console.error('没有使用vue-router')
        if (!el.parentElement)
            return

        //防止某组件的配置影响其他组件，每次都初始化一下数据
        _initOptions()

        //全局vueg配置
        Object.keys(options).forEach(key => {
            op[key] = options[key]
        })

        //组件vueg配置
        let vugConfig = vm.$data.vugConfig
        if (vugConfig) {
            Object.keys(vugConfig).forEach(key => {
                op[key] = vugConfig[key]
            })
        }

        //设置首次进入的渐进显示时长
        if (transitionType === 'first') {
            el.style.animationDuration = op.firstEntryDuration + 's'
            el.classList.add('fadeIn')
        }

        //转场动画时长
        if (transitionType)
            el.style.animationDuration = op.duration + 's'

        el.classList.add('animated')
        switch (transitionType) {
            case 'forward':
                el.classList.add(op.forwardAnim)
                break
            case 'back':
                el.classList.add(op.backAnim)
                break
            default:
                break
        }
        //动画完成后移除class
        setTimeout(() => {
            el.classList.remove(op.forwardAnim)
            el.classList.remove(op.backAnim)
            el.style.animationDuration = '0s'
        }, op.duration * 1000)
        setTimeout(() => {
            el.classList.remove('fadeIn')
        }, op.firstEntryDuration * 1000);
    }

}
export default transition
>>>>>>> Stashed changes
