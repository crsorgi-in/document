  function generateCaptcha() {
            var num1 = Math.floor(Math.random() * 10);
            var num2 = Math.floor(Math.random() * 10);
            var operator = ['+', '-', '*'][Math.floor(Math.random() * 3)];
            var captchaExpression = num1 + ' ' + operator + ' ' + num2;
            var captchaResult = eval(captchaExpression);

            document.getElementById('captchaContainer').textContent = captchaExpression;
            document.getElementById('captchaContainer').setAttribute('data-result', captchaResult);

            // Clear the input field
            document.getElementById('captchaInput').value = '';
        }

        // Function to verify the entered captcha
     // Function to verify the entered captcha
function verifyCaptcha() {
    var enteredCaptcha = document.getElementById('captchaInput').value;

    // Check if the entered captcha is empty
    if (!enteredCaptcha.trim()) {
        document.getElementById('enterAnswerAlert').style.display = 'block';

        // Show the progress bar for 4 seconds
        const enterAnswerProgressBar = document.getElementById('enterAnswerProgressBar');
        enterAnswerProgressBar.style.width = '100%';
        const duration = 4000; // in milliseconds
        const interval = duration / 100;
        let currentWidth = 100;
        window.enterAnswerProgressBarUpdate = setInterval(function () {
            currentWidth -= 1; // Adjust the speed of the progress bar
            enterAnswerProgressBar.style.width = `${currentWidth}%`;
            if (currentWidth <= 0) {
                clearInterval(window.enterAnswerProgressBarUpdate);
                document.getElementById('enterAnswerAlert').style.display = 'none';
                // Reset the progress bar when the alert is hidden
                enterAnswerProgressBar.style.width = '100%';
            }
        }, interval);

        return; // Do not proceed further
    }

    var correctCaptcha = document.getElementById('captchaContainer').getAttribute('data-result');

    if (enteredCaptcha == correctCaptcha) {
        document.getElementById('wrongAnswerAlert').style.display = 'none';

        // Show the loader container
        const loaderContainer = document.querySelector('.loader-container');
        loaderContainer.style.display = 'block';

        // Change the button text to "Verifying..."
        document.getElementById('verifyButton').innerHTML = 'Verifying... ';

        // Delay the display of the download button for 5 seconds
        setTimeout(function () {
            document.getElementById('verifyButton').style.display = 'none';
            loaderContainer.style.display = 'none'; // Hide the loader container
            document.getElementById('downloadLink').style.display = 'inline-block';
        }, 5000);

    } else {
        document.getElementById('wrongAnswerAlert').style.display = 'block';
        document.getElementById('downloadLink').style.display = 'none';

        // Generate a new captcha on incorrect answer
        generateCaptcha();

        // Show the progress bar and update it for 4 seconds
        const progressBar = document.getElementById('progressBarId');
        progressBar.style.width = '100%';
        const duration = 4000; // in milliseconds
        const interval = duration / 100;
        let currentWidth = 100;
        window.progressBarUpdate = setInterval(function () {
            currentWidth -= 1; // Adjust the speed of the progress bar
            progressBar.style.width = `${currentWidth}%`;
            if (currentWidth <= 0) {
                clearInterval(window.progressBarUpdate);
                document.getElementById('wrongAnswerAlert').style.display = 'none';
                // Reset the progress bar when the alert is hidden
                progressBar.style.width = '100%';
            }
        }, interval);
    }
}


        // Function to download the file
        function downloadFile() {
            // Add your download logic here
        }

        // Initialize with a random captcha on modal open
        $('#pdfModal').on('show.bs.modal', function () {
            generateCaptcha();
        });

        // Hide download button, verifying message, and verify button on modal close
        $('#pdfModal').on('hidden.bs.modal', function () {
            document.getElementById('downloadLink').style.display = 'none';
            document.getElementById('verifyButton').style.display = 'inline-block';
            document.getElementById('verifyButton').textContent = 'Verify Captcha';
        });