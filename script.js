// JavaScript for Hamburger Menu toggle
document.getElementById("hamburger").addEventListener("click", function() {
    const navLinks = document.getElementById("navLinks");
    navLinks.classList.toggle("active");
});

	
// JavaScript for the Search Functionality
document.getElementById("search-btn").addEventListener("click", function() {
    const searchQuery = document.getElementById("search-bar").value.trim().toLowerCase();
    const hospitals = document.querySelectorAll(".hospital");

    if (searchQuery !== "") {
        hospitals.forEach(function(hospital) {
            const hospitalName = hospital.querySelector("h2").textContent.toLowerCase();
            if (hospitalName.includes(searchQuery)) {
                hospital.style.display = "block";
            } else {
                hospital.style.display = "none";
            }
        });
    } else {
        hospitals.forEach(function(hospital) {
            hospital.style.display = "block";
        });
    }
});

// Optionally, allow search by pressing Enter
document.getElementById('search-bar').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        document.getElementById("search-btn").click();
    }
});

// Fetch and display reviews from the JSON file
function loadReviews() {
    fetch('reviews.json')
        .then(response => response.json())
        .then(reviews => {
            const reviewsContainer = document.getElementById('reviews-container');
            reviewsContainer.innerHTML = "";
            reviews.forEach(review => {
                const reviewDiv = document.createElement('div');
                reviewDiv.classList.add('review');
                reviewDiv.innerHTML = `
                    <div class="stars">${'â˜…'.repeat(review.rating)}${'â˜†'.repeat(5 - review.rating)}</div>
                    <p><strong>${review.name}</strong>: ${review.review}</p> <!-- Access 'review' here -->
                `;
                reviewsContainer.appendChild(reviewDiv);
            });
        })
        .catch(error => console.error('Error fetching reviews:', error));
}

// Handle form submission to add a new review
document.getElementById("review-form").addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById('reviewer-name').value.trim();
    const mobile = document.getElementById('mobile-number').value.trim();
    const reviewText = document.getElementById('review-text').value.trim();
    const rating = document.querySelector('input[name="rating"]:checked');

    if (name === "" || mobile === "" || reviewText === "" || !rating) {
        alert("Please fill in all fields and give a rating.");
        return;
    }

    const review = {
        name: name,
        mobile: mobile,
        review: reviewText,
        rating: parseInt(rating.value)
    };

    submitReview(review);

    document.getElementById('reviewer-name').value = "";
    document.getElementById('mobile-number').value = "";
    document.getElementById('review-text').value = "";
    document.querySelector('input[name="rating"]:checked').checked = false;
});

// Function to submit a new review and update the display (simulating saving to JSON)
function submitReview(newReview) {
    fetch('reviews.json')
        .then(response => response.json())
        .then(reviews => {
            reviews.push(newReview);
            updateReviewsOnPage(reviews);
            console.log('Updated Reviews:', reviews);
        })
        .catch(error => console.error('Error submitting review:', error));
}

// Simulate saving reviews to the page (replace the old reviews with the new ones)
function updateReviewsOnPage(reviews) {
    const reviewsContainer = document.getElementById('reviews-container');
    reviewsContainer.innerHTML = "";
    
    reviews.forEach(review => {
        const reviewDiv = document.createElement('div');
        reviewDiv.classList.add('review');
        reviewDiv.innerHTML = `
            <div class="stars">${'â˜…'.repeat(review.rating)}${'â˜†'.repeat(5 - review.rating)}</div>
            <p><strong>${review.name}</strong>: ${review.review}</p>
        `;
        reviewsContainer.appendChild(reviewDiv);
    });
}

loadReviews()
