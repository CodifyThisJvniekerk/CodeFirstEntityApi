function getCustomers() {
    url = '/api/customers/GetCustomers';
    $('#Customers').children().remove();
    $('#Customers').show();
    $('#customerform').hide();
    $('<tr><td>Name</td><td>Latitude</td><td>Longitude</td><td></td></tr>').appendTo($('#Customers'));
    $(function () {
        $.getJSON(url, function (data) {
            console.log(data);
            //for (item in data) {
            for (var item = 0; item < data.length; ++item) {
                var id = data[item].ID;
                $('<tr><td>' + data[item].Name + '</td><td>' + data[item].Latitude + '<td>' + data[item].Longitude + '</td>'
                    + "</td><td>"
                    + " <input type='button' onclick=" + "'loadCustomer(" + id.toString() + ");'" + " value='Edit' class='btn-link'/>"
                    + " <input type='button' onclick=" + "'loadCustomerContactForm(" + id.toString() + ");'" + " value='Manage Contacts' class='btn-link' />"
                    + " <input type='button' onclick=" + "'showDeleteCustomerMesage(" + id.toString() + ");'" + " value='Delete' class='btn-link' />"
                    + "</td></tr>").appendTo($('#Customers'))
            }
        });
    });
}
function getCustomerByName() {
    url = '/SearchForCustomerByName/'
    $('#Customers').show();
    $('#Customers').children().remove();
    $('<tr><td>Name</td><td>Latitude</td><td>Longitude</td><td></td></tr>').appendTo($('#Customers'));
    $(function () {
        $.getJSON(url + '/' + $('#txtCustSearck').val(), function (data) {
            //console.log(data);
            var id;
            //for (item in data) {
            for (var item = 0; item < data.length; ++item) {
                id = data[item].ID;
                console.log(data[item].ID);
                $('<tr><td>' + data[item].Name + '</td><td>' + data[item].Latitude + '<td>' + data[item].Longitude + '</td>'
                    + "</td><td>"
                    + " <input type='button' onclick=" + "'loadCustomer(" + id.toString() + ");'" + " value='Edit' class='btn-link'/>"
                    + " <input type='button' onclick=" + "'loadCustomerContactForm(" + id.toString() + ");'" + " value='Manage Contacts' class='btn-link' />"
                    + " <input type='button' onclick=" + "'showDeleteCustomerMesage(" + id.toString() + ");'" + " value='Delete' class='btn-link' />"
                    + "</td></tr>").appendTo($('#Customers'));
                //

            }
        });
    });
}
function showCustomerForm(id) {
    if (id > 0) {

    } else {
        $('#customerform').show();
        $('#Customers').hide();
        $('#txtCustomerID').val("");
    }
}
function addEditCustomer() {
    if ($('#txtCustomerID').val() == "") {
        if ($('#txtCustName').val().trim() !== "") {
            if ($.isNumeric($('#txtCustLatitude').val()) && $.isNumeric($('#txtCustLongitude').val())) {
                $.ajax({
                    type: "PUT",
                    url: "AddCustomer/" + $('#txtCustName').val() + '/' + $('#txtCustLatitude').val() + '/' + $('#txtCustLongitude').val(),
                    //data: JSON.stringify({ Nane: $('#txtCustName').val(), latitude: $('#txtCustLatitude').val(), Longitude:  $('#txtCustLongitude').val()}),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                    },
                    success: function (result) {
                        alert('customer saved.');
                    }
                });
            } else {
                alert('Please ensure both the longitude and latitude is numerical.');
            }
        } else {
            alert('Please enter an customer name.');
        }
    } else {
        if ($('#txtCustName').val().trim() !== "") {
            if ($.isNumeric($('#txtCustLatitude').val()) && $.isNumeric($('#txtCustLongitude').val())) {
                $.ajax({
                    type: "PUT",
                    url: "UpdateCustomer/" + $('#txtCustomerID').val() + '/' + $('#txtCustName').val() + '/' + $('#txtCustLatitude').val() + '/' + $('#txtCustLongitude').val(),
                    //data: JSON.stringify({ Nane: $('#txtCustName').val(), latitude: $('#txtCustLatitude').val(), Longitude:  $('#txtCustLongitude').val()}),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                    },
                    success: function (result) {
                        alert('customer saved.');
                    }
                });
            } else {
                alert('Please ensure both the longitude and latitude is numerical.');
            }
        } else {
            alert('Please enter an customer name.');
        }
    }
    $('#Customers').hide();
    $('#customerform').hide();

}
function loadCustomer(id) {
    url = '/api/customers/GetCustomerByID/' + id
    $(function () {
        $.getJSON(url, function (data) {
            console.log(data);
            console.log(data.ID + ' ' + data.Name + ' ' + data.Latitude + ' ' + data.Longitude);
            $('#customerform').show();
            $('#Customers').hide();
            $('#txtCustName').val(data.Name);
            $('#txtCustLatitude').val(data.Latitude);
            $('#txtCustLongitude').val(data.Longitude);
            $('#txtCustomerID').val(id);
        });
    });
}
function showDeleteCustomerMesage(contactid) {
    $(function () {
        $("#dailogDeleteCustomer").dialog();
    });
    deleteCustomer = contactid;
}
function deleteCustomerNo() {
    $(function () {
        $("#dailogDeleteCustomer").dialog("close");
    });
    deleteCustomer = 0;
}
function deleteCustomerYes() {
    $(function () {
        $("#dailogDeleteCustomer").dialog("close");
    });
    $.ajax({
        type: "PUT",
        url: "api/customers/DeleteCustomer/" + deleteCustomer,
        //data: JSON.stringify({ Nane: $('#txtCustName').val(), latitude: $('#txtCustLatitude').val(), Longitude:  $('#txtCustLongitude').val()}),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(errorThrown);
        },
        success: function (result) {
            alert('customer deleted.');
            getCustomers();
        }
    });

}