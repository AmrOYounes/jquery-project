var t = 0, i = 0, j = 0;
$(window).on('load', function () {
    //preloader 
    $('#status').fadeOut();
    $('#preloader').delay(300).fadeOut(7000);
});

$(document).ready(function () {
    var itemss = [];
    var cards = document.querySelector('#infinte-list');
    var counter = 0;

    $("#iframeloading").show();
    $.getJSON("https://randomuser.me/api/?results=2000&nat=us", function (data) {
        $("#iframeloading").fadeOut(5000);
  
        // add 10 card first 
        addCards(10, data);
        counter++;
        //infinite scroll
        $(window).scroll(function () {
            itemss = data.results;
            var scrollTop = $(document).scrollTop();
            var windowHeight = $(window).height();
            var bodyHeight = $(document).height() - windowHeight;
            var scrollPercentage = (scrollTop / bodyHeight);
            if (scrollPercentage > 0.9) {
                // when detect scroll add 5 card 
                addCards(5, data);
                var firstName, lastName, email, location, date, pic, fullname;

                for (j = i; j < i + 5; j++) {
                    firstName = itemss[j].name.first;
                    lastName = itemss[j].name.last;
                    fullname = firstName + " " + lastName;
                    
                    pic = itemss[j].picture.large;
               
                    $('#infinte-list').append('<li><div class="card">' +
                        '<div class="person-photo">' +
                        '<img src="' + pic + '"' + 'class="image" >' +
                        '</div>' +
                        '<div class="person-info">' +
                        '<p id="key">MY Name</p>' +
                        '<P id="value">' + fullname + '</P>' +
                        '<br>' +
                        '</div>' +
                        '<div class="social-media">' +
                        '<button class="social-button" id="name' + j + '"' + '><i class="fas fa-user-circle fa-2x"></i></i></button>' +
                        '<button class="social-button" id="letter' + j + '"' + '><i class="fas fa-envelope fa-2x"></i></button>' +
                        '<button class="social-button" id="location' + j + '"' + '><i class="fas fa-map-marker-alt fa-2x"></i></button>' +
                        '<button class="social-button" id="date' + j + '"' + '><i class="far fa-calendar-alt fa-2x"></i></button>' +
                        '<button class="social-button" id="pass' + j + '"' + '><i class="fas fa-lock fa-2x"></i></button>' +
                        '</div>' +
                        '</div></li>');

                
                }

                // give button action listner
                item = document.querySelectorAll('#infinte-list li button');
            
                for (var k = 50 + t; k < item.length; k++) {
                    item[k].addEventListener('click', function (event) {
                        var idd = event.target.id;
                        var hint = "" + this.id;
                        var index = parseInt(hint.slice(-2));
 
                        var newStr = hint.substring(0, hint.length - 2);
                       // determine which buuton click on card 
                        switch (newStr) {
                            case "name": var editcard = this.parentNode.parentNode;
                                var x = editcard.querySelector('.person-info');
                                var fname, lname, fulname, tittle;

                                fname = itemss[index].name.first;
                                lname = itemss[index].name.last;
                                fulname = fname + " " + lname;
                                tittle = "My Name";

                                var gg = x.querySelector('#key');
                                var textval = x.querySelector('#value');
                                gg.innerHTML = tittle;
                                textval.innerHTML = fulname;
                       
                                break;
                            case "letter":
                                editcard = this.parentNode.parentNode;
                                x = editcard.querySelector('.person-info');
                                var email;
                                email = itemss[index].email;
                                tittle = "My Email";

                                gg = x.querySelector('#key');
                                textval = x.querySelector('#value');
                                gg.innerHTML = tittle;
                                textval.innerHTML = email;
                           
                                break;

                            case "location":
                                editcard = this.parentNode.parentNode;
                                x = editcard.querySelector('.person-info');
                                var city;
                                city = itemss[index].location.city;
                                tittle = "City Location";

                                gg = x.querySelector('#key');
                                textval = x.querySelector('#value');
                                gg.innerHTML = tittle;
                                textval.innerHTML = city;
                          
                                break;
                            case "date":
                                editcard = this.parentNode.parentNode;
                                x = editcard.querySelector('.person-info');
                                var datee;
                                datee = itemss[index].dob.date;
                                tittle = "Date";

                                gg = x.querySelector('#key');
                                textval = x.querySelector('#value');
                                gg.innerHTML = tittle;
                                textval.innerHTML = datee;
                         
                                break;

                            case "pass":
                                editcard = this.parentNode.parentNode;
                                x = editcard.querySelector('.person-info');
                                var pass;
                                pass = itemss[index].login.password;
                                tittle = "Password";

                                gg = x.querySelector('#key');
                                textval = x.querySelector('#value');
                                gg.innerHTML = tittle;
                                textval.innerHTML = pass;
                         
                                break;



                        }


                    });

                }
                t += 25;
 
                i = j;
            }
        });


        //sort by name ASC

        $('#sort-cards').on('click', function () {
            var list = document.getElementById('infinte-list');
            //remove all cards
            while (list.firstChild) {
                list.removeChild(list.firstChild);
            }

            itemss.sort(function (a, b) {

                return compareStrings(a.name.first, b.name.first);
            });
            i = 0;
            j = 0;
            t = 0;
            addCards(10, data);

        });

        $('#sort-date').on('click', function () {
            var list = document.getElementById('infinte-list');
            while (list.firstChild) {
                list.removeChild(list.firstChild);
            }

            itemss.sort(function (a, b) {

                return compareDate(a.name.first, b.name.first);
            });
            i = 0;
            j = 0;
            t = 0;
            addCards(10, data);
        });



    });


});
function compareStrings(a, b) {
    // Assuming you want case-insensitive comparison
    a = a.toLowerCase();
    b = b.toLowerCase();

    return (a < b) ? -1 : (a > b) ? 1 : 0;
}
function compareDate(a, b) {
    // Assuming you want case-insensitive comparison
    a = a.toLowerCase();
    b = b.toLowerCase();
    return (a < b) ? 1 : (a > b) ? -1 : 0;
}


