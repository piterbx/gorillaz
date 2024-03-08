let accountDataDiv;
let logBtn;
let submitChangesBtn;
let userData;
let emailInput;
let nameInput;
let checkBoxes;
let popup;
let popupBtn;
let popupContent;

let currentPassInput;
let newPassInput;
let newPass2Input;
let submitPassChange;
let passInfoAlert;

let deleteAccount;

const accountManagement = () => {
    if ($logged !== 'true') window.location = '/login.html';
    prepareAccountDOMElements();
    prepareAccountDOMEvents();
    loadUserData();
}

const prepareAccountDOMElements = () => {
    accountDataDiv = document.querySelector('#account-data');
    profileImgDiv = document.querySelector('.account-img-box');
    favouritesBox = document.querySelector('.albums');
    submitChangesBtn = document.querySelector('#submitChanges');
    emailInput = accountDataDiv.querySelector('#email');
    nameInput = accountDataDiv.querySelector('#userName');
    popup = document.querySelector('.popup');
    popupBtn = popup.querySelector('.popup-btn');
    popupContent = popup.querySelector('.popup-content');

    const menuBtns = document.querySelectorAll('.navbar ul li');
    logBtn = menuBtns[menuBtns.length - 1];
    logBtn.innerHTML = `<button id="logoutBtn">Log out</button>`;

    currentPassInput = document.querySelector('#currentPassword');
    newPassInput = document.querySelector('#newPassword');
    newPass2Input = document.querySelector('#repeatNewPassword');
    submitPassChange = document.querySelector('#submitPassChange');
    passInfoAlert = document.querySelector('.alert');

    deleteAccount = document.querySelector('.delete-account');
}

const prepareAccountDOMEvents = () => {
    logBtn.addEventListener('click', logout);
    submitChangesBtn.addEventListener('click', submitChanges);
    submitChangesBtn.addEventListener('mouseout', e => restoreStylesForBtn(e, 'Submit changes'));
    submitPassChange.addEventListener('mouseout', e => restoreStylesForBtn(e, 'Change'));
    popupBtn.addEventListener('click', closePopup);

    submitPassChange.addEventListener('click', submitPasswordChange);
    newPassInput.addEventListener('keyup', checkPasswordAndCompare);
    newPass2Input.addEventListener('keyup', checkPasswordAndCompare);

    deleteAccount.addEventListener('click', deleteUser);
    deleteAccount.addEventListener('mouseout', e => restoreStylesForBtn(e, 'Delete'));
}

const logout = () => {
    sessionStorage.setItem('loggedIn', 'false');
    sessionStorage.removeItem('loggedUser');
    console.log('logged out');
    window.location = '/';
}

const loadUserData = () => {
    if ($loggedUser !== null) {
        userData = JSON.parse(localStorage.getItem($loggedUser));

        changeProfileImg(userData.img * 1);

        emailInput.value = userData.email;
        nameInput.value = userData.name;

        const tab = userData.favourites;

        favouritesBox.innerHTML = `
        <label><input type="checkbox" name="album" value="Gorillaz" ${(tab.includes('Gorillaz') ? 'checked' : '')}>Gorillaz</label>
        <label><input type="checkbox" name="album" value="DemonDays" ${(tab.includes('DemonDays') ? 'checked' : '')}>Demon Days</label>
        <label><input type="checkbox" name="album" value="PlasticBeach"  ${(tab.includes('PlasticBeach') ? 'checked' : '')}>Plastic Beach</label>
        <label><input type="checkbox" name="album" value="TheFall"  ${(tab.includes('TheFall') ? 'checked' : '')}>The Fall</label>
        <label><input type="checkbox" name="album" value="Humanz"  ${(tab.includes('Humanz') ? 'checked' : '')}>Humanz</label>
        <label><input type="checkbox" name="album" value="TheNowNow"  ${(tab.includes('TheNowNow') ? 'checked' : '')}>The Now Now</label>
        <label><input type="checkbox" name="album" value="SongMachineSeasonOneStrangeTimez"  ${(tab.includes('SongMachineSeasonOneStrangeTimez') ? 'checked' : '')}>Song Machine, Season One: Strange Timez</label>
        <label><input type="checkbox" name="album" value="CrackerIsland"  ${(tab.includes('CrackerIsland') ? 'checked' : '')}>Cracker Island</label>`;
        checkBoxes = favouritesBox.querySelectorAll('input');
        checkBoxes.forEach(checkBoxEl => {
            checkBoxEl.addEventListener('change', () => checkBoxEl.toggleAttribute('checked'));
        });
    }
}

const checkName = () => {
    if (userName.value.match($letters) && !(userName.value.match($specialCharacters)) && !(userName.value.match($numbers))) {
        let modifiedName;
        if (userName.value.includes(' ')) {//when user has 2 names or type first and last name
            modifiedName = userName.value.substring(0, 1).toUpperCase() + userName.value.substring(1, userName.value.indexOf(' ') + 1) + userName.value.charAt(userName.value.indexOf(' ') + 1).toUpperCase() + userName.value.substring(userName.value.indexOf(' ') + 2);
        } else {
            modifiedName = userName.value.substring(0, 1).toUpperCase() + userName.value.substring(1);
        };
        nameInfo.innerText = `YOUR NAME: ${modifiedName}`;
        error[0] = false;
    } else {
        nameInfo.innerHTML = '<span>*Required</span>';
        error[0] = true;
    }
}

