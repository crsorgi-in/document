
document.addEventListener("DOMContentLoaded", function () {
  // Get all elements with the class 'time'
  var timeElements = document.querySelectorAll(".time");

  // Convert milliseconds to a dynamic string (few years ago, few months ago, etc.)
  function convertTimeToDynamicString(milliseconds) {
    var intervals = [
      { label: " years", duration: 365 * 24 * 60 * 60 * 1000 },
      { label: " months", duration: 30 * 24 * 60 * 60 * 1000 },
      { label: " weeks", duration: 7 * 24 * 60 * 60 * 1000 },
      { label: " days", duration: 24 * 60 * 60 * 1000 },
      { label: " hours", duration: 60 * 60 * 1000 },
      { label: " minutes", duration: 60 * 1000 },
      { label: " seconds", duration: 1000 },
    ];

    var elapsedMilliseconds = Date.now() - milliseconds;

    for (var i = 0; i < intervals.length; i++) {
      var interval = intervals[i];
      if (elapsedMilliseconds >= interval.duration) {
        var count = Math.floor(elapsedMilliseconds / interval.duration);
        return count + " " + interval.label + " ago";
      }
    }

    return "few seconds ago"; // Default
  }

  // Update all time elements with the dynamic string
  function updateDynamicTimeString(element) {
    var targetDate = new Date(
      element.getAttribute("data-target")
    ).getTime();
    var dynamicString = convertTimeToDynamicString(targetDate);
    element.innerText = dynamicString;
  }

  // Call the updateDynamicTimeString function for each time element
  timeElements.forEach(function (element) {
    updateDynamicTimeString(element);
  });

  // Set up an interval to update the dynamic string every minute
  setInterval(function () {
    timeElements.forEach(function (element) {
      updateDynamicTimeString(element);
    });
  }, 60000);
});
