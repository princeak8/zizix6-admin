<template>
    <v-dialog
        v-model="props.dialog"
        width="80%"
        @click:outside="close()"
      >
        <v-card class="pt-4">

            <v-card-text class="mt-2">Add a Service</v-card-text>

            <VForm @submit.prevent="submitForm()" class="my-4">
                <VRow class="d-flex justify-center">
                    <VCol cols="10" class="my-1 align-center">
                        <VTextField v-model="name" label="Name" placeholder="package Service Name" />
                    </VCol>
                    <VCol cols="10" class="my-1">
                        <v-select label="Select Service" item-title="name" item-value="id" :items="services" v-model="serviceId" @update:model-value="onSelect"/>
                    </VCol>
                    <VCol cols="10" class="my-1">
                        <VueDatePicker v-model="expiryDate" placeholder="Expiry date" required :clearable="true" />
                        <!-- <datepicker v-model="expiryDate" /> -->
                        <!-- <v-date-picker v-model="expiryDate" mode="dateTime" /> -->
                        <!-- <v-date-picker v-model="date" v-bind="datePickerProps" @input="showTimePicker" full-width></v-date-picker> -->
                    </VCol>
                    <VCol cols="10" class="my-1 align-center">
                        <VTextField v-model="host" label="Host" placeholder="Host" />
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
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import { defineEmits, defineProps, onBeforeMount } from 'vue';

    let services = ref([]);
    let serviceId = ref();
    let name = ref('');
    // let expiryDate = ref(new Date());
    let expiryDate = ref();
    let host = ref('');

    const onSelect = (a) => {
        console.log('service:', serviceId.value);
    }

    let input = ref({
            user_id: 2,
        })
    let items = ref([
      { value: 1, text: 'Label 1', header: 'Header 1' },
      { value: 2, text: 'Label 2', header: 'Header 2' },
      { value: 3, text: 'Label 3', header: 'Header 3' },
      { value: 4, text: 'Label 4', header: 'Header 4' }
    ])

    const props = defineProps({
        dialog: Boolean
    })
    const emits = defineEmits(['toggle']);

    function close() {
        emits('toggle');
    }

    function submitForm() {
        console.log('submit');
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
