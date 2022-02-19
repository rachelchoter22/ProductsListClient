
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
    GET: DB.prototype.GetFromLocalStorage,
    POST: DB.prototype.SetToLocalStorage
}
class FXMLHttpRequest {


    constructor() {
        this.readyState = 'UNSENT';
        this.methodType = null;
        this.url = null;
        this.request = null;
        this.response = null;
        this.onreadystatechange = null;
        this.Headers = [];
    }
    open(methodType, url, conetntObject) {
        this.readyState = 'OPENED';
        this.onChangeState();
        this.methodType = methodType;
        var urlArray = getRequestUrlByflatUrl(url.split('?')[0])
        switch (methodType) {

            case 'GET': {
                var urlItems = getItemsArrayByArguments(url.split('?')[1]);
                this.request = new GetRequestData(urlArray, urlItems);
            } break;;
            case 'POST': {
                this.request = new PostRequestData(urlArray, conetntObject);
            }
        }
    }
    //
    setRequestHeader(headerName, headerValue) {
        this.Headers.push({ headerName: headerName, headerValue: headerValue })
    }
    onChangeState() {
        if (typeof this.onreadystatechange === 'function')
            this.onreadystatechange();
    }
    send() {
        this.readyState = 'HEADERS_RECEIVED';
        this.onChangeState();
        this.response = MethodObject[this.methodType].apply(this, [this.request]);
        this.readyState = 'LOADING';
        this.onChangeState();
        if (this.response) {
            this.readyState = 'DONE';
            this.onChangeState();
        }
    }
    onload() {
        this.readyState = 'LOADING';
        this.onChangeState();
    }
}

function getRequestUrlByflatUrl(flattUrl) {
    return flattUrl.split('/').splice(1, 4)
}
function getItemsArrayByArguments(urlArguments) {
    if(!urlArguments) return;
    var splitByProfit = [];
    urlArguments.split('&').forEach(element => {
        var key = element.split('=')[0];
        var value = element.split('=')[1];
        var item = new Item(key, value);
        splitByProfit.push(item);
    });
    return splitByProfit;
}