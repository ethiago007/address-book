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
  if (this.contacts[id] !== undefined) {
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



// Business Logic for Contacts ---------
function Contact(firstName, lastName, phoneNumber, email, workAddress, schoolAddress, homeAddress) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.phoneNumber = phoneNumber;
  this.email = email;
  this.workAddress = workAddress;
  this.schoolAddress = schoolAddress;
  this.homeAddress = homeAddress;
}

function Address(street, city, state) {
  this.street = street;
  this.city = city;
  this.state = state;
}
Address

Contact.prototype.fullName = function () {
  return this.firstName + " " + this.lastName;
};

Address.prototype.fullAddress = function () {
  return this.street + ", " + this.city + ", " + this.state;
}



let addressBook = new AddressBook();
// User Interface Logic ---------


// Funtion for edit contact
function editContact(id) {
  let contact = addressBook.findContact(id);
  $("input#new-first-name").val(contact.firstName);
  $("input#new-last-name").val(contact.lastName);
  $("input#new-phone-number").val(contact.phoneNumber);
  $("input#new-email-address").val(contact.email);
  
  
  addressBook.deleteContact(id);
  $("#show-contact").hide()
}

function attachContactListeners() {
  $("ul#contacts").on("click", "li", function () {
    showContact(this.id);
  });
  //  Function for Delete Contact
  $("div#buttons").on("click", ".deleteButton", function () {
    addressBook.deleteContact(this.id);
    $("#show-contact").hide();
    displayContactDetails(addressBook);
  });
  $("#buttonsEdit").on("click", ".editButton", function () {
    editContact(this.id);

  });
}


function displayContactDetails(addressBookToDisplay) {
  let contactsList = $("ul#contacts");
  let htmlForContactInfo = "";
  Object.keys(addressBookToDisplay.contacts).forEach(function (key) {
    const contact = addressBookToDisplay.findContact(key);

    htmlForContactInfo += "<li id=" + contact.id + ">" + contact.firstName + " " + contact.lastName + "</li>";
  });
  console.log(htmlForContactInfo)
  contactsList.html(htmlForContactInfo);
}
// function myFunction() {
//   document.getElementById("myForm").reset();
// }

function showContact(contactId) {
  const contact = addressBook.findContact(contactId);
  $("#show-contact").show();
  $(".first-name").html(contact.firstName);
  $(".last-name").html(contact.lastName);
  $(".phone-number").html(contact.phoneNumber);
  $(".email").html(contact.email);
  $(".work-address").html(contact.workAddress.fullAddress());
  $(".school-address").html(contact.schoolAddress.fullAddress());
  $(".home-address").html(contact.homeAddress.fullAddress())


  // Buttons for Edit And Delete
  let buttons = $("#buttons");
  buttons.empty();
  buttons.html("<button class='deleteButton btn btn-danger' id=" + contact.id + ">Delete</button>");

  let editButton = $("#buttonsEdit");
  editButton.empty();
  editButton.html("<button class='editButton btn btn-success' id=" + contact.id + ">Edit</button>");
}

// Function for reset fields
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




$(document).ready(function () {
  attachContactListeners();
  $("#workButton").click(function () {
    $("#work").show();
  });
  $("#homeButton").click(function () {
    $("#home").show();
  });
  $("#schoolButton").click(function () {
    $("#school").show();
  });

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

    const inputtedWorkStreet = $("input.work-street").val();
    const inputtedWorkCity = $("input.work-city").val();
    const inputtedWorkState = $("input.work-state").val();
    $("input.work-street").val();
    $("input.work-city").val();
    $("input.work-state").val();




    const inputtedHomeStreet = $("input.home-street").val();
    const inputtedHomeCity = $("input.home-city").val();
    const inputtedHomeState = $("input.home-state").val();
    $("input.home-street").val();
    $("input.home-city").val();
    $("input.home-state").val();


    const inputtedSchoolStreet = $("input.school-street").val();
    const inputtedSchoolCity = $("input.school-city").val();
    const inputtedSchoolState = $("input.school-state").val();
    $("input.school-street").val();
    $("input.school-city").val();
    $("input.school-state").val();

    let inputtedWorkAddress = new Address(inputtedWorkStreet, inputtedWorkCity, inputtedWorkState)
    let inputtedHomeAddress = new Address(inputtedHomeStreet, inputtedHomeCity, inputtedHomeState)
    let inputtedSchoolAddress = new Address(inputtedSchoolStreet, inputtedSchoolCity, inputtedSchoolState)
    let newContact = new Contact(inputtedFirstName, inputtedLastName, inputtedPhoneNumber, inputtedEmail, inputtedWorkAddress, inputtedHomeAddress, inputtedSchoolAddress);
    addressBook.addContact(newContact);
    console.log(addressBook.contacts);





    displayContactDetails(addressBook);



    //  $("ul#contacts").text("<li><span class='contact'>" + newContact.fullName() + "</span></li>"); 






    $(".contact").last().click(function () {
      $("#show-contact").show();
      $("#show-contact h2").text(newContact.fullName());
      $(".first-name").text(newContact.firstName);
      $(".last-name").text(newContact.lastName);
      $(".phone-number").text(newContact.phoneNumber);
      $(".email").text(newContact.email);

      $(".work-address").text(newContact.workAddress.fullAddress());
      $(".school-address").text(newContact.schoolAddress.fullAddress());
      $(".home-address").text(newContact.homeAddress.fullAddress());
    });

    resetFields();
    event.preventDefault();

  });
});