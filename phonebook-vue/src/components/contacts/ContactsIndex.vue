<template>
<div>
<div class="contacts container">
	<ul class="list-group">
		<div v-for="(contact, index) in contacts" :key="index">
			<li class="list-group-item">
				<div>
					<img v-if="contact.base64Photo" width = "50" height= "50" :src="contact.base64Photo"
						class="img-fluid rounded-circle" alt="avatar">
					<img v-else width = "50" height= "50" src="@/assets/default-photo.png"
						class="img-fluid rounded-circle" alt="avatar">
					<span class="mx-5">{{ contact.firstName }} {{ contact.lastName }}</span>
					<span  style="float:right" >
						<router-link :to="{ name: 'ContactDetails', params: { id: contact._id } }"  type="button" class="btn btn-outline-info mt-1">Details</router-link>
					</span>
				</div>
			</li>
		</div>
	</ul>
	<router-link :to="{ name: 'ContactNew' }"  type="button" class="btn btn-outline-success mt-1">Add a contact</router-link>
</div>


</div>
</template>

<script>
import ApiHelper from '@/helpers/ApiHelper'
import ContactDetails from './ContactDetails'

export default {
  name: 'Contacts',
  
  data () {
    return {
      contacts: [],
    }
  },
  
  created () {	  
	this.getContacts()
  },
  
  methods: {
	getContacts() {
		ApiHelper.getContacts({ token: this.$store.state.token })
		.then( response => {
			if(response.data.success)
				this.contacts = response.data.contacts
			else
				throw response
		})
	}
  }
}
</script>

<style scoped>
.contacts.container{
    margin: 10vh auto 0px auto
}
</style>