const request = require('request');
var MongoClient = require('mongodb').MongoClient;

var products = ["company/companies", "company/contacts", "sales/opportunities"];

async function connector(connection, operation) {

  var url = "mongodb://db:27017/CW_" + connection.companyId;

  return await Promise.all(products.map(async (product) => {
    return request.get(connection.url + '/v4_6_release/apis/3.0/' + product, function(error, response, body) {
      if (!error && response.statusCode == 200) {
        var data = JSON.parse(body);
        if (operation == "add") {
          adder(url, product, data);
        }
        return data;
      }
    }).auth(connection.company + '+' + connection.publicKey, connection.privateKey, true);

  })).then(responses => {
    return responses;
  }).catch(err => {
    // error here
  });
}

async function deleter(connection) {

  var url = "mongodb://db:27017/CW_" + connection.companyId;

  return await Promise.all(products.map(async (product) => {
    var productName;
    return MongoClient.connect(url, {
      useNewUrlParser: true
    }, async function(err, db) {
      if (err) throw err;
      return db.db().listCollections().toArray(async function(err, items) {
        return await Promise.all(items.map(async (item) => {
          if (item.name == product.substring(product.lastIndexOf("/") + 1)) {
            dropper(url, item.name).then(function(droppedList) {
               return droppedList;
            });;
          }
        })).then(dropped => {
          return dropped;
        });
        db.close();
      });
    });
  })).then(responses => {
    //console.log(responses);
    return responses;
  }).catch(err => {
    // error here
  });

}

// Internal functions

async function adder(uri, product, data) {
  if (!(!Object.keys(data).length)) {
    return MongoClient.connect(uri, {
      useNewUrlParser: true
    }, function(err, db) {
      if (err) throw err;
      var myobj = data;
      return db.db().collection(product.substring(product.lastIndexOf("/") + 1)).insertMany(myobj, function(err, res) {
        if (err) throw err;
        //console.log("Number of documents inserted in the ConnectWise " + product + "'s table :" + res.insertedCount);
        db.close();
        return {
          location: product,
          quantity: res.insertedCount
        }
      });
    });
  }
}

async function dropper(uri, cName) {
  var product;
  return MongoClient.connect(uri, {
    useNewUrlParser: true
  }, async function(err, db) {
    if (err) throw err;
    return db.db().collection(cName).drop(async function(err, del) {
      if (err) throw err;
      if (del) product = cName;
      db.close();
      return "not Undefined LoL";
    });
  });
}

module.exports = {
  connect: connector,
  delete: deleter,
}
