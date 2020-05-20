const users = [];

function setUserOnline(userData) {
  users.push(userData);

  return users.filter(
    (item, index, array) =>
      array.findIndex((user) => user.name === item.name) === index
  );
}

function getUsersOnline() {
  return users;
}

function userLeaves(socketId) {
  const index = users.findIndex((user) => user.socketId === socketId);

  return index !== -1 ? users.splice(index, 1)[0] : null;
}

module.exports = { setUserOnline, getUsersOnline, userLeaves };
