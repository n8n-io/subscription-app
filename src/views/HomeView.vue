<script setup lang="ts">
</script>

<template>
	<main>
		<div :class="$style.test">{{ $t('hello.world') }}</div>
		<el-button>Default</el-button>
	</main>
</template>

<style lang="scss" module>
.test {
	color: red;
}
</style>
