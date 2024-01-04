var title = document.querySelector('h1');
var logoutBtn = document.querySelector('button');

var users =[];
var currentUser ={}

if(localStorage.getItem('users') !== null){
    users = JSON.parse(localStorage.getItem('users'));
}

if(localStorage.getItem('currentUser') !== null){
    currentUser = JSON.parse(localStorage.getItem('currentUser'));
}else{
    window.location = './index.html';
}



title.innerHTML = `Hello ${currentUser.name}`;

logoutBtn.addEventListener('click', function(){
    localStorage.removeItem('currentUser');
    currentUser = {};
    window.location = '../index.html';
})