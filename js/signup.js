var nameInput = document.getElementById("name");
var emailInput = document.getElementById("email");
var passwordInput = document.getElementById("password");
var signupBtn = document.querySelector("button");
var errorMessage = document.getElementById('errorMessage');
var successMessage = document.getElementById('successMessage')
var showPassword = document.getElementById('showPassword')
var hidePassword = document.getElementById('hidePassword')

var users =[];

if(localStorage.getItem('users') !== null){
    users = JSON.parse(localStorage.getItem('users'));
}


signupBtn.addEventListener("click", function () {
    successMessage.innerHTML = '';
  var user = {
    name: nameInput.value,
    email: emailInput.value,
    password: passwordInput.value,
  };
  
  if(isInputEmpty()) return;

  if (isValidName(user) && isValidEmail(user) && isValidPassword(user)) {
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
    successMessage.innerHTML = 'success';
  }
});

function isInputEmpty(){
    if(nameInput.value == "" || emailInput.value == "" || passwordInput.value == ""){
        errorMessage.innerHTML = 'All inputs are required';
        return true;
    }

    errorMessage.innerHTML = '';
    return false;    
}


function isValidEmail(newUser) {
    
    var regex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
    if(!regex.test(newUser.email)){
        errorMessage.innerHTML = 'email is not valid (can use character or numbers or underscore or dashes and at least 3 characters)';
        return false;
    }

    for (const user of users) {
    if (user.email.toLowerCase() === newUser.email.toLowerCase()) {
        errorMessage.innerHTML = 'Email already exists';
      return false;
    }

  }
  errorMessage.innerHTML = '';
  return true;
}

function isValidPassword(newUser){
    var regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
    if(!regex.test(newUser.password)){
        errorMessage.innerHTML = 'Password is not valid (minimum eight characters, at least one letter, one number and one special character)';
        return false;
    }
    errorMessage.innerHTML = '';
    return true;
}

function isValidName(newUser){
    var regex = /^[a-zA-Z0-9]{3,}$/
    if(!regex.test(newUser.name)){
        errorMessage.innerHTML = 'Name is not valid (minimum of three characters or numbers)';
        return false;
    }
    errorMessage.innerHTML = '';
    return true;
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