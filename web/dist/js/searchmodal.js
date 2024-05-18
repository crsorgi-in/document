document.addEventListener("DOMContentLoaded", function () {
    var searchButton = document.getElementById('showSearchBar');
    var searchModal = document.getElementById('searchModal');
    var searchInput = document.getElementById('searchInput');

    // Function to show search modal and focus on the input
    function showSearchModal() {
        searchModal.style.display = 'flex';
        searchInput.focus();
    }

    // Show search bar modal when the search button is clicked
    searchButton.addEventListener('click', showSearchModal);

    // Hide search bar modal and clear input when cancel button is clicked
    document.getElementById('hideSearchBar').addEventListener('click', function () {
        searchModal.style.display = 'none';
        searchInput.value = ''; // Clear the input field
    });

    // Hide search bar modal and clear input when clicking outside the modal or search button
    document.addEventListener('mouseup', function (e) {
        if (!searchModal.contains(e.target) && e.target !== searchButton) {
            searchModal.style.display = 'none';
            searchInput.value = ''; // Clear the input field
        }
    });

    // Keyboard shortcut (CTRL+K) to open the search modal
    document.addEventListener('keydown', function (e) {
        if (e.ctrlKey && e.key === 'k') {
            e.preventDefault(); // Prevent default browser behavior
            showSearchModal();
        }
    });
});
