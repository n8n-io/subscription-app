<script setup lang="ts">
import { RouterView } from 'vue-router';
</script>

<template>
	<el-config-provider size="small" :z-index="3000">
		<RouterView />
	</el-config-provider>
</template>

<style module></style>
