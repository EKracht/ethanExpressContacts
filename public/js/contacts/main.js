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
    url: '/form/update',
    type: 'POST',
    data: person
  })
  .done(function(data){
    $('#contactList').children("tr:nth-child(" + parseInt(index.value + 1) + ")").replaceWith(contactRow(data));
  })
  .fail(function(err){
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

  $.ajax({
    url: "/form/delete",
    type: "DELETE",
    data: {index: index}
  })
  .done(function(data){
    $tr.remove();
  })
  .fail(function(err){
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

  $.post('/form', contact)
  .done(function(data){
    var $contactRow = contactRow(contact);
    $('#contactList').append($contactRow);
  })
  .fail(function(err){
  })
}

function contactRow(person){
  var $tr = $('<tr>');
  var $name = $('<td>').addClass('name').text(person.name);
  var $email = $('<td>').addClass('email').text(person.email);
  var $phone = $('<td>').addClass('phone').text(person.phone);
  var $food = $('<td>').addClass('food').text(person.food);

  var $editTd = $('<td>').addClass('edit text-center');
  var $editIcon = $('<i>').addClass('fa fa-pencil-square-o fa-lg').attr('data-target','#myModal').attr('data-toggle','modal')
  $editTd.append($editIcon)

  var $deleteTd = $('<td>').addClass('delete text-center');
  var $deleteIcon = $('<i>').addClass('fa fa-trash-o fa-lg')
  $deleteTd.append($deleteIcon)

  $tr.append($name, $email, $phone, $food, $editTd, $deleteTd);
  return $tr;
}
