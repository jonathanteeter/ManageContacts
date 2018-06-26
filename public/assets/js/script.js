// add contact functionality
$('input[type=submit]').on('click', function(event) {
    event.preventDefault();

    var newContact = {  // put into database
        firstName: $("#firstName").val().trim(),
        lastName: $("#lastName").val().trim(),
        contactType: $("#contactType").val().trim(),
        phoneNumber: $("#phoneNum").val().trim(),
        emailAddress: $("#emailAddr").val().trim()
    }

    $.ajax('api/contacts', {
        method: 'POST',
        data: newContact
        // grab info from front-end above before we can post object to route
    }).then(function(response) { // show up on front end as FE file
        console.log(response);
        location.href ="/";
    })
});

// delete contact functionality
$(".delete").on('click', function(event) {
    console.log(this);
    var id = $(this).attr('data-id');

    $.ajax( {
        method: 'DELETE',
        url: "/api/contacts/" + id
    }).then(function(response) {
        location.href="/";
    })
});
