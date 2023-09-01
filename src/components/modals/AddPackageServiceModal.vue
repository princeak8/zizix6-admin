<template>
    <v-dialog
        v-model="props.dialog"
        width="80%"
        @click:outside="close()"
      >
        <v-card class="pt-4">

            <v-card-text class="mt-2">Add a Service</v-card-text>

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
                    <VCol cols="10" class="my-1 align-center">
                        <VTextField v-model="host" label="Host" placeholder="Host" :rules="hostRules" />
                    </VCol>
                    <VCol cols="10" class="my-1">
                        <VBtn block type="submit">Submit</VBtn>
                    </VCol>
                </VRow>
            </VForm>
          <v-card-actions>
            <v-btn color="primary" block @click="close()">Close</v-btn>
          </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup>
    import { getServices } from '@/services/services';

    import '@vuepic/vue-datepicker/dist/main.css';

    import { defineEmits, defineProps, onBeforeMount } from 'vue';

    import { save } from '@/services/package-services';


    let services = ref([]);
    let serviceId = ref();
    let name = ref('');
    // let expiryDate = ref(new Date());
    let expiryDate = ref(null);
    let host = ref('');
    let showExpiryDate = ref(true);
    let isFormValid = ref(false);
    let expiryError = ref('');
    let submitError = ref('');

    const nameRules = [ v => !!v || 'Name is required' ];
    const serviceRules = [ v => !!v || 'Select a Service' ];
    const hostRules = [ v => !!v || 'Host is required' ];

    const onSelect = (a) => {
        console.log('service:', serviceId.value);
        let selService = services.value.filter((service) => service.id == serviceId.value)[0]
        showExpiryDate.value = (selService.expiry == 0) ? false : true;
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
        dialog: Boolean,
        packageId: Number
    })
    const emits = defineEmits(['toggle', 'saved']);

    function close() {
        emits('toggle');
    }

    async function submitForm() {
        if(showExpiryDate.value && expiryDate.value) {
            if(isFormValid.value) {
                console.log('submit');
                const data = {
                    package_id: props.packageId,
                    service_id: serviceId.value,
                    name: name.value,
                    host: host.value
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

    onBeforeMount(async() => {
        let response = await getServices();
        if (!response.error) {
            services.value = response.data;
            console.log('services', response.data);
        }else{
            console.log('error getting services', response.message);
        }
    })

</script>
