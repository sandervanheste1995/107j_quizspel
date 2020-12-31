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
        name: 'DE NIEUWJAARSQUIZ',
        description: 'Deze quiz gaat over kerst en oud-en-nieuw gerelateerde zaken. En wat dingen over 2020, wat dat was een geweldig jaar natuurlijk!',
        screens: [
            {
                type: 'info',
                text: 'Hier volgt een filmpje, en daarna een vraag erover!',
                subtext: 'Let op, hij wordt maar 1 keer afgespeeld...',
                videos: ['medley.mp4']
            },
            {
                type: 'multiplechoice',
                text: 'Welke impressie kwam niet in het filmpje voor?',
                subtext: '10 euro voor het goede antwoord',
                reward: 10,
                answers: [
                    {
                        text: 'Frank Sinatra'
                    },
                    {
                        text: 'Amy Whinehouse'
                    },
                    {
                        correct: true,
                        text: 'Whitney Houston'
                    },
                    {
                        text: 'Prince'
                    }
                ]
            },
            {
                type: 'open',
                text: 'Hoe heet de nieuwe Disney Pixar film die vorige week is uitgekomen?',
                subtext: '5 euris voor het antwoord',
                reward: 5,
                answer: ['Soul', 'saul']
            },
            {
                type: 'info',
                videos: ['soul.jpg']
            },
            {
                type: 'multiplechoice',
                text: 'Kies de goede volgorde van wanneer deze kerstliedjes uitkwamen',
                subtext: '10 ekken voor het goede antwoord',
                sounds: ['lastchristmas.mp3', 'letissnow.mp3','shahnthechristmassong.mp3','thankgodits.mp3'],
                answers: [
                    {
                        correct: true,
                        text: '2, 4, 1, 3'
                    },
                    {
                        text: '4, 1, 2, 3'
                    },
                    {
                        text: '2, 3, 4, 1'
                    },
                    {
                        text: '4, 2, 1, 3'
                    }
                ]
            },
            {
                type: 'multiplechoice',
                text: 'Welke van de volgende films bestaat niet?',
                subtext: '5 euro voor elk team die dit weet',
                images: ['netflix_movies.jpg'],
                reward: 5,
                answers: [
                    {
                        text: 'Grumpy Cat\'s Worst Christmas Ever'
                    },
                    {
                        text: 'Santa and The Ice Cream Bunny'
                    },
                    {
                        correct: true,
                        text: 'Christmas Wedding Planner: Planned again'
                    },
                    {
                        text: 'A Cinderella Story: Christmas Wish'
                    }
                ]
            },
            {
                type: 'multiplechoice',
                text: 'Tijdens corona werd heel veel internet gekeken. Wat is de meest bekeken youtube video momenteel?',
                subtext: 'voor 10 vleeseuro',
                reward: 10,
                answers: [
                    {
                        text: 'Shape of You'
                    },
                    {
                        text: 'Despacito'
                    },
                    {
                        correct: true,
                        text: 'Baby Shark Dance'
                    },
                    {
                        text: 'Bath Song'
                    },
                    {
                        text: 'Gangnam Style'
                    }
                ]
            },
            {
                type: 'info',
                text: 'fucking 7.5 miljard mensen, dat slaat toch nergens meer op, wat een kutvideo ook teringzooi',
                videos: ['babyshark.mp4']
            },
            {
                type: 'multiplechoice',
                text: 'Hoeveel geregistreerde coronabesmettingen zijn er tot nu toe in totaal in Nederland geweest?',
                subtext: 'Ik had me voorgenomen om geen coronavragen te stellen, maar ik heb geen inspiratie meer verdorie, dus toch maar. Success ermee',
                images: ['corona.jpg'],
                reward: 5,
                answers: [
                    {
                        text: '15'
                    },
                    {
                        text: '956 duizend'
                    },
                    {
                        text: '682 duizend'
                    },
                    {
                        correct: true,
                        text: '787 duizend'
                    }
                ]
            },
            {
                type: 'info',
                text: 'Nu volgen een paar waar / niet waar vragen, voor 2 euro per stuk'
            },
            {
                type: 'multiplechoice',
                text: 'Verschillende Iraanse artsen hebben aangeraden om olie op je anus te smeren om het virus te genezen',
                images: ['anus.jpg'],
                reward: 2,
                answers: [
                    {
                        text: 'Waar',
                        correct: true
                    },
                    {
                        text: 'Niet waar'
                    },
                ]
            },
            {
                type: 'multiplechoice',
                text: 'Als protest tegen corona hebben verschillende plekken in Amerika een anti-coronabeleid ingevoerd: mét mondkapje kom je dan niet binnen.',
                images: ['mondkapje.png'],
                reward: 2,
                answers: [
                    {
                        text: 'Waar'
                    },
                    {
                        correct: true,
                        text: 'Niet waar'
                    },
                ]
            },
            {
                type: 'multiplechoice',
                text: 'Danny Vera is vorige week voor de tweede keer vader geworden',
                reward: 2,
                answers: [
                    {
                        text: 'Waar'
                    },
                    {
                        correct: true,
                        text: 'Niet waar'
                    },
                ]
            },
            {
                type: 'info',
                text: 'Hij is voor de eerste keer vader geworden, niet de tweede keer. HAHAHAH JEZUS ER IS VAST WEL IEMAND INGETRAP MAN WAT GRAPPIG ARSHIGUARS IULG'
            },
            {
                type: 'open',
                text: 'Wat is het nummer dat dit jaar het meest gestegen is in de top 2000?',
                subtext: '5 euris voor het antwoord',
                reward: 5,
                answer: ['Uncharted', 'ungarted', 'unchartet', 'unchfarted']
            },
            {
                type: 'info',
                text: 'Uncharted is maar liefst 1635 plekken gestegen!'
            },
            {
                type: 'multiplechoice',
                text: 'Welk van de volgende nummers staat niet in de top 50 van de top 2000?',
                images: ['top2000.jpg'],
                reward: 10,
                answers: [
                    {
                        text: 'Oceaan'
                    },
                    {
                        text: 'In The Air Tonight'
                    },
                    {
                        text: 'Purple Rain'
                    },
                    {
                        correct: true,
                        text: 'Killing In The Name'
                    }
                ]
            },
            {
                type: 'info',
                text: 'Killing in the name staat namelijk op 51. En hiermee eindig ik deze quiz, want nu wordt het wel erg flauw allemaal'
            },
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