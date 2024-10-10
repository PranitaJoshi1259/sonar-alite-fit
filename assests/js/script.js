
document.getElementById("currentYear").textContent = new Date().getFullYear();

document.querySelectorAll(".has-spinner").forEach((e=>{e.insertAdjacentHTML("afterend",'<span class="wpcf7-spinner"></span>')}))
document.querySelectorAll('a.nav-link').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        window.scrollTo({
            top: targetSection.offsetTop,
            behavior: 'smooth'
        });
    });
});
document.querySelectorAll('a.nav-link').forEach(anchor => {
    anchor.addEventListener('click', function () {
        document.querySelectorAll('a.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        this.classList.add('active');
    });
});
function setActiveLink() {
    const currentUrl = window.location.href;
    const navLinks = document.querySelectorAll('a.nav-link');

    navLinks.forEach(link => {
        if (currentUrl.includes(link.getAttribute('href'))) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}
const links = document.querySelectorAll('.nav-link');
// Function to add or remove the underline class based on scroll position
function updateUnderline() {
    const sections = document.querySelectorAll('section');
    const activeSectionIds = [];

    sections.forEach((section, index) => {
        const top = section.getBoundingClientRect().top;
        if (top < window.innerHeight / 2 && top > -section.clientHeight / 2) {
            activeSectionIds.push(section.id);
        }
    });

    links.forEach((link) => {
        if (activeSectionIds.includes(link.getAttribute('href').substring(1))) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}
// Add a scroll event listener to update the underline on scroll
window.addEventListener('scroll', updateUnderline);
setActiveLink();
$(document).ready(function(){
    $('#btnPopUpContactUs').click((e)=>{
        $('#paynowinfo').modal('hide');
        $('html, body').animate({
            scrollTop: $("#contact-us").offset().top
        }, 1000);    
        e.preventDefault()
    })
})

$(document).ready(function(){


    document.addEventListener('contextmenu', (e) => e.preventDefault());
    const ctrlShiftKey = (e, keyCode) => {
        return e.ctrlKey && e.shiftKey && e.key === keyCode;
    };
    
    document.addEventListener('keydown', (e) => {
        // Disable F12, Ctrl + Shift + I, Ctrl + Shift + J, Ctrl + U
        if (e.keyCode === 123 || ctrlShiftKey(e, 'i') || ctrlShiftKey(e, 'I')|| ctrlShiftKey(e, 'j')|| ctrlShiftKey(e, 'J') || ctrlShiftKey(e, 'c')|| ctrlShiftKey(e, 'C') || (e.ctrlKey && e.key === 'u')|| (e.ctrlKey && e.key === 'U'))
            e.preventDefault();
    }); 

    setTimeout(()=>{
        const script = document.createElement("script");
        script.src = 'https://www.google.com/recaptcha/api.js';
        script.type = 'text/javascript';
        script.addEventListener('load', () => {
          console.log(`jQuery ${$.fn.jquery} has been loaded successfully!`);
          // use jQuery below
        });
        document.head.appendChild(script);
    }, 4000)
    

    $(".copyButton").click(function() {
        const copyText = $(this).closest(".copyInput")?.text();
        
        const planCard = $(this).closest(".plan-card-ui");
        const copiedMessage = planCard.find(".copiedMessage");
        copiedMessage.css("opacity", "1");
        setTimeout(function() {
            copiedMessage.css("opacity", "0");
        }, 1000);
        copyToClipboard(copyText)
    });
    
    $(".copyButton-top").click(function() {
        const copyText = $(this).closest(".copyInput")?.text();
        
        $(".copiedMessage1").css("opacity", "1");    
        setTimeout(function() {
            $(".copiedMessage1").css("opacity", "0");

        }, 1000);
        copyToClipboard(copyText)
    });
    const copyToClipboard = async (plainText) => {
        const mimeTypePlain = "text/plain";
        const plainTextBlob = new Blob(
            [plainText],
            {
            type: mimeTypePlain,
            }
        );
        const copiedData = [
            new ClipboardItem({
            [mimeTypePlain]: plainTextBlob,
            }),
        ];
    
        navigator.clipboard.write(copiedData);
    };  

    let today = new Date();
    let date = today.getDate();
    let month = today.getMonth() + 1; 
    let year = today.getFullYear();
    if (date < 10) {
        date = '0' + date
    }
    if (month < 10) {
        month = '0' + month
    }
    today = year + '-' + month + '-' + date;
    $("#dob").attr("max", today);
    $(".toggle-btn").click(function(event) {
        event.preventDefault();
        $(".sidebar-bg").addClass("open-sidebar");
        $("#sidebar-backdrop").addClass("show-sidebar-backdrop");
    });
    $(".closebtn, .header-nav-link a").click(function(event) {
        // event.preventDefault();
        $(".sidebar-bg").removeClass("open-sidebar");
        $("#sidebar-backdrop").removeClass("show-sidebar-backdrop");
    });
    // const trainingProgramsSection = $('.training-programs');
    const navbar = $('.navbar');
    const stickyNavbarClass = 'sticky-navbar';

    function toggleStickyNavbar() {
        const scrollPosition = $(window).scrollTop();
        if (scrollPosition >= 30) {
            navbar.addClass(stickyNavbarClass);
        } else {
            navbar.removeClass(stickyNavbarClass);
        }
        // if (window.scrollY > 20) {
        //     document.getElementById("scroll-styles").removeAttribute("disabled");
        // }
    }
    toggleStickyNavbar();
    $(window).scroll(toggleStickyNavbar);
    // client carousal Start
    $('.our-client-carousel').owlCarousel({
        loop:true,
        margin:30,
        dots:false,
        nav:false,
        responsiveClass:true,
        autoplay:true,
        slideTransition: 'linear',
        autoplayTimeout: 6000,
        autoplaySpeed: 6000,
        autoplayHoverPause:true,
        responsive:{
            0:{
                items:2
            },
            600:{
                items:3
            },
            991:{
                items:5
            },
            1366:{
                items:7
            }
        }
    });
    $('.our-client-carousel').find('.owl-nav').addClass('d-none');
    // client carousal End
    // ourteam carousal start
    $('.our-team-carousel').owlCarousel({
        loop:true,
        margin:10,
        dots:false,
        responsiveClass:true,
        autoplay:true,
        // autoplayTimeout:1500,
        slideTransition: 'linear',
        autoplayTimeout: 6000,
        autoplaySpeed: 6000,
        autoplayHoverPause:true,
        responsive:{
            0:{
                items:1,
                nav:true
            },
            600:{
                items:2,
                nav:true
            },
            1200:{
                items:3,
                nav:true,
            }
        }
    });
    $('.our-team-carousel').find('.owl-nav').removeClass('disabled').addClass('d-block');
    $( ".our-team-carousel .owl-prev").html('<span><img src="./assests/images/carousel-pre-arrow.svg" width="20" height="30" alt=""></span>');
    $( ".our-team-carousel .owl-next").html('<span><img src="./assests/images/carousel-next-arrow.svg" width="20" height="30" alt=""></span> ');
    // ourteam carousal end
    // Gallery carousak Start
    $('.gallary-carousel').owlCarousel({
        loop:true,
        margin:0,
        dots:false,
        nav:false,
        responsiveClass:true,
        autoplay:true,
        slideTransition: 'linear',
        autoplayTimeout: 6000,
        autoplaySpeed: 6000,
        // autoplayTimeout:1500,
        autoplayHoverPause:true,
        responsive:{
            0:{
                items:1
            },
            600:{
                items:2
            },
            1024:{
                items:3
            }
        }
    });
    $('.gallary-carousel').find('.owl-nav').addClass('d-none');
// Gallery carousak End
// Testimonial carousel start
    $('.testimonials-carousel').owlCarousel({   
        loop:true,
        margin:10,
        dots:false,
        responsiveClass:true,
        autoplay:true,
        slideTransition: 'linear',
        autoplayTimeout: 7000,
        autoplaySpeed: 7000,
        // autoplayTimeout:1500,
        autoplayHoverPause:true,
        responsive:{
            0:{
                items:1
            },
            576:{
                items:2
            },
            920:{
                items:3
            },
            1200:{
                items:4
            }
        }
    }); 
        $('.testimonials-carousel').find('.owl-nav').addClass('d-none');
        // Testimonial video 
        $(".testimonialsPlayButton").on("click", (e) => {
            const videoUrl = $(e.currentTarget).attr('data-video-url');
            $(".video-tag").attr("src", videoUrl);
            /* $('.video-tag').attr('autoplay', true); */
        });
        
        const checkboxTshirt = $('#checkbox-tshirt');
        const tShirtSection = $('.tshirt-section');      
        checkboxTshirt.change( ()=> {
            tShirtSection.toggle(checkboxTshirt.checked);
        });
        // $(".testimonial-close-btn").on('click', function(){
        //     $('.video-pause').trigger('pause');
        // });
  });

  