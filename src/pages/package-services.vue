

<template>
  <VRow>

    <VCol cols="12">
      <VCard title="Packages Services" class="pb-5">

        <VRow v-if="errorMessage != ''" class="mb-3">
          <VAlert type="error">{{ errorMessage }}</VAlert>
        </VRow>

  <!-- <v-btn
      color="primary"
      @click="toggleModal()"
    >
      Open Dialog
    </v-btn> -->

        <BaseModal v-if="showModal" @toggle="toggleModal" :title="'Add Service'">
          <AddPackageServiceModal :dialog="dialog" :packageId="clientPackage.id" @saved="serviceAdded()" />
        </BaseModal>
        <BaseModal v-if="showUpdateModal" @toggle="toggleUpdateModal" :title="'Update Service'">
          <UpdatePackageServiceModal @updated="serviceUpdated" :services="services" :hosts="hosts" :packageService="packageService" :serviceId="serviceId" />
        </BaseModal>

        <div v-if="loaded && errorMessage == ''" class="body">

          <RouterLink :to="`/client/${clientPackage.client_id}/packages`" class="ml-6">
              <b style="color: blueviolet;">Packages </b>
            </RouterLink>
          - <b>{{clientPackage.name}} package</b>
          
          <VCardText>
            List of all <b>{{clientPackage.name}} Package</b> Services 
          </VCardText>
          
          <VBtn color="primary" dark class="ml-3" @click="toggleModal()">Add Service</VBtn>
          <!-- <VBtn color="primary" dark class="ml-3" @click="toggleModal()">launch modal</VBtn> -->
          
          <VTable fixed-header>
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
                <td class="text-center">{{ (service.host) ? service.host.name : '' }}</td>
                <td class="text-center">{{ service.service.name }}</td>
                <td class="text-center">
                  <VBtn color="warning" dark class="" @click="toggleUpdateModal(service.id)">Edit</VBtn>
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
import { getHosts } from '@/services/hosts';
import { getPackageWithServices } from '@/services/packages';
import { getServices } from '@/services/services';
import { defineProps, onBeforeMount } from 'vue';
import BaseModal from '../components/modals/BaseModal.vue';
import UpdatePackageServiceModal from '../components/modals/UpdatePackageServiceModal.vue';

  const props = defineProps({
    packageId: String
  })

  let clientPackage = ref({});
  let errorMessage = ref("");
  let loaded = ref(false);
  let showModal = ref(false);
  let showUpdateModal = ref(false);
  let dialog = ref(false);

  let packageService = ref({
    id: '',
    name: '',
    hostId: '',
    expiryDate: '',
    serviceId: '',
    packageId: ''
  });
  let services = ref([]);
  let hosts = ref([]);

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

  const toggleModal = () => showModal.value = !showModal.value;

  const serviceAdded = async () => {
    await getPackage(props.packageId);
    toggleModal();
  }

  const serviceUpdated = async () => {
        await getPackage(props.packageId);
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
    if(clientPackage.value.services.length > 0) {
      return clientPackage.value.services.filter((s) => s.id == id)[0];
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
