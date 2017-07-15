

export function estimatedTime(time) {
    let now = time_to_glitch(new Date());
    let msg = time_to_glitch(new Date(time));

    console.log(now)
    console.log(msg)

    var seconds = msg[3];
    //let seconds = values[5];

    // if (seconds == 0)
    //     return 'now';
    // else if (seconds > 0 && seconds <= 60)
    //     return seconds + 'seconds';
    // else
    return seconds + 'seconds';
}