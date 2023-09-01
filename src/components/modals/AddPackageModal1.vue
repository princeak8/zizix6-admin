<template>

    <VForm @submit.prevent="submitForm()" class="my-4" v-model="isFormValid">
        <VRow class="mb-3">
            <VAlert v-if="submitError != ''" type="error">{{ submitError }}</VAlert>
        </VRow>
        <VRow class="d-flex justify-center">
            <VCol cols="10" class="my-1 align-center">
                <VTextField v-model="name" label="Name" placeholder="package Name" :rules="nameRules" />
            </VCol>
            <VCol cols="10">
                <VTextField v-model="email" autofocus placeholder="johndoe@email.com" label="Email" type="email" :rules="emailRules" required />
            </VCol>
            <VCol cols="10" class="my-1 align-center">
                <VTextField v-model="phoneNumber" label="Phone Number" placeholder="Enter Phone NUmber" />
            </VCol>
            <VCol cols="10" class="my-1">
                <VBtn block type="submit">Submit</VBtn>
            </VCol>
        </VRow>
    </VForm>
</template>

<script setup>
    
    import { defineEmits, defineProps, onBeforeMount } from 'vue';

    import { saveParentPackage } from '@/services/packages';

    let name = ref('');
    let email = ref(null);
    let phoneNumber = ref(null);
    let isFormValid = ref(false);
    let submitError = ref('');

    const nameRules = [ v => !!v || 'Name is required' ];
    const emailRules = [
            v => !v || /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()\\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || 'E-mail must be valid',
        ];

    const props = defineProps({
        clientId: Number
    })
    const emits = defineEmits(['saved']);

    async function submitForm() {
        if(isFormValid.value) {
            console.log('submit');
            const data = {
                name: name.value,
                email: email.value,
                phone_number: phoneNumber.value
            };
            if(props.clientId != null) data.client_id = props.clientId;
            const response = await saveParentPackage(data);
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
    }

    onBeforeMount(async() => {
        //
    })

</script>
