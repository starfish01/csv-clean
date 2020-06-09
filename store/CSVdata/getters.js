export default {
  getErrors(state) {
    let errors = state.errors
    _.forEach(errors, function (value) {
        value.data = _.find(state.CSVData, { 'leadId': value.leadId });
    });
    return errors;
  }
}
