let accountDataDiv;
let logBtn;
let submitChangesBtn;
let userData;
let emailInput;
let nameInput;
let checkBoxes;

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

    const menuBtns = document.querySelectorAll('.navbar ul li');
    logBtn = menuBtns[menuBtns.length - 1];
    logBtn.innerHTML = `<button id="logoutBtn">Log out</button>`;
}

const prepareAccountDOMEvents = () => {
    logBtn.addEventListener('click', logout);
    submitChangesBtn.addEventListener('click', submitChanges);
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

        changeProfileImg(userData.img);

        emailInput.value = userData.email;
        nameInput.value = userData.name;

        console.log(userData.favourites);
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

const submitChanges = () => {
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

        submitChangesBtn.value = 'Submit changes';
        submitChangesBtn.style = 'background-color:var(--dark);border:none;';
    } else {
        submitChangesBtn.value = 'Error, Try Again Later';
        submitChangesBtn.style = 'background-color:var(--red);border:5px solid var(--dark);';
    }

    console.log(userData);
}

const changeProfileImg = currentEl => {
    profileImgDiv.innerHTML = `
        <input type="button" class="control-btn" value="<" onclick="changeProfileImg(${(currentEl - 1 < 0) ? currentEl + 4 - 1 : currentEl - 1})">
        <div id="account-img">
            <label class="active">
                <input type="radio" name="profile-img" id="profile-img" checked value="${currentEl}">
                <img class="profile-img" src="./images/profile/${currentEl}.webp" alt="Profile img">
           </label>
        </div>
        <input type="button" class="control-btn" value=">" onclick="changeProfileImg(${(currentEl + 1) % 4})">
    `;
}

document.addEventListener('DOMContentLoaded', accountManagement);