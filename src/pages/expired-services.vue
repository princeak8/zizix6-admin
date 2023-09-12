

<template>
  <VRow>

    <VCol cols="12">
      <VCard title="Expiring Package Services" class="pb-5">

        <VRow v-if="errorMessage != ''" class="mb-3">
          <VAlert type="error">{{ errorMessage }}</VAlert>
        </VRow>

  <!-- <v-btn
      color="primary"
      @click="toggleModal()"
    >
      Open Dialog
    </v-btn> -->
        <BaseModal v-if="showUpdateModal" @toggle="toggleUpdateModal" :title="'Update Service'">
          <UpdatePackageServiceModal @updated="serviceUpdated" :services="services" :hosts="hosts" :packageService="packageService" :serviceId="serviceId" />
        </BaseModal>

        <div v-if="loaded && errorMessage == ''" class="body">
          
          <VCardText>
            List of all Package Services that will expire within a month 
          </VCardText>
          
          <VTable fixed-header>
            <thead>
              <tr>
                <th class="text-uppercase">Name</th>
                <th>Expiry Date</th>
                <th>Host</th>
                <th>Service</th>
                <th>Package</th>
                <th>Client</th>
                <th>Amount</th>
                <th>$ Amount</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody v-if="packageServices.length > 0">
              <tr v-for="service in packageServices" :key="service.id">
                <td>{{ service.name }}</td>
                <td class="text-center">{{ service.expiry_date }}</td>
                <td class="text-center">{{ (service.host) ? service.host.name : '' }}</td>
                <td class="text-center">{{ service.service.name }}</td>
                <td class="text-center">{{ service.package.name }}</td>
                <td class="text-center">{{ service.client.name }}</td>
                <td class="text-center">₦{{ service.amount }}</td>
                <td class="text-center">${{ service.dollar_amount }}</td>
                <td class="text-center">
                  <VBtn color="warning" dark class="" @click="toggleUpdateModal(service.id)">Edit</VBtn>
                </td>
              </tr>
            </tbody>
            <p v-else cols="12">There are no expiring services</p>
          </VTable>
          
        </div>

      </VCard>
    </VCol>
  </VRow>
</template>

<script setup>
import { getHosts } from '@/services/hosts';
import { expired } from '@/services/package-services';
import { getServices } from '@/services/services';
import { onBeforeMount } from 'vue';
import BaseModal from '../components/modals/BaseModal.vue';
import UpdatePackageServiceModal from '../components/modals/UpdatePackageServiceModal.vue';

  let errorMessage = ref("");
  let loaded = ref(false);
  let showUpdateModal = ref(false);

  let packageServices = ref([]);
  let packageService = ref({})
  let services = ref([]);
  let hosts = ref([]);

  const getExpiredServices = async() => {
    let response = await expired();
    loaded.value = true;
    if (!response.error) {
      console.log('response', response.data);
      packageServices.value = response.data;
    }else{
      errorMessage.value = (response.statusCode == 402) ? response.message : 'Oops! An error occured, report to admininstrator'
      console.log('API error', response.message);
    }
  }

  getExpiredServices();

  const serviceUpdated = async () => {
        await getExpiredServices();
        toggleUpdateModal();
  }

  // toggle the update service form modal
  const toggleUpdateModal = (id=null) => {
    
    if(id != null) {
      console.log('update:',id);
      let selService = selectedService(id);
      if(selService != null) {
        console.log('not null:');
        packageService.value.id = id;
        packageService.value.name = selService.name;
        packageService.value.hostId = selService.host_id;
        packageService.value.expiryDate = selService.expiry_date;
        packageService.value.serviceId = selService.service_id;
        packageService.value.packageId = selService.package_id;
      }
      console.log('service:', packageService.value);
    }
    showUpdateModal.value = !showUpdateModal.value;
  }

  // Filter out the selected service
  const selectedService = (id) => {
    if(packageServices.value.length > 0) {
      return packageServices.value.filter((s) => s.id == id)[0];
    }
    return null;
  }

  async function fetchServices() {
        let response = await getServices();
        if (!response.error) {
            services.value = response.data;
            console.log('services', response.data);
        }else{
            console.log('error getting services', response.message);
        }
    }

    async function fetchHosts() {
      let response = await getHosts();
      if (!response.error) {
          hosts.value = response.data;
          console.log('hosts', response.data);
      }else{
          console.log('error getting hosts', response.message);
      }
  }

  onBeforeMount(async() => {
    await fetchServices();
    await fetchHosts();
  })


</script>

<style scoped>
  .body {
    z-index: 1;
  }
</style>
