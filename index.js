let transition = {};
transition.install = (Vue, options) => {
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
                let toDepth = val.path.split('/').length,
					fromDepth = oldVal.path.split('/').length,
					homeLevel = false,
					homeLevelKey = false,// 首页参与过度
					levelKey = false // 同级开启切换
                if (val.path.charAt(val.path.length - 1) !== '/'){
                    toDepth += 1
				}
                if (oldVal.path.charAt(oldVal.path.length - 1) !== '/'){
                    fromDepth += 1
				}
				
				if(!homeLevelKey&&val.path.split('/').join('')==''||oldVal.path.split('/').join('')==''){
					homeLevel = true;
				}
				// 同级不转场
				if(!levelKey&&toDepth==fromDepth||homeLevel){
					transitionType='';
					this.$el.style.animationDuration = '0s'
					return false;
				}
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
