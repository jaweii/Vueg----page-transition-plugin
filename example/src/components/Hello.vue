<template>
    <div class="hello">
        <h1 @click="test">VUEG</h1>
        <br>
        <ul>
            <li><a @click="$router.push('page-1')">底部打开</a></li>
            <li><a @click="$router.push('page-2')">默认转场效果</a></li>
            <li><a @click="$router.push('page-3')">bounce转场</a></li>
        </ul>
        <button @click="$router.push('page-1')" class="publish">+</button>
    </div>
</template>
<script>
export default {
    name: 'hello',
    data() {
        return {
            vuegConfig
: {
                forwardAnim: this.$store.state.page3.forwardAnim,
                backAnim: this.$store.state.page3.backAnim,
                duration: this.$store.state.page3.duration
            }
        }
    },
    mounted() {
        // 在page3中修改了config，这里做下恢复(在别的组件中有修改，自身要做恢复处理)
        this.$store.commit('setState', {
            key: 'page3',
            value: {
                forwardAnim: 'fadeInRight',
                duration: '0.3',
                backAnim: 'fadeInLeft'
            }
        })
    },
    methods: {
        test() {
            this.$el.classList.add('animated')
            this.$el.classList.add('fadeInRight')
        }
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
    font-weight: normal;
    margin: 0;
    padding-top: 50px;
    color:#4c2c2d;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    text-align: center;
    display: inline-block;
    margin: 0 10px;
}

a {
    color: #4c2c2d;
}

.hello {
    height: 800px;
    background-color: #ffefc3;
    text-align: center;
}

.publish {
    position: fixed;
    width: 70px;
    height: 70px;
    left: 0;
    right: 0;
    bottom: 20px;
    margin: auto;
    border-radius: 50%;
    background-color: #e67052;
    border: none;
    box-shadow: 0 19px 60px rgba(0, 0, 0, .298039), 0 15px 20px rgba(0, 0, 0, .219608);
    color: #fff;
    font-size: 40px;
    text-align: center;
    padding: 0;
    line-height: 70px;
    vertical-align: sub;
}

.publish:hover {
    background-color: #d50000;
}
</style>
