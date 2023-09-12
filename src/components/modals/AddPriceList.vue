
<template>
    <VForm @submit.prevent="submitForm()" class="my-4" v-model="isFormValid">
        <VRow class="mb-3">
            <VAlert v-if="submitError != ''" type="error">{{ submitError }}</VAlert>
        </VRow>
        <VRow class="d-flex justify-center">
            <VCol cols="10" class="my-1">
                <v-select 
                    label="Select Service" item-title="name" item-value="id" :items="services" v-model="serviceId" 
                    @update:model-value="onSelect" :rules="serviceRules"
                />
            </VCol>
            <VCol v-if="showHost" cols="10" class="my-1 align-center">
                <v-select label="Select Host" item-title="name" item-value="id" :items="hosts" v-model="hostId" />
            </VCol>
            <VCol cols="10" class="my-1 align-center">
                <VTextField v-model="amount" label="Amount" type="number" />
            </VCol>
            <VCol cols="10" class="my-1 align-center">
                <VTextField v-model="$amount" label="Dollar Amount" type="number" />
            </VCol>

            <VCol cols="10" class="my-1">
                <VBtn block type="submit">Submit</VBtn>
            </VCol>
        </VRow>
    </VForm>
</template>

<script setup>
    import { defineEmits, defineProps } from 'vue';

    import { save } from '@/services/price-lists';
    
    const props = defineProps({
        services: Array,
        hosts: Array,
        priceList: Object,
    })
    const emits = defineEmits(['saved']);

    let services = ref(props.services);
    let hosts = ref(props.hosts);
    let serviceId = ref();
    let hostId = ref();
    let $amount = ref();
    let amount = ref();
    let showHost = ref(true);
    let isFormValid = ref(false);
    let submitError = ref('');

    const serviceRules = [ v => !!v || 'Select a Service' ];

    const onSelect = (a) => {
        let selService = services.value.filter((service) => service.id == serviceId.value)[0]
        showHost.value = (selService.expiry) ? true : false;
    }

    async function submitForm() {
        if($amount.value || amount.value) {
            if(isFormValid.value) {
                console.log('submit');
                const data = {
                    service_id: serviceId.value,
                };
                if(showHost.value) data.host_id = hostId.value;
                if(amount.value != null) data.amount = amount.value;
                if($amount.value != null) data.dollar_amount = $amount.value;

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
            amountError.value = "Amount or dollar amount is required"
        }
    }
</script>
