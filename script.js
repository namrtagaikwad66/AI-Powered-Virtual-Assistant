let btn = document.querySelector("#btn");
let content = document.querySelector("#content");
let voice=document.querySelector("#voice");

function speak(text) {
  let text_speak = new SpeechSynthesisUtterance(text);
  text_speak.rate = 1;
  text_speak.pitch = 1;
  text_speak.volume = 1;
  text_speak.lang = "hi-GB";
  window.speechSynthesis.speak(text_speak);
}

function wishMe() {
  let day = new Date();
  let hours = day.getHours();
  if (hours >= 0 && hours < 12) {
    speak("Good Morning Mam");
  } else if (hours >= 12 && hours < 16) {
    speak("Good afternoon Mam");
  } else {
    speak("Good Evening Mam");
  }
}

window.addEventListener('load', () => {
  wishMe();
});

let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new SpeechRecognition();

recognition.onresult = (event) => {
  let currentIndex = event.resultIndex;
  let transcript = event.results[currentIndex][0].transcript;
  content.innerText = transcript;
  takeCommand(transcript.toLowerCase());
  console.log(event);
};

btn.addEventListener("click", () => {
  recognition.start();
  btn.style.display="none"
  voice.style.display="block"
});

function takeCommand(message) {
  btn.style.display="flex"
  voice.style.display="none"
  
  if (message.includes('hello') || message.includes('hey') || message.includes('hi')) {
    speak('Hello , how can I help you?');
  } 
  else if (message.includes('who are you')) {
    speak('I am virtual assistant, Created by Namrata Mam');
  }
   else if (message.includes('open youtube')) {
    speak("opening youtube...");
    window.open("https://www.youtube.com");
  } 
  else if (message.includes('open google')) {
    speak("opening google...");
    window.open("https://www.google.com");
  } 
  else if (message.includes('open calculator')) {
    speak("opening calculator...");
    window.open("calculator:");
  } 
  else if (message.includes('open instagram')) {
    speak("opening instagram...");
    window.open("https://www.instagram.com");
  } 
  else if (message.includes('open whatsapp')) {
    speak("opening whatsapp...");
    window.open("https://web.whatsapp.com");
  } 
  else if (message.includes('open facebook')) {
    speak("opening facebook...");
    window.open("https://www.facebook.com");
  } 
  else if (message.includes('open linkedin')) {
    speak("opening linkedin...");
    window.open("https://www.linkedin.com");
  }
  else if (message.includes('open github')) {
    speak("opening github...");
    window.open("https://www.github.com");
  }
  else if (message.includes("time")){
    let time=new Date().toLocaleString(undefined,{hour:"numeric",minute:"numeric"})
    speak(time)
  }
  else if (message.includes("date")){
    let date=new Date().toLocaleString(undefined,{day:"numeric",month:"short"})
    speak(date)
  }
  else {
    let searchQuery = encodeURIComponent(message.replace("shipra", "").replace("shifra", "").trim());
    let finalText = "I couldn't find a specific answer, but here's what I found on the internet regarding " + searchQuery;
    speak(finalText);
    window.open(`https://www.google.com/search?q=${searchQuery}`, "_blank");
  }
}

