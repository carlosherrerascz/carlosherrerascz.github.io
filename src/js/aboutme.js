$(document).ready(function() { 
    "use strict";
    $('#myPic').one("animationend", function(e) { 
        $('#aboutMeTitle').fadeIn('slow');
    });
});
