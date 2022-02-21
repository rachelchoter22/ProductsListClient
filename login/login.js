function onSubmit() {
    var userName = document.querySelector('.page.active  input[name="userName"]').value;
    var userPassword = document.querySelector('.page.active  input[name="userPassword"]').value;


    checkIfUserExist(userName, userPassword);

};