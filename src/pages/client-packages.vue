

<template>
  <VRow>

    <VCol cols="12">
      <VCard title="Client Packages" class="pb-5">
        
        <BaseModal v-if="showModal" @toggle="toggleModal" :title="'Add a Package'">
          <AddPackageModal @saved="packageAdded()" :clientId="props.clientId" :isParent=false />
        </BaseModal>
        <BaseModal v-if="showUpdateModal" @toggle="toggleUpdateModal" :title="'Update Package'">
          <UpdatePackageModal @updated="packageUpdated" 
              :name="packageName" :packageId="packageId" :email="packageEmail" :phoneNumber="packagePhoneNumber"
          />
        </BaseModal>

        <VRow v-if="errorMessage != ''" class="mb-3">
          <VAlert type="error">{{ errorMessage }}</VAlert>
        </VRow>

        <div v-if="loaded && errorMessage == ''" class="body">

            <VCardText>
                <RouterLink :to="'/clients'" class="ml-6">
                    <b style="color: blueviolet;">clients </b>
                </RouterLink>
                - <b>{{clientName}} packages</b>
            </VCardText>
            
            <VBtn color="primary" dark class="ml-3" @click="toggleModal()">Add New Package</VBtn>
            
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
                    <VBtn color="warning" dark class="" @click="toggleUpdateModal(p.id)">Edit</VBtn>
                    <RouterLink :to="'/package/'+p.id+'/services'">
                    <VBtn color="primary" dark>View Services</VBtn>
                    </RouterLink>
                </td>
                </tr>
                <p v-else>No packages for this client</p>
            </tbody>
            </VTable>
        </div>

      </VCard>
    </VCol>
  </VRow>
</template>

<script setup>
    
  import AddPackageModal from '../components/modals/AddPackageModal.vue';
  
  import UpdatePackageModal from '../components/modals/UpdatePackageModal.vue';

  import BaseModal from '../components/modals/BaseModal.vue';
    
  import { getClient } from '@/services/clients';

  import { defineProps, onBeforeMount } from 'vue';

  const props = defineProps({
    clientId: String
  })

  let loaded = ref(false);
  let errorMessage = ref('');
  let packages = ref([]);
  let clientName = ref('');
  let showModal = ref(false);
  let showUpdateModal = ref(false);

  let packageName = ref('');
  let packageEmail = ref(null);
  let packagePhoneNumber = ref(null);
  let packageId = ref(null);

  const toggleModal = () => showModal.value = !showModal.value;

  const toggleUpdateModal = (id) => {
    // console.log('packageId:', id);
    let selPackage = selectedPackage(id);
    // console.log('sel package', selPackage);
    if(selPackage != null) {
      packageId.value = id;
      packageName.value = selPackage.name;
      packageEmail.value = selPackage.email;
      packagePhoneNumber.value = selPackage.phone_number
    }
    showUpdateModal.value = !showUpdateModal.value;
  }

  const fetchClient = async (id) => {
    let response = await getClient(id);
    loaded.value = true;
    if (!response.error) {
      packages.value = response.data.packages;
      clientName.value = response.data.name;
    }else{
        errorMessage.value = (response.statusCode == 402) ? response.message : 'Oops! An error occured, report to admininstrator'
      console.log('error getting client', response.message);
    }
  }

  const packageAdded = async () => {
        await fetchClient(props.clientId);
        toggleModal();
  }

  const packageUpdated = async () => {
        await fetchClient(props.clientId);
        toggleUpdateModal();
  }

  const selectedPackage = (id) => {
    if(packages.value.length > 0) {
      return packages.value.filter((p) => p.id == id)[0];
    }
    return null;
  }

  onBeforeMount(async() => {
    await fetchClient(props.clientId);
  })

</script>
