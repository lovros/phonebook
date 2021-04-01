<template>
<div class="wrapper bg-white mt-sm-5">

    <h4 class="pb-4 border-bottom">New contact</h4>
    <div class="d-flex align-items-start py-3 border-bottom">
		<img :src="photoUrl" class="img" alt="profile photo">
		<div class="pl-sm-4 pl-2" id="img-section"> <b>Contact Photo</b>
            <p>Accepted file type .png .jpg .jpeg</p>
			<button class="btn btn-outline-info">Upload</button>
			<input ref="fileInput" type="file" accept=".png, .jpg, .jpeg" name="name" style="display: none;" />
		</div>
    </div>
    <div class="py-2">
        <div class="row py-2">
            <div class="col-md-6">
				<label for="firstname">First Name</label>
				<input v-model="contact.firstName" v-bind:class="{'is-invalid': firstNameError,  '': !firstNameError}"  type="text" class="bg-light form-control">
				<p style="margin-top:10px;text-align:center;" class="text-danger" v-if="firstNameError">
				{{firstNameError}}
				</p>
			</div>
            <div class="col-md-6 pt-md-0 pt-3">
				<label for="lastname">Last Name</label>
				<input v-model="contact.lastName" v-bind:class="{'is-invalid': lastNameError,  '': !lastNameError}" type="text" class="bg-light form-control">
				<p style="margin-top:10px;text-align:center;" class="text-danger" v-if="lastNameError">
				{{lastNameError}}
				</p>
			</div>
        </div>
        <div class="row py-2">
            <div class="col-md-6">
				<label for="emailAddress">Email address</label>
				<input v-model="contact.emailAddress" v-bind:class="{'is-invalid': emailAddressError,  '': !emailAddressError}"  type="text" class="bg-light form-control">
				<p style="margin-top:10px;text-align:center;" class="text-danger" v-if="emailAddressError">
				{{emailAddressError}}
				</p>
			</div>
            <div class="col-md-6 pt-md-0 pt-3">
				<label for="phoneNumber">Phone number</label>
				<input v-model="contact.phoneNumber" v-bind:class="{'is-invalid': phoneNumberError,  '': !phoneNumberError}" type="text" class="bg-light form-control">
				<p style="margin-top:10px;text-align:center;" class="text-danger" v-if="phoneNumberError">
				{{phoneNumberError}}
				</p>
			</div>
        </div>
        <div class="row py-2 form-group">
			<div class="col-md-12">
				<label for="aboutTextArea">Note</label> 
				<textarea v-model="contact.note" class="bg-light form-control" id="aboutTextArea" rows="3" placeholder="Add a note"></textarea>
			</div>
		</div>

        <div class="py-3 pb-4">
			<button class="btn btn-success mt-1 mr-1" @click="checkForm()">Save changes</button>
            <router-link :to="{ name: 'ContactsIndex' }" class="btn btn-outline-secondary mt-1">Cancel</router-link>
        </div>

    </div>
</div>
</template>

<script>
import ApiHelper from '@/helpers/ApiHelper'

export default {
  name: 'ContactEdit',
  
  data () {
    return {
      contact: {},
	  photoUrl: require('@/assets/default-photo.png'),  

      firstNameError: '',
	  lastNameError: '',
	  emailAddressError: '',
      phoneNumberError: '',
      noteError: '',
	  photoError: '',
    }
  },
  
  methods: {
    checkForm () {				
		// Check if all required fields are filled
		if (this.contact.firstName && this.contact.lastName &&
            this.contact.emailAddress && this.contact.phoneNumber &&
            this.contact.note) {
			// Reset errors
			this.firstNameError = ''
			this.lastNameError = ''
            this.emailAddressError = ''
            this.phoneNumberError = ''
            this.noteError = ''
			this.add()
		} else {
		
			if (!this.contact.firstName)
				this.firstNameError = 'Enter contact\'s first name'
			else
				this.firstNameError = ''
				
			if (!this.contact.lastName)
				this.lastNameError = 'Enter contact\'s last name'
			else
				this.lastNameError = ''

            if (!this.contact.emailAddress)
				this.emailAddressError = 'Enter contact\'s email address'
			else
				this.emailAddressError = ''

            if (!this.contact.phoneNumber)
				this.phoneNumberError = 'Enter contact\'s phone number'
			else
				this.phoneNumberError = ''
		}
	},
	add() {
        ApiHelper.addContact({ token: this.$store.state.token, contact: this.contact })
		.then( response => {
			if(response.data.success)
				this.$router.push({ name: 'ContactDetails', params: { id: response.data.contact._id } })
			else
				throw response
		})
	}
  },
  
}
</script>

<style scoped>
.wrapper {
    padding: 30px 50px;
    border: 1px solid #ddd;
    border-radius: 15px;
    margin: 10px auto;
    max-width: 600px
}


.img {
    width: 70px;
    height: 70px;
    border-radius: 6px;
    
	object-fit: cover
}
</style>