

<template>
  <VRow>

    <VCol cols="12">
      <VCard title="Company Packages">
        
        <BaseModal v-if="showModal" @toggle="toggleModal" :title="'Add a Package'">
          <AddPackageModal @saved="packageAdded()" :isParent="false" />
        </BaseModal>
        <BaseModal v-if="showUpdateModal" @toggle="toggleUpdateModal" :title="'Update Package'">
          <UpdatePackageModal @updated="packageUpdated" 
              :name="packageName" :packageId="packageId" :email="packageEmail" :phoneNumber="packagePhoneNumber"
          />
        </BaseModal>

        <VCardText>
           List of all the Company Packages
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
                <RouterLink :to="'company-package/'+p.id+'/services'">
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
  import AddPackageModal from '../components/modals/AddPackageModal.vue';
  
  import UpdatePackageModal from '../components/modals/UpdatePackageModal.vue';

  import BaseModal from '../components/modals/BaseModal.vue';
  
  import { getParentPackages } from '@/services/packages';

  import { onBeforeMount } from 'vue';

  let packages = ref([]);
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

  const fetchParentPackages = async () => {
    console.log("getting parent packages");
    let response = await getParentPackages();
    if (!response.error) {
      packages.value = response.data;
    }else{
      console.log('error getting parent packages', response.message);
    }
  }

  const packageAdded = async () => {
        await fetchParentPackages();
        toggleModal();
  }

  const packageUpdated = async () => {
        await fetchParentPackages();
        toggleUpdateModal();
  }

  const selectedPackage = (id) => {
    if(packages.value.length > 0) {
      return packages.value.filter((p) => p.id == id)[0];
    }
    return null;
  }

  onBeforeMount(async() => {
    await fetchParentPackages();
  })

</script>
