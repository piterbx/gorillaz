let emailInput;
let passwordInput;
let logInBtn;
let loginAlertInfo;
let passAlertInfo;

const login = () => {
    prepareLoginDOMElements();
    prepareLoginDOMEvents();
};

const prepareLoginDOMElements = () => {
    emailInput = document.querySelector('#email');
    passwordInput = document.querySelector('#password');
    $logInBtn = document.querySelector('#loginBtn');
    loginAlertInfo = document.querySelector('.login-alert');
    passAlertInfo = document.querySelector('.pass-alert');
};
const prepareLoginDOMEvents = () => {
    emailInput.addEventListener('keyup', checkLogin);
    passwordInput.addEventListener('keyup', checkPass);
    $logInBtn.addEventListener('click', checkLoginForm);
};

const checkLogin = () => { //return if there is an error (false = ok)
    if (!emailInput.value.match($emailRegexp)) {
        loginAlertInfo.innerHTML = "<span>Please enter a valid email address.</span>";
        return true;
    } else {
        loginAlertInfo.innerText = '';
        return false;
    }
};

const checkPass = () => {
    if (passwordInput.value === '') {
        passAlertInfo.innerText = 'Type your password!';
        return true;
    } else {
        passAlertInfo.innerText = '';
        return false;
    };
};

const checkLoginForm = () => {
    console.log(checkLogin(), checkPass());
    if (checkLogin() === false && checkPass() === false) {
        let user = findUser();
        console.log(user);
        if (user !== null) {
            sessionStorage.setItem('loggedIn', 'true');
            sessionStorage.setItem('loggedUser', user.email);
        }
    } else {
        loginAlertInfo.innerText = '';
        passAlertInfo.innerHTML = '<span style="color:var(--fontLightColor);background-color:var(--red)">Wrong login or password.</span>';
    };
};

const findUser = () => {
    let foundUser = JSON.parse(localStorage.getItem(emailInput.value));
    console.log("Password for this user", foundUser);
    if (foundUser === null) {
        loginAlertInfo.innerHTML = '<span style="color:var(--fontLightColor);background-color:var(--red)">User not found.</span>';
        return null;
    } else {
        if (foundUser.password !== passwordInput.value) {
            passAlertInfo.innerHTML = '<span style="color:var(--fontLightColor);background-color:var(--red)">Wrong login or password.</span>';
            return null;
        }
    }
    return foundUser;
}


document.addEventListener('DOMContentLoaded', login);