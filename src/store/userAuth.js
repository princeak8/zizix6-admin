import { defineStore } from 'pinia';

// interface State {
//   firstName: string
//   lastName: string
//   userId: number | null
// }
const user = (localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')) : null;

export const useUserAuthStore = defineStore('authUser', {
  // convert to a function
  state: () => ({
    user,
  }),
  getters: {
    loggedIn: (state) => {
        // console.log("loggedIn:user", state.user)
        return (state.user == null) ? false : true
    },
    // must define return type because of using `this`
    // fullUserDetails (state) {
      // import from other stores
    //   const authPreferencesStore = useAuthPreferencesStore()
    //   const authEmailStore = useAuthEmailStore()
    //   return {
    //     ...state,
    //     // other getters now on `this`
    //     fullName: this.fullName,
    //     ...authPreferencesStore.$state,
    //     ...authEmailStore.details
    //   }

      // alternative if other modules are still in Vuex
      // return {
      //   ...state,
      //   fullName: this.fullName,
      //   ...vuexStore.state.auth.preferences,
      //   ...vuexStore.getters['auth/email'].details
      // }
    // }

    userDetails (state) {
        return state.user
    }
  },
  actions: {
    // no context as first argument, use `this` instead
    loginSuccess(user) {
        this.user = user;
    },
    // logout() {
    //     console.log("loging out");
    //     this.user = null;
    //     localStorage.setItem('user', null);
    // },
    // async loadUser (id) {
    //   if (this.userId !== null) throw new Error('Already logged in')
    //   const res = await api.user.load(id)
    //   this.updateUser(res)
    // },

    // mutations can now become actions, instead of `state` as first argument use `this`
    // updateUser (payload) {
    //   this.firstName = payload.firstName
    //   this.lastName = payload.lastName
    //   this.userId = payload.userId
    // },

    // easily reset state using `$reset`
    clearUser () {
      this.$reset()
    }
  }
})
