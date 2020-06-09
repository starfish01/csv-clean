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
      <div class="column" @click="exportCSV" v-if="this.$store.state.CSVdata.CSVData">
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

    <error-handler v-if="this.$store.state.CSVdata.errors.length"/>

    <div class="columns" v-if="isLoading">
      <div class="column">
        <b-progress type="is-info"></b-progress>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapMutations, mapState } from "vuex";
import ErrorHandler from "../components/ErrorHandler";

export default {
  components: {
    ErrorHandler
  },
  data() {
    return {
      dropFiles: null,
      isLoading: false,
      data: null,
      hasBeenProcessed: false,
      testCSV: ""
    };
  },
  methods: {
    dispatchStore(data) {
      this.hasBeenProcessed = true;
      this.isLoading = true;
      this.testCSV = data;
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
      let csv = this.$papa.unparse(this.$store.state.CSVdata.CSVData);
      this.$papa.download(csv, "processed_lead_data");
    },
    debugDataset(results) {
      alert("debug");
    },
    renderDataset(results) {
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
