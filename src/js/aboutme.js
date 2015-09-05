$(document).ready(function(){
    $('#myPic').one('webkitAnimationEnd mozanimatoinend oanimationend msAnimationEnd animationend', function(e){
        $('.myNav').css('visibility', 'visible').hide().fadeIn('slow');
//               $('#aboutMeParagraph').css('visibility', 'visible').animate({top: '-100%'}, 800);
    });  
});
