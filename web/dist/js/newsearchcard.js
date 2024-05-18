
  // document.addEventListener("DOMContentLoaded", function () {
  //   const searchInput = document.getElementById("searchInput");
  //   const suggestionsContainer = document.getElementById("suggestions");
  //   const cardTitles = document.querySelectorAll(".card p.card-text");
  //   const cards = document.querySelectorAll(".col");

  //   searchInput.addEventListener("input", function () {
  //     const searchTerm = searchInput.value.trim().toLowerCase();

  //     if (!searchTerm) {
  //       // Hide suggestions if input is empty
  //       suggestionsContainer.style.display = "none";
  //     } else {
  //       // Filter suggestions based on the search term
  //       const suggestions = Array.from(cardTitles)
  //         .map(title => title.textContent.toLowerCase())
  //         .filter(title => title.includes(searchTerm));

  //       // Update the suggestions dropdown
  //       updateSuggestions(suggestions);
  //     }

  //     // Filter cards based on the search term
  //     cards.forEach(function (card) {
  //       const cardTitle = card.querySelector(".card p.card-text").textContent.toLowerCase();
  //       const cardMatchesSearch = cardTitle.includes(searchTerm);
  //       card.style.order = cardMatchesSearch ? -1 : 0;
  //       card.style.display = cardMatchesSearch ? "flex" : "none";
  //     });
  //   });

  //   // Handle click on suggestion
  //   suggestionsContainer.addEventListener("click", function (e) {
  //     if (e.target.classList.contains("suggestion-item")) {
  //       const suggestion = e.target.textContent;
  //       searchInput.value = suggestion;
  //       suggestionsContainer.style.display = "none";
  //     }
  //   });

  //   // Hide suggestions when clicking outside the input and suggestions
  //   document.addEventListener("click", function (e) {
  //     if (!e.target.closest("#searchInput, #suggestions")) {
  //       suggestionsContainer.style.display = "none";
  //     }
  //   });

  //   // Function to update suggestion dropdown
  //   function updateSuggestions(suggestions) {
  //     if (suggestions.length > 0) {
  //       const suggestionsHtml = suggestions.map(suggestion => `
  //         <div class="suggestion-item">${suggestion}</div>
  //       `).join("");
  //       suggestionsContainer.innerHTML = suggestionsHtml;
  //       suggestionsContainer.style.display = "block";
  //     } else {
  //       suggestionsContainer.style.display = "none";
  //     }
  //   }
  // });
