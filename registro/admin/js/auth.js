var id_token = '';

function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  id_token = googleUser.getAuthResponse().id_token;
  console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  console.log('id_token: ' + id_token);

  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'https://elgaragehub.com:9484/login');
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = function() {
    //console.log('Signed in as: ' + xhr.responseText);
  };
  xhr.send(JSON.stringify({
    id_token: id_token
  }));
}

function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
  });
}
