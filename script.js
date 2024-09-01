const text = document.getElementById("textToConvert");
const convertBtn = document.getElementById("convertBtn");
let femaleVoice = null;
function setFemaleVoice() {
    const speechSynth = window.speechSynthesis;
    const voices = speechSynth.getVoices();
    femaleVoice = voices.find(voice => 
        voice.name.includes('Google UK English Female') || 
        voice.name.includes('Microsoft Zira') || 
        voice.name.includes('Samantha')
    );
    if (!femaleVoice) {
        femaleVoice = voices.find(voice => voice.name.toLowerCase().includes('female'));
    }
    if (!femaleVoice) {
        femaleVoice = voices[0];
    }
}

window.speechSynthesis.onvoiceschanged = setFemaleVoice;

convertBtn.addEventListener('click', function () {
    const speechSynth = window.speechSynthesis;
    const enteredText = text.value;
    const error = document.querySelector('.error-para');

    if (!speechSynth.speaking && !enteredText.trim().length) {
        error.textContent = `Nothing to Convert! `;
    } else if (!speechSynth.speaking && enteredText.trim().length) {
        error.textContent = "";

        const newUtter = new SpeechSynthesisUtterance(enteredText);

        if (femaleVoice) {
            newUtter.voice = femaleVoice;
        }

        speechSynth.speak(newUtter);
        convertBtn.textContent = "Sound is Playing...";
        newUtter.onend = function() {
            convertBtn.textContent = "Play Converted Sound";
        };
    }
});
