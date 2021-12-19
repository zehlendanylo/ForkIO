const burger = document.querySelector('#burger-toggle');
const mobmenu = document.querySelector('.mobile__nav');



burger.addEventListener('click', function(event) {
    event.preventDefault();
    mobmenu.classList.toggle('activeToggle')
    // mobmenu.style.display = 'block'
})