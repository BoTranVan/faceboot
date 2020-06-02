jQuery(document).ready(function($) {
    if (window.innerWidth > 766) {
        $('body').prepend('<canvas id="canvas"><script src="./javascripts/particlesjs.js"></script></canvas>');
        $("form.navbar-form input").css("width", window.innerWidth / 3 + "px");
        $("form.navbar-form input").on({
            focus: function() {
                $(this).animate({
                    "width": window.innerWidth / 2 + "px"
                }, 2000);
            },
            blur: function() {
                $(this).animate({
                    "width": window.innerWidth / 3 + "px"
                }, 2000);
            }
        });
    }
});

// var title = document.title;
// var lengTitle = title.length;
// var subTitle = "";
// var i =  1;

// function updateTitle(){
//     if(subTitle.length < lengTitle) {
//         subTitle = title.substr(0, i);
//         document.title = subTitle;
//         i++;
//     } else {
//     	subTitle = "";
//         i = 1;
//         document.title = title;
//     }
// }

// setInterval(updateTitle, 1000);