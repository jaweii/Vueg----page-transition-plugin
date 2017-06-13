<template>
    <section>
        <img src="../assets/logo.png">
        <h1>页面3 bounce转场</h1>
        <br>
        <router-view v-transition></router-view>
        <br>
        <a @click="back">慢速返回</a>
        <br>
    </section>
</template>
<script>
export default {
    name: 'page1',
    data() {
        return {
            vugConfig: {
                forwardAnim: 'bounceInRight',
                duration: '.5'
            }
        }
    },
    methods: {
        back() {
            this.$store.commit('setState', {
                key: 'page3',
                value: {
                    forwardAnim: 'bounceInRight',
                    backAnim: 'bounceInLeft',
                    duration: '3'
                }
            })
            this.$router.back()
        }
    }
}
</script>
<style scoped>
section {
    text-align: center;
    background-color: #f0f4c3;
    height: 800px;
}

h1 {
    margin: 0;
}
</style>
