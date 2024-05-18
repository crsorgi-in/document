$(document).ready(function () {
  var num1, num2;
  var captchaValue;
  var alertContainer = $("#alertContainer");
  var verifyButton = $("#verifyButton");
  var downloadLink = $("#downloadLink");
  var captchaInput = $("#captchaInput");
  var pdfModal = $("#pdfModal");

  function generateCaptcha() {
    num1 = Math.floor(Math.random() * 10) + 1;
    num2 = Math.floor(Math.random() * 10) + 1;
    var operator = ["+", "-", "*"][Math.floor(Math.random() * 3)];
    captchaValue = eval(num1 + operator + num2);
    return num1 + " " + operator + " " + num2 + " = ?";
  }

  function updateCaptcha() {
    $("#captchaContainer").text(generateCaptcha());
  }

  function checkCaptcha(answer) {
    return parseInt(answer) === captchaValue;
  }

  window.verifyCaptcha = function () {
    var inputVal = captchaInput.val();
    if (inputVal === "") {
      showAlert("Please enter the captcha answer.", "bg-warning");
    } else {
      // Check if the user is online
      if (navigator.onLine) {
        if (!checkCaptcha(inputVal)) {
          showAlert("Incorrect captcha answer. Please try again.", "bg-danger");
          updateCaptcha();
          captchaInput.val("");
        } else {
          handleVerificationSuccess();
        }
      } else {
        showAlert("You are currently offline. Please connect to the internet to proceed.", "bg-warning");
      }
    }
  };

  window.downloadFile = function () {
    var fileName = $("#downloadLink").attr("data-file");
    var filePath = "/web/dist/img/document/" + fileName;

    if (!navigator.onLine) {
      showAlert("You are currently offline. Please connect to the internet to download the file.", "bg-warning");
      return;
    }

    showBootstrapAlertWithCountdown(
      "Your download will start in",
      5,
      "alert-info",
      function () {
        pdfModal.modal("hide");
        triggerDownload(filePath, fileName);
      }
    );
  };

  $("#pdfModal").on("shown.bs.modal hidden.bs.modal", function (event) {
    var button = $(event.relatedTarget);
    $("#downloadLink").attr("data-file", button.data("file"));
    updateCaptcha();

    if (event.type === "shown" && !downloadLink.is(":visible")) {
      captchaInput.prop("disabled", false);
    } else {
      captchaInput.val("");
      verifyButton.show();
      downloadLink.hide();
      resetAlert(alertContainer);
    }
  });

  $("#captchaInput").on("input", function () {});

  $(".btn-primary").on("click", function () {
    var file = $(this).data("file");
    downloadLink.attr("data-file", file);
    pdfModal.modal("show");
  });

  function showAlert(message, progressBarColor) {
    var errorAlert = $("<div>", {
      class: "alert fade show",
      role: "alert",
    }).addClass(
      progressBarColor === "bg-warning" ? "alert-warning" : "alert-danger"
    );

    errorAlert.html(
      message +
        '<div class="progress mt-2" style="height:5px;">' +
        '<div class="progress-bar progress-bar-animated ' +
        progressBarColor +
        '" role="progressbar" style="width: 100%;" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>' +
        "</div>"
    );

    alertContainer.html(errorAlert);
    startProgressBarAnimation(errorAlert.find(".progress-bar"), errorAlert[0]);
  }

  function handleVerificationSuccess() {
    verifyButton.html(
      'Verifying... <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>'
    );
    verifyButton.prop("disabled", true);

    setTimeout(function () {
      verifyButton.html("Verify Captcha");
      verifyButton.prop("disabled", false);
      verifyButton.hide();
      downloadLink.show();
      captchaInput.prop("disabled", true);
      captchaInput.val("");
    }, 3000);
  }

  function triggerDownload(filePath, fileName) {
    var link = document.createElement("a");
    link.href = filePath;
    link.download = fileName;
    link.click();
  }

  function showBootstrapAlertWithCountdown(
    message,
    seconds,
    alertType,
    callback
  ) {
    console.log("Download button is being disabled.");
    var alertMessage =
      '<div class="alert ' +
      alertType +
      ' fade show" role="alert">' +
      message +
      " " +
      seconds +
      " seconds. Please wait.</div>";
    alertContainer.html(alertMessage);

    // Disable download button during countdown
    $("#verifyButton").prop("disabled", true);
    $("#downloadLink").prop("disabled", true);

    var countdown = seconds;
    var countdownInterval = setInterval(function () {
      alertContainer
        .find(".alert")
        .text(message + " " + countdown + " seconds, Please wait.");
      countdown--;

      if (countdown < 0) {
        clearInterval(countdownInterval);
        alertContainer.html("");
        if (typeof callback === "function") {
          callback();
          // Enable download button after countdown ends
          $("#verifyButton").prop("disabled", false);
          $("#downloadLink").prop("disabled", false);
        }
      }
    }, 1000);
  }


  function startProgressBarAnimation(progressBar, alertElement) {
    var width = 100;
    progressBar.css("width", width + "%");

    var interval = setInterval(function () {
      width -= 1;
      progressBar.css("width", width + "%");
      if (width <= 0) {
        resetAlert(alertElement);
        clearInterval(interval);
      }
    }, 50);
  }

  function resetAlert(alertElement) {
    alertElement.style.display = "none";
    alertElement.querySelector(".progress-bar").style.width = "100%";
  }
});