const submitChanges = e => {
    if (dbClicked(e, 'Are you sure?', 'Data changed')) {

        if (userData) {
            const profileImg = document.querySelector('#profile-img');
            userData.img = profileImg.value;

            let modifiedName;
            if (nameInput.value.includes(' ')) {
                modifiedName = userName.value.substring(0, 1).toUpperCase() + userName.value.substring(1, userName.value.indexOf(' ') + 1) + userName.value.charAt(userName.value.indexOf(' ') + 1).toUpperCase() + userName.value.substring(userName.value.indexOf(' ') + 2);
            } else {
                modifiedName = userName.value.substring(0, 1).toUpperCase() + userName.value.substring(1);
            };
            userData.name = modifiedName;

            userData.favourites = [];
            checkBoxes.forEach(el => {
                if (el.hasAttribute('checked')) {
                    userData.favourites.push(el.value);
                }
            })

            localStorage.setItem($loggedUser, JSON.stringify(userData));
            loadUserData(); //refresh
        } else {
            submitChangesBtn.value = 'Error, Try Again Later';
            submitChangesBtn.style = 'background-color:var(--red);border:5px solid var(--dark);';
        }

        console.log(userData);
    }
}

const dbClicked = (e, txt, popupTxt) => {
    let doubleClicked = e.target.classList.contains('btn-clicked');
    if (!doubleClicked) {
        e.target.classList.add('btn-clicked');
        e.target.value = txt;
        return false;
    }
    openPopup(popupTxt);
    return true;
}

const restoreStylesForBtn = (e, txt) => {
    e.target.classList.remove('btn-clicked');
    e.target.value = txt;
}

const openPopup = txt => {
    popup.classList.add('open');
    popupContent.innerText = txt;
}

const closePopup = () => {
    popup.classList.remove('open');
}

const changeProfileImg = currentEl => {
    if (currentEl > 3) currentEl = currentEl % 4;
    if (currentEl < 0) currentEl = 3;
    let prev = currentEl - 1;
    let next = currentEl + 1;

    profileImgDiv.innerHTML = `
        <input type="button" class="control-btn" value="<" onclick="changeProfileImg(${prev})">
        <div id="account-img">
            <label class="active">
                <input type="radio" name="profile-img" id="profile-img" checked value="${currentEl}">
                <img class="profile-img" src="./images/profile/${currentEl}.webp" alt="Profile img">
           </label>
        </div>
        <input type="button" class="control-btn" value=">" onclick="changeProfileImg(${next})">
    `;
}

const submitPasswordChange = e => {
    if (userData) {
        if (userData.password === currentPassInput.value && checkPasswordAndCompare()) {
            if (dbClicked(e, 'Are you sure?', 'Password changed')) {
                userData.password = newPassInput.value;
                localStorage.setItem($loggedUser, JSON.stringify(userData));
                clearInputs();
            }
        } else {
            passInfoAlert.style = 'display:block';
            passInfoAlert.innerHTML = '<span style="backgroung-color:var(--red);">Wrong current password</span>';
            currentPassInput.value = '';
            newPassInput.value = '';
            newPass2Input.value = '';
            currentPassInput.focus();
        }
    }
}

const checkPasswordAndCompare = () => { //if everything okey? ans:
    passInfoAlert.style = 'display:block';
    if (newPassInput.value.length >= $minPasswordValue && newPassInput.value.match($letters) && newPassInput.value.match($numbers) && newPassInput.value.match($specialCharacters)) {
        passInfoAlert.innerHTML = '<span style="background-color:var(--green)">Very strong password</span>';
        if (newPassInput.value === newPass2Input.value) return true;
        else passInfoAlert.innerHTML += '<span style="background-color:var(--red)">Passwords are not the same.</span>';
    } else if (newPassInput.value.length >= $minPasswordValue && newPassInput.value.match($letters) && newPassInput.value.match($numbers)) {
        passInfoAlert.innerHTML = '<span style="background-color:var(--gold)">Good password TIP: Your password should contain special characters.</span>';
        if (newPassInput.value === newPass2Input.value) return true;
        else passInfoAlert.innerHTML += '<span style="background-color:var(--red)">Passwords are not the same.</span>';
    } else {
        passInfoAlert.innerHTML = `<span style="background-color:var(--red)">Weak password TIP: Your password should consist of min.${$minPasswordValue} characters.Your password should contain numbers & special characters.</span>`;
    };
    return false;
};

const clearInputs = () => {
    passInfoAlert.innerText = '';
    currentPassInput.value = '';
    newPassInput.value = '';
    newPass2Input.value = '';
}

const deleteUser = e => {
    if (dbClicked(e, 'Are you sure?', 'Account deleted')) {
        localStorage.removeItem($loggedUser);
        logout();
    }
}

document.addEventListener('DOMContentLoaded', accountManagement);