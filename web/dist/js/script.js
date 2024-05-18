$(document).ready(function () {
    const searchInput = $("#searchInput");
    const noMatchMessage = $("#noMatchMessage");
    const suggestionBar = $("#suggestionBar");
  
    searchInput.on("input", function () {
      const searchTerm = searchInput.val().toLowerCase();
      const matchingCards = $(".col .card-text:contains(" + searchTerm + ")");
  
      // Update the suggestion bar content
      suggestionBar.empty();
      matchingCards.each(function () {
        const cardTitle = $(this).text();
        const suggestionItem = $("<div class='suggestion-item'>").text(cardTitle);
        suggestionBar.append(suggestionItem);
      });
  
      // Show or hide the suggestion bar based on the search term
      suggestionBar.toggle(searchTerm.length > 0);
  
      $(".col").each(function () {
        const col = $(this);
        const cardTitle = col.find(".card-text").text().toLowerCase();
        col.toggle(cardTitle.includes(searchTerm));
      });
  
      noMatchMessage.toggle($(".col:visible").length === 0);
    });
  
    // Hide suggestion bar when the input is cleared
    searchInput.on("blur", function () {
      suggestionBar.hide();
    });
  });
  
  // Handle suggestion item click
  $(document).on("click", ".suggestion-item", function () {
    const suggestionText = $(this).text();
    $("#searchInput").val(suggestionText);
    $("#suggestionBar").hide();
  });
  