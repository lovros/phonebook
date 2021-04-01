<template>
<div class="row py-5 px-4">
    <div class="col-md-5 mx-auto">
        <div class="bg-white shadow rounded overflow-hidden">
            <div class="px-4 pt-0 pb-4 cover">
                <div class="media align-items-end contact-head">
                    <div class="profile mr-3">
                      <img :src="photoUrl"  alt="..." width="130" class="rounded mb-2 img-thumbnail">
                        <router-link height="10" v-if="contact._id" :to="{ name: 'ContactEdit', params: { id: contact._id } }"  type="button" class="btn btn-outline-dark btn-sm btn-block">Edit contact</router-link>			
                    </div>
                    <div class="media-body mb-5 text-white">
                        <h4 class="mb-4">{{ contact.firstName }} {{ contact.lastName }}</h4>
                    </div>
                </div>
            </div>
            <div class="bg-light p-4 d-flex justify-content-end text-center"><div class="bg-light p-2" /></div>
            <div class="px-4 py-3">
				      <div class="row mb-1">
                <div class="col">
                  <h4 >Phone number:</h4>
                </div>
                <div class="col text-secondary">
                  <h4> {{ contact.phoneNumber }} </h4>
                </div>
              </div>
              <div class="row mb-1">
                <div class="col">
                  <h4>Email address:</h4>
                </div>
                <div class="col text-secondary">
                  <h4> {{ contact.emailAddress }} </h4>
                </div>
              </div>
				
              <h4 class="mb-1">Note:</h4>
              <div  style="white-space: pre-line" class="p-4 rounded shadow-sm bg-light">
                <p v-if="contact.note">{{ contact.note }}</p>
                <p v-else><i>This contact doesn't have a note.</i></p>
              </div>
            </div>
          </div>
          <div>
          <b-button variant="outline-danger btn-block" v-b-modal.confirmation-modal v-if="contact._id">Delete contact</b-button>			

          <b-modal id="confirmation-modal" ok-variant="danger" ok-title="Delete" @ok="deleteContact" title="Confirm deletion">
            <p class="my-4">Are you sure you want to delete this contact?</p>
          </b-modal>
          </div>
      </div>
</div>
</template>

<script>
import ApiHelper from '@/helpers/ApiHelper'

export default {
  name: 'ContactDetails',
  
  data () {
    return {
      contact: {},
	  photoUrl: require('@/assets/default-photo.png'),  
    }
  },
  
  created () {
	  this.getContact()
  },
  
  methods: {
  	getContact() {
      ApiHelper.getContactById({ token: this.$store.state.token, id: this.$route.params.id })
        .then( response => {
          if(response.data.success)
            this.contact = response.data.contact
          else
            throw response
        })
	  },
    deleteContact() {
      ApiHelper.deleteContactById({ token: this.$store.state.token, id: this.$route.params.id })
        .then( response => {
          if(response.data.success)
            this.$router.push({ name: 'ContactsIndex' })
          else
            throw response
        })
	  },

  },
  
}
</script>

<style scoped>
.contact-head {
    transform: translateY(5rem)
}

.cover {
	background-color: #121212;
}
</style>