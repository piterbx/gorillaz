let emailInput;
let passwordInput;
let logInBtn;
let loginAlertInfo;
let passAlertInfo;

const login = () => {
    if ($logged === 'true') window.location = '/account.html';
    prepareLoginDOMElements();
    prepareLoginDOMEvents();
    loadUsersFromFile();
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
        loginAlertInfo.innerHTML = '<span style="color:var(--fontLightColor);background-color:var(--red)">Please enter a valid email address.</span>';
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
        if (user !== null) {
            sessionStorage.setItem('loggedIn', 'true');
            sessionStorage.setItem('loggedUser', user.email);
            window.location = '/account.html';
        }
    } else {
        loginAlertInfo.innerText = '';
        passAlertInfo.innerHTML = '<span style="color:var(--fontLightColor);background-color:var(--red)">Wrong login or password.</span>';
    };
};

const findUser = () => {
    let foundUser = JSON.parse(localStorage.getItem(emailInput.value));
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

const loadUsersFromFile = () => {
    fetch(`http://${window.location.host}/files/users.json`, {
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json()).then(resData => {
        resData.users.forEach(user => {
            localStorage.setItem(user.email, JSON.stringify(user));
        })
    }).catch(err => console.error(err));
}

document.addEventListener('DOMContentLoaded', login);