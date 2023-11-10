var logIn = $('#log-in');
var services = $('#services');
var donation = $('#donation');
var rooms = $('#rooms');
var deluxe = $('#deluxe');
var finalBook = $('#final-book');
var deluxeCard = $('deluxe-card');
var booked = $('#booked');
var spinner = $('#spinner');
var spinner2 = $('#spinner2');
var isFound;

logIn.hide();
rooms.hide();
deluxe.hide();
spinner.hide();
spinner2.hide();
booked.hide();


var names = [];
var checkInTime = [];
var checkOutTime = [];
var numAdults = [];
var numChildren = [];
var tokenNumber = [];
var roomType = [];
var main  = $('#main');

$('document').ready(function() {
    var logInLink = $('#log-in-link');

    logInLink.click(function() {
        main.hide();
        logIn.show();
    });

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
            $('#msg').text('Please fill all form fields!');
            return false;
        }

        rooms.show();
        $('html, body').animate({
            scrollTop: rooms.offset().top
          }, 1000);

        e.preventDefault();
        checkInTime.push($('#check-in').val());
        checkOutTime.push($('#check-out').val());
        numAdults.push($('#num-adults').val());
        numChildren.push($('#num-children').val());
        names.push($('#name').val());

        //createToken();
        
        console.log(checkInTime);
        console.log(checkOutTime);
        console.log(numAdults);
        console.log(numChildren);
        console.log(names);
        //console.log(tokenNumber);

        reset();
    });

        $('.verificationForm').submit(function (e) { 
            e.preventDefault();
            var isFound = jQuery.inArray(Number($('#bookingIdCheck').val()), tokenNumber);
            if(isFound == -1) {
                alert('Invalid Booking ID');
            }else {
                alert('Here are your details: \n Name: ' + names[isFound] + '\n Checkin Date: ' + checkInTime[isFound] + '\n Check our date: ' + checkOutTime[isFound] + '\nRoom Type: ' + roomType[isFound]);
            }
        });

        $('.verificationForm2').submit(function (e) { 
            e.preventDefault();
            isFound = jQuery.inArray(Number($('#bookingIdCheck2').val()), tokenNumber);
            if(isFound == -1) {
                alert('Invalid Booking ID');
            }else {
                main.show();
                booked.show();
                logIn.hide();
                spinner2.show();
                $('html, body').animate({
                    scrollTop: booked.offset().top                 
                  }, 1000);
                  spinner2.hide();

                  $('#customerName').text(names[isFound]);
                  $('#checkInDate').text(checkInTime[isFound]);
                  $('#checkOutDate').text(checkOutTime[isFound]);
                  $('#numberOfAdults').text(numAdults[isFound]);
                  $('#numberOfChildren').text(numChildren[isFound]);
            }
        });

        $('#deluxe-card').click(function (e) {
            e.preventDefault();
            rooms.hide();
            services.hide();
            donation.hide();
            
            deluxe.show();
            $('html, body').animate({
            scrollTop: deluxe.offset().top
          }, 1000);
            spinner.hide();
        });

        finalBook.click(function(e) {
            e.preventDefault();
            roomType.push('Deluxe-King');
            spinner.show();
            setTimeout(function(){
                spinner.hide();
                createToken();
                deluxe.hide();
                services.show();
                donation.show();
              }, 5000);
            
           
            
        })

    
    function reset() {
        $('#check-in').val("");
        $('#check-out').val("");
        $('#name').val("");
        $('#msg').text('');
    }

    function createToken()  {
        bookingId = (Math.floor(Math.random() * 1000000) + 1);
        tokenNumber.push(bookingId);
        alert("Booking Successful. \nHere is your booking ID: " + bookingId);
    }

    $('.unavailable').click(function(e) {
        e.preventDefault();
        alert('Sorry rooms unavailable');
    })
});

