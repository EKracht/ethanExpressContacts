'use strict';

$(document).ready(init);

var index = {};

function init(){
  $('#submit').on('click', addContact);
  $('#contactList').on('click', 'td.delete', deleteContact);
  $('#contactList').on('click', 'td.edit', openModalEdit);
  $('#saveEdit').on('click', saveEdit);
}

function saveEdit(){
  // var $target = $(e.target);
  // var $tr = $target.closest('tr');
  // var index = $tr.index();

  var person = {};
  person.name = $('#editName').val();
  person.email = $('#editEmail').val();
  person.phone = $('#editPhone').val();
  person.food = $('#editFood').val();
  person.index = index.value;

  $('input').each(function(index, input){
    $(input).val('');
  });
  $.ajax({
    url: '/create/update',
    type: 'POST',
    data: person
  })
  .done(function(data){
    $('#contactList').children("tr:nth-child(" + parseInt(index.value + 1) + ")").replaceWith(contactRow(data));
    console.log('hi');
    console.log('data', data);
  })
  .fail(function(err){
    console.log(err);
  })
}

function openModalEdit(e){
  var $target = $(e.target);
  var $tr = $target.closest('tr');
  index.value = $tr.index();
}

function deleteContact(e){
  var $target = $(e.target);
  var $tr = $target.closest('tr');
  var index = $tr.index();
  console.log('index', index);

  $.ajax({
    url: "/create/delete",
    type: "DELETE",
    data: {index: index}
  })
  .done(function(data){
    $tr.remove();
  })
  .fail(function(err){
    console.log(err);
  })
}

function addContact(){
  var contact = {};
  contact.name = $('input#name').val();
  contact.email = $('input#email').val();
  contact.phone = $('input#phone').val();
  contact.food = $('input#food').val();

  $('input').each(function(index, input){
    $(input).val('');
  });

  console.log(contact);

  $.post('/create', contact)
  .done(function(data){
    var $contactRow = contactRow(contact);
    $('#contactList').append($contactRow);
  })
  .fail(function(err){
    console.log(err);
  })
}

function contactRow(person){
  var $tr = $('<tr>');
  var $name = $('<td>').addClass('name').text(person.name);
  var $email = $('<td>').addClass('email').text(person.email);
  var $phone = $('<td>').addClass('phone').text(person.phone);
  var $food = $('<td>').addClass('food').text(person.food);

  var $editTd = $('<td>').addClass('edit text-center');
  var $editIcon = $('<i>').addClass('fa fa-pencil-square-o fa-lg')
  $editTd.append($editIcon)

  var $deleteTd = $('<td>').addClass('delete text-center');
  var $deleteIcon = $('<i>').addClass('fa fa-trash-o fa-lg')
  $deleteTd.append($deleteIcon)

  $tr.append($name, $email, $phone, $food, $editTd, $deleteTd);
  return $tr;
}

function save(){
  // var object = {};
  // object.name = $('#name').val();
  // object.email = $('#email').val();
  // object.phone = $('#phone').val();
  // console.log('object', object);
  // $.post('/create', object)
  // .done(function(data){
  //   console.log('success!')
  // })
  // .fail(function(err){
  //   console.log(err)
  // })
}


