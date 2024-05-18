// On page load or when changing themes, best to add inline in `head` to avoid FOUC
if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
  
  // Whenever the user explicitly chooses light mode
  localStorage.theme = 'light'
  
  // Whenever the user explicitly chooses dark mode
  localStorage.theme = 'dark'
  
  // Whenever the user explicitly chooses to respect the OS preference
  localStorage.removeItem('theme')

  document.addEventListener("DOMContentLoaded", function () {
    // Add event listener to the input field
    document.getElementById("captchaInput").addEventListener("keyup", function (event) {
      // Check if the Enter key or Numpad Enter key is pressed (key codes 13 and 108)
      if (event.keyCode === 13 || event.keyCode === 108) {
        // Trigger the verification function
        verifyCaptcha();
      }
    });
  });

  document.addEventListener("keydown", function (event) {
    // Check if the key combination is Ctrl + K
    if (event.ctrlKey && event.key === 'k') {
      // Set focus on the search input
      document.getElementById("searchInput").focus();
      // Prevent the default browser behavior
      event.preventDefault();
    }
  });
  

  $(document).ready(function () {
    $('#pdfModal').on('shown.bs.modal', function () {
      // Set focus on the input field when the modal is shown
      $('#captchaInput').focus();
    });
  });