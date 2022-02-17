
function RequestData(urlArray) {
    this.urlArray = urlArray;

}
function GetRequestData(urlArray, itemsArray) {
    this.RequestData = new RequestData(urlArray);
    this.itemsArray = itemsArray;
}
function PostRequestData(urlArray, dataToSave) {
    this.RequestData = new RequestData(urlArray);
    this.dataToSave = dataToSave;
}
function Item(key, value) {
    this.key = key;
    this.value = value;
}
var MethodObject = {

    GET: GetFromLocalStorage,
    POST: SetToLocalStorage
}
class fakeXMLHttpRequest {
    constructor(url = null, request = null, urlArray = null) {

    }
    open(mehodType, url, conetntObject) {

        this.urlArray = getRequestUrlByflatUrl(url.split('?')[0])
        switch (mehodType) {

            case 'GET': {
                var urlItems = getItemsArrayByArguments(url.split('?')[1]);
                this.request = new GetRequestData(this.urlArray, urlItems);
            } break;;
            case 'POST': {
                this.request = new PostRequestData(this.urlArray, conetntObject);
            }
        }
        MethodObject[mehodType].apply(this, [this.request])

    }

}

function getRequestUrlByflatUrl(flattUrl) {
    return flattUrl.split('/').splice(1, 4)
}
function getItemsArrayByArguments(urlArguments) {
    var splitByProfit = [];
    urlArguments.split('&').forEach(element => {
        var key = element.split('=')[0];
        var value = element.split('=')[1];
        var item = new Item(key, value);
        splitByProfit.push(item);
    });
    return splitByProfit;
}