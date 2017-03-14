
export function getToken() {
    var name = "user=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return undefined;
}

export function setToken(value) {
    // var d = new Date();
    // d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    document.cookie = "user=" + value + ";path=/";
}