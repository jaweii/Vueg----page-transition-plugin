import 'animate.css'
import './index.css'

/**
 * @typedef Options
 * @type {Object}
 * @property {number} duration 动画时长。默认为0.3
 * @property {string} enter 入场动画，默认为'fadeInRight'
 * @property {string} leave 离场动画，默认为'fadeInLeft'
 * @property {boolean} disableAtSameDepths 深度相同时禁用动画(通过url中的反斜杠数量/判断)。默认为false
 * @property {boolean} shadow 是否为入场页面添加阴影。默认为true
 * @property {Object} map 有时候通过url判断的转场类型可能并不是你想要的，这时你可以使用map选项。
 * 指定路由A到路由A/B/C的转场类型是enter还是leave，覆盖通过url深度判断的转场类型。
 * 下面例子表示，从名为`user-login`的路由到名为`user-regiseter`的路由转场，使用入场动画，顺序反转则使用离场动画。
 * 从名为`user-login`的路由到名为`index`的路由转场，使用离场动画，顺序反转则使用入场动画。
 * 从名为`user-login`的路由到名为`user-login-sms`的路由转场，禁用转场动画。
 * 例子:`
 * map: {
 *  'user-login':{
 *    enter: ['user-register'],
 *    leave: ['index'],
 *    disable: ['user-login-sms']
 *  }
 * }
 * `
 * 默认为{}。
 */

