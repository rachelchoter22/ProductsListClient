class server {


    startAction(methodType, request) {
        var response = new FResponse(404, {}),
            storageKey = request.urls[0],
            storgeValue = JSON.parse(DB.prototype.Get(storageKey));
        try {
            response = this[methodType].apply(this, [request, storgeValue]);
        }
        catch (err) {
            response = new FResponse(500, err);
        }
        return response;
    }

    GET(request, storageValue) {
        if (!storageValue) return new FResponse(404, {});
        var response = new FResponse(200, getObject(request, storageValue));
        return response;
    }
    POST(request, storageValue) {
        if (request.parameters || request.urls.length) {
            var objectToUpdate = getObject(request, storageValue);//מחזיר אוביקט אחרי סינון     
            var isExist = objectToUpdate.filter(item => JSON.stringify(item) == JSON.stringify(request.dataToSave));
            if (isExist.length) return new FResponse(403, request.dataToSave);
            objectToUpdate.push(request.dataToSave);//להוספה
            DB.prototype.Set(request.urls[0], JSON.stringify(storageValue));
            return new FResponse(200, storageValue);
        }
        else {
            DB.prototype.Set(request.urls[0], JSON.stringify(request.dataToSave));
            var response = new FResponse(200, request.dataToSave);
            return response;
        }


    }
    DELETE(request, storageValue) {
        if (!request.parameters && !request.urls.length) {
            DB.prototype.Remove(request.urls[0]);
            return new FResponse(200, storageValue);
        }
        else {
            var objectToDelete = getObject(request, storageValue);//מחזיר אוביקט אחרי סינון     

            Object.assign(objectToUpdate, request.dataToSave);//לעריכה
        }
    }//
    // בעת הוספת כמות ובעת החלפת רשימת מוצרים למשתמש
    PUT(request, storageValue) {//עריכה כולל גם ועדכון ועדכון מערך שלם


        var objectToUpdate = filterByUrls(request, storageValue);//מחזיר אוביקט אחרי סינון     
        var itemsToUpdate = filterByParameters(request.parameters, objectToUpdate);
        modify(itemsToUpdate, request.dataToSave);

        // var isExist = objectToUpdate.filter(item => JSON.stringify(item) == JSON.stringify(request.dataToSave));
        // if (isExist.length) return new FResponse(403, );


        var valueString = JSON.stringify(storageValue);
        DB.prototype.Set(request.urls[0], valueString);
        var response = new FResponse(200, storageValue);

        return response;
    }
}

function FResponse(status, body) {
    this.status = status;
    this.statusText = statusesEnum[status];
    this.body = body;
}
let statusesEnum = {
    200: "OK",
    403: 'Forbidden',
    404: "Not found",
    500: 'Internal Server Error'

};

function getObject(request, storageValue) {
    var pointerObject = storageValue;
    if (request.headers && request.headers['search-in-first'] == true) {
        filterByParameters(request.parameters, storageValue);
        pointerObject = filterByUrls(request, storageValue);
    }
    else {
        pointerObject = filterByUrls(request, storageValue);
        pointerObject = filterByParameters(request.parameters, pointerObject);

    }
    return pointerObject;
}

function filterByParameters(parameters, array) {
    if (parameters)
        parameters.forEach(parameter => {
            array = array.filter(item => item[parameter.key] == parameter.value);
        });
    return array;
}


function filterByUrls(request, storageValue) {
    resData = storageValue;

    request.urls.forEach(url => {
        if (storageValue && storageValue[0] && storageValue[0][url]) {
            resData = storageValue[0][url];
        }
        else if (storageValue && storageValue[url])
            resData = storageValue[url];
    });
    return resData;
}
function getResByRequest(request) {
    var key = request.urls[0],
        storageValue = JSON.parse(localStorage.getItem(key)),
        resData = storageValue;
    if (request.headers && request.headers['search-in-first'] == true) {
        if (request.parameters)
            request.parameters.forEach(parameter => {
                resData = resData.filter(item => item[parameter.key] == parameter.value);
            })
    }
    request.urls.forEach(url => {
        if (storageValue[url])
            resData = storageValue[url];
    });

    if (!(request.headers && request.headers['search-in-first'])) {
        if (request.parameters)
            request.parameters.forEach(parameter => {
                resData = resData.filter(item => item[parameter.key] == parameter.value);
            })
    }
    return resData;
}
// function setToStorageByUrls(urls, dataToSave) {
//     var key = urls[0],
//         storageValue = JSON.parse(localStorage.getItem(key)),
//         pointerForEdit = storageValue;

//     urls.forEach((url, index) => {
//         if (index)
//             pointerForEdit = storageValue[url];
//         if (index == urls.length - 1)
//             pointerForEdit.push(dataToSave);
//     });

//     return storageValue;
// }
// function deleteFromStorageByUrls(request, storageValue) {
//     var pointerForEdit = storageValue;

//     request.urls.forEach((url, index) => {
//         if (index)
//             pointerForEdit = storageValue[url];
//     });
//     var indexesToDelete = getIndexOfItems(request.parameters, pointerForEdit);
//     indexesToDelete.forEach(itemIndex => {
//         pointerForEdit.splice(itemIndex, itemIndex + 1);
//     });
// }
// function updateStorageByUrls(request, storageValue) {
//     var pointerForEdit = storageValue;

//     request.urls.forEach((url, index) => {
//         if (index)
//             pointerForEdit = storageValue[url];
//     });

//     var indexesToUpdate = getIndexOfItems(request.parameters, pointerForEdit);
//     indexesToUpdate.forEach(itemIndex => {
//         pointerForEdit[itemIndex] = request.dataToSave;
//     });
// }

// function getIndexOfItems(parameters, currentArray) {
//     var itemsToDelete = Object.assign([], currentArray),
//         indexes = [];
//     parameters.forEach(parameter => {
//         itemsToDelete = itemsToDelete.filter(item => item[parameter.key] == parameter.value);
//     })
//     itemsToDelete.forEach(item => {
//         indexes.push(currentArray.findIndex(x => JSON.stringify(x) == JSON.stringify(item)));
//     });
//     return indexes;

// }
function modify(obj, newObj) {

    Object.keys(obj).forEach(function (key) {
        delete obj[key];
    });

    Object.keys(newObj).forEach(function (key) {
        obj[key] = newObj[key];
    });

}