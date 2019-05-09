let app = require('../server');
// Import product task definitions
let cw = require('../../tasks/connectWise');

// //////////////////////////////////////////
/// MAP through all customer connections ///
// /////////////////////////////////////////

// Models for products must be added manually as new implementations are made.

// ConnectWise
app.models.connectWiseLink.find({fields: {}}, function(err, companies) {
  companies.forEach(function(company) {
    cw.queue(company);
    setTimeout(function(){
       cw.kick(company)
     }, 30000);
  });


})
