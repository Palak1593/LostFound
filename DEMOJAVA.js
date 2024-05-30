// DEMO JAVA
const list =document.querySelectorAll('.list');

function activeLink(){
   list.forEach((item) =>
   item.classList.remove('active'));
   this.classList.add('active');
}
list.forEach((item) =>
item.addEventListener('click',activeLink));

document.addEventListener('DOMContentLoaded', function() {
   // Get the URL parameters
   const urlParams = new URLSearchParams(window.location.search);
   const success = urlParams.get('success');

   // Find the "Lost" option on the navbar
   const lostOption = document.querySelector('a[href="http://127.0.0.1:5502/cartoonL.html"]');
   const foundOption = document.querySelector('a[href="http://127.0.0.1:5502/cartoonFOUND.html"]');
   const contactusOption = document.querySelector('a[href="http://127.0.0.1:5502/contactus.html"]');
   const profileOption = document.querySelector('a[href="http://127.0.0.1:5502/profile.html"]');
      

   // If the success parameter is true, enable clicking on the "Lost" option
//    if (success === 'true') {
//        lostOption.addEventListener('click', function(event) {
//            // Allow navigation to the "Lost" page
//        });
//        foundOption.addEventListener('click', function(event) {
//         // Allow navigation to the "Lost" page
//     });
//     contactusOption.addEventListener('click', function(event) {
//         // Allow navigation to the "Lost" page
//     });
//     profileOption.addEventListener('click', function(event) {
//         // Allow navigation to the "Lost" page
//     });

//    } else {
//        // If the success parameter is false or not present, prevent clicking on the "Lost" option
//        lostOption.addEventListener('click', function(event) {
//            event.preventDefault();
//            alert('Please sign in to access the Lost option.');
//        });
//        foundOption.addEventListener('click', function(event) {
//         event.preventDefault();
//         alert('Please sign in to access the found option.');
//     });
//     contactusOption.addEventListener('click', function(event) {
//         event.preventDefault();
//         alert('Please sign in to access the contact us option.');
//     });
//     profileOption.addEventListener('click', function(event) {
//         event.preventDefault();
//         alert('Please sign in to access the profile option.');
//     });

//    }
console.log('successs',success);
if (success === 'true') {
    // Allow navigation to the restricted pages
    console.log('User signed in, navigation allowed.');
} else {
    // Prevent navigation to the restricted pages and alert the user
    const restrictedOptions = [lostOption, foundOption, contactusOption, profileOption];
    
    restrictedOptions.forEach(option => {
        if (option) {
            option.addEventListener('click', function(event) {
                event.preventDefault();
                alert('Please sign in to access this option.');
            });
        }
    });
}
});

function redirectToProfile() {
    // Get the current URL
    let currentUrl = window.location.href;
    // Extract the email ID from the query parameters
    let userEmail = getUrlParameter('useremail');
    // Build the new URL with the profile.html and the useremail query parameter
    let newUrl = `http://127.0.0.1:5502/profile.html?useremail=${userEmail}`;
    // Redirect to the new URL
    window.location.href = newUrl;
}

// Function to extract query parameters from the URL
function getUrlParameter(name) {
    name = name.replace(/[\[\]]/g, '\\$&');
    let regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(window.location.href);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
