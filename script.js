document.addEventListener('DOMContentLoaded', function() {
    // Fetch scholarships data from the back-end and populate the landing page
    fetch('/scholarships')
        .then(response => response.json())
        .then(data => populateScholarships(data))
        .catch(error => console.error('Error fetching scholarships:', error));
});

// Function to populate the landing page with scholarship listings
function populateScholarships(scholarships) {
    const scholarshipList = document.getElementById('scholarship-list');
    scholarships.forEach(scholarship => {
        const scholarshipDiv = document.createElement('div');
        scholarshipDiv.className = 'scholarship';
        scholarshipDiv.innerHTML = `
            <h3>${scholarship.name}</h3>
            <p><strong>Deadline:</strong> ${scholarship.deadline}</p>
            <p><strong>Degrees and Domains:</strong> ${scholarship.degrees_and_domains}</p>
            <button class="details-button" data-id="${scholarship.id}">Details</button>
        `;
        scholarshipList.appendChild(scholarshipDiv);
    });

    // Add event listeners for scholarship details buttons
    const detailsButtons = document.querySelectorAll('.details-button');
    detailsButtons.forEach(button => {
        button.addEventListener('click', showScholarshipDetails);
    });
}

// Function to show scholarship details
function showScholarshipDetails(event) {
    const scholarshipId = event.target.getAttribute('data-id');
    window.location.href = `scholarship_details.html?id=${scholarshipId}`;
}

fetch('/scholarships')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => populateScholarships(data))
    .catch(error => console.error('Error fetching scholarships:', error));
