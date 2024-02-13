document.addEventListener('DOMContentLoaded', function() {
 // Initialize Ace Editor
 const editor = ace.edit("editor");
 editor.setTheme("ace/theme/monokai");
 editor.session.setMode("ace/mode/python");

 const runButton = document.getElementById('runCode');
 const buttonText = document.getElementById('buttonText');
 const spinner = document.getElementById('spinner');
 const outputArea = document.getElementById('outputArea');
 const challengeSelect = document.getElementById('challengeSelect');

 runButton.addEventListener('click', function() {
     const selectedChallenge = challengeSelect.value;
     const userCode = editor.getValue(); // Get code from Ace Editor

     // Show spinner and disable button
     buttonText.textContent = 'Running...';
     spinner.style.display = 'inline-block';
     runButton.disabled = true;

     // Determine which API endpoint to use based on the selected challenge
     let apiEndpoint;
     if (selectedChallenge === 'primeNumbers') {
         apiEndpoint = 'API';
     } else if (selectedChallenge === 'fizzBuzz') {
         apiEndpoint = 'API';
     } else {
         outputArea.textContent = 'Error: Invalid challenge selected.';
         hideSpinner();
         return; // Exit the function if the challenge is invalid
     }

     // If a valid endpoint is selected, send the code to AWS
     sendCodeToAWS(apiEndpoint, userCode);
 });

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
     })
     .finally(() => {
         // Hide spinner and enable button
         hideSpinner();
     });
 }

 function hideSpinner() {
     buttonText.textContent = 'Run Code';
     spinner.style.display = 'none';
     runButton.disabled = false;
 }
});
