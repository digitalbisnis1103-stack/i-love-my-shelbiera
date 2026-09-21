/* =========================================
   LOVE CHECK — EASY CUSTOMIZATION
   Kamu cukup edit bagian ini setiap order.
========================================= */

const CONFIG = {
  senderName: "Keil",
  partnerName: "Shelbiera",

  // Ganti dengan pesan customer.
  secretMessage:
    "thanks a lot for being here. i always feel lucky & gratefull to have u, u really changed my life and always be my mrs. moodbooster forever. stay with me for a long long time ya.",

  // Foto dan musik diletakkan di folder assets.
  photo: "photo.jpg",
  music: "music.mp3",

  // Kamu bisa mengganti kalimat opening.
  openingCopy:
    "15 questions. No cheating. Let's see seberapa kenal kamu sama aku. 👀"
};


/* =========================================
   LOVE CHECK 💙
   Nilai 2 = sangat cocok / benar
   Nilai 1 = masih mungkin
   Nilai 0 = meleset
========================================= */

const QUESTIONS = [

  {
    q: "What does Keil usually call you?",
    a: [
      ["Baby", 0],
      ["Honey", 0],
      ["Love", 0],
      ["Ndut / Sayang", 2]
    ]
  },

  {
    q: "Who made the first move?",
    a: [
      ["Keil", 0],
      ["Shelby", 0],
      ["Both of us", 0],
      ["It just happened naturally", 2]
    ]
  },

  {
    q: "When did we officially start dating?",
    a: [
      ["29 July", 0],
      ["17 August", 0],
      ["27 July", 0],
      ["21 August", 2]
    ]
  },

  {
    q: "Who said “I love you” first?",
    a: [
      ["Keil", 0],
      ["Shelby", 2],
      ["We said it at the same time", 1],
      ["Neither of us remembers", 0]
    ]
  },

  {
    q: "What is something Keil always needs from you?",
    a: [
      ["Reassurance", 1],
      ["Attention", 1],
      ["Affection", 1],
      ["All of the above", 2]
    ]
  },

  {
    q: "Which one describes our relationship the most?",
    a: [
      ["Chaotic", 1],
      ["Soft and wholesome", 1],
      ["Literally full with love", 1],
      ["All of the above", 2]
    ]
  },

  {
    q: "What did Keil call Shelby for the first time?",
    a: [
      ["Kimpul", 0],
      ["Kentangtingtung", 0],
      ["Eby", 2],
      ["Shelby", 0]
    ]
  },

  {
    q: "Who confessed first?",
    a: [
      ["Keil", 2],
      ["Shelby", 0],
      ["Josep", 0],
      ["Jepung", 0]
    ]
  },

  {
    q: "Which game did Keil and Shelby play together for the very first time?",
    a: [
      ["Plato", 0],
      ["Judol", 0],
      ["Uno", 2],
      ["Ludo", 0]
    ]
  },

  {
    q: "When was our first kiss?",
    a: [
      ["29 July", 0],
      ["31 July", 0],
      ["30 July", 2],
      ["1 August", 0]
    ]
  },

  {
    q: "What was the first movie/show we watched together?",
    a: [
      ["Shinchan", 0],
      ["Jadoo", 2],
      ["Spiderman", 0],
      ["Sule dan Andre", 0]
    ]
  },

  {
    q: "What was our first inside joke?",
    a: [
      ["Aisyah dan Maulana", 0],
      ["Couple santri mengaji date", 0],
      ["So multo :(", 0],
      ["Keil... aku cuma mau bilang, I love you", 2]
    ]
  },

  {
    q: "What's our love language?",
    a: [
      ["Words of affirmation", 1],
      ["Quality time", 1],
      ["Receiving gifts", 1],
      ["All of that", 2]
    ]
  },

  {
    q: "What was the first nickname Shelby used for Keil?",
    a: [
      ["Athan Keil", 0],
      ["Abang tukang bakso", 0],
      ["Mr. Dropdead Gorgeous", 2],
      ["Etang", 0]
    ]
  },

  {
    q: "What makes Keil instantly happy?",
    a: [
      ["Damir", 0],
      ["Josep", 0],
      ["Shelby, always Shelby", 2],
      ["Sera bau acem", 0]
    ]
  }

];


