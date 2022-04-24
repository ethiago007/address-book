// Business Logic for AddressBook ---------
function AddressBook() {
  this.contacts = {};
  this.currentId = 0;
}

AddressBook.prototype.addContact = function (contact) {
  contact.id = this.assignId();
  this.contacts[contact.id] = contact;
};

AddressBook.prototype.assignId = function () {
  this.currentId += 1;
  return this.currentId;
};

AddressBook.prototype.findContact = function (id) {
  if (this.contacts[id] != undefined) {
    return this.contacts[id];
  }
  return false;
};

AddressBook.prototype.deleteContact = function (id) {
  if (this.contacts[id] === undefined) {
    return false;
  }
  delete this.contacts[id];
  return true;
};
function displayContactDetails(addressBookToDisplay) {
  let contactsList = $("ul#contacts");
  let htmlForContactInfo = "";
  Object.keys(addressBookToDisplay.contacts).forEach(function (key) {
    const contact = addressBookToDisplay.findContact(key);
    htmlForContactInfo += "<li id=" + contact.id + ">" + contact.firstName + " " + contact.lastName + "</li>";
  });
  contactsList.html(htmlForContactInfo);
}

// Business Logic for Contacts ---------
function Contact(firstName, lastName, phoneNumber, email) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.phoneNumber = phoneNumber;
  this.email = email;
  this.work = [];
  this.home = [];
  this.school = [];
}

function Address(street, city, state) {
  this.street = street;
  this.city = city;
  this.state = state;
}

Contact.prototype.fullName = function () {
  return this.firstName + " " + this.lastName;
};

Address.prototype.fullAddress = function () {
  return this.street + ", " + this.city + ", " + this.state;
}

function myFunction() {
  document.getElementById("myForm").reset();
}
function showContact(contactId) {
  const contact = addressBook.findContact(contactId);
  $("#show-contact").show();
  $(".first-name").html(contact.firstName);
  $(".last-name").html(contact.lastName);
  $(".phone-number").html(contact.phoneNumber);
  $(".email").html(contact.email);

  let buttons = $("#buttons");
  buttons.empty();
  buttons.append("<button class='deleteButton btn btn-danger' id=" + + contact.id + ">Delete</button>");
}

function resetFields() {
  $("input#new-first-name").val("");
  $("input#new-last-name").val("");
  $("input#new-phone-number").val("");
  $("input#new-email-address").val("");
  $("input.work-street").val("");
  $("input.work-city").val("");
  $("input.work-state").val("");
  $("input.home-street").val("");
  $("input.home-city").val("");
  $("input.home-state").val("");
  $("input.school-street").val("");
  $("input.school-city").val("");
  $("input.school-state").val("");
}
function attachContactListeners() {
  $("ul#contacts").on("click", "li", function () {
    showContact(this.id);
  });

  $("#buttons").on("click", ".deleteButton", function () {
    addressBook.deleteContact(this.id);
    $("#show-contact").hide();
    displayContactDetails(addressBook);
  });
}


// User Interface Logic ---------

let addressBook = new AddressBook();

$(document).ready(function () {
  $("#workButton").click(function () {
    $("#work").show();
  });
  $("#homeButton").click(function () {
    $("#home").show();
  });
  $("#schoolButton").click(function () {
    $("#school").show();
  });
  attachContactListeners();
  $("form#new-contact").submit(function (event) {

    event.preventDefault();
    const inputtedFirstName = $("input#new-first-name").val();
    const inputtedLastName = $("input#new-last-name").val();
    const inputtedPhoneNumber = $("input#new-phone-number").val();
    const inputtedEmail = $("input#new-email-address").val();
    $("input#new-first-name").val("");
    $("input#new-last-name").val("");
    $("input#new-phone-number").val("");
    $("input#new-email-address").val("");
    let newContact = new Contact(inputtedFirstName, inputtedLastName, inputtedPhoneNumber, inputtedEmail);
      addressBook.addContact(newContact);
      console.log(addressBook.contacts);

    $(".work-address").each(function() {
      let inputtedWorkStreet = $(this).find("input.work-street").val();
      let inputtedWorkCity = $(this).find("input.work-city").val();
      let inputtedWorkState = $(this).find("input.work-state").val();
      let workAddress = new Address(inputtedWorkStreet, inputtedWorkCity, inputtedWorkState)
      newContact.work.push(workAddress)
    });
    $(".home-address").each(function() {
      let inputtedHomeStreet = $(this).find("input.home-street").val();
      let inputtedHomeCity = $(this).find("input.home-city").val();
      let inputtedHomeState = $(this).find("input.home-state").val();
      let homeAddress = new Address(inputtedHomeStreet, inputtedHomeCity, inputtedHomeState)
      newContact.home.push(homeAddress)
    });
    $(".school-address").each(function() {
      let inputtedSchoolStreet = $(this).find("input.school-street").val();
      let inputtedSchoolCity = $(this).find("input.school-city").val();
      let inputtedSchoolState = $(this).find("input.school-state").val();
      let schoolAddress = new Address(inputtedSchoolStreet, inputtedSchoolCity, inputtedSchoolState)
      newContact.school.push(schoolAddress)
    });

    


      
      $("ul#contacts").append("<li><span class='contact'>" + newContact.fullName() + "</span></li>");


    
  


    $(".contact").last().click(function () {
      $("#show-contact").show();
      $("#show-contact h2").text(newContact.fullName());
      $(".first-name").text(newContact.firstName);
      $(".last-name").text(newContact.lastName);
      $(".phone-number").text(newContact.phoneNumber);
      $(".email").text(newContact.email);
      $(".addresses").empty();
      newContact.work.forEach(function(address) {
      $(".addresses").append("<li class='work'> Work Address -->" + address.fullAddress()   +  "</li>");
      });
      newContact.home.forEach(function(address) {
        $(".addresses").append("<li class='home'> Home Address -->" + address.fullAddress()   +  "</li>");
        });
        newContact.school.forEach(function(address) {
          $(".addresses").append("<li class='school'> School Address -->" + address.fullAddress()   +  "</li>");
          });
    });

resetFields();
    event.preventDefault();

  });
});