const plugin = {
  install(Vue, router, options = {}) {
    /** @type {boolean}  */
    const nuxt = !!window._nuxtReadyCbs

    /** @type {string} 新场景route路径 */
    let route

    /** @type {string} 离场route路径 */
    let lastPath

    /** @type {string} 转场类型  first | forward | back | null */
    let transitionType

    /** @type {number} 最近一次touchEnd事件触发的时间(戳) */
    let touchEndTime = Date.now()

    /**
     * 默认配置 
     * @type {Options}
     * 
     */
    let op = {}
    /**
     * 指令配置 
     * @type {Options}
     * 
     */
    let instanceConfig = {}

    /**
     * 离场组件的指令配置
     * @type {Options}
     * 
     */
    let lastInstanceConfig = {}

    /** @type {x:number,y:number} 按下坐标*/
    let coord = { x: 0, y: 0 }

    /** @type {x:number,y:number} 滚动条位置*/
    let scrollPosition = { x: 0, y: 0 }

    /** @type {Object}  离场组件 */
    let lastComponent

    init()

    //全局vueg配置
    Object.assign(op, options)

    //旧组件退出后会被销毁，所以建个容器，在销毁后重新挂在上去，作为“底色”
    function setBackground(el) {
      if (this && this.$el) el = this.$el
      /** @type {Element['classList']} */
      const classList = el.classList

      //每次重新挂载vue都会清空被挂载元素，所有每次都要再添加进去
      let bg = document.getElementById('vueg-background')
      //不存在就插入
      if (!bg) {
        const bgElement = document.createElement('div')
        bgElement.id = 'vueg-background'
        document.body.appendChild(bgElement)
        bg = bgElement
      }

      bg.innerHTML = ''
      bg.classList = []
      bg.appendChild(el)

      // 恢复之前的滚动条位置
      bg.scrollLeft = scrollPosition.x
      bg.scrollTop = scrollPosition.y
    }
    Vue.directive('transition', {
      inserted(el, binding, vnode, oldVnode) {
        const value = binding.value || {}
        if (vnode.data.routerView) {
          lastInstanceConfig = instanceConfig || {}
          instanceConfig = Object.assign(value || {}, lastInstanceConfig)
        } else {
          lastInstanceConfig = instanceConfig || {}
          instanceConfig = value || {}
        }
        addEffect(vnode.context, el, instanceConfig)
      }
    })
    Vue.mixin({
      beforeRouteEnter(to, from, next) {
        // 记录滚动条位置
        scrollPosition = { x: window.pageXOffset, y: window.pageYOffset }
        next()
      },
      beforeRouteLeave(ro, from, next) {
        lastComponent = this
        next()
      },
      transition: nuxt ? (to, from) => {
        return {
          css: false,
        }
      } : null
    })

    router.beforeEach((to, from, next) => {
      route = to
      let toDepth = to.path.split('/').filter(v => !!v).length
      let fromDepth = from.path.split('/').filter(v => !!v).length

      transitionType = toDepth > fromDepth ? 'forward' : 'back'
      //深度相同
      if (toDepth === fromDepth) {
        if (lastPath === to.path && toDepth < fromDepth) {
          transitionType = 'back'
        } else {
          transitionType = 'forward'
        }
        //深度相同时禁用动画
        if (op.disableAtSameDepths)
          transitionType = null

        lastPath = from.path
      }

      //首次进入无效果
      if (to.path === from.path && to.path === lastPath)
        transitionType = 'first'

      // 处理map选项
      const enter = Object.keys(op.map).find(key => op.map[key].enter && op.map[key].enter.includes(from.name))
      const leave = Object.keys(op.map).find(key => op.map[key].leave && op.map[key].leave.includes(to.name))
      if (enter && enter === to.name) {
        transitionType = 'back'
      } else if (leave && leave === from.name) {
        transitionType = 'back'
      } else if (Object.keys(op.map).includes(from.name)) {
        if (op.map[from.name]['enter'] && op.map[from.name]['enter'].includes(to.name)) {
          transitionType = 'forward'
        }
        if (op.map[from.name]['leave'] && op.map[from.name]['leave'].includes(to.name)) {
          transitionType = 'back'
        }
        if (op.map[from.name]['disable'] && op.map[from.name]['disable'].includes(to.name)) {
          transitionType = null
        }
      } else if (Object.keys(op.map).includes(to.name)) {
        if (op.map[to.name]['leave'] && op.map[to.name]['leave'].includes(from.name)) {
          transitionType = 'forward'
        }
        if (op.map[to.name]['enter'] && op.map[to.name]['enter'].includes(from.name)) {
          transitionType = 'back'
        }
        if (op.map[to.name]['disable'] && op.map[to.name]['disable'].includes(from.name)) {
          transitionType = null
        }
      }

      // 判断是否ios滑动返回.
      /**
       * 如果是点击按钮返回，touchEnd间隔会非常短
       * 如果是滑动返回，touchEnd间隔会较长
       * 通过此特征判断
       */
      const interval = Date.now() - touchEndTime
      const isSafari = !!navigator.userAgent.match(/Version\/[\d\.]+.*Safari/);
      const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
      if (interval > 40 && iOS && isSafari) {
        transitionType = null
      }

      next()
    })

    //router.afterEach后获得新页面的组件，组件渲染或激活后触发addEffect
    /**
     * 
     * @param {VueComponent} instance 
     * @param {Element} el 
     */
    function addEffect(instance = this, el) {
      if (!instance) //无参
        return
      if (!route)
        return
      if (!el)
        return
      if (!el.parentElement)
        return

      //防止某组件的配置影响其他组件，每次都初始化一下数据
      init()

      //应用全局vueg配置
      Object.assign(op, options)

      //组件vueg配置覆盖全局配置
      Object.assign(op, instanceConfig)


      if (op.shadow) {
        el.style.boxShadow = '0 3px 10px rgba(0, 0, 0, .156863), 0 3px 10px rgba(0, 0, 0, .227451)'
      }

      //转场动画时长
      if (transitionType) {
        el.style.animationDuration = op.duration + 's'
      }

      const coordAnim = ['touchPoint']
      let anim
      switch (transitionType) {
        case 'forward':
          anim = op.enter
          break
        case 'back':
          anim = op.leave
          break
        case null:
          return
        default:
          break
      }

      //需要结合js获取触摸坐标的转场设置
      /** @type {Element} */
      let style

      let head = document.head || document.getElementsByTagName('head')[0]

      /** @type {string} */
      let cssText

      style = document.getElementById('vueg-style')
      if (!style) {
        style = document.createElement('style')
        style.type = 'text/css'
        style.id = 'vueg-style'
        head.appendChild(style)
      } else {
        style.innerHTML = ''
      }
      if (coordAnim.includes(anim)) {
        switch (anim) {
          case 'touchPoint':
            cssText = `.touchPoint{
                                max-height:${document.documentElement.clientHeight}px;
                                overflow:hidden;
                                animation-name:touchPoint;
                                position: relative;
                            }
                            @keyframes touchPoint {
                                0% {
                                    -webkit-clip-path: circle(0% at ${coord.x}px ${coord.y}px);
                                }
                                100% {
                                    -webkit-clip-path: circle(120% at ${coord.x}px ${coord.y}px);
                                }
                            }`
            const textNode = document.createTextNode(cssText)
            style.appendChild(textNode)
            break
          default:
            break
        }
      }

      // 去除动画过程的滚动条
      if (instance.$el.parentElement) {
        instance.$el.parentElement.classList.add('fit-to-screen')
      }

      if (lastComponent) {
        setBackground(lastComponent.$el)
        if (anim) el.classList.add(anim)
      }

      //动画完成后移除class
      setTimeout(() => {
        el.classList.remove(op.enter)
        el.classList.remove(op.leave)
        el.style.animationDuration = '0s'
        el.style.boxShadow = null

        const bg = document.getElementById('vueg-background')
        // 移除背景
        if (bg) {
          bg.innerHTML = ''
        }

        if (coordAnim.includes(anim)) {
          style.innerHTML = ''
        }

        // 恢复实例classList
        if (instance.$el.parentElement) {
          instance.$el.parentElement.classList.remove('fit-to-screen')
        }

      }, op.duration * 1000)

      // lastInstanceConfig = {}
      // Object.assign(lastInstanceConfig, op)
    }

    document.addEventListener('mousedown', getCoord)
    document.addEventListener('touchstart', getCoord)
    document.addEventListener('touchend', () => {
      touchEndTime = Date.now()
    })

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

    function init() {
      //默认配置
      op = {
        duration: 0.3,
        enter: 'fadeInRight',
        leave: 'fadeInLeft',
        disableAtSameDepths: false,
        shadow: true,
        map: {}
      }
    }

  }
}

export default plugin
