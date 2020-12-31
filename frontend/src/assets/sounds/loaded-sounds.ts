import { Howl } from 'howler';

const sounds = {
    correct: new Howl({ src: [require('./correct.mp3')] }),
    wrong: new Howl({ src: [require('./wrong.mp3')] }),
    woosh: new Howl({ src: [require('./woosh.mp3')] }),
    sletjes: new Howl({ src: [require('./sletjes.mp3')]}),
    cash: new Howl({ src: [require('./cash.mp3')]}),
    fail: new Howl({ src: [require('./fail.mp3')]})
}

export default sounds;