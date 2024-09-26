function DisplayReviewPopup() {
    var reviewPopup = document.querySelector('.review_form_container');
    if (reviewPopup) {
        reviewPopup.style.display = 'block';
    }
}

function CloseReviewPopup(){
    var reviewPopup = document.querySelector('.review_form_container');
    if (reviewPopup) {
        reviewPopup.style.display = 'none';
    }
}


