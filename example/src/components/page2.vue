<template>
    <section>
        <img src="../assets/logo.png">
        <h1>页面</h1>
        <br>
        <router-view v-transition></router-view>
        <br>
        <div @click="$router.back()">返回</div>
    </section>
</template>
<style scoped>
section {
    text-align: center;
    background-color: #b2ebf2;
    height: 800px;
}

h1 {
	margin: 0;
}
</style>
