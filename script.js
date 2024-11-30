const canvas = document.getElementById("wheelCanvas");
const ctx = canvas.getContext("2d");
const segments = 6; // Anzahl der Segmente
const segmentAngle = 360 / segments;
const colors = ["#f9c74f", "#f9844a", "#90be6d", "#43aa8b", "#4d908e", "#577590"];
const labels = [
  "Wellness 🧖",
  "Kuss 😘",
  "Cash 💵",
  "Berlintrip 🏙️",
  "Hauptpreis 🎁",
  "Umarmung 🤗",

];
const mainPrizeIndex = 0; // Hauptpreis auf Segment 1 (Index 0)
let isSpinning = false;

function drawWheel() {
  for (let i = 0; i < segments; i++) {
    ctx.beginPath();
    ctx.moveTo(150, 150);
    ctx.arc(150, 150, 150, (i * segmentAngle * Math.PI) / 180, ((i + 1) * segmentAngle * Math.PI) / 180);
    ctx.closePath();
    ctx.fillStyle = colors[i];
    ctx.fill();
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 2;
    ctx.stroke();

    // Text
    ctx.save();
    ctx.translate(150, 150);
    ctx.rotate(((i + 0.5) * segmentAngle * Math.PI) / 180);
    ctx.textAlign = "center";
    ctx.fillStyle = "#000";
    ctx.font = "14px Arial";
    ctx.fillText(labels[i], 100, 10);
    ctx.restore();
  }
}

function spinWheel() {
  if (isSpinning) return;

  isSpinning = true;
  const spinAngle = 360 * 5 + (360 - mainPrizeIndex * segmentAngle); // Dreht 5 Umdrehungen und landet auf dem Hauptpreis
  const spinTime = 5000; // Dreht 5 Sekunden

  let start = null;

  function animate(timestamp) {
    if (!start) start = timestamp;
    const elapsed = timestamp - start;

    const currentAngle = Math.min((elapsed / spinTime) * spinAngle, spinAngle);
    canvas.style.transform = `rotate(${currentAngle}deg)`;

    if (elapsed < spinTime) {
      requestAnimationFrame(animate);
    } else {
      setTimeout(() => {
        alert(`Herzlichen Glückwunsch! Du hast den Hauptpreis 🎁 gewonnen!`);
        isSpinning = false;
  window.location.href = "https://flights.booking.com/flights/NUE.AIRPORT-HAN.AIRPORT/?type=ONEWAY&adults=2&cabinClass=ECONOMY&children=&from=NUE.AIRPORT&to=HAN.AIRPORT&fromCountry=DE&toCountry=VN&fromLocationName=Flughafen+Nürnberg&toLocationName=Flughafen+Hanoi&depart=2025-05-12&sort=BEST&travelPurpose=leisure&aid=2409178&label=hanoi-86z1VhLtsh3lvshc7J8hdQS690718385005%3Apl%3Ata%3Ap1%3Ap2%3Aac%3Aap%3Aneg%3Afi%3Atikwd-359562954702%3Alp9042612%3Ali%3Adec%3Adm&gclid=CjwKCAiAjKu6BhAMEiwAx4UsAsMWQluMhjAsSwxRWymn2SMxd-2lN_skoLjSj9n2tPHWd_UVPGVfPRoCBpQQAvD_BwE";
          
      }, 1000);
    }
  }

  requestAnimationFrame(animate);
}

drawWheel();
document.getElementById("spinButton").addEventListener("click", spinWheel);
