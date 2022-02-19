function addProduct() {

    var productName = document.querySelector('.page.active input[name="productName"]').value;
    var productCompany = document.querySelector('.page.active input[name="productCompany"]').value;
    var productAmount = document.querySelector('.page.active input[name="productAmount"]').value;
    var product = ProductSinglton.getProduct(productName, productCompany, productAmount);
    var fxhr = new FXMLHttpRequest();
    fxhr.open('POST', '/productList', product)

    fxhr.onreadystatechange = function () {
        if (fxhr.readyState == 'DONE') {
            if (fxhr.response.status == 200) {
                buildProductListHtml();
            }
        }
    };
    fxhr.send();
}
function buildProductListHtml() {
    var fxhr = new FXMLHttpRequest();
    fxhr.open('GET', '/productList')

    fxhr.onreadystatechange = function () {
        if (fxhr.readyState == 'DONE') {
            if (fxhr.response.status == 200) {
                document.getElementsByClassName('card-list')[0].innerHTML = x(fxhr.response.body);
                navigateTo('productList');

            }
        }
    };
    fxhr.send();
}
function x() {
    fxhr.response.body.forEach(product => {
        html += createDiv(product.productName) + createDiv(product.productCompany) + createDiv(product.productAmount);
    });

}
function createDiv(value) {
    return `<div class='card-row'>${value}</div>`
}