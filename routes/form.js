'use strict';

var express = require('express');
var router = express.Router();

var Contact = require('../models/contact');

router.get('/', function(req, res){
  Contact.findAll(function(err, contacts){ 
    if (err) {
      res.status(400).send(err);
    } else {
      res.render('form', {title: 'Contact List', items: contacts});
    }
  });
});

router.post('/', function(req, res){
  var contact = req.body;
  Contact.create(contact, function(err){
    if (err) {
      res.status(400).send(err);
    } else {
      res.send('contact created!');
    }
  })
});

router.delete('/delete', function(req, res){
  var index = req.body.index;
  console.log('route', index);
  Contact.remove(index, function(err){
    if (err) {
      res.status(400).send(err);
    } else {
      res.send('contact created!');
    }
  });
});

router.post('/update', function(req, res){
  var person = req.body;
  console.log('route', person);
  Contact.update(person, function(err){
    if (err) {
      res.status(400).send(err);
    } else {
      res.send(person);
    }
  });
});


module.exports = router;