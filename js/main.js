let $logged = sessionStorage.getItem('loggedIn');
let $loggedUser = sessionStorage.getItem('loggedUser');
const $letters = /[a-z]/i;
const $numbers = /[0-9]/;
const $specialCharacters = /[!@#$%^&*()]/;
const $emailRegexp = /^[0-9a-z_.-]+@[0-9a-z.-]+\.[a-z]{2,3}$/i;
const $minPasswordValue = 10;
const $minLoginValue = 8;

if ($logged === 'true') {
    console.log('logged in as', $loggedUser);
} else {
    console.log('Please log in!');
};