<template>
	<section>
		<h1 >页面1</h1>
		<br>
		<br>
		<br>
		<div @click="$router.back()">返回</div>
	</section>
</template>
<script>
	export default{
		name:'page1',
		data(){
			return {
				vuegConfig
:{
					forwardAnim:'zoomInUp'
				}
			}
		}
	}
</script>
<style scoped>
	section{
		text-align: center;
		background-color: #d1c4e9;	
		height: 600px;
	}
	h1{
		margin:0;
		padding-top: 50px;
	}
</style>