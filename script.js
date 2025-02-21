document.addEventListener("DOMContentLoaded", () => {
    let mode = "reverse";

    const toggleModeBtn = document.getElementById("menuButton");
    const modeMenu = document.getElementById("modeMenu");
    const inputText = document.getElementById("inputText");
    const outputText = document.getElementById("outputText");
    const modeTitle = document.getElementById("modeTitle");
    const convertBtn = document.getElementById("convertBtn");

    toggleModeBtn.addEventListener("click", () => {
        modeMenu.classList.toggle("hidden");
    });

    function changeMode(newMode) {
        mode = newMode;
        modeTitle.textContent = newMode.charAt(0).toUpperCase() + newMode.slice(1);
        inputText.placeholder = `Enter ${newMode} text...`;
        outputText.value = "";
        modeMenu.classList.add("hidden");
    }

    const encodeDecodeMap = {
        reverse: (text) => text.split('').reverse().join(''),
        binary: (text) => text.split('').map(char => char.charCodeAt(0).toString(2).padStart(8, "0")).join(" "),
        morse: (text) => {
            const morseCode = {
                'a': '.-', 'b': '-...', 'c': '-.-.', 'd': '-..', 'e': '.', 'f': '..-.', 'g': '--.', 'h': '....',
                'i': '..', 'j': '.---', 'k': '-.-', 'l': '.-..', 'm': '--', 'n': '-.', 'o': '---', 'p': '.--.',
                'q': '--.-', 'r': '.-.', 's': '...', 't': '-', 'u': '..-', 'v': '...-', 'w': '.--', 'x': '-..-',
                'y': '-.--', 'z': '--..', '1': '.----', '2': '..---', '3': '...--', '4': '....-', '5': '.....',
                '6': '-....', '7': '--...', '8': '---..', '9': '----.', '0': '-----', '.': '.-.-.-', ',': '--..--',
                '?': '..--..', "'": '.----.', '!': '-.-.--', '/': '-..-.', '(': '-.--.', ')': '-.--.-', '&': '.-...',
                ':': '---...', ';': '-.-.-.', '=': '-...-', '+': '.-.-.', '-': '-....-', '_': '..--.-', '"': '.-..-.',
                '$': '...-..-', '@': '.--.-.'
            };
            return text.toLowerCase().split('').map(char => morseCode[char] || char).join(' ');
        },
        atbash: (text) => text.split('').map((char) => {
            if (char.match(/[a-zA-Z]/)) {
                const charCode = char.toLowerCase().charCodeAt(0);
                const reversedCharCode = 219 - charCode;
                return String.fromCharCode(reversedCharCode);
            }
            return char;
        }).join(''),
        base64: (text) => btoa(text),
        hexadecimal: (text) => text.split('').map(char => char.charCodeAt(0).toString(16)).join(" "),
        leetspeak: (text) => text.replace(/[aA]/g, "4").replace(/[eE]/g, "3").replace(/[lL]/g, "1").replace(/[tT]/g, "7").replace(/[oO]/g, "0"),
        rot13: (text) => text.replace(/[a-zA-Z]/g, (char) => {
            const charCode = char.charCodeAt(0);
            const base = char <= 'Z' ? 65 : 97;
            return String.fromCharCode((charCode - base + 13) % 26 + base);
        }),
        book: (text) => {
            const bookCipher = { 'a': '1', 'b': '2', 'c': '3' };
            return text.toLowerCase().split('').map(char => bookCipher[char] || char).join('');
        },
        bacon: (text) => {
            const baconCipher = {
                'a': 'AAAAA', 'b': 'AAAAB', 'c': 'AAABA', 'd': 'AAABB', 'e': 'AABAA', 'f': 'AABAB', 'g': 'AABBA', 'h': 'AABBB',
                'i': 'ABAAB', 'j': 'ABAAC', 'k': 'ABABA', 'l': 'ABABB', 'm': 'ABBAA', 'n': 'ABBAB', 'o': 'ABBBA', 'p': 'ABBBB',
                'q': 'BAAAA', 'r': 'AAAAB', 's': 'AAABA', 't': 'AAABB', 'u': 'AABAA', 'v': 'AABAB', 'w': 'AABBA', 'x': 'AABBB',
                'y': 'ABAAB', 'z': 'ABAAC'
            };
            return text.toLowerCase().split('').map(char => baconCipher[char] || char).join(' ');
        },
        mix: (text) => {
            const cipherModes = ['reverse', 'binary', 'morse', 'atbash', 'base64', 'hexadecimal', 'leetspeak', 'rot13', 'book', 'bacon'];
            return text.split('').map(char => {
                const randomMode = cipherModes[Math.floor(Math.random() * cipherModes.length)];
                return encodeDecodeMap[randomMode](char);
            }).join(' ');
        }
    };

    convertBtn.addEventListener("click", () => {
        const input = inputText.value.trim();
        if (input) {
            outputText.value = encodeDecodeMap[mode](input);
        } else {
            outputText.value = "";
        }
    });

    outputText.value = encodeDecodeMap.reverse(inputText.value);
    window.changeMode = changeMode;
});
