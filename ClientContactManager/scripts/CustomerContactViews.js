function loadCustomerContactForm(custid) {

    customerID = custid;
    url = '/api/customers/GetCustomerByID/' + custid;
    $('#divCustomerForm').hide();
    $('#divCustomerContactsForm').show();
    $(function () {
        $.getJSON(url, function (data) {
            console.log(data);
            success: $('#customercontactsHeader').text(data.Name + "'s Contacts");
        })
    });
    setTimeout(function () { getCustomerContacts(custid) }, 500);

}
function getCustomerContacts(custid) {
    $('#tblcustomercontactform').hide();
    $('#CustomerContacts').show();
    $('#CustomerContacts').children().remove();
    $('<tr><td>Name</td><td>Contact Number</td><td>Email</td><td></td></tr>').appendTo($('#CustomerContacts'));
    url = '/api/CustomerContacts/GetCustomerContacts/' + custid
    $(function () {
        $.getJSON(url, function (data) {
            console.log(data);
            for (var x = 0; x < data.length; ++x) {
                $('<tr><td>' + data[x].Name + '</td><td>' + data[x].ContactNumber + '<td>' + data[x].Email + '</td>' +
                    "</td><td> <input type='button' onclick='showCustomerContactForm(" + customerID + "," + data[x].ID + ");' value='edit' class='btn-link'/>"
                    + "<input type='button' onclick='showContactDeleteMesage(" + data[x].ID + ");' value='delete' class='btn-link'/>" + + '</td></tr>').appendTo($('#CustomerContacts'))
            }
        });
    });
}
function showCustomerContactForm(custid, customercontactID) {
    if (customercontactID > 0) {
        custcontactID = customercontactID;
        //Update/Edit load customer contact information
        url = '/api/CustomerContacts/GetCustomerContact/' + customercontactID;
        $(function () {
            $.getJSON(url, function (data) {
                console.log(data);
                success: {
                    $('#txtCustContactName').val(data.Name);
                    $('#txtCustContactnum').val(data.ContactNumber);
                    $('#txtCustContactEmail').val(data.Email);
                }
            })
        });
        setTimeout(function () { $('#contactMode').val("edit"); custcontactID = customercontactID; }, 500);

    } else {
        //Add/Insert show customer contact form clear text boxes
        custcontactID = 0;
        $('#txtCustContactName').val("");
        $('#txtCustContactnum').val("");
        $('#txtCustContactEmail').val("");
        setTimeout(function () { $('#contactMode').val("add"); custcontactID = 0; }, 500);
    }
    $('#tblcustomercontactform').show();
    $('#CustomerContacts').hide();
}
function addEditCustomerContacts(custid, customercontactID) {
    var isvalid = false
    custcontactID = customercontactID;
    if ($('#txtCustContactName').val().trim() !== "") {
        if ($('#txtCustContactEmail').val().trim() !== "") {
            if ($('#txtCustContactnum').val().trim() !== "") {
                isvalid = true;
            } else {
                alert('Please enter an valid contact number.');
            }
        } else {
            alert('Please enter an valid email address.');
        }
    } else {
        alert('Please enter an customer name.');
    }
    if (isvalid === true) {
        if (custcontactID > 0 && $('#contactMode').val() === 'edit') {

            //Update/Edit
            //alert('edit');
            updateCustomerContact(custcontactID, $('#txtCustContactName').val(), $('#txtCustContactEmail').val(), $('#txtCustContactnum').val(), custid);
        } else {

            //Add/Insert
            //alert('add');
            addCustomerContact($('#txtCustContactName').val(), $('#txtCustContactEmail').val(), $('#txtCustContactnum').val(), custid);
        }
    }

}
function addCustomerContact(name, email, contactnum, customerID) {
    $.ajax({
        type: "PUT",
        url: "/api/CustomerContacts/AddCustomerContact/" + name + "/" + email + "/" + contactnum + "/" + customerID,
        //data: JSON.stringify({ Nane: $('#txtCustName').val(), latitude: $('#txtCustLatitude').val(), Longitude:  $('#txtCustLongitude').val()}),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(errorThrown);
        },
        success: function (result) {
            alert('customer contact saved.');
            getCustomerContacts(customerID);
        }
    });
}
function updateCustomerContact(id, name, email, contactnum, customerID) {
    $.ajax({
        type: "PUT",
        url: "/api/CustomerContacts/UpdateCustomerContact/" + id + "/" + name + "/" + email + "/" + contactnum + "/" + customerID,
        //data: JSON.stringify({ Nane: $('#txtCustName').val(), latitude: $('#txtCustLatitude').val(), Longitude:  $('#txtCustLongitude').val()}),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(errorThrown);
        },
        success: function (result) {
            alert('customer contact saved.');
            getCustomerContacts(customerID);
        }
    });
}
function getCustomerContactByName(customerID) {
    if ($('#txtCustContactSearch').val().trim() !== "") {
        $('#tblcustomercontactform').hide();
        $('#CustomerContacts').show();
        $('#CustomerContacts').children().remove();
        $('<tr><td>Name</td><td>Contact Number</td><td>Email</td><td></td></tr>').appendTo($('#CustomerContacts'));
        url = '/api/CustomerContacts/GetCustomerContactsByName/' + customerID + '/' + $('#txtCustContactSearch').val().trim();
        $(function () {
            $.getJSON(url, function (data) {
                console.log(data);
                for (var x = 0; x < data.length; ++x) {
                    $('<tr><td>' + data[x].Name + '</td><td>' + data[x].ContactNumber + '<td>' + data[x].Email + '</td>' +
                        "</td><td> <input type='button' onclick='showCustomerContactForm(" + customerID + "," + data[x].ID + ");' value='edit' class='btn-link'/>" +
                        "<input type='button' onclick='showContactDeleteMesage(" + data[x].ID + ");' value='delete' class='btn-link'/>" + '</td></tr>').appendTo($('#CustomerContacts'))
                }
            });
        });
    }
}
function showContactDeleteMesage(contactid) {
    $(function () {
        $("#dailogDeleteContact").dialog();
    });
    deletecontactID = contactid;
}
function deleteContactNo() {
    $(function () {
        $("#dailogDeleteContact").dialog("close");
    });
    deletecontactID = 0;
}
function deleteContactYes() {
    $(function () {
        $("#dailogDeleteContact").dialog("close");
    });
    $.ajax({
        type: "PUT",
        url: "/api/CustomerContacts/DeleteCustomerContact/" + deletecontactID,
        //data: JSON.stringify({ Nane: $('#txtCustName').val(), latitude: $('#txtCustLatitude').val(), Longitude:  $('#txtCustLongitude').val()}),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(errorThrown);
        },
        success: function (result) {
            alert('customer contact deleted.');
            getCustomerContacts(customerID);
        }
    });
}