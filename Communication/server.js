

function checkIfUserExist(userName, userPassword) {

    fakeXMLHttpRequest.prototype.open('GET', '/UserList?userName=' + userName + '&userPassword=' + userPassword);
}
// function getRequestDataByUrl(url) {
//     var splitByQuestionMark = url.split('?'),
//         splitByAmpersand = splitByQuestionMark[1].split('&'),
//         splitByProfit = [];

//     splitByAmpersand.forEach(element => {
//         var key = element.split('=')[0];
//         var value = element.split('=')[1];
//         var item = new Item(key, value);
//         splitByProfit.push(item);
//     });

//     return new RequestData(, splitByProfit);

// }


// function checkIfUserExist(userName, userPassword) {
//     var variablesUrl = `?userName=${userName}`;
//     return fakeHttpRequest('Get', '/userList', variablesUrl)
// }
// function fakeHttpRequest(mehodType, url, variablesUrl) {
//     return serverMethod(mehodType, url, variablesUrl);
// }
// function serverMethod(mehodType, key, variablesUrl) {

//     var splittedArray = variablesUrl.split('=');
//     splittedArray[0] = splittedArray[0].replace('?', '');

//     var dataObject = { key: splittedArray[0], value: splittedArray[1] };

//     return MethodObject[mehodType].apply(this, [key.replace('/', ''), dataObject])
// };

