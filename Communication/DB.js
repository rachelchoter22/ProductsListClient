class DB {
    constructor(){
    }

    
    GetFromLocalStorage(getRequest) {
        var response = new FResponse(404, {});
        if (getRequest.itemsArray) {
            var userArray = JSON.parse(localStorage.getItem(getRequest.RequestData.urlArray[0]));
            userArray.forEach((user) => {
                // compere(user,getRequest.itemsArray.length,  )
                if (user[getRequest.itemsArray[0].key] == getRequest.itemsArray[0].value
                    && user[getRequest.itemsArray[1].key] == getRequest.itemsArray[1].value) {
                    response.body = user;
                    response.status = 200;
                    response.statusText = statusesEnum[200];
                }
            });
        }
        else {
            response.body = JSON.parse(localStorage.getItem(getRequest.RequestData.urlArray[0]));
            response.status = 200;
            response.statusText = statusesEnum[200];
        }
        if (!response.status) {
            response.status = 404;
            response.statusText = statusesEnum[404];
        }
        return response;
    }
    SetToLocalStorage(postRequest) {

        var mainKey = postRequest.RequestData.urlArray[0];
        var response = new FResponse(404, {});
        if (localStorage.getItem(mainKey)) {
            var usersArray = JSON.parse(localStorage.getItem(mainKey));
            usersArray.push(postRequest.dataToSave)
            localStorage.setItem(mainKey, JSON.stringify(usersArray));
            response.status = 200;
            response.statusText = statusesEnum[200];
        }
        else {
            localStorage.setItem(mainKey, JSON.stringify([postRequest.dataToSave]));
            response.status = 200;
            response.statusText = statusesEnum[200];
        }

        return response;
    }
}

function FResponse(status, body) {
    this.status = status;
    this.statusText = statusesEnum[status];
    this.body = body;
}
let statusesEnum = {
    200: 'OK',
    204: 'No content',
    404: 'Not found'
}