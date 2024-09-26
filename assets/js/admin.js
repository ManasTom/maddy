
// ********************************************************************************************
// Function to create the pending reviews table
// ********************************************************************************************
document.addEventListener("DOMContentLoaded", function () {
    // Function to create the pending reviews table
    function createPendingReviewsTable(snapshot) {
        var tableDiv = document.querySelector(".pending_reviews_table_area");
        tableDiv.innerHTML = "";

        var table = document.createElement("table");
        table.classList.add("pending_reviews_table");

        var thead = document.createElement("thead");
        var headerRow = document.createElement("tr");
        headerRow.innerHTML = "<th>Name</th><th>Email</th><th>Message</th><th>Action</th>";
        thead.appendChild(headerRow);
        table.appendChild(thead);

        var tbody = document.createElement("tbody");

        snapshot.forEach(function (childSnapshot) {
            var reviewData = childSnapshot.val();
            var reviewKey = childSnapshot.key; // Get the key of the current pending review
            var row = document.createElement("tr");
            row.innerHTML = "<td>" + reviewData.name + "</td>" +
                "<td>" + reviewData.email + "</td>" +
                "<td>" + reviewData.message + "</td>" +
                "<td class='actionColumn'><button class='approve_btn'><i class='fa-solid fa-square-check'>&nbsp; Approve</i></button>" +
                "<button class='delete_btn'><i class='fa-solid fa-trash-can'></i>&nbsp; Delete</button></td>";

            // Add event listener to the approve button
            var approveBtn = row.querySelector(".approve_btn");
            approveBtn.addEventListener("click", function () {
                approveReview(reviewKey, reviewData);
            });

            // Add event listener to the delete button
            var deleteBtn = row.querySelector(".delete_btn");
            deleteBtn.addEventListener("click", function () {
                deleteReview(reviewKey);
            });

            tbody.appendChild(row);
        });

        table.appendChild(tbody);
        tableDiv.appendChild(table);
    }

    // Function to refresh pending reviews table data
    function refreshPendingReviewsTable() {
        var pendingReviewsRef = firebase.database().ref("PendingReviews");
        pendingReviewsRef.once("value", function (snapshot) {
            createPendingReviewsTable(snapshot);
        });
    }

    // Function to approve a review
    function approveReview(reviewKey, reviewData) {
        // Get a reference to the Firebase database
        var database = firebase.database();

        // Get a reference to the "ApprovedReviews" collection
        var approvedReviewsRef = database.ref("approvedReviews");

        // Set the review data with the "name" key's value as the key for the object
        var updatedReviewData = {};
        updatedReviewData[reviewData.name] = reviewData;

        // Add the updated review data to the "ApprovedReviews" collection
        approvedReviewsRef.update(updatedReviewData)
            .then(function () {
                // If adding to "ApprovedReviews" succeeds, remove the review from "PendingReviews"
                var pendingReviewsRef = database.ref("PendingReviews/" + reviewKey);
                pendingReviewsRef.remove()
                    .then(function () {
                        // If removal from "PendingReviews" succeeds, refresh the pending reviews table
                        refreshPendingReviewsTable();
                    })
                    .catch(function (error) {
                        console.error("Error removing review from PendingReviews:", error);
                    });
            })
            .catch(function (error) {
                console.error("Error adding review to ApprovedReviews:", error);
            });
    }

    // Function to delete a review
    function deleteReview(reviewKey) {
        // Get a reference to the Firebase database
        var database = firebase.database();

        // Get a reference to the "PendingReviews" collection
        var pendingReviewsRef = database.ref("PendingReviews/" + reviewKey);

        // Remove the review from the "PendingReviews" collection
        pendingReviewsRef.remove()
            .then(function () {
                // If removal succeeds, refresh the pending reviews table
                refreshPendingReviewsTable();
            })
            .catch(function (error) {
                console.error("Error removing review from PendingReviews:", error);
            });
    }

    // Call the function to display pending reviews when the page is loaded
    refreshPendingReviewsTable();
});




