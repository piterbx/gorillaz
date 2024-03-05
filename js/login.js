let $emailInput;
let $passwordInput;
let logInBtn;
let $loginAlertInfo;
let $passAlertInfo;

const login = () => {
    prepareLoginDOMElements();
    prepareLoginDOMEvents();
};

const prepareLoginDOMElements = () => {
    $emailInput = document.querySelector('#email');
    $passwordInput = document.querySelector('#password');
    $logInBtn = document.querySelector('#loginBtn');
    $loginAlertInfo = document.querySelector('.login-alert');
    $passAlertInfo = document.querySelector('.pass-alert');
};
const prepareLoginDOMEvents = () => {
    $emailInput.addEventListener('keyup', checkLogin);
    $passwordInput.addEventListener('keyup', checkPass);
    $logInBtn.addEventListener('click', checkLoginForm);
};

const checkLogin = () => {
    if(!$emailInput.value.match($emailRegexp)){
        $loginAlertInfo.innerHTML = "<span>Please enter a valid email address.</span>";
        return false;
    } else {
        $loginAlertInfo.innerText = '';
        return true;
    }
};

const checkPass = () => {
    if($passwordInput.value===''){
        $passAlertInfo.innerText = 'Type your pass!';
        return true;
    } else if($passwordInput.value!=='' && $passwordInput.value.length>=$minPasswordValue && $passwordInput.value.match($letters) && $passwordInput.value.match($numbers) && $passwordInput.value.match($specialCharacters)){
        $passAlertInfo.innerText = '';
        return false;
    } else {
        $passAlertInfo.innerText = 'Wrong pass format';
        return true;
    };
};

const checkLoginForm = () => {
    if(checkLogin()===false && checkPass()===false){
        console.log('OMG! You\'re logged.');
        $logged = true;
        displayProfileInfo();
        $loginAlertInfo.innerText = '';
        $passAlertInfo.innerText = '';
    } else {
        $loginAlertInfo.innerHTML = '<span style="color:var(--fontLightColor);background-color:var(--red)">Please enter a valid email address.</span>';
        $passAlertInfo.innerHTML = '<span style="color:var(--fontLightColor);background-color:var(--red)">! Wrong login or pass );</span>';
    };
};

const displayProfileInfo = () => {
    alert(`Login: ${$loginInput.value}, Pass: ${$passwordInput.value}`)
};

document.addEventListener('DOMContentLoaded', login);