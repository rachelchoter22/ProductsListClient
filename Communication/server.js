
var x = new fakeHttpRequest()

x.open('Get',url);

class fakeHttpRequest {

    open(mehodType, url ) {

    }

}

function checkIfUserExist(userName, userPassword) {
    var variablesUrl = `?userName=${userName}`;
    return fakeHttpRequest('Get', '/userList', variablesUrl)
}
function fakeHttpRequest(mehodType, url, variablesUrl) {
    return serverMethod(mehodType, url, variablesUrl);
}
var serverMethod = (mehodType, key, variablesUrl) => {

    var splittedArray = variablesUrl.split('=');
    splittedArray[0] = splittedArray[0].replace('?', '');

    var dataObject = { key: splittedArray[0], value: splittedArray[1] };

    return MethodObject[mehodType].apply(this, [key.replace('/', ''), dataObject])
};

var MethodObject = {

    Get: Get
}
// function Get(dataKey, dataKey) {

// }
// function Post(contentToPost) { }
// function Delete() { }

// var u = new User();

// localStorage.setUser('userList')