let transition = {}
transition.install = (Vue, router, options = {}) => {
    let route, lastPath, transitionType, binding = {},
        op, //配置项
        instances, //组件激活时判断是否属于route中，不属于无动画
        coord = { x: 0, y: 0 } //按下坐标

    _initOptions()

    Vue.directive('transition', {
        bind(el, _binding, vnode, oldVnode) {
            binding = _binding
        }
    })

    //旧组件退出后会被销毁，所以建个容器，在销毁后重新挂在上去，作为“底色”
    function setBackground() {
        //不属于当前进场路由匹配到的组件，则不处理

        // this.$el.classList.add('animated','fadeOut')

        let obj = this.$el.classList
        if (!obj)
            return

        let arr = []
        Object.keys(obj).forEach(item => {
            arr.push(obj[item])
        })
        let isInArr = false
        arr.map(item => {
                if (item === 'animated')
                    isInArr = true
            })
            //我想屎。。。
        if (!isInArr)
            return

        let bacgrEle = document.createElement('div')
        bacgrEle.id = 'vueg-background'
        let vm = instances.default
        if (vm) {

            //获取组件vueg配置
            let vuegConfig = vm.$data.vuegConfig
            if (vuegConfig) {
                Object.keys(vuegConfig).forEach(key => {
                    op[key] = vuegConfig[key]
                })
            }

            //禁用转场则不设置底色
            if (op.disable)
                return

            //每次重新挂载vue都会清空被挂载元素，所有每次都要再添加进去
            let vuegBac = document.getElementById('vueg-background')
                //不存在就插入
            if (!vuegBac) {
                vm.$el.parentElement.appendChild(bacgrEle)
                vuegBac = bacgrEle
            }

            vuegBac.innerHTML = ''
            vuegBac.classList = []
            vuegBac.appendChild(this.$el)
                // console.log(vuegBac)
        }
    }
    Vue.mixin({
        mounted: addEffect,
        activated: addEffect,
        beforeDestroy: setBackground,
        deactivated: setBackground
    })

    router.beforeEach((to, from, next) => {
        route = to
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
            if (op.sameDepthDisable)
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
                    transitionType = ''
            } else {
                //tabs禁用动画
                if (fromIndex !== -1 && toIndex !== -1)
                    transitionType = ''
            }
        }

        //获取进场的组件instances，{default:component}
        let matched = to.matched[0]
        if (matched && matched.instances) {
            instances = matched.instances
        } else
            instances = null
        next()
    })

    function isInRoute() {

        //对于嵌套路由，默认为关闭动画，需要在组件的data.vuegConfig中配置disable为false启用
        if (this.vuegConfig && this.vuegConfig.disable === false) {
            // this.$el.style.boxShadow = 'initial'
            return true
        }
        //router.afterEach后获得新页面的组件，组件渲染或激活后触发addEffect
        if (instances && instances.default && instances.default._uid !== this._uid)
            return false
        else return true
    }

    //router.afterEach后获得新页面的组件，组件渲染或激活后触发addEffect
    function addEffect(ins = this) {
        //不属于当前进场路由匹配到的组件，则无动画
        if (!isInRoute.call(ins))
            return
        if (!ins) //无参
            return
        if (binding.value === false)
            return
        if (!route)
            return
        let el = this.$el
        if (!el) //容错
            return
        if (!el.parentElement)
            return

        //防止某组件的配置影响其他组件，每次都初始化一下数据
        _initOptions()

        //全局vueg配置
        Object.keys(options).forEach(key => {
            op[key] = options[key]
        })

        //组件vueg配置
        let vuegConfig = this.$data.vuegConfig

        if (vuegConfig) {
            Object.keys(vuegConfig).forEach(key => {
                op[key] = vuegConfig[key]
            })
        }

        //禁用转场动画配置
        if (op.disable)
            transitionType = ''

        if (op.shadow)
            el.style.boxShadow = '0 3px 10px rgba(0, 0, 0, .156863), 0 3px 10px rgba(0, 0, 0, .227451)'

        //设置首次进入的渐进显示时长
        if (transitionType === 'first') {
            el.style.animationDuration = op.firstEntryDuration + 's'
            el.classList.add('fadeIn')
        }

        //转场动画时长
        if (transitionType)
            el.style.animationDuration = op.duration + 's'

        el.classList.add('animated')
        let coordAnim = ['touchPoint']
        let anim
        switch (transitionType) {
            case 'forward':
                anim = op.forwardAnim
                break
            case 'back':
                anim = op.backAnim
                break
            default:
                break
        }
        if (anim)
            el.classList.add(anim)

        //需要结合js获取触摸坐标的转场设置
        let style,
            head = document.head || document.getElementsByTagName('head')[0],
            cssText
        style = document.getElementById('vueg-style')
        if (!style) {
            style = document.createElement('style')
            style.type = 'text/css'
            style.id = 'vueg-style'
            head.appendChild(style)
        }
        if (coordAnim.findIndex(item => item === anim) !== -1) {
            switch (anim) {
                case 'touchPoint':
                    let centerPoint = {
                        x: document.documentElement.clientWidth / 2,
                        y: document.documentElement.clientHeight / 2
                    }
                    cssText = `.touchPoint{
                                max-height:${document.documentElement.clientHeight}px!important;
                                overflow:hidden;
                                animation-name:touchPoint;
                                position: relative;
                                animation-timing-function: linear;
                            }
                            @keyframes touchPoint {
                                from {
                                    opacity:0.5;
                                    transform: scale3d(0, 0, 0);
                                    left:${-centerPoint.x+coord.x}px;
                                    top:${-centerPoint.y+coord.y}px;
                                }
                                to{ 
                                    opacity:1;
                                    transform: scale3d(1, 1, 1);
                                    left:0;
                                    top:0;
                                }
                            }`
                    let textNode = document.createTextNode(cssText)
                    style.appendChild(textNode)
                    break
                default:
                    break
            }
        }

        //动画完成后移除class
        setTimeout(() => {
                el.classList.remove(op.forwardAnim)
                el.classList.remove(op.backAnim)
                el.style.animationDuration = '0s'
                let vuegBac = document.getElementById('vueg-background')
                if (vuegBac)
                    vuegBac.innerHTML = ''

                if (coordAnim.findIndex(item => item === anim) !== -1)
                    style.innerHTML = ''
            }, op.duration * 1000 + 300) //加300毫秒延迟 因为有时动画还没完成就被移除了
        setTimeout(() => {
            el.classList.remove('fadeIn')
        }, op.firstEntryDuration * 1000);
    }

    document.addEventListener('mousedown', getCoord)
    document.addEventListener('touchstart', getCoord)

    //获得按下坐标
    function getCoord(e) {
        if (e.type === 'mousedown') {
            coord.x = e.pageX
            coord.y = e.pageY
        } else {
            coord.x = e.touches[0].pageX
            coord.y = e.touches[0].pageY
        }

    }


    function _initOptions() {
        //默认配置
        op = {
            duration: '0.3', //动画时长
            firstEntryDisable: false, //值为true时禁用首次进入的渐进动画
            firstEntryDuration: '.6', //首次进入渐进动画时长
            forwardAnim: 'fadeInRight', //前进动画
            backAnim: 'fadeInLeft', //后退动画
            sameDepthDisable: false, //url级别相同时禁用动画
            tabs: [], //name填写对应路由的name,以实现类似app中点击tab页面水平转场效果，如tab[1]到tab[0]，会使用forwardAnim动画，tab[1]到tab[2]，会使用backAnim动画
            tabsDisable: false, //值为true时，tabs间的转场没有动画
            disable: false, //禁用转场动画
            shadow: true //为false，转场时没有阴影层次效果
        }
    }

}
module.exports = transition
