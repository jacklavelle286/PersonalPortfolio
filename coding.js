document.addEventListener('DOMContentLoaded', function() {
 // Initialize Ace Editor
 const editor = ace.edit("editor");
 editor.setTheme("ace/theme/monokai");
 editor.session.setMode("ace/mode/python");

 const runButton = document.getElementById('runCode');
 const outputArea = document.getElementById('outputArea');
 const challengeSelect = document.getElementById('challengeSelect');

 runButton.addEventListener('click', function() {
     const selectedChallenge = challengeSelect.value;
     const userCode = editor.getValue(); // Get code from Ace Editor

     // Determine which API endpoint to use based on the selected challenge
     let apiEndpoint;
     if (selectedChallenge === 'primeNumbers') {
         apiEndpoint = 'https://your-api-gateway-url/prime-numbers';
     } else if (selectedChallenge === 'fizzBuzz') {
         apiEndpoint = 'https://your-api-gateway-url/fizzbuzz';
     } else if (selectedChallenge === 'factorial') {
         apiEndpoint = 'https://your-api-gateway-url/factorial';
     }

     // Ensure an endpoint is selected
     if (apiEndpoint) {
         sendCodeToAWS(apiEndpoint, userCode);
     } else {
         outputArea.textContent = 'Error: Invalid challenge selected.';
     }
 });

 // Function to send code to AWS Lambda via specific API Gateway endpoint and handle response
 function sendCodeToAWS(apiEndpoint, code) {
     // Prepare the data to be sent in the request
     const requestData = {
         code: code
     };

     // Make an AJAX call to the specified API Gateway endpoint
     fetch(apiEndpoint, {
         method: 'POST',
         headers: {
             'Content-Type': 'application/json',
         },
         body: JSON.stringify(requestData)
     })
     .then(response => response.json())
     .then(data => {
         // Update the output area with the results
         outputArea.textContent = `Results:\n${data.output}`;
     })
     .catch((error) => {
         console.error('Error:', error);
         outputArea.textContent = `Error: ${error.message}`;
     });
 }
});
