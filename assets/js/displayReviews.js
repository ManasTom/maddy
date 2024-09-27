const reviewContainer = document.querySelector('.home_reviews_row'); // Assuming you have a container for the reviews

function fetchLatestReviews() {
    const reviewsRef = db.ref('approvedReviews');

    reviewsRef.limitToLast(4).once('value', (snapshot) => {
        const reviews = snapshot.val();
        const reviewKeys = Object.keys(reviews).reverse(); // Get the latest reviews

        reviewContainer.innerHTML = ''; // Clear existing reviews

        reviewKeys.forEach((key) => {
            const review = reviews[key];
            const reviewHTML = `
        <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 review_col">
            <div class="review_box">
                <p>${review.message}</p>
                <h6>${review.name}</h6>
                <p>${review.email}</p>
            </div>
        </div>
    `;
            reviewContainer.innerHTML += reviewHTML;
        });
    });
}

// Call the function to fetch and display reviews
fetchLatestReviews();
