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
                <VTextarea v-model="description" placeholder="description of service" label="Description" :rules="descriptionRules" required />
            </VCol>
            <VCol cols="10" class="my-1 align-center">
                <VRadioGroup v-model="expiry" label="Expires:">
                    <VRadio :value="true" label="Yes" />
                    <VRadio :value="false" label="No" />
                </VRadioGroup>
            </VCol>
            <VCol cols="10" class="my-1">
                <VBtn block type="submit">Submit</VBtn>
            </VCol>
        </VRow>
    </VForm>
</template>

<script setup>
    
    import { defineEmits, onBeforeMount } from 'vue';

    import { save } from '@/services/services';

    let name = ref('');
    let description = ref(null);
    let expiry = ref(false);
    let isFormValid = ref(false);
    let submitError = ref('');

    const nameRules = [ v => !!v || 'Name is required' ];
    const descriptionRules = [ v => !!v || 'Description is required' ];

    const emits = defineEmits(['saved']);

    async function submitForm() {
        console.log('expiry:', expiry.value);
        if(isFormValid.value) {
            console.log('submit');
            const data = {
                name: name.value,
                description: description.value,
                expiry: (expiry.value) ? 1 : 0
            };
            console.log('data: ',data);
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
    }

    onBeforeMount(async() => {
        //
    })

</script>
