let $loginInput;
let $passwordInput;
let logInBtn;
let $loginAlertInfo;
let $passAlertInfo;

const login = () => {
    prepareLoginDOMElements();
    prepareLoginDOMEvents();
};

const prepareLoginDOMElements = () => {
    $loginInput = document.querySelector('#login');
    $passwordInput = document.querySelector('#password');
    $logInBtn = document.querySelector('#loginBtn');
    $loginAlertInfo = document.querySelector('.login-alert');
    $passAlertInfo = document.querySelector('.pass-alert');
};
const prepareLoginDOMEvents = () => {
    $loginInput.addEventListener('keyup', checkLogin);
    $passwordInput.addEventListener('keyup', checkPass);
    $logInBtn.addEventListener('click', checkLoginForm);
};

const checkLogin = () => {
    if($loginInput.value!==''){
        if($loginInput.value.length<$minLoginValue){
            $loginAlertInfo.innerText = 'Your login is too short :/';
            return true;
        } else if($loginInput.value.length>=$minLoginValue && $loginInput.value.match($letters) && $loginInput.value.match($numbers)){
            $loginAlertInfo.innerText = '';
            return false;
        } else {
            $loginAlertInfo.innerText = 'Wrong login format';
            return true;
        };
    } else {
        $loginAlertInfo.innerText = 'Type your login!';
        return true;
    };
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
        $loginAlertInfo.innerHTML = '<span style="color:var(--red)">!</span>';
        $passAlertInfo.innerHTML = '<span style="color:var(--red)">! Wrong login or pass );</span>';
    };
};

const displayProfileInfo = () => {
    alert(`Login: ${$loginInput.value}, Pass: ${$passwordInput.value}`)
};

document.addEventListener('DOMContentLoaded', login);