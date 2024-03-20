<template>
    <v-app>
      <v-main>
        <LoginForm v-if="user == ''" />
        <p v-else>Вы уже авторизованы</p>
      </v-main>
    </v-app>
  </template>
  
<script>
  
  import LoginForm from '@/components/Login/LoginForm.vue'
  
  export default {
    name: 'Login',
  
    components: {
      LoginForm,
    },
  
    data: () => ({
      //
    }),
    computed: {
      user(){
        return this.$store.state.user.curUser
      }
    },
  }
</script>
  