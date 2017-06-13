<template>
    <div>
        <h1>页面2-1</h1>
        <a @click="$router.back()">转到页面2-0</a>
    </div>
</template>
<script>
export default {
    data() {
        return {
            vuegConfig: {
                disable: false
            }
        }
    }
}
</script>
<style scoped>
div {
    text-align: center;
    background-color: gray;
}

h1 {}
</style>
