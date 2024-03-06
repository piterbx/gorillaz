let $userName;
let $nameInfo;
let $email;
let $emailInfo;
let $pass;
let $pass2;
let $termsAgree;
let $termsInfo;
let $passInfoStatusbar;
let $passInfoText;
let $passConfirmInfoText;
let $confirmRegisterBtn;
let createdUser;
const $error = [];

const register = () => {
    prepareRegisterDOMElements();
    prepareRegisterDOMEvents();
};

const prepareRegisterDOMElements = () => {
    $userName = document.querySelector('#name');
    $nameInfo = document.querySelector('.name-info');
    $email = document.querySelector('#email');
    $emailInfo = document.querySelector('.email-info');
    $pass = document.querySelector('#password');
    $pass2 = document.querySelector('#passwordConfirm');
    $termsAgree = document.querySelector('.terms');
    $termsInfo = document.querySelector('.terms-info');
    $passInfoStatusbar = document.querySelector('.password-checker-bar-status');
    $passInfoText = document.querySelector('.password-checker-info');
    $passConfirmInfoText = document.querySelector('.password-confirm-info');
    $confirmRegisterBtn = document.querySelector('#signUpBtn');

    for (let i = 0; i < 5; i++) $error.push(true);
};

const prepareRegisterDOMEvents = () => {
    $userName.addEventListener('keyup', checkNameAndRewriteFirstLetter);
    $pass.addEventListener('keyup', checkPassInput);
    $pass2.addEventListener('keyup', checkPass2Input);
    $termsAgree.addEventListener('change', checkCheckbox);
    $email.addEventListener('keyup', checkMailInput);
    $confirmRegisterBtn.addEventListener('click', checkRegister);
};

const checkPassword = () => {
    if ($pass.value.length >= $minPasswordValue && $pass.value.match($letters) && $pass.value.match($numbers) && $pass.value.match($specialCharacters)) {
        $passInfoStatusbar.style.width = 100 + '%';
        $passInfoStatusbar.style.backgroundColor = 'var(--green)';
        $passInfoText.innerHTML = '<span style="background-color:var(--green);">Very strong password</span>';
        $error[2] = false;
    } else if ($pass.value.length >= $minPasswordValue && $pass.value.match($letters) && $pass.value.match($numbers)) {
        $passInfoStatusbar.style.width = 66 + '%';
        $passInfoStatusbar.style.backgroundColor = 'var(--gold)';
        $passInfoText.innerHTML = '<span style="background-color:var(--gold);">Good password<br>TIP:</span> Your password should contain special characters.';
        $error[2] = false;
    } else {
        $passInfoStatusbar.style.width = 33 + '%';
        $passInfoStatusbar.style.backgroundColor = 'var(--red)';
        $passInfoText.innerHTML = `<span>Weak password<br>TIP:</span> Your password should consist of min.${$minPasswordValue} characters.<br>Your password should contain numbers & special characters.`;
        $error[2] = true;
    };
};

const comparePasswords = () => {
    if ($pass.value === $pass2.value || $pass2.value === '') {
        $passConfirmInfoText.innerText = '';
        $error[3] = false;
    } else {
        $passConfirmInfoText.innerHTML = '<span>Passwords are different.</span>';
        $error[3] = true;
    };
};

const checkPassInput = () => {
    if ($pass.value !== '') {
        checkPassword();
        comparePasswords();
    } else {
        $passInfoStatusbar.removeAttribute('style');
        $passInfoText.innerText = '';
        $passConfirmInfoText.innerText = '';
        $pass2.value = '';
        $error[2] = true;
    };
};

const checkPass2Input = () => {
    if ($pass.value === '') {
        $passInfoText.innerHTML = '<span>Type your password first!</span>';
        $passConfirmInfoText.innerHTML = '';
        $error[3] = true;
    } else if ($pass.value !== '' && $pass2.value !== '') {
        comparePasswords();
    } else {
        $passConfirmInfoText.innerHTML = '';
        $error[3] = true;
    };
};

const checkCheckbox = () => {
    $termsAgree.toggleAttribute("checked");
    if ($termsAgree.hasAttribute("checked") == false) {
        $termsInfo.innerHTML = '<span>*Required</span>';
        $error[4] = true;
    } else {
        $termsInfo.innerText = '';
        $error[4] = false;
    };
};

const checkMailInput = () => {
    if ($email.value !== '') {
        checkEmail();
    } else {
        $emailInfo.innerHTML = '<span>*Required</span>';
        $error[1] = true;
    };
};

const checkEmail = () => {
    if ($email.value.match($emailRegexp)) {
        $emailInfo.innerText = "";
        $error[1] = false;
    } else {
        $emailInfo.innerHTML = "<span>Please enter a valid email address.</span>";
        $error[1] = true;
    };
};

const checkNameAndRewriteFirstLetter = () => {
    if ($userName.value.match($letters) && !($userName.value.match($specialCharacters)) && !($userName.value.match($numbers))) {
        let modifiedName;
        if ($userName.value.includes(' ')) {//when user has 2 names or type first and last name
            modifiedName = $userName.value.substring(0, 1).toUpperCase() + $userName.value.substring(1, $userName.value.indexOf(' ') + 1) + $userName.value.charAt($userName.value.indexOf(' ') + 1).toUpperCase() + $userName.value.substring($userName.value.indexOf(' ') + 2);
        } else {
            modifiedName = $userName.value.substring(0, 1).toUpperCase() + $userName.value.substring(1);
        };
        $nameInfo.innerText = `YOUR NAME: ${modifiedName}`;
        $error[0] = false;
    } else {
        $nameInfo.innerHTML = '<span>*Required</span>';
        $error[0] = true;
    }
};

const checkIfFormOK = () => {
    for (let i = 0; i < $error.length; i++) {
        if ($error[i]) {
            return false;
        }
    }
    return true;
}

const checkRegister = () => {
    let everythingOK = false;
    checkNameAndRewriteFirstLetter();
    checkMailInput();
    checkPassInput();
    checkPass2Input();
    if ($termsAgree.hasAttribute("checked")) {
        $error[4] = false;
    } else {
        $termsInfo.innerHTML = '<span>*Required</span>';
        $error[4] = true;
    }
    checkMailInput();

    everythingOK = checkIfFormOK();

    if (everythingOK) {
        createdUser = new User($userName.value, $email.value, $pass.value);
        sessionStorage.setItem($email.value, createdUser.save());

        clearRegisterForm();
    }

    console.log(`If everything ok: ${everythingOK}`);
    console.log(`Error: ${$error}`);
};

const clearRegisterForm = () => {
    everythingOK = false;

    $userName.value = '';
    $nameInfo.innerText = '';

    $email.value = '';
    $emailInfo.innerText = '';

    $pass.value = '';

    $passInfoStatusbar.removeAttribute('style');
    $passInfoText.innerText = '';
    $passConfirmInfoText.innerText = '';

    $pass2.value = '';
}

document.addEventListener('DOMContentLoaded', register);