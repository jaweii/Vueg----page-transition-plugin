<template>
    <section>
        <img src="../assets/logo.png">
        <h1>页面4 定点载入</h1>
        <br>
        <router-view v-transition></router-view>
        <br>
        <a @click="back">返回</a>
        <br>
    </section>
</template>
<script>
export default {
    name: 'page1',
    data() {
        return {
            vuegConfig: {
                forwardAnim: 'touchPoint',
                duration: '.3'
            }
        }
    },
    methods: {
        back() {
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
