

<template>
  <VRow>

    <VCol cols="12">
      <VCard title="Packages Services">

        <VRow v-if="errorMessage != ''" class="mb-3">
          <VAlert type="error">{{ errorMessage }}</VAlert>
        </VRow>

  <!-- <v-btn
      color="primary"
      @click="toggleModal()"
    >
      Open Dialog
    </v-btn> -->

    
        <AddPackageServiceModal :dialog="dialog" @toggle="toggleModal" />

        <div v-if="loaded && errorMessage == ''" class="body">
          
          <VCardText>
            List of all {{clientPackage.name}} Package Services 
          </VCardText>
          
          <VBtn color="primary" dark class="ml-3" @click="toggleModal()">Add Service</VBtn>
          <!-- <VBtn color="primary" dark class="ml-3" @click="toggleModal()">launch modal</VBtn> -->
          
          <VTable height="250" fixed-header>
            <thead>
              <tr>
                <th class="text-uppercase">Name</th>
                <th>Expiry Date</th>
                <th>Host</th>
                <th>Service</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody v-if="clientPackage.services.length > 0">
              <tr v-for="service in clientPackage.services" :key="service.id">
                <td>{{ service.name }}</td>
                <td class="text-center">{{ service.expiry_date }}</td>
                <td class="text-center">{{ service.host }}</td>
                <td class="text-center">{{ service.service.name }}</td>
                <td class="text-center">
                  <VBtn color="warning" dark class="">Edit</VBtn>
                  <RouterLink to="package/{{ p.id }}/services">
                    <VBtn color="primary" dark>View Services</VBtn>
                  </RouterLink>
                </td>
              </tr>
            </tbody>
            <p v-else cols="12">There are no services in this package yet</p>
          </VTable>
          
        </div>

      </VCard>
    </VCol>
  </VRow>
</template>

<script setup>
  import AddPackageServiceModal from '@/components/modals/AddPackageServiceModal.vue';
import { getPackageWithServices } from '@/services/packages';
import { defineProps, onBeforeMount } from 'vue';

  const props = defineProps({
    packageId: String
  })

  let clientPackage = ref({});
  let errorMessage = ref("");
  let loaded = ref(false);
  let showModal = ref(false);
  let dialog = ref(false);

    // console.log("packageId", props.packageId);
    const getPackage = async(packageId) => {
      let response = await getPackageWithServices(props.packageId);
      loaded.value = true;
      if (!response.error) {
        console.log('response', response.data);
        clientPackage.value = response.data;
      }else{
        errorMessage.value = (response.statusCode == 402) ? response.message : 'Oops! An error occured, report to admininstrator'
        console.log('API error', response.message);
      }
    }

    getPackage(props.packageId);

    const toggleModal = () => dialog.value = !dialog.value;

  onBeforeMount(async() => {
    //
  })


</script>

<style scoped>
  .body {
    z-index: 1;
  }
</style>
