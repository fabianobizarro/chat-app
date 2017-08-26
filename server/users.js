let _users = [];

exports.addUser = function (user) {
    _users.push(user);
}

exports.removeUser = function (user) {

}

exports.userExists = function (username) {
    for (var user in _users) {
        if (_users[user] == username)
            return true;
    }
    return false;
}

exports.getUsers = function () {
    return _users;
}