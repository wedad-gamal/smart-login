var emailInput = document.getElementById("emailInput");
var passwordInput = document.getElementById("passwordInput");
var loginBtn = document.querySelector("button");
var errorMessage = document.getElementById("errorMessage");
var showPassword = document.getElementById('showPassword')
var hidePassword = document.getElementById('hidePassword')

var users = [];
var currentUser = {};

if (localStorage.getItem("users") !== null) {
  users = JSON.parse(localStorage.getItem("users"));
}

loginBtn.addEventListener("click", function () {
  var checkUser = {
    email: emailInput.value,
    password: passwordInput.value,
  };
  if(isInputEmpty()) return ;

  if (isUserExists(checkUser)) {
    window.location = "./home.html";
  }
});

function isInputEmpty(){
    if(emailInput.value == "" || passwordInput.value == ""){
        errorMessage.innerHTML = 'All inputs are required';
        return true;
    }

    errorMessage.innerHTML = '';
    return false;    
}

function isUserExists(checkUser) {
  errorMessage.innerHTML = "";
  console.log(users);
  for (const user of users) {
    if (
      user.email.toLowerCase() === checkUser.email.toLowerCase() &&
      user.password === checkUser.password
    ) {
      localStorage.setItem("currentUser", JSON.stringify(user));
      currentUser = user;
      return true;
    }
  }
  errorMessage.innerHTML = "email or password is invalid";
  return false;
}

showPassword.addEventListener('click', function(){  
    passwordInput.type = 'text';
    hidePassword.classList.remove('d-none');
    showPassword.classList.add('d-none');
})

hidePassword.addEventListener('click', function(){  
    passwordInput.type = 'password';
    hidePassword.classList.add('d-none');
    showPassword.classList.remove('d-none');
})

