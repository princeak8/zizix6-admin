<template>
  <div class="auth-wrapper d-flex align-center justify-center pa-4">
    <VCard
      class="auth-card pa-4 pt-7"
      max-width="448"
    >
      <VCardItem class="justify-center">
        <template #prepend>
          <div class="d-flex">
            <div
              class="d-flex text-primary"
              v-html="logo"
            />
          </div>
        </template>

        <VCardTitle class="text-2xl font-weight-bold">
          ZIZIX6
        </VCardTitle>
      </VCardItem>

      <VCardText class="pt-2">
        <!-- <h5 class="text-h5 mb-1">
          Welcome to sneat!👋🏻
        </h5> -->
        <p class="mb-0">
          Please Login 
        </p>
      </VCardText>

      <VCardText>
        <VRow class="mb-3">
          <VAlert v-if="loginError != ''" type="error">{{ loginError }}</VAlert>
        </VRow>
        <VForm @submit.prevent="handleLogin">
          <VRow>
            <!-- email -->
            <VCol cols="12">
              <VTextField v-model="form.email" autofocus placeholder="johndoe@email.com" label="Email" type="email" :rules="emailRules" required />
            </VCol>

            <!-- password -->
            <VCol cols="12">
              <VTextField
                v-model="form.password"
                name="password"
                label="Password"
                placeholder="············"
                :type="isPasswordVisible ? 'text' : 'password'"
                :append-inner-icon="isPasswordVisible ? 'bx-hide' : 'bx-show'"
                @click:append-inner="isPasswordVisible = !isPasswordVisible"
                :rules="passwordRules"
              />

              <!-- remember me checkbox -->
              <div class="d-flex align-center justify-space-between flex-wrap mt-1 mb-4">
                <VCheckbox
                  v-model="form.remember"
                  label="Remember me"
                />

                <!-- <RouterLink
                  class="text-primary ms-2 mb-1"
                  to="javascript:void(0)"
                >
                  Forgot Password?
                </RouterLink> -->
              </div>

              <!-- login button -->
              <VBtn
                block
                type="submit"
              >
                Login
              </VBtn>
            </VCol>

            <!-- create account -->
            <VCol
              cols="12"
              class="text-center text-base"
            >
              <span>New on our platform?</span>
              <RouterLink
                class="text-primary ms-2"
                to="/register"
              >
                Create an account
              </RouterLink>
            </VCol>

            <!-- <VCol
              cols="12"
              class="d-flex align-center"
            >
              <VDivider />
              <span class="mx-4">or</span>
              <VDivider />
            </VCol> -->

            <!-- auth providers -->
            <VCol
              cols="12"
              class="text-center"
            >
              <!-- <AuthProvider /> -->
            </VCol>
          </VRow>
        </VForm>
      </VCardText>
    </VCard>
  </div>
</template>

<script setup>
import router from '@/router';
import logo from '@images/logo1.svg?raw';
import { onBeforeMount } from 'vue';
import { login } from '../services/auth';

const form = ref({
  email: '',
  password: '',
  remember: false,
});
let loginError = ref('');
// const schema = yup.object().shape({
//   email: yup.string().required("Email is required!"),
//   password: yup.string().required("Password is required!"),
// });

const emailRules = [
  v => !!v || 'E-mail is required',
  v => /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()\\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || 'E-mail must be valid',
 ];

 const passwordRules = [
      v => !!v || 'Password is required',
      v => ( v && v.length >= 5 ) || 'password must be at least 5 characters'
      // v => /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(v) || 'Password must contain at least lowercase letter, one number, a special character and one uppercase letter',
  ];

const isPasswordVisible = ref(false)

async function handleLogin()
{
  console.log('login', form.value.email);
  const data = {
    email: form.value.email,
    password: form.value.password
  }
  const response = await login(data);
  console.log('response:', response);
  if(!response.error) {
     // redirect to dashboard
    //  this.$router.push("/profile");
     router.push({ path: '/'})
  }else{
    loginError.value = response.message;
    setTimeout(() => {
      loginError.value = '';
    }, 5000);
    
  }
}

onBeforeMount(() => {
  // console.log("title:", import.meta.env.VITE_API_TITLE);
})
</script>

<style lang="scss">
@use "@core/scss/template/pages/page-auth.scss";
</style>
