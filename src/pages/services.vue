

<template>
  <VRow>

    <VCol cols="12">
      <VCard title="Services" class="pb-5">
        
        <BaseModal v-if="showModal" @toggle="toggleModal" :title="'Add Service'">
          <AddServiceModal @saved="serviceAdded()" />
        </BaseModal>
        <BaseModal v-if="showUpdateModal" @toggle="toggleUpdateModal" :title="'Update Service'">
          <UpdateServiceModal @updated="serviceUpdated" 
              :name="serviceName" :serviceId="serviceId" :description="serviceDescription" :expiry="serviceExpiry"
          />
        </BaseModal>

        <VCardText>
           List of all Services
        </VCardText>
        <VBtn color="primary" dark class="ml-3" @click="toggleModal()">Add Service</VBtn>
        
        <VTable height="250" fixed-header>
          <thead>
            <tr>
              <th class="text-uppercase text-center">Name</th>
              <th class="text-center">Expires</th>
              <th class="text-center">Description</th>
              <th class="text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            <tr v-if="services.length > 0" v-for="s in services" :key="s.id">
              <td class="text-center">{{ s.name }}</td>
              <td class="text-center">{{ s.expiry }}</td>
              <td class="text-center">{{ s.description }}</td>
              <td class="text-center">
                <VBtn color="warning" dark class="" @click="toggleUpdateModal(s.id)">Edit</VBtn>
              </td>
            </tr>
            <p v-else>No Services yet</p>
          </tbody>
  </VTable>

      </VCard>
    </VCol>
  </VRow>
</template>

<script setup>

    
  import { getServices } from '@/services/services';

  import BaseModal from '../components/modals/BaseModal.vue';
  
  import AddServiceModal from '../components/modals/AddServiceModal.vue';

  import UpdateServiceModal from '../components/modals/UpdateServiceModal.vue';
  
  import { onBeforeMount } from 'vue';

  let services = ref([]);
  let showModal = ref(false);
  let showUpdateModal = ref(false);

  let serviceName = ref('');
  let serviceDescription = ref(null);
  let serviceExpiry = ref(null);
  let serviceId = ref(null);

  const toggleModal = () => showModal.value = !showModal.value;

  const toggleUpdateModal = (id) => {
    let selService = selectedService(id);
    if(selService != null) {
      serviceId.value = id;
      serviceName.value = selService.name;
      serviceDescription.value = selService.description;
      serviceExpiry.value = selService.expiry
    }
    showUpdateModal.value = !showUpdateModal.value;
  }

  const fetchServices = async () => {
    let response = await getServices();
    if (!response.error) {
      services.value = response.data;
      console.log('services', services.value);
    }else{
      console.log('error getting services', response.message);
    }
  }

  const serviceAdded = async () => {
        await fetchServices();
        toggleModal();
  }

  const serviceUpdated = async () => {
        await fetchServices();
        toggleUpdateModal();
  }

  const selectedService = (id) => {
    if(services.value.length > 0) {
      return services.value.filter((s) => s.id == id)[0];
    }
    return null;
  }

  onBeforeMount(async() => {
    await fetchServices();
  })

</script>
