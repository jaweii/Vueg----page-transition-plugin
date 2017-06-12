<template>
    <section>
        <img src="../assets/logo.png">
        <h1>页面2</h1>
        <br>
        <router-view v-transition></router-view>
        <br>
        <a @click="$router.back()">返回</a>
    </section>
</template>
<style scoped>
section {
    text-align: center;
    background-color: pink;
    height: 800px;
}

h1 {
	margin: 0;
}
</style>
