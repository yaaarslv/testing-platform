document.addEventListener("DOMContentLoaded", function() {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (token) {
        const authButton = document.querySelector(".auth-button");
        authButton.textContent = "Личный кабинет";
        const authForm = document.querySelector(".auth-form");
        authForm.action = "profile";

        if (role == null || role === "1" || role === "2") {
            const test_stats_nav = document.getElementById("test_stats");
            test_stats_nav.style.display = "none";
        }

    } else {
        const test_stats_nav = document.getElementById("test_stats");
        test_stats_nav.style.display = "none";
    }
    // else {
    //     if (window.location.href.includes('reviews')){
    //         const button = document.querySelector('.add-review-button');
    //         button.style.backgroundColor = "#ff001e"
    //     }
    //     // else if (window.location.href.includes('manage-organization') ||
    //     //     window.location.href.includes('profile') || window.location.href.includes('subscription')  ||
    //     //     window.location.href.includes('add-news')  || window.location.href.includes('add-product') ||
    //     //     window.location.href.includes('manage-products') || window.location.href.includes('manage-news') ||
    //     //     window.location.href.includes('cart')) {
    //     //     window.location.href = `auth?redirect=${window.location.href.split("/").pop()}`;
    //     // }
    // }
});