let currentQuestion = 0;
let totalScore = 0;
let correctCount = 0;
let musicPlaying = false;

const $ = (id) => document.getElementById(id);


function showScreen(id){
  document.querySelectorAll(".screen").forEach(s =>
    s.classList.remove("active")
  );

  $(id).classList.add("active");

  window.scrollTo({
    top: 0,
    behavior: "instant"
  });
}


function renderQuestion(){

  const item = QUESTIONS[currentQuestion];

  $("questionTag").textContent =
    `QUESTION ${String(currentQuestion + 1).padStart(2,"0")}`;

  $("questionCounter").textContent =
    `${String(currentQuestion + 1).padStart(2,"0")} / ${QUESTIONS.length}`;

  $("progressFill").style.width =
    `${(currentQuestion / QUESTIONS.length) * 100}%`;

  $("questionText").textContent = item.q;

  const answers = $("answers");
  answers.innerHTML = "";

  item.a.forEach((choice, index) => {

    const button = document.createElement("button");

    button.className = "answer";

    button.innerHTML = `
      <span class="answer-letter">
        ${String.fromCharCode(65 + index)}
      </span>

      <span class="answer-text">
        ${choice[0]}
      </span>
    `;

    button.addEventListener("click", () =>
      chooseAnswer(choice[1])
    );

    answers.appendChild(button);
  });
}


function chooseAnswer(score){

  totalScore += score;

  if(score === 2){
    correctCount++;
  }

  currentQuestion++;

  if(currentQuestion < QUESTIONS.length){

    renderQuestion();

  }else{

    $("progressFill").style.width = "100%";

    showCalculating();
  }
}


function showCalculating(){

  showScreen("calculating");

  const texts = [
    "Ngitung seberapa kenal kamu sama aku... 🥹",
    "Mengingat kembali semua cerita random...",
    "Checking your relationship memory...",
    "Okay... we got the result. 👀"
  ];

  let i = 0;

  $("loadingText").textContent = texts[0];

  const interval = setInterval(() => {

    i++;

    if(i < texts.length){
      $("loadingText").textContent = texts[i];
    }

  }, 650);


  setTimeout(() => {

    clearInterval(interval);

    showResult();

  }, 2750);
}


function showResult(){

  const maxScore = QUESTIONS.length * 2;

  const percent =
    Math.round((totalScore / maxScore) * 100);

  let title, copy, color;


  if(percent >= 85){

    title = "The “I Actually Listen” Partner";

    copy =
      `thanks a lot for playing the games.`;

    color = "var(--green)";


  }else if(percent >= 65){

    title = "Pretty Good, But... 👀";

    copy =
      `thanks a lot for playing the games.`;

    color = "var(--yellow)";


  }else{

    title = "How Are You Dating Me? 😭";

    copy =
      `thanks a lot for playing the games.`;

    color = "var(--red)";
  }


  $("resultGreeting").textContent =
    `how much do u know me... 👀`;


  $("score").textContent = `${percent}%`;


  $("resultFraction").textContent =
    `${correctCount} / ${QUESTIONS.length} answers matched`;


  $("resultTitle").textContent = title;

  $("resultCopy").textContent = copy;


  $("scoreCircle").style.background =
    `conic-gradient(
      ${color} 0 ${percent}%,
      rgba(255,255,255,.08) ${percent}% 100%
    )`;


  const memory =
    Math.min(99, Math.max(35, percent + 3));

  const understanding =
    Math.min(99, Math.max(35, percent - 2));

  const attention =
    Math.min(99, Math.max(35, percent + 5));


  $("memoryStat").textContent = `${memory}%`;

  $("understandingStat").textContent =
    `${understanding}%`;

  $("attentionStat").textContent =
    `${attention}%`;


  showScreen("result");


  if(percent >= 85){
    confetti();
  }
}


function openMessage(){

  $("senderLabel").textContent =
    CONFIG.senderName.toUpperCase();

  $("senderSignature").textContent =
    CONFIG.senderName;

  $("partnerMessageName").textContent =
    CONFIG.partnerName;

  $("secretMessage").textContent =
    CONFIG.secretMessage;


  const img = $("couplePhoto");

  img.src = CONFIG.photo;

  img.onerror = () => {
    img.src = "assets/photo-placeholder.svg";
  };


  showScreen("message");
}


