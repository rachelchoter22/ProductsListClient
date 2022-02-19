UserSinglton = (function () {

    var _instance = null,
        id = 0;

    // function UserSingltonConstractor() {


    // };
    // function getUser()
    return {
        // getInstance: function () {
        //     if (!_instance) {
        //         _instance = UserSingltonConstractor;
        //         return _instance;
        //     }
        //     else {

        //         return _instance;
        //     }
        // },
        getUser: function (userName, userPassword, userEmail) {
            return new User(++id, userName, userPassword, userEmail);
        }
    };
}());

function User(id, userName, userPassword, userEmail) {
    this.id = id;
    this.userName = userName;
    this.userPassword = userPassword;
    this.userEmail = userEmail;
    // this.userPhone = userPhone;
}