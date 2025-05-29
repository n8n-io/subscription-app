<script setup lang="ts"></script>

<template>
	<div :class="[$style.notfound]">
		<h1>404 - Not found</h1>
	</div>
</template>

<style lang="scss" module>
.notfound {
	display: grid;
	place-items: center;
	height: 100%;
}
</style>
