export default {
  saveData(state, payload) {
    state.CSVData = payload;
  },
  error(state, payload) {
      state.errors.push(payload);
  }
}
