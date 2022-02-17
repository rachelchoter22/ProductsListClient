function SignUP() {

    var userName = document.querySelector('input[name="userName"').value;
    var userPassword = document.querySelector('input[name="userPassword"').value;
    var userEmail = document.querySelector('input[name="userEmail"').value;

    var user = UserSinglton.getUser(
        {
            userName: userName, userPassword: userPassword, userEmail: userEmail
        });
    fakeXMLHttpRequest.prototype.open('POST', '/UserList', user);

}