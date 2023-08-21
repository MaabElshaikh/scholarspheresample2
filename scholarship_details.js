document.addEventListener('DOMContentLoaded', function() {
    // Get scholarship ID from the URL query parameter
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const scholarshipId = urlParams.get('id');

    // Fetch scholarship details based on the ID
    fetch(`/get_scholarship?id=${scholarshipId}`)
        .then(response => response.json())
        .then(data => displayScholarshipDetails(data))
        .catch(error => console.error('Error fetching scholarship details:', error));
});

// Function to display scholarship details
function displayScholarshipDetails(scholarship) {
    const scholarshipDetails = document.getElementById('scholarship-details');
    scholarshipDetails.innerHTML = `
        <h2>${scholarship.name}</h2>
        <p><strong>Location:</strong> ${scholarship.location}</p>
        <p><strong>University:</strong> ${scholarship.university}</p>
        <p><strong>Deadline:</strong> ${scholarship.deadline}</p>
        <p><strong>Degrees and Domains:</strong> ${scholarship.degrees_and_domains}</p>
        <p><strong>Criteria:</strong> ${scholarship.criteria}</p>
        <p><strong>Needed Papers:</strong> ${scholarship.needed_papers}</p>
    `;
}
