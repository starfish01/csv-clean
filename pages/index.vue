<template>
  <section class="section">
    <div class="columns is-mobile p-b-15" v-if="!dropFiles">
      <div class>
        <b-field>
          <b-upload accept=".csv, text/csv" v-model="dropFiles" drag-drop>
            <section class="section">
              <div class="content has-text-centered">
                <p>
                  <b-icon icon="upload" size="is-large"></b-icon>
                </p>
                <p>Drop your CSV here or click to upload</p>
              </div>
            </section>
          </b-upload>
        </b-field>
      </div>
    </div>

    <div class="columns" v-if="dropFiles">
      <div class="column">
        <b-button @click="processCSV">{{hasBeenProcessed ? 'Re-' : ''}}Process CSV</b-button>
      </div>
      <div class="column" @click="exportCSV">
        <b-button>Export CSV</b-button>
      </div>
      <div class="column">
        <div class="tags">
          <span class="tag is-primary">
            {{ dropFiles.name }}
            <button
              class="delete is-small"
              type="button"
              @click="deleteDropFile()"
            ></button>
          </span>
        </div>
      </div>
    </div>

    {{testCSV}}

    <div class="columns" v-if="isLoading">
      <div class="column">
        <b-progress type="is-info"></b-progress>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  data() {
    return {
      dropFiles: null,
      isLoading: false,
      data: null,
      hasBeenProcessed: false,
      testCSV:''
    };
  },
  methods: {
    dispatchStore(data) {
      this.hasBeenProcessed = true;
      this.isLoading = true;
      this.testCSV = data
      this.$store
        .dispatch("CSVdata/processCSV", data)
        .then(() => {
          this.isLoading = false;
        })
        .catch(() => {
          this.isLoading = false;
        });
    },
    processCSV() {
      this.$papa.parse(this.dropFiles, {
        header: true,
        dynamicTyping: true,
        complete: results => {
          var data = results;
          //Data is capture
          _.forEach(data.data, (value, key) => {
            value.leadId = key;
          });
          this.dispatchStore(data.data);
        }
      });
    },
    exportCSV() {
      // TODO get data from getter 
      let test = this.$papa.unparse(this.testCSV)
       this.$papa.download(test, 'title')

    },
    debugDataset(results) {
      console.log(results);
      alert("debug");
    },
    renderDataset(results) {
      console.log(results);
      alert("results");
    },
    deleteDropFile() {
      this.dropFiles = null;
    }
  }
};
</script>

<style scoped>
.p-b-15 {
  padding-bottom: 15px;
}
</style>
