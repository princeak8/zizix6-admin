<template>
    <VForm @submit.prevent="submitForm()" class="my-4" v-model="isFormValid">
        <VRow class="mb-3">
            <VAlert v-if="submitError != ''" type="error">{{ submitError }}</VAlert>
        </VRow>
        <VRow class="d-flex justify-center">
            <VCol cols="10" class="my-1 align-center">
                <VTextField v-model="name" label="Name" placeholder="package Service Name" :rules="nameRules" />
            </VCol>
            <VCol cols="10" class="my-1">
                <v-select 
                    label="Select Service" item-title="name" item-value="id" :items="services" v-model="serviceId" 
                    @update:model-value="onSelect" :rules="serviceRules"
                />
            </VCol>
            <VCol v-if="showExpiryDate" cols="10" class="my-1">
                <p v-if="expiryError != ''" style="color: red;">{{ expiryError }}</p>
                <!-- <VueDatePicker v-model="expiryDate" placeholder="Expiry date" required :clearable="true" /> -->
                <input type="date" v-model="expiryDate" @change="onExpiryChange" />
                <!-- <datepicker v-model="expiryDate" /> -->
                <!-- <v-date-picker v-model="expiryDate" mode="dateTime" /> -->
                <!-- <v-date-picker v-model="date" v-bind="datePickerProps" @input="showTimePicker" full-width></v-date-picker> -->
            </VCol>
            <VCol v-if="showExpiryDate" cols="10" class="my-1 align-center">
                <v-select label="Select Host" item-title="name" item-value="id" :items="hosts" v-model="hostId" />
            </VCol>
            <VCol cols="10" class="my-1">
                <VBtn block type="submit">Submit</VBtn>
            </VCol>
        </VRow>
    </VForm>
</template>

<script setup>
    import { getServices } from '@/services/services';

    import { getHosts } from '@/services/hosts';

    import '@vuepic/vue-datepicker/dist/main.css';

    import { defineEmits, defineProps, onBeforeMount } from 'vue';

    import { save } from '@/services/package-services';


    let services = ref([]);
    let hosts = ref([]);
    let serviceId = ref();
    let hostId = ref();
    let name = ref('');
    // let expiryDate = ref(new Date());
    let expiryDate = ref(null);
    let showExpiryDate = ref(true);
    let isFormValid = ref(false);
    let expiryError = ref('');
    let submitError = ref('');

    const nameRules = [ v => !!v || 'Name is required' ];
    const serviceRules = [ v => !!v || 'Select a Service' ];
    // const hostRules = [ v => !!v || 'Host is required' ];

    const onSelect = (a) => {
        console.log('service:', serviceId.value);
        let selService = services.value.filter((service) => service.id == serviceId.value)[0]
        showExpiryDate.value = (selService.expiry) ? true : false;
    }

    const onExpiryChange = (c) => {
        console.log('changed');
        if(expiryDate.value) {
            console.log('clear error');
            expiryError.value = '';
        }else{
            console.log(expiryDate.value);
        }
    }

    const props = defineProps({
        packageId: Number
    })
    const emits = defineEmits(['saved']);

    async function submitForm() {
        if(showExpiryDate.value && expiryDate.value) {
            if(isFormValid.value) {
                console.log('submit');
                const data = {
                    package_id: props.packageId,
                    service_id: serviceId.value,
                    name: name.value,
                    host_id: hostId.value
                };
                if(showExpiryDate.value) data.expiry_date = expiryDate.value;
                const response = await save(data);
                console.log('response:', response);
                if(!response.error) {
                    console.log("added successfully");
                    emits('saved');
                }else{
                    submitError.value = response.message;
                    setTimeout(() => {
                    submitError.value = '';
                    }, 5000);
                }
            }
        }else{
            expiryError.value = "Expiry Date is required"
        }
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
