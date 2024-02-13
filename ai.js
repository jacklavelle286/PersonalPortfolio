// displaying the currently selected word count on the page for the ai.html page
function updateWordCountDisplay(value) {
    document.getElementById('word-count-display').textContent = value;
}

// Initialize the display
updateWordCountDisplay(document.getElementById('word-count-slider').value);

// Function to generate AI blog post
function generateBlogPost() {
    var prompt = document.getElementById('ai-prompt').value;
    var wordCount = document.getElementById('word-count-slider').value;

    console.log('Sending request with prompt:', prompt, 'and wordCount:', wordCount); // Log request details

    // Show the spinner container
    document.getElementById('spinner-container').style.display = 'flex';

    fetch('API', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            prompt: prompt,
            wordCount: wordCount
        }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        document.getElementById('spinner-container').style.display = 'none'; // Hide the spinner
        handleBlogPostResponse(data);
    })
    .catch(error => {
        console.error('Error during fetch:', error); // Log fetch error
        document.getElementById('spinner-container').style.display = 'none'; // Hide the spinner
        document.getElementById('error-message-container').style.display = 'flex'; // Show error message
    });
}

function handleBlogPostResponse(data) {
    console.log('Response data:', data); // Log the response data

    if (data && data.s3ObjectUrl) {
        var downloadLink = document.getElementById('download-link');
        downloadLink.href = data.s3ObjectUrl;
        downloadLink.style.display = 'block';
    } else {
        console.error('Failed to generate blog post, response:', data); // Log the error
        // Optionally show error message here as well
        document.getElementById('error-message-container').style.display = 'flex';
    }
}

// Event listener for the form submission
document.getElementById('ai-blog-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevents default form submission behavior
    generateBlogPost();
});
