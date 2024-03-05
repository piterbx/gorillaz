let $userName;
let $nameInfo;
let $mail;
let $emailInfo;
let $pass;
let $pass2;
let $termsAgree;
let $termsInfo;
let $passInfoStatusbar;
let $passInfoText;
let $passConfirmInfoText;
let $confirmRegisterBtn;

const register = () => {
    prepareRegisterDOMElements();
    prepareRegisterDOMEvents();
};

const prepareRegisterDOMElements = () => {
    $userName = document.querySelector('#name');
    $nameInfo = document.querySelector('.name-info');
    $mail = document.querySelector('#email');
    $emailInfo = document.querySelector('.email-info');
    $pass = document.querySelector('#password');
    $pass2 = document.querySelector('#passwordConfirm');
    $termsAgree = document.querySelector('.terms');
    $termsInfo = document.querySelector('.terms-info');
    $passInfoStatusbar = document.querySelector('.password-checker-bar-status');
    $passInfoText = document.querySelector('.password-checker-info');
    $passConfirmInfoText = document.querySelector('.password-confirm-info');
    $confirmRegisterBtn = document.querySelector('#signUpBtn');
};

const prepareRegisterDOMEvents = () => {
    $userName.addEventListener('keyup', checkNameAndRewriteFirstLetter);
    $pass.addEventListener('keyup', checkPassInput);
    $pass2.addEventListener('keyup', checkPass2Input);
    $termsAgree.addEventListener('change', checkCheckbox);
    $mail.addEventListener('keyup', checkMailInput);   
    $confirmRegisterBtn.addEventListener('click', checkRegister); 
};

const checkPassword = () => {
    if($pass.value.length >= $minPasswordValue && $pass.value.match($letters) && $pass.value.match($numbers) && $pass.value.match($specialCharacters)){
        $passInfoStatusbar.style.width = 100+'%';
        $passInfoStatusbar.style.backgroundColor = 'var(--green)';
        $passInfoText.innerHTML = '<span style="background-color:var(--green);">Very strong password</span>';
    } else if($pass.value.length >= $minPasswordValue && $pass.value.match($letters) && $pass.value.match($numbers)){
        $passInfoStatusbar.style.width = 66+'%';
        $passInfoStatusbar.style.backgroundColor = 'var(--gold)';
        $passInfoText.innerHTML = '<span style="background-color:var(--gold);">Good password<br>TIP:</span> Your pass should contain special characters.';
    } else {
        $passInfoStatusbar.style.width = 33+'%';
        $passInfoStatusbar.style.backgroundColor = 'var(--red)';
        $passInfoText.innerHTML = `<span>Weak password<br>TIP:</span> Your pass should consist of min.${$minPasswordValue} characters.<br>Your pass should contain numbers & special characters.`;
    };
};

const comparePasswords = () => {
    if($pass.value === $pass2.value || $pass2.value===''){
        $passConfirmInfoText.innerText = '';
    } else {
        $passConfirmInfoText.innerHTML = '<span>Passwords are different.</span>';
    };
};

const checkPassInput = () => {
    if($pass.value !== ''){
        checkPassword();
        comparePasswords();
    } else {
        $passInfoStatusbar.removeAttribute('style');
        $passInfoText.innerText = '';
        $passConfirmInfoText.innerText = '';
        $pass2.value = '';
    };
};

const checkPass2Input = () => {
    if($pass.value === ''){
        $passInfoText.innerHTML = '<span>Type your pass first!</span>';
        $passConfirmInfoText.innerHTML = '';
    } else if($pass.value !== '' && $pass2.value !== ''){
        comparePasswords();
    } else {
        $passConfirmInfoText.innerHTML = '';
    };
};

const checkCheckbox = () => {
    $termsAgree.toggleAttribute("checked");
    if($termsAgree.hasAttribute("checked")==false){
        $termsInfo.innerHTML = '<span>*Required</span>';
    } else {
        $termsInfo.innerText = '';
    };
};

const checkMailInput = () => {
    if($mail.value!==''){
        checkEmail();
    } else {
        $emailInfo.innerText = '';
    };
};

const checkEmail = () => {
    if($mail.value.match(/^[0-9a-z_.-]+@[0-9a-z.-]+\.[a-z]{2,3}$/i)){
        $emailInfo.innerText = "";
    } else {
        $emailInfo.innerHTML = "<span>Please enter a valid email address.</span>";
    };
};

const checkNameAndRewriteFirstLetter = () => {
    if($userName.value.match($letters) && !($userName.value.match($specialCharacters)) && !($userName.value.match($numbers))){
        let modifiedName;
        if($userName.value.includes(' ')){
            modifiedName = $userName.value.substring(0,1).toUpperCase()+$userName.value.substring(1,$userName.value.indexOf(' ')+1)+$userName.value.charAt($userName.value.indexOf(' ')+1).toUpperCase()+$userName.value.substring($userName.value.indexOf(' ')+2);
            console.log(modifiedName);
        } else {
            modifiedName = $userName.value.substring(0,1).toUpperCase()+$userName.value.substring(1);
            console.log(modifiedName);
        };
        $nameInfo.innerText = `YOUR NAME: ${modifiedName}`;
    } else {
        console.log('fvck u');
    }
};

const checkRegister = () => {
    TODO: 'check everything'
    if($error===false){
        $logged = true;
    }
    console.log(`Logged: ${$logged}`);
    console.log(`Error: ${$error}`);
};

document.addEventListener('DOMContentLoaded', register);