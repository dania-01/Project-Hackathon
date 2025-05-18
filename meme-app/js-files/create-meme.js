firebase.initializeApp({
  apiKey: "AIzaSyCExlLEC7sy9KAnLzDvIgaOxGm7joxmRwA",
  authDomain: "memebattle-fe1b6.firebaseapp.com",
  projectId: "memebattle-fe1b6",
  storageBucket: "memebattle-fe1b6.appspot.com",
  messagingSenderId: "463661071981",
  appId: "1:463661071981:web:4f0875c124a5726d49b4df"
});

const db = firebase.firestore();
const storage = firebase.storage();
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const fontSizeInput = document.getElementById("fontSize");
const fontSizeVal = document.getElementById("fontSizeVal");

let selectedImageURL = "";
let uploadedFile = null;

fontSizeInput.oninput = () => {
  fontSizeVal.textContent = fontSizeInput.value + "px";
  drawMeme();
};

document.getElementById("uploadInput").onchange = (e) => {
  const file = e.target.files[0];
  if (!file) return;
  uploadedFile = file;
  const reader = new FileReader();
  reader.onload = (event) => {
    selectedImageURL = event.target.result;
    clearActive();
    drawMeme();
  };
  reader.readAsDataURL(file);
};

document.querySelectorAll(".template-img").forEach(img => {
  img.onclick = () => {
    clearActive();
    img.classList.add("active-template");
    selectedImageURL = img.src;
    uploadedFile = null;
    drawMeme();
  };
});

function clearActive() {
  document.querySelectorAll(".template-img").forEach(img => img.classList.remove("active-template"));
}

function drawMeme() {
  if (!selectedImageURL) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#aaa';
    ctx.textAlign = 'center';
    ctx.font = '20px Arial';
    ctx.fillText("Upload or choose a template", canvas.width / 2, canvas.height / 2);
    return;
  }

  const image = new Image();
  image.crossOrigin = "anonymous";
  image.onload = () => {
    canvas.width = Math.min(image.width, 600);
    canvas.height = Math.min(image.height, 450);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

    const fontSize = parseInt(fontSizeInput.value);
    ctx.font = `${fontSize}px Impact, sans-serif`;
    ctx.textAlign = "center";
    ctx.fillStyle = document.getElementById("textColor").value;
    ctx.lineWidth = 3;

    const top = document.getElementById("topText").value.toUpperCase();
    const bottom = document.getElementById("bottomText").value.toUpperCase();
    const outline = document.getElementById("outlineSwitch").checked;

    if (outline) ctx.strokeStyle = "black";
    if (top) {
      if (outline) ctx.strokeText(top, canvas.width / 2, fontSize + 10);
      ctx.fillText(top, canvas.width / 2, fontSize + 10);
    }
    if (bottom) {
      if (outline) ctx.strokeText(bottom, canvas.width / 2, canvas.height - 10);
      ctx.fillText(bottom, canvas.width / 2, canvas.height - 10);
    }
  };
  image.src = selectedImageURL;
}

async function fetchMeme() {
  try {
    const res = await fetch("https://api.imgflip.com/get_memes");
    const json = await res.json();
    const meme = json.data.memes[Math.floor(Math.random() * json.data.memes.length)];
    selectedImageURL = meme.url;
    document.getElementById("title").value = meme.name;
    clearActive();
    uploadedFile = null;
    drawMeme();
  } catch {
    Swal.fire("Error", "Failed to fetch meme.", "error");
  }
}

async function uploadImage(file) {
  const ref = storage.ref().child("memes/" + Date.now() + "_" + file.name);
  const snap = await ref.put(file);
  return await snap.ref.getDownloadURL();
}

document.getElementById("memeForm").onsubmit = async (e) => {
  e.preventDefault();
  if (!selectedImageURL) return Swal.fire("Oops", "Select or upload an image", "warning");
  Swal.showLoading();
  try {
    const url = uploadedFile ? await uploadImage(uploadedFile) : selectedImageURL;
    await db.collection("memes").add({
      title: document.getElementById("title").value,
      topText: document.getElementById("topText").value,
      bottomText: document.getElementById("bottomText").value,
      fontSize: fontSizeInput.value,
      textColor: document.getElementById("textColor").value,
      outline: document.getElementById("outlineSwitch").checked,
      tags: document.getElementById("tags").value,
      imageUrl: url,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
    Swal.fire("Success", "Meme created successfully!", "success");
    resetForm();
  } catch (error) {
    Swal.fire("Error", "Failed to create meme.", "error");
  }
};

function resetForm() {
  document.getElementById("memeForm").reset();
  selectedImageURL = "";
  uploadedFile = null;
  clearActive();
  drawMeme();
}

function generateRandomCaption() {
  const captions = [
    "When you realize...",
    "That awkward moment when...",
    "Just another Monday...",
    "When you see the price tag...",
    "Me every Friday night..."
  ];
  document.getElementById("topText").value = captions[Math.floor(Math.random() * captions.length)];
  drawMeme();
}

function downloadMeme() {
  const link = document.createElement('a');
  link.download = 'meme.png';
  link.href = canvas.toDataURL();
  link.click();
}

function surpriseMe() {
  fetchMeme();
  generateRandomCaption();
}