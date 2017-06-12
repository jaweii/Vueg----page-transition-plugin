<template>
	<section>
		<h1 >页面1</h1>
		<br>
		<br>
		<br>
		<a @click="$router.back()">返回</a>
	</section>
</template>

<style scoped>
	section{
		text-align: center;
		background-color: pink;	
		height: 800px;
	}
	h1{
		margin:0;
		padding-top: 50px;
	}
</style>