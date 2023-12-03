// export const ringtones = [{
//         "id": "1",
//         "dir": ".//assets/ringtones/alarm_clock.mp3",
//         "name": "alarm_clock",
//         "length": "12"
//     },
//     {
//         "id": "2",
//         "dir": ".//assets/ringtones/alarm3_clock.mp3",
//         "name": "alarm_clock3",
//         "length": "11"
//     },
//     {
//         "id": "3",
//         "dir": ".//assets/ringtones/guitar.mp3",
//         "name": "guitar",
//         "length": "33"
//     },
//     {
//         "id": "4",
//         "dir": ".//assets/ringtones/morning_alarm_foba.mp3",
//         "name": "morning_alarm_foba",
//         "length": "15"
//     },
//     {
//         "id": "5",
//         "dir": ".//assets/ringtones/morning_birds.mp3",
//         "name": "morning_birds",
//         "length": "11"
//     },
//     {
//         "id": "6",
//         "dir": ".//assets/ringtones/morning_ringtone.mp3",
//         "name": "morning_ringtone",
//         "length": "11"
//     },
//     {
//         "id": "7",
//         "dir": ".//assets/ringtones/relaxation.mp3",
//         "name": "relaxation",
//         "length": "12"
//     },
//     {
//         "id": "8",
//         "dir": ".//assets/ringtones/relaxing.mp3",
//         "name": "relaxing",
//         "length": "11"
//     },
//     {
//         "id": "9",
//         "dir": ".//assets/ringtones/rooster_call.mp3",
//         "name": "rooster_call",
//         "length": "15"
//     },
// ];

const alarm_clock_3 = require("./alarm_clock_3.mp3");
const alarm_clock = require("./alarm_clock.mp3");
const guitar = require("./guitar.mp3");
const morning_alarm_foba = require("./morning_alarm_foba.mp3");
const morning_birds = require("./morning_birds.mp3");
const morning_ringtone = require("./morning_ringtone.mp3");
const relaxation = require("./relaxation.mp3");
const relaxing = require("./relaxing.mp3");
const rooster_call = require("./rooster_call.mp3");


export const ringtones = [

    {
        name: 'alarm_clock_3',
        file: alarm_clock_3,
        duration: 29
    },
    {
        name: 'alarm_clock',
        file: alarm_clock,
        duration: 5
    },
    {
        name: 'guitar',
        file: guitar,
        duration: 22
    },
    {
        name: 'morning_alarm_foba',
        file: morning_alarm_foba,
        duration: 7
    },
    {
        name: 'morning_birds',
        file: morning_birds,
        duration: 19
    },
    {
        name: 'morning_ringtone',
        file: morning_ringtone,
        duration: 23
    },
    {
        name: 'relaxation',
        file: relaxation,
        duration: 21
    },
    {
        name: 'relaxing',
        file: relaxing,
        duration: 27
    },
    {
        name: 'rooster_call',
        file: rooster_call,
        duration: 2
    }
];