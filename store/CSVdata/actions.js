export default {
  processCSV(context, payload) {
    // save data to store
    context.commit('saveData', payload)
    // dispatch name check
    context.dispatch('checkNames');

  },

  checkNames(context) {
    // column names are
    // child_first_name, child_last_name, guardian_1_first_name, guardian_1_last_name
    const data = context.state.CSVData
    const namesToCheck = [
      ['child_first_name', 'child_last_name']
    ]
    // loop through all leads
    _.forEach(data, (lead, key) => {
      console.log(key)
      _.forEach(namesToCheck, (names) => {
        let firstName = lead[names[0]].trim();
        let lastName = lead[names[1]].trim();

        if (firstName === '' && lastName === '') {
          return;
        }

        if ((firstName === '' && lastName != '') || (firstName != '' && lastName === '')) {
          // commit error
          // leadId column and error, type
          context.commit('error', {
            leadId: lead.id,
            column: firstName.trim() === '' ? names[0] : names[1],
            error: 'Incomplete Name Given',
            type: 'name'
          })
        }
        firstName = 'hi blah blah fjdfojfd'
        // check if name has more than two words?
        var regexp = /[a-zA-Z]+\s+[a-zA-Z]+\s+[a-zA-Z]+/g;
        if (regexp.test(firstName) || regexp.test(lastName)) {
          if (regexp.test(firstName)) {

            console.log('ffff');
          }
          if (regexp.test(lastName)) {

          }
        }


      });

    })




    // if not capital

    // update to capitals

    // dispatch (column name, value)

    // add change to log

    // check if name has more than two words?

    // dispatch warning



    console.log(data)
  }
}
