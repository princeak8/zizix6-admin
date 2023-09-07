<script setup>
import AnalyticsCongratulations from '@/views/dashboard/AnalyticsCongratulations.vue'
import AnalyticsFinanceTabs from '@/views/dashboard/AnalyticsFinanceTab.vue'
import AnalyticsOrderStatistics from '@/views/dashboard/AnalyticsOrderStatistics.vue'
import AnalyticsProfitReport from '@/views/dashboard/AnalyticsProfitReport.vue'
import AnalyticsTotalRevenue from '@/views/dashboard/AnalyticsTotalRevenue.vue'
import AnalyticsTransactions from '@/views/dashboard/AnalyticsTransactions.vue'

// 👉 Images
import chart from '@images/cards/chart-success.png'
import card from '@images/cards/credit-card-primary.png'
import paypal from '@images/cards/paypal-error.png'
import wallet from '@images/cards/wallet-info.png'

import { onBeforeMount } from 'vue';
import { useUserAuthStore } from '@/store/userAuth';

import { getHomeData } from '@/services/home';

const { user } = useUserAuthStore();

// console.log("onSetup:dashboard")

let data = ref();
let loaded = ref(false);
let error = ref('');

const fetchHomeData = async () => {
  let response = await getHomeData();
  loaded.value = true;
  if (!response.error) {
    data.value = response.data;
  }else{
    error.value = 'Oops! an error occured';
    console.log('error getting home data', response.message);
  }
}

onBeforeMount(async() => {
    await fetchHomeData();
  })

</script>

<template>
  <VRow>
    <!-- 👉 Congratulations -->
    <!-- <VCol
      cols="12"
      md="8"
    >
      <AnalyticsCongratulations />
    </VCol> -->

    <VCol cols="3" class="text-white">
        <!-- 👉 Clients -->
          <VCard title="Clients" class="text-center pb-5" style="border: solid thin #000; width: 100%;">
            <b v-if="loaded" class="font-weight-extrabold extrabold">{{data.clientsCount}}</b>
            <b v-if="!loaded" class="font-weight-extrabold extrabold">...LOADING...</b>
          </VCard>
    </VCol>

    <VCol cols="3" class="text-white">
        <!-- 👉 Expiring Services -->
        <RouterLink :to="'/expiring-services'">
          <VCard title="Expiring" class="text-center pb-5" style="border: solid thin #000; width: 100%">
            <b v-if="loaded" class="font-weight-extrabold extrabold">{{data.expiringServicesCount}}</b>
            <b v-if="!loaded" class="font-weight-extrabold extrabold">...LOADING...</b>
          </VCard>
        </RouterLink>
    </VCol>

    <VCol cols="3" class="text-white">
        <!-- 👉 Expired Services -->
        <RouterLink :to="'/expired-services'">
          <VCard title="Expired" class="text-center pb-5" style="border: solid thin #000; width: 100%">
            <b v-if="loaded" class="font-weight-extrabold extrabold">{{data.expiredServicesCount}}</b>
            <b v-if="!loaded" class="font-weight-extrabold extrabold">...LOADING...</b>
          </VCard>
        </RouterLink>
    </VCol>

    <VCol cols="3" class="text-white">
        <!-- 👉 Services -->
          <VCard title="Services" class="text-center pb-5 bg-blue" style="border: solid thin #000; width: 100%;">
            <b v-if="loaded" class="font-weight-extrabold extrabold text-white">{{data.packagesServicesCount}}</b>
            <b v-if="!loaded" class="font-weight-extrabold extrabold">...LOADING...</b>
          </VCard>
    </VCol>


    <!-- 👉 Total Revenue -->
    <VCol
      cols="12"
      md="8"
      order="2"
      order-md="1"
    >
      <AnalyticsTotalRevenue />
    </VCol>

    <VCol
      cols="12"
      sm="8"
      md="4"
      order="1"
      order-md="2"
    >
      <VRow>
        <!-- 👉 Payments -->
        <VCol
          cols="12"
          sm="6"
        >
          <CardStatisticsVertical
            v-bind=" {
              title: 'Payments',
              image: paypal,
              stats: '$2,468',
              change: -14.82,
            }"
          />
        </VCol>

        <!-- 👉 Revenue -->
        <VCol
          cols="12"
          sm="6"
        >
          <CardStatisticsVertical
            v-bind="{
              title: 'Transactions',
              image: card,
              stats: '$14,857',
              change: 28.14,
            }"
          />
        </VCol>
      </VRow>

      <VRow>
        <!-- 👉 Profit Report -->
        <VCol
          cols="12"
          sm="12"
        >
          <AnalyticsProfitReport />
        </VCol>
      </VRow>
    </VCol>

    <!-- 👉 Order Statistics -->
    <VCol
      cols="12"
      md="4"
      sm="6"
      order="3"
    >
      <AnalyticsOrderStatistics />
    </VCol>

    <!-- 👉 Tabs chart -->
    <VCol
      cols="12"
      md="4"
      sm="6"
      order="3"
    >
      <AnalyticsFinanceTabs />
    </VCol>

    <!-- 👉 Transactions -->
    <VCol
      cols="12"
      md="4"
      sm="6"
      order="3"
    >
      <AnalyticsTransactions />
    </VCol>
  </VRow>
</template>

<style scoped>
  .bold {
    font-weight: bold;
  }
  .extrabold {
    font-weight: bolder;
  }
  .bg-green {
    background-color: green;
  }
  .bg-green {
    background-color: yellow;
  }
  .bg-green {
    background-color: blue;
  }
  .bg-green {
    background-color: red;
  }
  .text-white{
    color: #FFF;
  }
</style>
