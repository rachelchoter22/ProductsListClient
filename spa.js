const app = {
    pages: [],
    show: new Event("show"),
    init: init,
    navigateTo: navigateTo,
    pageShown: ShowPage,
    poppin: popIn,
};
document.addEventListener("DOMContentLoaded", app.init);

function init() {
   
    document.querySelectorAll(".navigation-btn")
    .forEach((link) => {
        link.addEventListener("click", app.navigateTo);
    });
    // console.log("hi");
    // app.pages = document.querySelectorAll(".page");
    // app.pages.forEach((pg) => {
    //     pg.addEventListener("show", app.pageShown);
    // });
    // document.querySelectorAll(".navigation-btn").forEach((link) => {
    //     link.addEventListener("click", app.nav);
    // });
    // history.replaceState({}, "logIn", "?");
    // window.addEventListener("click", app.poppin);

}

function navigateTo(ev) {
    ev.preventDefault();
    let currentPage = ev.target.getAttribute("data-target");

    var targetPageElement = document.querySelector('[data-current='+ currentPage+']');

    document.querySelector('[data-target='+ currentPage+']')
    document.querySelector(".active").classList.remove("active");
    targetPageElement.classList.add('active');
    // document.getElementsByTagName(currentPage).classList.add("active");
    history.pushState({}, currentPage, `#${currentPage}`);
    targetPageElement.dispatchEvent(app.show);
}
function ShowPage(ev) {
    console.log("page", ev.target.id, "just shown");
}

function popIn() {

    console.log(location.hash, "popstate event");

}

