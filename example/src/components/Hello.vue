<template>
  <div class="hello">
    <h1>vueg</h1>
    <h2></h2>
    <ul>
      <li><a @click="$router.push('page-1')">页面一</a></li>
      <li><a @click="$router.push('page-2')">页面二</a></li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'hello'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
  margin:0;
  padding-top: 50px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

.hello{
  height:800px;
  background-color: #f2f8ff;
}
</style>
