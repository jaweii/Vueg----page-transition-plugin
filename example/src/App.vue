<template>
    <div id="app">
        <router-view v-transition="true"></router-view>
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
    text-align: center;
    color: #2c3e50;
}
body{
  margin:0;
}
a {
    cursor: pointer;
    text-decoration: underline;
}
</style>
