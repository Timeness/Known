document.addEventListener("DOMContentLoaded", () => {
    let mode = "reverse"; // Default mode is Reverse Text

    const toggleModeBtn = document.getElementById("menuButton");
    const modeMenu = document.getElementById("modeMenu");
    const inputText = document.getElementById("inputText");
    const outputText = document.getElementById("outputText");
    const modeTitle = document.getElementById("modeTitle");
    const convertBtn = document.getElementById("convertBtn");

    // Show and hide the mode menu
    toggleModeBtn.addEventListener("click", () => {
        modeMenu.classList.toggle("hidden");
    });

    // Change the mode and update the interface
    function changeMode(newMode) {
        mode = newMode;
        modeTitle.textContent = newMode.charAt(0).toUpperCase() + newMode.slice(1);
        inputText.placeholder = `Enter ${newMode} text...`;
        outputText.value = ""; // Clear output
        modeMenu.classList.add("hidden"); // Hide the menu after selection
    }

    // Encoding/Decoding functions
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
                const reversedCharCode = 219 - charCode; // Mapping a-z to z-a
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
            // Book cipher is based on predefined mappings, replace it with your own logic or book dictionary
            const bookCipher = { 'a': '1', 'b': '2', 'c': '3' }; // Example
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
        }
    };

    // Handle conversion when the button is clicked
    convertBtn.addEventListener("click", () => {
        const input = inputText.value.trim();
        if (input) {
            outputText.value = encodeDecodeMap[mode](input);
        } else {
            outputText.value = "";
        }
    });

    // Default to Reverse mode on page load
    outputText.value = encodeDecodeMap.reverse(inputText.value);

    // Expose changeMode function to the menu buttons
    window.changeMode = changeMode;
});
