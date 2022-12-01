<script setup lang="ts"></script>

<template>
	<main>
		<div :class="$style.test">{{ $t('hello.world') }}</div></main>
</template>

<style lang="scss" module>
.test {
	color: red;
}
</style>
