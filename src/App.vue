<script setup>
import { hexToRgb } from '@layouts/utils';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useTheme } from 'vuetify';

const { global } = useTheme()

const route = useRoute();

setInterval(() => {
    console.log("route", route.fullPath)
}, 2000)
onMounted(() => {
    console.log("route", route.fullPath)
})
</script>

<template>
  <VApp :style="`--v-global-theme-primary: ${hexToRgb(global.current.value.colors.primary)}`">
    <RouterView />
    <!-- <DashboardTemp /> -->
    <!-- <UpgradeToPro /> -->
  </VApp>
</template>
