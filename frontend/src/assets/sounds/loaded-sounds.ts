import { Howl } from 'howler';

const sounds = {
    correct: new Howl({ src: [require('./correct.mp3')] }),
    wrong: new Howl({ src: [require('./wrong.mp3')] }),
    woosh: new Howl({ src: [require('./woosh.mp3')] })
}

export default sounds;