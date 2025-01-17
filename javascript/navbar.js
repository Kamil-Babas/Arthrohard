
const toggleButton = document.getElementById("toggleButton");
const hamburgerNav = document.getElementById("hamburger_nav");

// Select all the nav links
const navLinks = document.querySelectorAll('.hamburger_nav_item .nav_link');

toggleButton.addEventListener("click", function() {
   hamburgerNav.classList.toggle('active');
});


// klikniecie w hamrburger nav link ---> zamyka nawigacje
navLinks.forEach(link => {
    link.addEventListener('click', function(event) {
        // Remove the 'active' class from the hamburger navigation
        hamburgerNav.classList.remove("active");
    });
});
