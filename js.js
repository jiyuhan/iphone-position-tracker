"use strict";

$(document).ready(function () {

    $('#landing').on('click', function () {

        $('html,body').animate({ scrollTop: $("#about").offset().top}, 'slow');

    });
    
    $('#about').on('click', function () {

        $('html,body').animate({ scrollTop: $("#project").offset().top}, 'slow');

    });
    
    $('#project').on('click', function () {

        $('html,body').animate({ scrollTop: $("#footer").offset().top}, 'slow');

    });

});