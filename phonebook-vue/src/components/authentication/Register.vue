<template>
   <div class="pt-5">
		<div class="card mx-auto">
			<div class="card-title mx-auto my-3"><h3>Register</h3></div>
			<div class="card-body" width="250px">
				<form @submit.prevent="checkForm" accept-charset="UTF-8">

					<div class="form-group">
						<input v-bind:class="{'is-invalid': usernameError,  '': !usernameError}" class="form-control" placeholder="Username" v-model="username" name="username" type="text" value=""/>
						<p style="margin-top:10px;text-align:center;" class="text-danger" v-if="usernameError">
						{{usernameError}}
						</p>
					</div>
						
					<div class="form-group">
						<input v-bind:class="{'is-invalid': passwordError,  '': !passwordError}" class="form-control" placeholder="Password" v-model="password" type="password" value=""/>
						<p style="margin-top:10px;text-align:center;" class="text-danger" v-if="passwordError">
						{{passwordError}}
						</p>
					</div>

					<div class="form-group">
						<input v-bind:class="{'is-invalid': confirmPasswordError,  '': !confirmPasswordError}" class="form-control" placeholder="Confirm password" v-model="confirmPassword" type="password" value=""/>
						<p style="margin-top:10px;text-align:center;" class="text-danger" v-if="confirmPasswordError">
						{{confirmPasswordError}}
						</p>
					</div>
										
					<input class="btn btn-lg btn-success btn-block my-2" type="submit" value="Register">
				</form>
				<p style="margin-top:10px;text-align:center;">Already have an account?</p>
				<div style="text-align:center;"><router-link to="/" class="link-grey">Log in</router-link></div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
  name: 'Register',
  
  data () {
    return {
      username: '',
	  password: '',
	  confirmPassword: '',

	  usernameError: '',
	  passwordError: '',
	  confirmPasswordError: '',
    }
  },
  
  methods: {
	  checkForm () {
		// Check if all fields are filled
		if (this.username &&  this.password && this.confirmPassword) {
			this.usernameError = ''
			this.passwordError = ''
			this.confirmPasswordError = ''

			if (this.password === this.confirmPassword)
				this.register()
			else
				this.passwordError = this.confirmPasswordError = "Passwords do not match"
			

		} else {
		
			if (!this.username)
				this.usernameError = 'Enter your username'
			else
				this.usernameError = ''

			if (!this.password)
				this.passwordError = 'Enter your password'
			else
				this.passwordError = ''
				
			if (!this.confirmPassword)
				this.confirmPasswordError = 'Enter your password'
			else
				this.confirmPasswordError = ''
		}
	},

	async register () {
		// Log out
		this.$store.dispatch('logout').then(() => {
			let user = {username: this.username, password: this.password}
		    // Register
			let result = this.$store.dispatch("register", { user })
			.then( res => {
				if (res.data.success) {
					this.$router.push({name: 'ContactsIndex'})
				}
				else if (res.data.error.toLowerCase() === "username taken") {
					this.usernameError = "This username is already taken"
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
</style>