function addCards(count, data) {

    var lengt = data.results.length;
    itemss = data.results;
    var firstName, lastName, pic, fullname;

    // Initially add 10 list item (10 users)
    for (i; i < count; i++) {
        firstName = itemss[i].name.first;
        lastName = itemss[i].name.last;
        fullname = firstName + " " + lastName;
        pic = itemss[i].picture.large;

        //start adding
        $('#infinte-list').append('<li><div class="card">' +
            '<div class="person-photo">' +
            '<img src="' + pic + '"' + 'class="image" >' +
            '</div>' +
            '<div class="person-info">' +
            '<p id="key">MY Name</p>' +
            '<P id="value">' + fullname + '</P>' +
            '<br>' +
            '</div>' +
            '<div class="social-media">' +
            '<button class="social-button" id="name' + i + '"' + '><i class="fas fa-user-circle fa-2x"></i></i></button>' +
            '<button class="social-button" id="letter' + i + '"' + '><i class="fas fa-envelope fa-2x"></i></button>' +
            '<button class="social-button" id="location' + i + '"' + '><i class="fas fa-map-marker-alt fa-2x"></i></button>' +
            '<button class="social-button" id="date' + i + '"' + '><i class="far fa-calendar-alt fa-2x"></i></button>' +
            '<button class="social-button" id="pass' + i + '"' + '><i class="fas fa-lock fa-2x"></i></button>' +
            '</div>' +
            '</div></li>');
    }
    var item = document.querySelectorAll('#infinte-list li button');
    for (var k = 0; k < item.length; k++) {
        item[k].addEventListener('click', function (event) {
            var idd = event.target.id;
     
            var hint = "" + this.id;
            var index = parseInt(hint.slice(-1));
   
            var newStr = hint.substring(0, hint.length - 1);
       
            switch (newStr) {
                case "name": var editcard = this.parentNode.parentNode;
                    var x = editcard.querySelector('.person-info');
                    var fname, lname, fulname, tittle;

                    fname = itemss[index].name.first;
                    lname = itemss[index].name.last;
                    fulname = fname + " " + lname;
                    tittle = "My Name";

                    var gg = x.querySelector('#key');
                    var textval = x.querySelector('#value');
                    gg.innerHTML = tittle;
                    textval.innerHTML = fulname;
        
                    break;
                case "letter":
                    var editcard = this.parentNode.parentNode;
                    var x = editcard.querySelector('.person-info');
                    var email, tittle;
                    email = itemss[index].email;
                    tittle = "My Email";

                    var gg = x.querySelector('#key');
                    var textval = x.querySelector('#value');
                    gg.innerHTML = tittle;
                    textval.innerHTML = email;
           
                    break;

                case "location":
                    var editcard = this.parentNode.parentNode;
                    var x = editcard.querySelector('.person-info');
                    var city, tittle;
                    city = itemss[index].location.city;
                    tittle = "City Location";

                    var gg = x.querySelector('#key');
                    var textval = x.querySelector('#value');
                    gg.innerHTML = tittle;
                    textval.innerHTML = city;
                   
                    break;
                case "date":
                    var editcard = this.parentNode.parentNode;
                    var x = editcard.querySelector('.person-info');
                    var datee, tittle;
                    datee = itemss[index].dob.date;
                    tittle = "Date";

                    var gg = x.querySelector('#key');
                    var textval = x.querySelector('#value');
                    gg.innerHTML = tittle;
                    textval.innerHTML = datee;
                  
                    break;

                case "pass":
                    var editcard = this.parentNode.parentNode;
                    var x = editcard.querySelector('.person-info');
                    var pass, tittle;
                    pass = itemss[index].login.password;
                    tittle = "Password";

                    var gg = x.querySelector('#key');
                    var textval = x.querySelector('#value');
                    gg.innerHTML = tittle;
                    textval.innerHTML = pass;
                 
                    break;



            }


        });

    }

}