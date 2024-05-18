$(document).ready(function () {
  let progressTimeout;

  function showImage(imageSrc) {
    if (!navigator.onLine) {
      showAlert("You are currently offline. Please connect to the internet to proceed.", "bg-danger");
      return;
    }

    $("#progress-bar").width("0%").attr("aria-valuenow", 0);
    $("#modal-image").attr("src", imageSrc);
    $("#myModal").modal("show");

    const duration = 6000;
    const interval = 50;
    let currentProgress = 0;

    const updateProgressBar = () => {
      currentProgress += (interval / duration) * 100;
      $("#progress-bar")
        .width(currentProgress + "%")
        .attr("aria-valuenow", currentProgress);

      if (currentProgress < 100) {
        progressTimeout = setTimeout(updateProgressBar, interval);
      } else {
        $("#myModal").modal("hide");
      }
    };

    progressTimeout = setTimeout(updateProgressBar, interval);
  }

  function showAlert(message, alertClass) {
    const alertHtml = `<div class="alert ${alertClass}" role="alert">${message}</div>`;
    $("#myModal .modal-body").prepend(alertHtml);

    // Automatically hide the alert after 3 seconds
    setTimeout(() => {
      $(".alert").alert('close');
    }, 5000);
  }

  $(".view-button").on("click", function () {
    clearTimeout(progressTimeout);
    const imageSrc = $(this).data("src");
    showImage(imageSrc);
  });

  $("#myModal").on("hide.bs.modal", function () {
    clearTimeout(progressTimeout);
    $("#progress-bar").width("0%").attr("aria-valuenow", 0);
    $(".alert").remove();  // Remove any existing alerts when the modal is closed
  });
});
