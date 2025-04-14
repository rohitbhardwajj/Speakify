let val = document.querySelector("#textarea");
let btn = document.querySelector("button");
let select = document.querySelector("#select");

let synth = window.speechSynthesis;
let clutter = '';

function getAllVoices() {
  // Wait for voices to be populated
  synth.onvoiceschanged = () => {
    let voices = synth.getVoices();
    voices.forEach((e) => {
      clutter += `<option value="${e.name}">${e.name}</option>`;
    });
    // Populate the select dropdown
    select.innerHTML = clutter;
  };
}

// Call the function to populate voices on page load
getAllVoices();

function textToSpeech() {
  let speech = new SpeechSynthesisUtterance(val.value);
  let selectedVoice = select.value; // Get selected voice
  let voices = synth.getVoices();

//   Set the selected voice
  let selectedVoiceObj = voices.find((voice) => voice.name === selectedVoice);
  if (selectedVoiceObj) {
    speech.voice = selectedVoiceObj;
  }

//   Set speech properties and speak
//   speech.lang = "en-US";
  synth.speak(speech);
}

btn.addEventListener("click", () => {
  textToSpeech();
});
