<template>
  <div class="card">
    <header class="card-header">
      <p class="card-header-title">{{error.error}}</p>
    </header>

    <div class="card-content">
      <div class="content">
        <div class="columns is-multiline">
          <div class="column is-4" v-for="(data, key) in errorData" :key="key">
            <template v-if="key !== error.column">
              <b-field :label="key">
                <b-input :value="data" :disabled="key !== error.column"></b-input>
              </b-field>
            </template>

            <template v-if="key === error.column">
              <b-field :label="key" :message=" 'Old Value: ' + data">
                <b-input v-model="newValue" :disabled="key !== error.column"></b-input>
              </b-field>
            </template>
          </div>
        </div>
      </div>
    </div>
    <footer class="card-footer">
      <a @click="saveLead(errorData)" class="card-footer-item">Save</a>
      <a @click="deleteError(error.leadId)" class="card-footer-item">Remove from CSV</a>
    </footer>
  </div>
</template>

<script>
export default {
  props: {
    error: Object,
    errorData: Object
  },
  data() {
    return {
      newValue:null
    };
  },
  methods: {
    deleteError(leadId) {
      // fire mutation to remove item from csv data
    },
    saveLead(data) {
      // leadid
      // column
      // value


    //   this.$store
    //     .dispatch("CSVdata/saveData", data)
    //     .then(() => {
    //       this.isLoading = false;
    //     })
    //     .catch(() => {
    //       this.isLoading = false;
    //     });
    // },

      console.log(this.newValue);
    }
  }
};
</script>

<style>
</style>