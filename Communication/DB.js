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

function Get(dataKey,d) {
    return localStorage.getItem(dataKey);

}
function Post(dataKey, dataToSave) {
    localStorage.setItem(dataKey, dataToSave);
}
