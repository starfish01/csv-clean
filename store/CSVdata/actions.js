export default {
  processCSV(context, payload) {
    // save data to store
    context.commit('saveData', payload)
    // dispatch name check
    context.dispatch('checkNames');

  },
  saveData(context, payload) {
    // kill error
    
    // save data

    // 
  },
  checkNames(context) {
    // column names are
    // child_first_name, child_last_name, guardian_1_first_name, guardian_1_last_name
    const data = context.state.CSVData
    const namesToCheck = [
      ['child_first_name', 'child_last_name'],
      ['guardian_1_first_name', 'guardian_1_last_name'],
      ['guardian_2_first_name', 'guardian_2_last_name']
    ]
    // loop through all leads
    _.forEach(data, (lead, key) => {
      _.forEach(namesToCheck, (names) => {

        let firstName = lead[names[0]] ? lead[names[0]].trim() : false;
        let lastName = lead[names[1]] ? lead[names[1]].trim() : false;

        if (!firstName && !lastName) {
          return;
        }
        if ((!firstName && lastName) || (firstName && !lastName)) {
          // commit error
          context.commit('error', {
            leadId: lead.leadId,
            column: firstName.trim() === '' ? names[0] : names[1],
            error: 'Incomplete Name Given',
            type: 'name'
          })
          return;
        }
        // check if name has more than two words?
        var regexp = /[a-zA-Z]+\s+[a-zA-Z]+\s+[a-zA-Z]+/g;
        if (regexp.test(firstName) || regexp.test(lastName)) {
          if (regexp.test(firstName)) {
            context.commit('warning', {
              leadId: lead.leadId,
              column: names[0],
              error: 'First name has 3 or more words',
              type: 'name'
            })
          }
          if (regexp.test(lastName)) {
            context.commit('warning', {
              leadId: lead.leadId,
              column: names[1],
              error: 'Last name has 3 or more words',
              type: 'name'
            })
          }
        }

        firstName = firstName.toLowerCase().split(' ').map(function (word) {
          if (word[0] != word[0].toUpperCase()) {
            context.commit('log', {
              leadId: lead.leadId,
              column: names[0],
              error: 'Updated ' + word[0] + ' to title case',
              type: 'name'
            })
          }
          return word.replace(word[0], word[0].toUpperCase());
        }).join(' ');
        lastName = lastName.toLowerCase().split(' ').map(function (word) {
          context.commit('log', {
            leadId: lead.leadId,
            column: names[0],
            error: 'Updated ' + word[0] + ' to title case',
            type: 'name'
          })
          return word.replace(word[0], word[0].toUpperCase());
        }).join(' ');

        let data = [];
        if (firstName != lead[names[0]]) {
          data.push({
            column: names[0],
            value: firstName
          })
        }
        if (lastName != lead[names[1]]) {
          data.push({
            column: names[1],
            value: lastName
          })
        }


        if (data.length) {
          // Update data
          context.commit('updateData', {
            leadId: lead.leadId,
            data
          });
          // log data
          context.commit('log', {
            leadId: lead.leadId,
            column: null,
            error: 'Updated title:' + firstName + ' ' + lastName,
            type: 'name'
          })
        }

      });

    })


  }
}
