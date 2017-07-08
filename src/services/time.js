

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


export function time_to_glitch(time) {
    var year, day_of_year, month_and_day, month, day_of_month, hour, minute, sec, ts;
    sec = Number(time) - 1238562000;

    // there are 4435200 real seconds in a game year
    // there are 14400 real seconds in a game day
    // there are 600 real seconds in a game hour
    // there are 10 real seconds in a game minute

    year = Math.floor(sec / 4435200);
    sec -= year * 4435200;

    day_of_year = Math.floor(sec / 14400);
    sec -= day_of_year * 14400;

    hour = Math.floor(sec / 600);
    sec -= hour * 600;

    minute = Math.floor(sec / 10);
    sec -= minute * 10;

    // turn the 0-based day-of-year into a day & month
    month_and_day = day_to_md(day_of_year);
    month = month_and_day[0];
    day_of_month = month_and_day[1];

    // get day-of-week
    // if (month == 11) {
    //     day_of_week = undefined
    // } else {
    //     day_of_week = (day_of_year + (307 * year)) % 8;
    // }

    return [year, month, day_of_month, hour, minute, sec]
}

function day_to_md(day_of_year) {
    var m, d, cd, months;
    months = [29, 3, 53, 17, 73, 19, 13, 37, 5, 47, 11, 1];
    cd = 0;

    for (var i = 0; i < months.length; i++) {
        cd += months[i];
        if (cd > day_of_year) {
            m = i;
            d = day_of_year + 1 - (cd - months[i]);
            return [m, d];
        }
    }

    return [0, 0];
}

function ordinalize(number) {
    if (11 <= parseInt(number) % 100 && parseInt(number) % 100 <= 13) {
        return number + "th";
    } else {
        switch (parseInt(number) % 10) {
            case 1: return number + "st";
            case 2: return number + "nd";
            case 3: return number + "rd";
            default: return number + "th";
        }
    }
}

function formatted_glitch_time(time) {
    var days_of_week, months, parts, hour, ap, min;
    days_of_week = ['Hairday', 'Moonday', 'Twoday', 'Weddingday', 'Theday', 'Fryday', 'Standday', 'Fabday']
    months = ['Primuary', 'Spork', 'Bruise', 'Candy', 'Fever', 'Junuary', 'Septa', 'Remember', 'Doom', 'Widdershins', 'Eleventy', 'Recurse']
    parts = time_to_glitch(time);
    if (parts[4] > 12) {
        hour = parts[4] - 12;
        ap = 'pm'
    } else if (parts[4] == 0) {
        hour = 12;
        ap = 'am';
    } else {
        hour = parts[4];
        ap = 'am'
    }
    var day_and_weekday;
    if (parts[1] == 12) {
        day_and_weekday = 'Recurse'
    } else {
        day_and_weekday = days_of_week[parts[3]] + ', ' + ordinalize(parts[2]) + ' of ' + months[parts[1]]
    }
    if (parts[5] < 10) { min = '0' + String(parts[5]) } else { min = parts[5] }
    return hour + ':' + min + ap + ', ' + day_and_weekday + ', year ' + parts[0]
}