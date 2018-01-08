<template>
    <div id="app">
        <!-- <keep-alive> -->
        <router-view v-transition></router-view>
        <!-- </keep-alive> -->
    </div>
</template>
<script>
export default {
    name: 'app'
}
</script>
<style>
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #4c2c2d;
}

body {
    margin: 0;
}

a {
    cursor: pointer;
    text-decoration: underline;
}
</style>
