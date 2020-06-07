<template>
  <section class="section">
    <div class="columns is-mobile p-b-15">
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

      <div class="column">
        <div class="tags">
          <span class="tag is-primary" v-if="dropFiles">
            {{ dropFiles.name }}
            <button
              class="delete is-small"
              type="button"
              @click="deleteDropFile(index)"
            ></button>
          </span>
        </div>
      </div>
    </div>

    <div class="columns" v-if="dropFiles">
      <b-button @click="processCSV">Process CSV</b-button>
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
      data:null
    };
  },
  methods: {
    dispatchStore(data) {
      this.$store.dispatch("CSVdata/processCSV", data);
    },
    processCSV() {
      this.$papa.parse(this.dropFiles, {
        header: true,
        dynamicTyping: true,
        complete: (results) => {
          var data = results;
          //Data is capture
          _.forEach(data.data, (value, key) => {
            value.id = key;
          });
          this.dispatchStore(data.data);
        }
      })
    },
    debugDataset(results) {
      console.log(results);
      alert("debug");
    },
    renderDataset(results) {
      console.log(results);
      alert("results");
    },
    deleteDropFile(index) {
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
