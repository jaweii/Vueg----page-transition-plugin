let transition = {};
transition.install = (Vue, router, options = {}) => {
    let route, lastPath, transitionType, binding = {}
        //默认配置
    let op = {
        duration: '0.3',//动画时长
        firstEntryDuration: '.6',//首次进入渐进时长
        forwardAnim:'fadeInRight',//前进动画
        backAnim:'fadeInLeft'//后退动画

    }
    Object.keys(options).forEach(key => {
        op[key] = options[key]
    })

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
        if (toDepth === fromDepth) {
            if (lastPath === to.path)
                transitionType = 'back'
            else transitionType = 'forward'
            lastPath = from.path
        }
        if (to.path === from.path && to.path === lastPath) //首页无效果
            transitionType = ''
        next()
    })

    function addEffect(vm = this) {
        if (!vm)
            return console.error('无vm')
        let el = vm.$el
        if (binding.value === false)
            return
        if (!route)
            return console.error('没有使用vue-router')
        if (!el.parentElement)
            return
        el.parentElement.style.overflow = 'hidden'
            //转场动画时长
        el.style.animationDuration = op.duration + 's'
            //设置首次进入的渐进显示时长
        if (!transitionType) {
            el.style.animationDuration = op.firstEntryDuration + 's'
            el.classList.add('fadeIn')
        }

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
        }, op.duration * 1000)
        setTimeout(() => {
            el.classList.remove('fadeIn')
        }, op.firstEntryDuration * 1000);
    }

}
export default transition
