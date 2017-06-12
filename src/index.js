let transition = {};
transition.install = (Vue, router, options = {}) => {
    let route, lastPath, transitionType, binding = {}

    //默认配置
    let op = {
        duration: '0.3', //动画时长
        firstEntryDisable: false, //值为true时禁用首次进入的渐进动画
        firstEntryDuration: '.6', //首次进入渐进动画时长
        forwardAnim: 'fadeInRight', //前进动画
        backAnim: 'fadeInLeft', //后退动画
        sameDepthdisable: false, //url级别相同时禁用动画
        tabs: [], //name填写对应路由的name,以实现类似app中点击tab页面水平转场效果，如tab[1]到tab[0]，会使用forwardAnim动画，tab[1]到tab[2]，会使用backAnim动画
        tabsDisable: false, //值为true时，tabs间的转场没有动画
        disable: false, //禁用转场动画
    }

    Vue.directive('transition', {
        bind(el, _binding, vnode, oldVnode) {
            binding = _binding
        }
    })

    Vue.mixin({
        beforeCreate() {
            route = this.$route
        },
        mounted: addEffect,
        activated: addEffect
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

        el.parentElement.style.overflow = 'hidden'

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
