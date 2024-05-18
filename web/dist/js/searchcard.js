$(document).ready(function () {
  const searchInput = $("#searchInput");
  const noMatchMessage = $("#noMatchMessage");

  searchInput.on("input", function () {
    const searchTerm = searchInput.val().toLowerCase();

    $(".col").each(function () {
      const col = $(this);
      const cardTitle = col.find(".card-text").text().toLowerCase();
      col.toggle(cardTitle.includes(searchTerm));
    });

    noMatchMessage.toggle($(".col:visible").length === 0);
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("searchInput");
  const cols = document.querySelectorAll(".col");

  searchInput.addEventListener("input", function () {
    const searchTerm = searchInput.value.toLowerCase();

    cols.forEach(function (col) {
      const card = col.querySelector(".card");

      if (!card || !card.getAttribute("data-card-name")) {
        col.style.display = "none";
        return;
      }

      const cardName = card.getAttribute("data-card-name").toLowerCase();
      col.style.display = cardName.includes(searchTerm) ? "block" : "none";
    });

    centerVisibleCards();
  });
});

function centerVisibleCards() {
  // Your centering logic here if needed
}
