'use strict';
//const connectWiseInit = require('../.././templates/connectWise/initialize');

module.exports = function(connectWiseLink) {
  //Suspending these functions which used to manually manipulate the Database per event, replaced with a Resque based Daemon in the boot folder.
  connectWiseLink.beforeRemote('create', async function(context) {
    context.args.data.companyId = context.req.accessToken.userId;
    //connectWiseInit.import(context.args.data);
    return;
  });
  connectWiseLink.beforeRemote('deleteById', async function(context) {
    //connectWiseInit.delete(context.req.accessToken);
    return;
  });
};
