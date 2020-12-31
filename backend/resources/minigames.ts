import config from '../config';
const fs = require('fs');

const minigames = fs.existsSync(config.minigamesSavefile) ? JSON.parse(fs.readFileSync(config.minigamesSavefile)) : [
    {
        id: 1,
        type: 'Woordenspel',
        name: 'WOORDENCHAOS HUISWOORDEN',
        description: 'Claim zoveel mogelijk huis-gerelateerde woorden. Voor elk woord krijgt je team 5 euro! Er zijn er 19!',
        woorden: [['FlopperWopper', 'flopperwopper', 'floperwoper', 'flopperwhopper', 'fopperwopper'],
                  ['Huiskip', 'huiskiep', 'uiskip', 'huuiskipo', 'huiskipp', 'huischick'],
                  ['Huisweekend', 'husweekend','huisweekent', 'huusweekend', 'huiswekend'],
                  ['Huisfeest', 'huisfeesd', 'huisparty', 'husfeest', 'huisfeeest', 'huiseest'],
                  ['Biermuur', 'biermuuur', 'birmuur', 'birmur', 'bierwand', 'bierverzameling', 'bierverzaameling'],
                  ['Quotes', 'huisquotes', 'huisquootes', 'quootes', 'husquotes'],
                  ['De Classic', 'declassic', 'declasic', 'deeclassic', 'declassik'],
                  ['Blaftoeter', 'toeter', 'tooter', 'blaf', 'toeteer'],
                  ['Smek Smokkelijk', 'smeksmok', 'smiksmek', 'smiksmekkelijk', 'smeksmuikelijk', 'smoksmek'],
                  ['Huistaak', 'taak', 'huistaaak', 'huuistaak', 'uistaak', 'huiistaak'],
                  ['Ultra', 'deultra', 'deuultra', 'uultra'],
                  ['Zoopen', 'zoopen', 'zoopen', 'wijnen', 'zoepen'],
                  ['Mannenavond', 'mannenavond', 'manenavond', 'mannenavont', 'annenavond'],
                  ['Vlees', 'vlez', 'vleez', 'vleees'],
                  ['Huisavond', 'huisavont', 'huusavond'],
                  ['Jordi Brakdag', 'jordibrakdag', 'joordibrakda'],
                  ['Huisbieb', 'huisbiep', 'huuisbieb', 'bieb', 'debieb'],
                  ['Broodje Bendag', 'broodjeben', 'broodjebenbrak', 'brakbroodjeben'],
                  ['Drab', 'drap', 'drabberig', 'drabbie'],
                ]
    },
    {
        id: 2,
        type: 'Woordenspel',
        name: 'WOORDENCHAOS HUISGENOTEN',
        description: 'Claim zoveel mogelijk (oud-) huisgenoten! Voor elke die je als eerst claimt, krijgt je team 5 euro! Er zijn er 30',
        woorden: [['Jordi', 'jordai'],
                  ['Mirte', 'mirtel'],
                  ['Milo'],
                  ['Veerle', 'verl'],
                  ['Lester', 'lezzel', 'lezl', 'lezzle'],
                  ['Joram'],
                  ['Janne', 'jean'],
                  ['Karlijn', 'carly', 'kartonviool', 'pauk', 'krenkel', 'crenkel'],
                  ['Joyce', 'josee', 'jose'],
                  ['Sander', 'sandy'],
                  ['Axel'],
                  ['Joost'],
                  ['Jaron'],
                  ['Jarno'],
                  ['Margriet', 'grietje'],
                  ['Marjanne', 'marjen'],
                  ['Lisanne'],
                  ['Vera', 'veerb', 'verb'],
                  ['Stan'],
                  ['Erik'],
                  ['Sarah'],
                  ['Kristian', 'debestehuisgenootooit'],
                  ['Femke', 'coronahuisgenoot'],
                  ['Lieuwe'],
                  ['Birgit'],
                  ['Kirill', 'krielie', 'kroelie', 'kiril'],
                  ['Bina', 'bientje'],
                  ['Yanick', 'sniekie', 'snikie'],
                  ['Matthias', 'mattie', 'mathias', 'matias'],
                  ['Myrthe', 'myrte']]
    },
    {
        id: 3,
        type: 'Woordenspel',
        name: 'WOORDENCHAOS CLUBS & CAFES',
        description: 'Claim zoveel mogelijk cafes en/of clubs in Utrecht! Voor elk cafe/club krijgt je team 5 euro! Er zijn er 21 (want het wordt 2021, dit is totaal geen toeval maar hier kwam ik toevallig op echt waar HAHAHA)',
        woorden: [['Winkel van Sinkel', 'wkelvansikel', 'sinkelwinkel'],
                  ['Body Talk', 'bodytaalk'],
                  ['Club Poema', 'poema', 'puma'],
                  ['t Pakhuis', 'pakhuis', 'grijpschuur'],
                  ['Cafe Rex', 'rex', 'reks'],
                  ['Cafe De Vrienden', 'devrienden', 'vrienden'],
                  ['Tivoli Vredenburg', 'tivoli', 'vredenburg'],
                  ['BASIS', 'bassis'],
                  ['Club Maggy', 'maggy'],
                  ['Cafe Hofman', 'hoffman'],
                  ['Cafe Le Journal', 'journal', 'journaal', 'jurnal'],
                  ['Filmcafé', 'filmcafe'],
                  ['dBs Utrecht', 'dbs'],
                  ['De Helling', 'helling'],
                  ['t Pandje', 'pandje'],
                  ['Cafe Jaloezie', 'jaloezi'],
                  ['Woolloomooloo', 'wooloomooloo', 'woeloemoeloe', 'woelloemoelloe', 'wolomolo', 'woolloommoolloo'],
                  ['Chupitos', 'choepitoos', 'tjsoepitos', 'choepitos'],
                  ['De Beurs', 'beurs'],
                  ['Het Gegeven Paard', 'gegevenpaard'],
                  ['Cafe Belgie', 'belgie', 'belgië']]
    },
    {
        id: 4,
        type: 'Quiz',
        name: 'WIE ZEI WAT?',
        description: 'Hier volgen 10 snippets van gesprekken. Aan jullie om steeds te raden wie het zei! 5 euro voor ieder goed antwoord',
        screens: [
            {
                type: 'open',
                text: 'Wie zei dit?',
                reward: 5,
                images: ['mirte.png'],
                answer: ['Mirte', 'mirtel', 'mirt', 'voldemirt']
            },
            {
                type: 'open',
                text: 'Wie zei dit?',
                reward: 5,
                images: ['jordi2.png'],
                answer: ['Jordi', 'jordai', 'verheul', 'jordie']
            },
            {
                type: 'open',
                text: 'Wie zei dit?',
                reward: 5,
                images: ['joyce2.png'],
                answer: ['Joyce', 'josee', 'jose', 'joycce']
            },
            {
                type: 'open',
                text: 'En wie zei dit dan?',
                reward: 5,
                images: ['femke.png'],
                answer: ['Femke', 'famke', 'louise']
            },
            {
                type: 'open',
                text: 'Wie zei dit?',
                reward: 5,
                images: ['milo.png'],
                answer: ['Milow', 'milo', 'winters', 'cyrus']
            },
            {
                type: 'open',
                text: 'En wie sprak deze historische woorden?',
                reward: 5,
                images: ['lezzler.png'],
                answer: ['Lezzle', 'lester', 'lezzel', 'lezel', 'lardonije']
            },
            {
                type: 'open',
                text: 'Wie zei dit?',
                reward: 5,
                images: ['veerle.png'],
                answer: ['Veerle', 'verl', 'veeerl']
            },
            {
                type: 'open',
                text: 'Wie zei dit?',
                reward: 5,
                images: ['jordi.png'],
                answer: ['Jordi', 'jordai', 'verheul', 'jordie']
            },
            {
                type: 'open',
                text: 'Wie zei dit?',
                reward: 5,
                images: ['janne.png'],
                answer: ['Jean', 'janne', 'fuchs', 'jane']
            },
            {
                type: 'open',
                text: 'Last but not least?',
                reward: 5,
                images: ['carly.png'],
                answer: ['Carly', 'karlijn', 'karly', 'pauk', 'karton', 'viool', 'carlie', 'carlijn']
            }
        ]
    },
    {
        id: 5,
        type: 'Quiz',
        name: 'DE 2020 QUIZ',
        description: 'Deze quiz gaat over 2020, want er is zoveel leuks gebeurd natuurlijk!',
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
    },
    {
        id: 6,
        type: 'Riser',
        name: 'Minigame: HEBBERIG (max 30)',
        description: 'Als jij en je teamgenoot beide op Stop hebben gedrukt, krijgen jullie het bedrag. Als jullie het eerste zijn tenminste...',
        maxAmount: 40
    },
    {
        id: 7,
        type: 'Riser',
        name: 'Minigame: HEBBERIG (max 50)',
        description: 'Als jij en je teamgenoot beide op Stop hebben gedrukt, krijgen jullie het bedrag. Als jullie het eerste zijn tenminste...',
        maxAmount: 50
    },
    {
        id: 8,
        type: 'Riser',
        name: 'Minigame: HEBBERIG (max 100)',
        description: 'Als jij en je teamgenoot beide op Stop hebben gedrukt, krijgen jullie het bedrag. Als jullie het eerste zijn tenminste...',
        maxAmount: 100
    },
    {
        id: 9,
        type: 'Guesser',
        name: 'Ken je VLEESGENOTEN',
        description: 'We zullen eens zien hoe goed jij je huisgenoten kent...',
        correct: 20,
        allCorrect: 30
    }
];

export default minigames;