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
                    <VBtn block type="submit">Update</VBtn>
                </VCol>
            </VRow>
        </VForm>
</template>

<script setup>
    
    import { defineEmits, defineProps, onBeforeMount } from 'vue';

    import { updatePackage } from '@/services/packages';

    let name = ref(props.name);
    let email = ref(props.email);
    let phoneNumber = ref(props.phoneNumber);
    let isFormValid = ref(false);
    let submitError = ref('');

    console.log("var name: ", name.value);
    console.log("prop name: ", props.name);

    const nameRules = [ v => !!v || 'Name is required' ];
    const emailRules = [
            v => !v || /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()\\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || 'E-mail must be valid',
        ];

    const props = defineProps({
        packageId: Number,
        name: String,
        email: String,
        phoneNumber: String
    })
    const emits = defineEmits(['updated']);

    async function submitForm() {
        if(isFormValid.value) {
            console.log('submit');
            const data = {
                package_id: props.packageId,
                name: name.value,
                email: email.value,
                phone_number: phoneNumber.value
            };
            const response = await updatePackage(data);
            console.log('response:', response);
            if(!response.error) {
                console.log("updated successfully");
                emits('updated');
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
