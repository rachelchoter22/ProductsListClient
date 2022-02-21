class DB {

    GetFromLocalStorage(request) {

        var response = new FResponse(404, {}),
            storageKey = request.RequestData.urlArray[0],
            storgeValue = JSON.parse(localStorage.getItem(storageKey));
        try {
            if (!storgeValue) return response;
            if (request.itemsArray) {
                filterByParameters(request.itemsArray, storgeValue);
                if (storgeValue.length)
                    response = new FResponse(200, storgeValue);
            }
            else {
                response = new FResponse(200, storgeValue);
            }
        }
        catch (err) {
            response = new FResponse(500, err)
        }

        return response;
    }
    SetToLocalStorage(request) {

        var response = new FResponse(404, {}),
            storageKey = request.RequestData.urlArray[0],
            storgeValue = JSON.parse(localStorage.getItem(storageKey));
        try {
            if (!storgeValue) {
                localStorage.setItem(storageKey, JSON.stringify([request.dataToSave]));
                response = new FResponse(200, request.dataToSave);
            }
            else {
                var isExist = storgeValue.filter(item => JSON.stringify(item) == JSON.stringify(request.dataToSave));
                if (isExist.length)
                    response = new FResponse(403);
                else {
                    storgeValue.push(request.dataToSave);
                    localStorage.setItem(storageKey, JSON.stringify(storgeValue));
                    response = new FResponse(200, storgeValue);
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
            storageKey = request.RequestData.urlArray[0],
            storgeValue = JSON.parse(localStorage.getItem(storageKey));
        try {
            if (!storgeValue) return response;
            var indexesToDelete = getIndexOfItemToDelete(request.itemsArray, storgeValue);
            indexesToDelete.forEach(itemIndex => {
                storgeValue.splice(itemIndex, itemIndex + 1);
            });
            localStorage.setItem(storageKey, JSON.stringify(storgeValue));
            response = new FResponse(200, storgeValue);
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
function filterByParameters(parameters, arrayToFilter) {

    parameters.forEach(parameter => {
        arrayToFilter = arrayToFilter.filter(item => item[parameter.key] == parameter.value);
    })
}
function getIndexOfItemToDelete(parameters, currentArray) {
    var itemsToDelete = [],
        indexes = [];
    parameters.forEach(parameter => {
        itemsToDelete = currentArray.filter(item => item[parameter.key] == parameter.value);
    })
    itemsToDelete.forEach(item => {
        indexes.push(currentArray.findIndex(x => x.id == item.id));
    });
    return indexes;

}