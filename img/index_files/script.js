const menu_btn = document.querySelector('.hamburgur');
const menu = document.querySelector('.menu');
const body = document.body; 

menu_btn.addEventListener('click', function () {
    menu_btn.classList.toggle('is-active');
    menu.classList.toggle('is-active');
    
    if (menu.classList.contains('is-active')) {
        body.classList.add('no-scroll'); 
    } else {
        body.classList.remove('no-scroll');
    }
});