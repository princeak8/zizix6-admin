

<template>
  <VRow>

    <VCol cols="12">
      <VCard title="Company Packages">
        <VCardText>
           List of all the Company Packages
        </VCardText>
        
        <VTable height="250" fixed-header>
          <thead>
            <tr>
              <th class="text-uppercase">Name</th>
              <th>Number of Services</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            <tr v-if="packages.length > 0" v-for="p in packages" :key="p.id">
              <td>{{ p.name }}</td>
              <td class="text-center">{{ p.total_services }}</td>
              <td class="text-center">
                <VBtn color="warning" dark class="">Edit</VBtn>
                <RouterLink :to="'package/'+p.id+'/services'">
                  <VBtn color="primary" dark>View Services</VBtn>
                </RouterLink>
              </td>
            </tr>
            <p v-else>No packages for the parent company</p>
          </tbody>
  </VTable>

      </VCard>
    </VCol>
  </VRow>
</template>

<script setup>
import { getParentPackages } from '@/services/packages';
import { onBeforeMount } from 'vue';

let packages = ref([]);

onBeforeMount(async() => {
  console.log("getting parent packages");
  let response = await getParentPackages();
  if (!response.error) {
    packages.value = response.data;
  }else{
    console.log('error getting parent packages', response.message);
  }
})

const desserts = [
  {
    dessert: 'Frozen Yogurt',
    calories: 159,
    fat: 6,
    carbs: 24,
    protein: 4,
  },
  {
    dessert: 'Ice cream sandwich',
    calories: 237,
    fat: 6,
    carbs: 24,
    protein: 4,
  },
  {
    dessert: 'Eclair',
    calories: 262,
    fat: 6,
    carbs: 24,
    protein: 4,
  },
  {
    dessert: 'Cupcake',
    calories: 305,
    fat: 6,
    carbs: 24,
    protein: 4,
  },
  {
    dessert: 'Gingerbread',
    calories: 356,
    fat: 6,
    carbs: 24,
    protein: 4,
  },
]
</script>
