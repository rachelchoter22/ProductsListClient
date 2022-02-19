function SignUP() {

    var userName = document.querySelector('input[name="userName"').value;
    var userPassword = document.querySelector('input[name="userPassword"').value;
    var userEmail = document.querySelector('input[name="userEmail"').value;

    var user = UserSinglton.getUser(
        {
            userName: userName, userPassword: userPassword, userEmail: userEmail
        });
    var fxhr = new FXMLHttpRequest();
    fxhr.onreadystatechange = function () {
        console.log(fxhr.readyState)
    };
    console.log('UNSENT: ', fxhr.status);

    fxhr.open('POST', '/UserList', user);
    fxhr.send();
    
}


function a() {
    console.log('dsada');
}