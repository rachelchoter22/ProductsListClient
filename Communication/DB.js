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
    var response = new Response(404, {});
    var userArray = JSON.parse(localStorage.getItem(getRequest.RequestData.urlArray[0]));
    userArray.forEach((user) => {
        // compere(user,getRequest.itemsArray.length,  )
        if (user[getRequest.itemsArray[0].key] == getRequest.itemsArray[0].value
            && user[getRequest.itemsArray[1].key] == getRequest.itemsArray[1].value) {
            response.data = user;
            response.status = statusesEnum[200];
        }
    });
    if (!response.status) {
        response.status = statusesEnum[404];
    }
    return response;
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

function Response(status, data) {
    this.status = statusesEnum[status];
    this.data = data;
}

let statusesEnum = {
    200: { 200: 'OK' },
    204: { 204: 'No content' },
    404: { 404: 'Not found' }
}