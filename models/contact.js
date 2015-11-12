var fs = require('fs');

var Contact = {};

var db = 'db/contacts.json';

Contact.findAll = function(cb){
  fs.readFile(db, function(err, data){
    if (err) return cb(err);
    var contacts = JSON.parse(data);
    cb(null, contacts);
  });
};

Contact.create = function(contact, cb){
  Contact.findAll(function(err, contacts){
    contacts.push(contact);
    var data = JSON.stringify(contacts);
    fs.writeFile(db, data, cb);
  });
};

Contact.remove = function(index, cb){
  Contact.findAll(function(err, contacts){
    console.log('remove', index);
    contacts.splice(index, 1);
    var data = JSON.stringify(contacts);
    fs.writeFile(db, data, cb);
  });
};

Contact.update = function(person, cb){
  Contact.findAll(function(err, contacts){
    if (err) return cb(err);
    contacts.splice(person.index, 1, person);
    var data = JSON.stringify(contacts);
    fs.writeFile(db, data, cb);
  });
};

module.exports = Contact;