// Call the function to display pending reviews when the page is loaded
document.addEventListener("DOMContentLoaded", function () {
    refreshPendingReviewsTable();
});








//************************************************* */
// Function to create the approved reviews table
//************************************************* */

// Function to create the approved reviews table
function createApprovedReviewsTable(snapshot) {
    var tableDiv = document.querySelector(".approved_reviews_table_area");
    tableDiv.innerHTML = "";

    var table = document.createElement("table");
    table.classList.add("approved_reviews_table");

    var thead = document.createElement("thead");
    var headerRow = document.createElement("tr");
    headerRow.innerHTML = "<th>Name</th><th>Email</th><th>Message</th><th>Action</th>";
    thead.appendChild(headerRow);
    table.appendChild(thead);

    var tbody = document.createElement("tbody");

    snapshot.forEach(function (childSnapshot) {
        var reviewData = childSnapshot.val();
        var reviewKey = childSnapshot.key; // Get the key of the current approved review
        var row = document.createElement("tr");
        row.innerHTML = "<td>" + reviewData.name + "</td>" +
            "<td>" + reviewData.email + "</td>" +
            "<td>" + reviewData.message + "</td>" +
            "<td class='actionColumn'><button class='delete_btn'><i class='fa-solid fa-trash-can'></i>&nbsp; Delete</button></td>";

        // Add event listener to the delete button
        var deleteBtn = row.querySelector(".delete_btn");
        deleteBtn.addEventListener("click", function () {
            deleteReview(reviewKey);
        });

        tbody.appendChild(row);
    });

    table.appendChild(tbody);
    tableDiv.appendChild(table);
}

// Function to refresh approved reviews table data
function refreshApprovedReviewsTable() {
    var approvedReviewsRef = firebase.database().ref("approvedReviews");
    approvedReviewsRef.once("value", function (snapshot) {
        createApprovedReviewsTable(snapshot);
    });
}

// Function to delete a review
function deleteReview(reviewKey) {
    // Get a reference to the Firebase database
    var database = firebase.database();

    // Get a reference to the "ApprovedReviews" collection
    var approvedReviewsRef = database.ref("approvedReviews/" + reviewKey);

    // Remove the review from the "ApprovedReviews" collection
    approvedReviewsRef.remove()
        .then(function () {
            // If removal succeeds, refresh the approved reviews table
            refreshApprovedReviewsTable();
        })
        .catch(function (error) {
            console.error("Error removing review from ApprovedReviews:", error);
        });
}

// Call the function to display approved reviews when the page is loaded
document.addEventListener("DOMContentLoaded", function () {
    refreshApprovedReviewsTable();
});


// ********************************************************************************************
// testimonials toggle switch
// ********************************************************************************************
document.querySelector('.reviewTogglerPending').style.backgroundColor = '#000';
document.querySelector('.reviewTogglerPending').style.color = '#fff';
document.querySelector('.reviewTogglerApproved').style.backgroundColor = '#00000000';
document.querySelector('.reviewTogglerApproved').style.color = '#000';

document.querySelector('.approved_reviews_table_area').style.display = 'none';


function showPendingReviews() {
    document.querySelector('.pending_reviews_table_area').style.display = 'block';
    document.querySelector('.approved_reviews_table_area').style.display = 'none';

    document.querySelector('.reviewTogglerPending').style.backgroundColor = '#000';
    document.querySelector('.reviewTogglerPending').style.color = '#fff';
    document.querySelector('.reviewTogglerApproved').style.backgroundColor = '#00000000';
    document.querySelector('.reviewTogglerApproved').style.color = '#000';
}

function showApprovedReviews() {
    document.querySelector('.pending_reviews_table_area').style.display = 'none';
    document.querySelector('.approved_reviews_table_area').style.display = 'block';

    document.querySelector('.reviewTogglerPending').style.backgroundColor = '#00000000';
    document.querySelector('.reviewTogglerPending').style.color = '#000';
    document.querySelector('.reviewTogglerApproved').style.backgroundColor = '#000';
    document.querySelector('.reviewTogglerApproved').style.color = '#fff';
}

