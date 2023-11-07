var names = [];
var checkInTime = [];
var checkOutTime = [];
var numAdults = [];
var numChildren = [];
var tokenNumber = [];

$('document').ready(function() {

    $('#check-in,  #check-out').focus(function (e) { 
        e.preventDefault();
        $(this).attr('type', 'date');        
    });

    $('#check-in, #check-out').blur(function (e) { 
        e.preventDefault();
        $(this).attr('type', 'text');
        
    });

    $('.booking-form').submit(function (e) { 

        if ($('#check-in').val().length == 0 || $('#check-out').val().length == 0 || $('#num-adults').val().length == 0 || $('#num-children').val() == 0 || $('#name').val() == 0){
            e.preventDefault();
            $('#errorMsg').text('Please fill all form fields!');
            return false;
        }

        e.preventDefault();
        checkInTime.push($('#check-in').val());
        checkOutTime.push($('#check-out').val());
        numAdults.push($('#num-adults').val());
        numChildren.push($('#num-children').val());
        names.push($('#name').val());

        createToken();
        
        console.log(checkInTime);
        console.log(checkOutTime);
        console.log(numAdults);
        console.log(numChildren);
        console.log(names);
        console.log(tokenNumber);

        reset();
    });

        $('.verificationForm').submit(function (e) { 
            e.preventDefault();
            var isFound = jQuery.inArray(Number($('#bookingIdCheck').val()), tokenNumber);
            if(isFound == -1) {
                alert('Invalid Booking ID');
            }else {
                alert('Here are your details: \n Name: ' + names[isFound] + '\n Checkin Date: ' + checkInTime[isFound] + '\n Check our date: ' + checkOutTime[isFound]);
            }
        });

    
    function reset() {
        $('#check-in').val("");
        $('#check-out').val("");
        $('#name').val("");
        $('#errorMsg').text('');
    }

    function createToken()  {
        bookingId = (Math.floor(Math.random() * 1000000) + 1);
        tokenNumber.push(bookingId);
        $('#bookingMsg').text("Here is your booking ID: " + bookingId);
    }
});

