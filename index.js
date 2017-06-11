let transition = {};
transition.install = (Vue, options = {}) => {
    let route, lastPath, transitionType
    let op = { duration: '0.3s' } //默认配置
    Object.keys(options).forEach(key => {
        op[key] = options[key]
    })
    Vue.directive('transition', {
        inserted(el, binding, vnode, oldVnode) {
            if (binding.value === false)
                return
            if (!route)
                return console.error('没有使用vue-router')

            el.parentElement.style.overflow = 'hidden'
            if (!transitionType) {
                return el.classList.add('vue-transition-first')
            }

            el.style.animationDuration = op.duration + 's'
            if (transitionType === 'forward') {
                el.classList.add('vue-transition-in')
            } else {
                el.classList.add('vue-transition-out')
            }
        }
    })

    Vue.mixin({
        beforeCreate() {
            route = this.$route
        },
        watch: {
            '$route' (val, oldVal) {
                // 转场前进/后退控制
                let toDepth = val.path.split('/').length
                let fromDepth = oldVal.path.split('/').length
                if (val.path.charAt(val.path.length - 1) !== '/')
                    toDepth += 1
                if (oldVal.path.charAt(oldVal.path.length - 1) !== '/')
                    fromDepth += 1
                transitionType = toDepth > fromDepth ? 'forward' : 'back'
                if (toDepth === fromDepth) {
                    if (lastPath === val.path)
                        transitionType = 'back'
                    else transitionType = 'forward'
                    lastPath = oldVal.path
                }
            }
        }
    })
}
export default transition
