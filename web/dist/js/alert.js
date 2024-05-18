function showAlert(message, container, progressBarColor) {
    if (captchaInput.val() === '') {
      var errorAlert = document.createElement('div');
      errorAlert.className = 'alert alert-warning fade show';
      errorAlert.setAttribute('role', 'alert');
    }
    else if (!checkCaptcha(captchaInput.val())) {
      var errorAlert = document.createElement('div');
      errorAlert.className = 'alert alert-danger fade show';
      errorAlert.setAttribute('role', 'alert');
    }

    errorAlert.innerHTML = message +
      '<div class="progress mt-2" style="height:5px;">' +
      '<div class="progress-bar progress-bar-animated ' + progressBarColor + '" role="progressbar" style="width: 100%;" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>' +
      '</div>';

    container.html(errorAlert);

    var progressBar = errorAlert.querySelector('.progress-bar');
    startProgressBarAnimation(progressBar, errorAlert);
  }

  