
<template>
    <VRow>
        <VCol cols="12">
            <VCard title="Price Lists" class="pb-5">

                <VRow v-if="errorMessage != ''" class="mb-3">
                    <VAlert type="error">{{ errorMessage }}</VAlert>
                </VRow>

                <BaseModal v-if="showModal" @toggle="toggleModal" :title="'Add Price List'">
                    <AddPriceList :services="services" :hosts="hosts" @saved="priceListAdded" />
                </BaseModal>
                
                <div v-if="loaded && errorMessage == ''" class="body">
                    <VBtn color="primary" dark class="ml-3" @click="toggleModal()">Add Price List</VBtn>
                    
                    <VTable fixed-header>
                        <thead>
                            <tr>
                                <th class="text-center">Service</th>
                                <th class="text-center">Host</th>
                                <th class="text-center">$ Price</th>
                                <th class="text-center">N Price</th>
                            </tr>
                        </thead>

                        <tbody v-if="priceLists.length > 0">
                            <tr v-for="list in priceLists" :key="list.id">
                                <td class="text-center">{{ list.service.name }}</td>
                                <td class="text-center">{{ (list.host) ? list.host.name : '' }}</td>
                                <td class="text-center">{{ list.dollar_amount }}</td>
                                <td class="text-center">{{ list.amount }}</td>
                            </tr>
                        </tbody>
                        <p v-else>No Price Lists added yet</p>
                    </VTable>
                </div>
                <div v-else>
                    <p>...LOADING...</p>
                </div>

            </VCard>
        </VCol>
    </VRow>
</template>

<script setup>
    import { getHosts } from '@/services/hosts';
import { getPriceLists } from "@/services/price-lists";
import { getServices } from '@/services/services';
import { defineProps, onBeforeMount } from 'vue';
import AddPriceList from '../components/modals/AddPriceList.vue';
import BaseModal from '../components/modals/BaseModal.vue';

    let errorMessage = ref("");
    let loaded = ref(false);
    let showModal = ref(false);
    let showUpdateModal = ref(false);

    let priceLists = ref([]);
    let priceList = ref({});
    let services = ref([]);
    let hosts = ref([]);

    const toggleModal = () => showModal.value = !showModal.value;

    const priceListAdded = async () => {
        await fetchPriceLists();
        toggleModal();
    }

    const priceListUpdated = async () => {
        await fetchPriceLists();
        toggleUpdateModal();
    }

    // toggle the update price list form modal
    const toggleUpdateModal = (id=null) => {
        
        if(id != null) {
        console.log('update:',id);
        let selList = selectedPriceList(id);
        if(selList != null) {
            console.log('not null:');
            priceList.value.id = id;
            priceList.value.serviceId = selList.service_id;
            priceList.value.hostId = selList.host_id;
            priceList.value.dollar = selList.dollar_amount;
            priceList.value.amount = selList.amount;
        }
        }
        showUpdateModal.value = !showUpdateModal.value;
    }

    // Filter out the selected service
    const selectedPriceList = (id) => {
        if(priceLists.length > 0) {
        return priceLists.value.filter((p) => p.id == id)[0];
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

    async function fetchPriceLists() {
        let response = await getPriceLists();
        loaded.value = true;
        if (!response.error) {
            priceLists.value = response.data;
            console.log('price lists', response.data);
        }else{
            console.log('error getting price lists', response.message);
        }
    }

    onBeforeMount(async() => {
        await fetchPriceLists();
        await fetchServices();
        await fetchHosts();
    })
</script>
