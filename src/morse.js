const dash = new Audio(chrome.runtime.getURL('dash.mp3'));
const dot = new Audio(chrome.runtime.getURL('dot.mp3'));

dash.playbackRate = 2;
dot.playbackRate = 2;
dot.loop = false;
dash.loop = false;

var _map = {
    'a': '.-',
    'b': '-...',
    'c': '-.-.',
    'd': '-..',
    'e': '.',
    'f': '..-.',
    'g': '--.',
    'h': '....',
    'i': '..',
    'j': '.---',
    'k': '-.-',
    'l': '.-..',
    'm': '--',
    'n': '-.',
    'o': '---',
    'p': '.--.',
    'q': '--.-',
    'r': '.-.',
    's': '...',
    't': '-',
    'u': '..-',
    'v': '...-',
    'w': '.--',
    'x': '-..-',
    'y': '-.--',
    'z': '--..',
    '1': '.----',
    '2': '..---',
    '3': '...--',
    '4': '....-',
    '5': '.....',
    '6': '-....',
    '7': '--...',
    '8': '---..',
    '9': '----.',
    '0': '-----',
    ' ': '  '
};

const _mapMorseToLetter = {
    '.-': 'a',
    '-...': 'b',
    '-.-.': 'c',
    '-..': 'd',
    '.': 'e',
    '..-.': 'f',
    '--.': 'g',
    '....': 'h',
    '..': 'i',
    '.---': 'j',
    '-.-': 'k',
    '.-..': 'l',
    '--': 'm',
    '-.': 'n',
    '---': 'o',
    '.--.': 'p',
    '--.-': 'q',
    '.-.': 'r',
    '...': 's',
    '-': 't',
    '..-': 'u',
    '...-': 'v',
    '.--': 'w',
    '-..-': 'x',
    '-.--': 'y',
    '--..': 'z',
    '.----': '1',
    '..---': '2',
    '...--': '3',
    '....-': '4',
    '.....': '5',
    '-....': '6',
    '--...': '7',
    '---..': '8',
    '----.': '9',
    '-----': '0',
    ' ': '',
    '': ''
}

const morse = {
    encode: (text) => {
        let encodedText = "";
        for (let char of text.toLowerCase()) {
            if (char == " ")
                encodedText += _map[char]
            else
                encodedText += _map[char] + " "
        }

        return encodedText.substring(0, encodedText.length - 1)
    },
    decode: (text) => {
        let morse_words = text.split(/\s\s|\s\s\s|\//g);

        let textDecoded = "";
        for (let word of morse_words) {
            let chars = word.split(" ");
            for (let char of chars) {
                textDecoded += _mapMorseToLetter[char]
            }
            textDecoded += " ";
        }
        return textDecoded.substring(0, textDecoded.length - 1);
    },
    isMorseCode: (text) => {
        let morse_words = text.split(/\s\s|\s\s\s|\//g);

        for (let word of morse_words) {
            let chars = word.split(" ");
            let isMorse = chars.every((char) => char in _mapMorseToLetter);
            console.log(chars, isMorse)
            if (isMorse === false) return false;

        }

        return true;
    },
    translate(text) {
        if (this.isMorseCode(text)) {
            return this.decode(text);
        }

        return this.encode(text);
    },
    playMorse(text) {
        let words = text.split(/\s\s/);
        console.log(words);
        let first = null;

        for (let word of words) {


            for (let i = 0; i < word.length - 1; i++) {

                let sound = getSound(word[i]);
                sound.onended = () => {
                    let sound2 = getSound(word[i + 1]);
                    sound2.play();
                };

                if (first == null) {
                    first = sound;
                }
            }
        }

        first.play();
    }
}

const getSound = (dashOrDot) => {
    if (dashOrDot == ".") {
        const dot = new Audio(chrome.runtime.getURL('dot.mp3'));
        dot.playbackRate = 2;
        dot.loop = false;

        return dot;

    } else if (dashOrDot == "-") {
        const dash = new Audio(chrome.runtime.getURL('dash.mp3'));
        dash.playbackRate = 2;
        dash.loop = false;

        return dash;
    } else {
        const space = new Audio(chrome.runtime.getURL('space.mp3'));
        space.playbackRate = 2;
        space.loop = false;

        return space;
    }
}

export default morse;