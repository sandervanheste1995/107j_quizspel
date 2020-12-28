import config from '../config';
const fs = require('fs');

const minigames = fs.existsSync(config.minigamesSavefile) ? JSON.parse(fs.readFileSync(config.minigamesSavefile)) : [
    {
        id: 1,
        type: 'Woordenspel',
        name: 'Raad de maanden',
        description: 'Typ zoveel mogelijk maanden in. Voor elke maand die je als eerste raadt, krijgt je team 5 euro.',
        woorden: [['januari', 'january'],
                  ['februari', 'february'],
                  ['maart', 'march'],
                  ['april', 'april'],
                  ['mei', 'may'],
                  ['juni', 'june'],
                  ['juli', 'juuli'],
                  ['augustus', 'auchust'],
                  ['september', 'septrembner'],
                  ['oktober', 'october'],
                  ['november', 'noovember'],
                  ['december', 'decembner']]
    },
    {
        id: 2,
        type: 'Quiz',
        name: 'Testquiz',
        description: 'Hier volgen een paar makkelijke vragen!',
        screens: [
            {
                type: 'info',
                text: 'Hieronder staan wat <strong>nutteloze</strong> plaatjes! Hier kan je helemaal niets mee :)',
                subtext: 'In de kamelen zwemmen de vleeshonden! Ze kwaken!',
                images: ['https://i.picsum.photos/id/237/200/300.jpg?hmac=TmmQSbShHz9CdQm0NkEjx1Dyh_Y984R9LpNrpvH2D_U', 
                         'tester.jpg'],
                videos: ['testquiz.mp4'],
                sounds: ['woosh.mp3']
            },
            {
                type: 'multiplechoice',
                text: 'Dit is toch makkelijk?',
                subtext: 'Wat is 17*2?',
                images: ['https://i.picsum.photos/id/237/200/300.jpg?hmac=TmmQSbShHz9CdQm0NkEjx1Dyh_Y984R9LpNrpvH2D_U'],
                answers: [
                    {
                        correct: true,
                        text: 'Dat is 34'
                    },
                    {
                        text: 'Dat is 25'
                    },
                    {
                        text: 'Dat is 154'
                    }
                ]
            },
            {
                type: 'open',
                text: 'Hoe heet Sander Vanheste?',
                subtext: 'jazekers :)',
                reward: 20,
                answer: ['Sander Vanheste', 'sandrvanheste', 'sandervanheste']
            }
        ]
    }
];

export default minigames;