export default {
  saveData(state, payload) {
    state.CSVData = payload;
  },
  error(state, payload) {
    state.errors.push(payload);
  },
  warning(state, payload) {
    state.warnings.push(payload);
  },
  log(state, payload) {
    state.logs.push(payload);
  },
  updateData(state, payload) {
    _.map(state.CSVData, (stateItem) => {
      console.log(payload.leadId === stateItem.leadId)
      if (payload.leadId === stateItem.leadId) {
        _.forEach(payload.data, (data) => {
          stateItem[data.column] = data.value;
        })
      }
    });

  }
}
