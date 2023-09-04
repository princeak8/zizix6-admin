

<template>
  <VRow>

    <VCol cols="12">
      <VCard title="Clients" class="pb-5">
        
        <BaseModal v-if="showModal" @toggle="toggleModal" :title="'Add Client'">
          <AddClientModal @saved="clientAdded()" />
        </BaseModal>
        <!-- <BaseModal v-if="showUpdateModal" @toggle="toggleUpdateModal" :title="'Update Package'">
          <UpdatePackageModal @updated="packageUpdated" 
              :name="packageName" :packageId="packageId" :email="packageEmail" :phoneNumber="packagePhoneNumber"
          />
        </BaseModal> -->

        <VCardText>
           List of all Clients
        </VCardText>
        <VBtn color="primary" dark class="ml-3" @click="toggleModal()">Add Client</VBtn>
        
        <VTable fixed-header>
          <thead>
            <tr>
              <th class="text-uppercase text-center">Name</th>
              <th class="text-center">Email</th>
              <th class="text-center">Phone Number</th>
              <th class="text-center">Number of Packages</th>
              <th class="text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            <tr v-if="clients.length > 0" v-for="c in clients" :key="c.id">
              <td class="text-center">{{ c.name }}</td>
              <td class="text-center">{{ c.email }}</td>
              <td class="text-center">{{ c.phone_number }}</td>
              <td class="text-center">{{ c.total_packages }}</td>
              <td class="text-center">
                <VBtn color="warning" dark class="" @click="toggleUpdateModal(c.id)">Edit</VBtn>
                <RouterLink :to="'client/'+c.id+'/packages'">
                  <VBtn color="primary" dark>View Packages</VBtn>
                </RouterLink>
              </td>
            </tr>
            <p v-else>No clients yet</p>
          </tbody>
  </VTable>

      </VCard>
    </VCol>
  </VRow>
</template>

<script setup>

    
  import { getClients } from '@/services/clients';

  import BaseModal from '../components/modals/BaseModal.vue';

  import AddClientModal from '../components/modals/AddClientModal.vue';

  import { onBeforeMount } from 'vue';

  let clients = ref([]);
  let showModal = ref(false);
  let showUpdateModal = ref(false);

  let clientName = ref('');
  let clientEmail = ref(null);
  let clientPhoneNumber = ref(null);
  let clientId = ref(null);

  const toggleModal = () => showModal.value = !showModal.value;

  const toggleUpdateModal = (id) => {
    let selClient = selectedClient(id);
    if(selClient != null) {
      clientId.value = id;
      clientName.value = selClient.name;
      clientEmail.value = selClient.email;
      clientPhoneNumber.value = selClient.phone_number
    }
    showUpdateModal.value = !showUpdateModal.value;
  }

  const fetchClients = async () => {
    console.log("getting clients");
    let response = await getClients();
    if (!response.error) {
      clients.value = response.data;
      console.log('clients', clients.value);
    }else{
      console.log('error getting clients', response.message);
    }
  }

  const clientAdded = async () => {
        await fetchClients();
        toggleModal();
  }

  const clientUpdated = async () => {
        await fetchClients();
        toggleUpdateModal();
  }

  const selectedClient = (id) => {
    if(clients.value.length > 0) {
      return clients.value.filter((p) => p.id == id)[0];
    }
    return null;
  }

  onBeforeMount(async() => {
    await fetchClients();
  })

</script>
