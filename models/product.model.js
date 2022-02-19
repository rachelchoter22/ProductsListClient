ProductSinglton = (function () {

    var _instance = null,
        id = 0;

    // function ProductSingltonConstractor() {


    // };
    // function getProduct()
    return {
        // getInstance: function () {
        //     if (!_instance) {
        //         _instance = ProductSingltonConstractor;
        //         return _instance;
        //     }
        //     else {

        //         return _instance;
        //     }
        // },
        getProduct: function (productName, productCompany, productAmount) {
            return new Product(++id, productName, productCompany, productAmount);
        }
    };
}());

function Product(id, productName, productCompany, productAmount) {
    this.id = id;
    this.productName = productName;
    this.productCompany = productCompany;
    this.productAmount = productAmount;
    // this.productPhone = productPhone;
}