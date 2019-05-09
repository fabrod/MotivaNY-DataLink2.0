'use strict';

module.exports = function(Infusionsoftlink) {
  Infusionsoftlink.beforeRemote('create', async function(context) {
    context.args.data.companyId = context.req.accessToken.userId;
    return;
  });

};
