<template>
   <div>
   		<div class="text-center pt-5 pt-sm-0">	
   			<img class="img-fluid d-none d-sm-inline-block"  src="../../assets/logo.png" alt="logo">
		</div>
		<div v-if="!isLoggedIn">
			<div class="card mx-auto">
				<div class="card-title mx-auto my-3"><h3>Log in</h3></div>
				<div class="card-body" width="250px">
				
					<form @submit.prevent="checkForm" accept-charset="UTF-8" role="form">
						<div class="form-group">
						<input v-bind:class="{'is-invalid': usernameError,  '': !usernameError}" class="form-control" placeholder="Username" v-model="username" name="username" type="text" value=""/>
							<p style="margin-top:10px;text-align:center;" class="text-danger" v-if="usernameError">
							{{usernameError}}
							</p>
						</div>
						<div class="form-group">
							<input v-bind:class="{'is-invalid': passwordError,  '': !passwordError}" class="form-control" placeholder="Password" v-model="password" name="password" type="password" value=""/>
							<p style="margin-top:10px;text-align:center;" class="text-danger" v-if="passwordError">
							{{passwordError}}
							</p>
						</div>
						<input class="btn btn-lg btn-success btn-block" type="submit" value="Login">
					</form>
					
					<p style="margin-top:10px;text-align:center;">Dont have an account?</p>
					<div style="text-align:center;"><router-link to="/register">Sign up</router-link></div>

				</div>
			</div>
        </div>
	</div>
</template>

<script>
export default {
  name: 'LogIn',
  
  data () {
    return {
      username: '',
	  password: '',
	  
	  usernameError: '',
	  passwordError: ''
    }
  },

  computed: {
	isLoggedIn: function() {
		return this.$store.getters.isLoggedIn;
	} 
  },
  
  methods: {

	checkForm() {
		// Check if all fields are filled
		if (this.username &&  this.password) {
			this.usernameError = ''
			this.passwordError = ''

			this.login()
		} else {
		
			if (!this.username)
				this.usernameError = 'Enter your username'
			else
				this.usernameError = ''

			if (!this.password)
				this.passwordError = 'Enter your password'
			else
				this.passwordError = ''
		}
	},

	async login () {
		this.usernameError = ''
		this.passwordError = ''
		// Log out
		this.$store.dispatch('logout').then(() => {
			let user = {username: this.username, password: this.password}
			// Log In
			let result = this.$store.dispatch("login", { user })
			.then( res => {
				if (res.data.success) {
					this.$router.push({name: 'ContactsIndex'})
				}
				else if (res.data.error.toLowerCase() === "no such username exists") {
					this.usernameError = "No such username exists"
				}
				else if (res.data.error.toLowerCase() === "incorrect password") {
					this.passwordError = "Incorrect password"
				}
				else
					throw res
			})
			.catch( error => {
				console.log(error)
			})
		})
	}
  }
}
</script>

<style scoped>
.card {
  width: 330px;
}

img{
	height:35vh;
}
</style>