

// Libs = {};

// Libs.loginSingleton = (function () {

//     var _loginInstance = null;

//     function LoginConstractor() {


//     };

//     // LoginConstractor.prototype.onSubmit = () => {

//     //     var userName = document.getElementById('userName').value;
//     //     var userPassword = document.getElementById('userPassword').value;


//     //     checkIfUserExist(userName, userPassword);

//     //     alert('now should send to server')
//     // };

//     return {
//         getInstance: function () {
//             if (!_loginInstance) {
//                 _loginInstance = LoginConstractor;
//                 return _loginInstance;
//             }
//             else {

//                 return _loginInstance;
//             }
//         }
//     };
// }());

//var LoginHandler = Libs.loginSingleton.getInstance();
//LoginHandler.prototype.onSubmit();
function onSubmit() {
    var userName = document.querySelector('.page.active  input[name="userName"]').value;
    var userPassword = document.querySelector('.page.active  input[name="userPassword"]').value;


    checkIfUserExist(userName, userPassword);

};