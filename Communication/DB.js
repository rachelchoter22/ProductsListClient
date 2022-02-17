// Libs.DB = function () {

//     function DB() { } //constructor

//     DB.prototype.SetData(keyName, dataObject) = function () {
//         localStorage.setItem(keyName, dataObject);
//     }

//     DB.prototype.GetData(keyName) = function () {
//         localStorage.getItem(keyName);
//     }


//     return DB();
// }

function GetFromLocalStorage(getRequest) {
    return localStorage.getItem(dataKey);

}
function SetToLocalStorage(postRequest) {

    var mainKey = postRequest.RequestData.urlArray[0];

    if (localStorage.getItem(mainKey)) {
        var usersArray = JSON.parse(localStorage.getItem(mainKey));
        usersArray.push(postRequest.dataToSave)
        localStorage.setItem(mainKey, JSON.stringify(usersArray));

    }
    else {
        localStorage.setItem(mainKey, JSON.stringify([postRequest.dataToSave]));
    }
}

// function reqObj(array, index, obj) {
//     debugger;
//     if (array[index]) {
//         debugger;
//         obj[array[index]] = obj;
//         //reqObj(array, index++, obj);
//     }
//     else return obj;
// }