function startMusic(){

  const audio =
    document.getElementById("bgMusic");


  if(!audio){

    console.error(
      "Audio bgMusic tidak ditemukan!"
    );

    return;
  }


  audio.volume = 0.45;

  audio.muted = false;


  audio.play()

    .then(() => {

      musicPlaying = true;


      const musicBtn =
        document.getElementById("musicBtn");

      const musicStatus =
        document.getElementById("musicStatus");


      if(musicBtn)
        musicBtn.textContent = "🔊";


      if(musicStatus)
        musicStatus.textContent = "Music on";


      console.log(
        "MUSIK BERHASIL DIPUTAR"
      );

    })


    .catch((error) => {

      musicPlaying = false;


      console.error(
        "MUSIK GAGAL DIPUTAR:",
        error
      );


      const musicStatus =
        document.getElementById("musicStatus");


      if(musicStatus){
        musicStatus.textContent = "Tap 🎵";
      }

    });
}


function toggleMusic(){

  const audio =
    document.getElementById("bgMusic");


  if(!audio) return;


  if(musicPlaying){

    audio.pause();

    musicPlaying = false;

    $("musicBtn").textContent = "🎵";

    $("musicStatus").textContent = "Music off";


  }else{

    audio.play()

      .then(() => {

        musicPlaying = true;

        $("musicBtn").textContent = "🔊";

        $("musicStatus").textContent = "Music on";

      })


      .catch((error) => {

        console.error(
          "Gagal play musik:",
          error
        );

        toast(
          "Tap tombol musik sekali lagi 🎵"
        );

      });
  }
}


async function shareResult(){

  const score =
    $("score").textContent;

  const title =
    $("resultTitle").textContent;


  const text =
`🚦 LOVE CHECK RESULT 💗

${CONFIG.partnerName} baru aja selesai Love Check!

💗 Score: ${score}
🏆 ${title}

Berani cek kamu juga? 👀`;


  const url =
    window.location.href;


  const whatsapp =
    "https://wa.me/?text=" +
    encodeURIComponent(
      text + "\n" + url
    );


  if(navigator.share){

    try{

      await navigator.share({
        title: "LOVE CHECK 💗",
        text,
        url
      });

      return;

    }catch(e){}
  }


  window.open(
    whatsapp,
    "_blank",
    "noopener"
  );
}


function resetQuiz(){

  currentQuestion = 0;

  totalScore = 0;

  correctCount = 0;

  renderQuestion();

  showScreen("quiz");
}


function toast(message){

  const t = $("toast");

  t.textContent = message;

  t.classList.add("show");


  setTimeout(() => {

    t.classList.remove("show");

  }, 2400);
}


function confetti(){

  const pieces = [
    "#ff7eaa",
    "#65e7a6",
    "#ffd76b",
    "#ffffff"
  ];


  for(let i = 0; i < 65; i++){

    const c =
      document.createElement("i");

    c.className = "confetti";

    c.style.left =
      Math.random() * 100 + "vw";

    c.style.background =
      pieces[
        Math.floor(
          Math.random() * pieces.length
        )
      ];

    c.style.animationDelay =
      Math.random() * .7 + "s";

    document.body.appendChild(c);


    setTimeout(() => {
      c.remove();
    }, 3200);
  }
}


/* Setup */

$("senderOpening").textContent =
  CONFIG.senderName;

$("opening-copy") &&
  ($("opening-copy").textContent =
    CONFIG.openingCopy);

$("couplePhoto").src =
  CONFIG.photo;


$("openBtn").addEventListener(
  "click",
  () => {

    startMusic();

    renderQuestion();

    showScreen("quiz");

  }
);


$("musicBtn").addEventListener(
  "click",
  toggleMusic
);

$("messageBtn").addEventListener(
  "click",
  openMessage
);

$("shareBtn").addEventListener(
  "click",
  shareResult
);

$("restartBtn").addEventListener(
  "click",
  resetQuiz
);


/* Prevent accidental form-like zooming / selection on answer buttons */

document.addEventListener(
  "gesturestart",
  e => e.preventDefault()
);