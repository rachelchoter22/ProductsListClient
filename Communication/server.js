

function checkIfUserExist(userName, userPassword) {
    var fxhr = new FXMLHttpRequest();
    fxhr.open('GET', '/UserList?userName=' + userName + '&userPassword=' + userPassword);
    fxhr.onreadystatechange = (() => {
        if (fxhr.readyState == 'DONE') {
            if (fxhr.response.status == 200) {
                initCurrentUser(fxhr.response.body[0]);
                buildProductListHtml();
            }
            else if (fxhr.response.status == 403) {
                alert('המשתמש קיים');
            }
            else {
                alert('המשתמש לא קיים יש להירשם');
                navigateTo('signUp');
            }
        }
    });
    fxhr.send();
}
function initCurrentUser(user) {
    var fxhr = new FXMLHttpRequest();
    fxhr.open('POST', '/currentUser', user);
    fxhr.onreadystatechange = (() => {
        if (fxhr.readyState == 'DONE') {
            if (fxhr.response.status == 200) {

            }
            else if (fxhr.response.status == 403) {
            }
            else {
            }
        }
    });
    fxhr.send();
}
function isLogIn() {
    var res;
    var fxhr = new FXMLHttpRequest();
    fxhr.open('GET', '/currentUser');
    fxhr.onreadystatechange = (() => {
        if (fxhr.readyState == 'DONE') {
            if (fxhr.response.status == 200) {
                if (fxhr.response.body) {
                    res = true;
                }
            }
            else {
                res = false;
            }
        }
    });
    fxhr.send();
    return res;
}
function logOut() {
    var fxhr = new FXMLHttpRequest();
    fxhr.open('DELETE', '/currentUser');
    fxhr.onreadystatechange = (() => {
        if (fxhr.readyState == 'DONE') {
            if (fxhr.response.status == 200) {
                if (fxhr.response.body) {
                    res = true;
                }
            }
            else {
                res = false;
            }
        }
    });
    fxhr.send()
}