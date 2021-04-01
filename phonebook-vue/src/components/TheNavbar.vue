<template>
  <div class="theNavbar">
    <b-navbar toggleable="lg" type="dark" variant="dark">
        <b-navbar-brand style="cursor: pointer" v-on:click="redirect('LogIn')">Phonebook</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>   

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
              <b-nav-item v-if="isLoggedIn" v-on:click="redirect('ContactsIndex')">My contacts</b-nav-item>
              <b-nav-item v-if="isLoggedIn" v-on:click="logOut()">Log out</b-nav-item>
              
              <b-nav-item v-if="!isLoggedIn" v-on:click="redirect('LogIn')">Log in</b-nav-item>
              <b-nav-item v-if="!isLoggedIn" v-on:click="redirect('Register')">Register</b-nav-item>
          </b-navbar-nav>

        </b-collapse>
      </b-navbar>
  </div>
</template>

<script>
export default {
  name: 'TheNavbar',
    computed: {
      isLoggedIn: function() {
        return this.$store.getters.isLoggedIn;
      }
    },

    methods: {
      redirect( routeName ) {
        this.$router.push({ 
          name: routeName
        })
        .catch(err => {
          // Ignore the error regarding navigating to the page we are already on
          if (err.name !== 'NavigationDuplicated') 
            throw err;
        })
      },

      async logOut() {
        this.$store.dispatch('logout').then(() =>{
          this.redirect('LogIn')        
        })
      }

    }
}
</script>

<style scoped>

</style>
