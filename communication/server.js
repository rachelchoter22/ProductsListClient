class server {


    GetFromLocalStorage(request) {

        var response = new FResponse(404, {}),
            storageKey = request.urls[0],
            storgeValue = JSON.parse(DB.prototype.Get(storageKey));
        try {
            if (!storgeValue) return response;
            var data = getResByRequest(request);
            if (data) {
                response = new FResponse(200, data);

            }
            else return response;
        }
        catch (err) {
            response = new FResponse(500, err)
        }

        return response;
    }
    SetToLocalStorage(request) {
        var response = new FResponse(404, {}),
            storageKey = request.urls[0],
            storgeValue = JSON.parse(DB.prototype.Get(storageKey));
        try {
            if (!storgeValue) {
                DB.prototype.Set(storageKey, JSON.stringify(request.dataToSave));
                response = new FResponse(200, request.dataToSave);
            }
            else {
                var data = getResByRequest(request);
                var isExist = data.filter(item => JSON.stringify(item) == JSON.stringify(request.dataToSave));
                if (isExist.length)
                    response = new FResponse(403);
                else {
                    var sValue = setToStorageByUrls(request.urls, request.dataToSave);
                    DB.prototype.Set(storageKey, JSON.stringify(sValue));
                    response = new FResponse(200, sValue);
                }
            }


        }
        catch (err) {
            response = new FResponse(500, err)
        }
        return response;
    }
    deleteFromLocalStorage(request) {
        var response = new FResponse(404, {}),
            storageKey = request.urls[0],
            storgeValue = JSON.parse(DB.prototype.Get(storageKey));
        try {
            if (!storgeValue) return response;
            if (request.parameters) {
                deleteFromStorageByUrls(request, storgeValue);
                DB.prototype.Set(storageKey, JSON.stringify(storgeValue));
            }
            else {
                DB.prototype.Remove(storageKey);
            }
            response = new FResponse(200, storgeValue);
        }
        catch (err) {
            response = new FResponse(500, err)
        }

        return response;
    }
    updateLocalStorage(request) {
        var response = new FResponse(404, {}),
            storageKey = request.urls[0],
            storgeValue = JSON.parse(DB.prototype.Get(storageKey));
        try {
            if (!storgeValue) return response;
            if (request.parameters) {
                updateStorageByUrls(request, storgeValue);
                DB.prototype.Set(storageKey, JSON.stringify(storgeValue));
                response = new FResponse(200, storgeValue);

            }

        }
        catch (err) {
            response = new FResponse(500, err)

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
    200: "OK",
    403: 'Forbidden',
    404: "Not found",
    500: 'Internal Server Error'

};
function getResByRequest(request) {
    var key = request.urls[0],
        storageValue = JSON.parse(DB.prototype.Get(key)),
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
                if(!resData.length) resData = null
            })
    }
    return resData;
}
function setToStorageByUrls(urls, dataToSave) {
    var key = urls[0],
        storageValue = JSON.parse(DB.prototype.Get(key)),
        pointerForEdit = storageValue;

    urls.forEach((url, index) => {
        if (index)
            pointerForEdit = storageValue[url];
        if (index == urls.length - 1)
            pointerForEdit.push(dataToSave);
    });

    return storageValue;
}
function deleteFromStorageByUrls(request, storageValue) {
    var pointerForEdit = storageValue;

    request.urls.forEach((url, index) => {
        if (index)
            pointerForEdit = storageValue[url];
    });
    var indexesToDelete = getIndexOfItems(request.parameters, pointerForEdit);
    indexesToDelete.forEach(itemIndex => {
        pointerForEdit.splice(itemIndex, itemIndex + 1);
    });
}
function updateStorageByUrls(request, storageValue) {
    var pointerForEdit = storageValue;

    request.urls.forEach((url, index) => {
        if (index)
            pointerForEdit = storageValue[url];
    });

    var indexesToUpdate = getIndexOfItems(request.parameters, pointerForEdit);
    indexesToUpdate.forEach(itemIndex => {
        pointerForEdit[itemIndex] = request.dataToSave;
    });
}
function getIndexOfItems(parameters, currentArray) {
    var itemsToDelete = Object.assign([], currentArray),
        indexes = [];
    parameters.forEach(parameter => {
        itemsToDelete = itemsToDelete.filter(item => item[parameter.key] == parameter.value);
    })
    itemsToDelete.forEach(item => {
        indexes.push(currentArray.findIndex(x => JSON.stringify(x) == JSON.stringify(item)));
    });
    return indexes;

}