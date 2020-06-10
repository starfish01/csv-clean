<template>
  <div>
    <div class="columns is-multiline">
      <div class="column is-full">
        <h2>Error Handler</h2>
      </div>
      <div class="column is-full" v-for="(error, key) in errorData" :key="key">


        

        <!-- <div class="card">
          <header class="card-header">
            <p class="card-header-title">{{error.error}}</p>
          </header>

          <div class="card-content">
            <div class="content">
              <div class="columns is-multiline">
                <div class="column is-4" v-for="(data, key) in error.data" :key="key">
                  <b-field :label="key" :type="key === error.column ? 'is-danger' : ''">
                    <b-input :value="data" :disabled="key !== error.column"></b-input>
                  </b-field>
                </div>
              </div>
            </div>
          </div>
          <footer class="card-footer">
            <a @click="saveLead(error)" class="card-footer-item">Save</a>
            <a @click="deleteError(error.leadId)" class="card-footer-item">Remove from CSV</a>
          </footer>
        </div> -->


        <EditLead :error="error" :errorData="error.data" />


      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapState } from "vuex";
// import EditLead from "./EditLead";
import EditLead from "@/components/EditLead"

export default {
  components: {
    EditLead
  },
  methods: {
    deleteError(leadId) {
      // fire mutation to remove item from csv data
    },
    saveLead(data) {
      console.log(data);
    },
    editLead(error) {
      console.log(error);
      // open model
      this.$buefy.modal.open({
        parent: this,
        props: error,
        component: EditLead,
        hasModalCard: true,
        customClass: "custom-class custom-class-2",
        trapFocus: true
      });
    }
  },
  computed: {
    ...mapGetters({
      errorData: "CSVdata/getErrors"
    })
  }
};
</script>

<style>
</style>