<script setup lang="ts">
import { RouterView } from 'vue-router';

</script>

<template>
  <el-config-provider size="small" :z-index="3000">
		<header>
			<img alt="n8n logo" class="logo" src="@/assets/logo.png" height="25" />
		</header>

		<RouterView />
  </el-config-provider>
</template>

<style module></style>
