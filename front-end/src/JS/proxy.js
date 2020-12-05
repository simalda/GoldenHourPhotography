export function checkUser(user, password) {
  var userEncoded = encodeURIComponent(user);
  var passwordEncoded = encodeURIComponent(password);
  return fetch(
    `http://127.0.0.1:5000/login/${userEncoded}/${passwordEncoded}`
  ).then((response) => response.json());
}
