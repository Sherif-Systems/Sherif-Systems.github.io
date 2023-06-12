document.addEventListener('DOMContentLoaded', function() {
  var fetchButton = document.getElementById('fetchButton');
  var resultContainer = document.getElementById('result');

  fetchButton.addEventListener('click', function() {
    fetch('http://127.0.0.1:3000/degrees.json')
      .then(function(response) {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Error: ' + response.status);
        }
      })
      .then(function(data) {
        processDegrees(data);
      })
      .catch(function(error) {
        showError(error.message);
      });
  });

  function processDegrees(data) {
    var degreesEarned = data.degreesEarned;
    var degreesInProgress = data.degreesInProgress;

    var html = '<h2>Degrees Earned:</h2>';
    html += '<ul>';
    
    degreesEarned.forEach(function(degree) {
      html += '<li>' + degree.program + ' (' + degree.type + ') - ' + degree.school +"  " +degree.yearConferred +'</li>';
    });

    html += '</ul>';
    html += '<h2>Degrees in Progress:</h2>';
    html += '<ul>';
    
    degreesInProgress.forEach(function(degree) {
      html += '<li>' + degree.program + ' (' + degree.type + ') - ' + degree.school  +"  " +degree.yearConferred + '</li>';
    });
    html += '</ul>';

    resultContainer.innerHTML = html;
  }


  function showError(message) {
    resultContainer.innerHTML = '<p class="error">' + message + '</p>';
  }
});
