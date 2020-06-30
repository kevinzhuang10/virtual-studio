function updateLocalUser(authPayload) {
  localStorage.setItem(AUTH_TOKEN, authPayload.token)
}

module.exports = {
  updateLocalUser,
}
