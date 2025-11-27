// ----------------- CONFIGURACIÓN -----------------
const formEndpoint = "https://api.sheetmonkey.io/form/ipDA8BqEXxFpA2cm27t3fM";

const questions = [
  {
    text: "¿Cuál es la unidad de carga eléctrica en el Sistema Internacional?",
    options: ["Voltio (V)", "Coulomb (C)", "Amperio (A)", "Ohm (Ω)"],
    answer: 1,
    explanation: "El Coulomb (C) es la unidad de carga eléctrica en el SI."
  },
  {
    text: "¿Qué ley relaciona la corriente, voltaje y resistencia?",
    options: ["Ley de Faraday", "Ley de Newton", "Ley de Ohm", "Ley de Coulomb"],
    answer: 2,
    explanation: "La Ley de Ohm: V = I · R"
  },
  {
    text: "¿Cuál es la carga del electrón?",
    options: ["+1.6×10⁻¹⁹ C", "0 C", "-1.6×10⁻¹⁹ C", "-9.8 m/s²"],
    answer: 2,
    explanation: "El electrón tiene carga negativa −1.6×10⁻¹⁹ C."
  },
  {
    text: "¿Qué magnitud mide la intensidad de corriente?",
    options: ["Voltios", "Coulombs", "Amperios", "Newtons"],
    answer: 2,
    explanation: "La corriente eléctrica se mide en Amperios (A)."
  },
  {
    text: "¿Cuál es la unidad de resistencia eléctrica?",
    options: ["Ohm (Ω)", "Tesla (T)", "Watt (W)", "Henry (H)"],
    answer: 0,
    explanation: "La resistencia eléctrica se mide en Ohmios (Ω)."
  }
];

let shuffledQuestions = [];
let currentIndex = 0;
let score = 0;
let player;

// HTML elementos
const home = document.getElementById("home");
const quiz = document.getElementById("quiz");
const questionContainer = document.getElementById("questionContainer");
const progressText = document.getElementById("progressText");
const progressFill = document.getElementById("progressFill");
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const explanationEl = document.getElementById("explanation");
const validationMsg = document.getElementById("validationMsg");
const nextBtn = document.getElementById("nextBtn");
const resultContainer = document.getElementById("resultContainer");
const historyBody = document.getElementById("historyBody");
const historyEmpty = document.getElementById("historyEmpty");
const scoreInline = document.getElementById("scoreInline");
const playerMeta = document.getElementById("playerMeta");
const scoreEl = document.getElementById("score");

// ----------------- INICIO -----------------
document.getElementById("startBtn").addEventListener("click", () => {
  const name = document.getElementById("playerName").value.trim();
  const career = document.getElementById("playerCareer").value.trim();
  const homeValidation = document.getElementById("homeValidation");

  if (!name || !career) {
    homeValidation.hidden = false;
    return;
  }
  homeValidation.hidden = true;

  player = { name, career };

  if (document.getElementById("shuffleQuestions").checked) {
    shuffledQuestions = [...questions].sort(() => Math.random() - 0.5);
  } else shuffledQuestions = [...questions];

  currentIndex = 0;
  score = 0;
  home.classList.add("hidden");
  loadQuestion();
});

// ----------------- PREGUNTAS -----------------
function loadQuestion() {
  questionContainer.classList.remove("hidden");
  questionContainer.removeAttribute("inert");

  nextBtn.disabled = true;
  explanationEl.classList.add("hidden");

  const q = shuffledQuestions[currentIndex];

  progressText.textContent = `Pregunta ${currentIndex + 1} de ${shuffledQuestions.length}`;
  progressFill.style.width = `${((currentIndex + 1) / shuffledQuestions.length) * 100}%`;

  questionEl.textContent = q.text;

  let opts = [...q.options];
  if (document.getElementById("shuffleOptions").checked)
    opts = opts.sort(() => Math.random() - 0.5);

  optionsEl.innerHTML = "";
  opts.forEach((opt, i) => {
    const idx = q.options.indexOf(opt);
    const label = document.createElement("label");
    label.className = "option";
    label.innerHTML = `
      <input type="radio" name="answer" value="${idx}">
      <span>${opt}</span>
    `;
    label.addEventListener("change", enableNext);
    optionsEl.appendChild(label);
  });

  scoreInline.textContent = `Aciertos: ${score}`;
}

function enableNext() {
  validationMsg.hidden = true;
  nextBtn.disabled = false;
}

nextBtn.addEventListener("click", () => {
  const selected = document.querySelector("input[name='answer']:checked");

  if (!selected) {
    validationMsg.hidden = false;
    return;
  }

  const q = shuffledQuestions[currentIndex];
  const correct = parseInt(selected.value) === q.answer;

  if (correct) {
    score++;
    selected.parentNode.classList.add("correct");
  } else {
    selected.parentNode.classList.add("incorrect");
    optionsEl.children[q.answer].classList.add("correct");
  }

  explanationEl.classList.remove("hidden");
  explanationEl.innerHTML = `<strong>Explicación:</strong><br>${q.explanation}`;

  nextBtn.disabled = true;

  setTimeout(() => {
    currentIndex++;
    if (currentIndex < shuffledQuestions.length) loadQuestion();
    else finishQuiz();
  }, 1600);
});

// ----------------- RESULTADOS -----------------
function finishQuiz() {
  questionContainer.classList.add("hidden");
  resultContainer.classList.remove("hidden");
  resultContainer.removeAttribute("inert");

  const total = shuffledQuestions.length;
  const percent = ((score / total) * 100).toFixed(1);

  // Actualizar título y contenido para pantalla final de estudiantes
  document.getElementById("resultTitle").textContent = "Prueba terminada";
  playerMeta.textContent = `${player.name} – ${player.career}`;
  scoreEl.textContent = `Tu puntaje: ${score}/${total} (${percent}%)`;

  // Ocultar sección de historial para estudiantes
  const historySection = document.getElementById("historySection");
  if (historySection) {
    historySection.classList.add("hidden");
  }

  saveToHistory(player.name, player.career, score, total, percent);
  sendToSheet(player.name, player.career, score, total, percent);
}

// ----------------- HISTORIAL LOCAL -----------------
function saveToHistory(name, career, score, total, percent) {
  const entry = {
    date: new Date().toLocaleString(),
    name, career, score, total, percent
  };
  const data = JSON.parse(localStorage.getItem("history") || "[]");
  data.push(entry);
  localStorage.setItem("history", JSON.stringify(data));
}

function loadHistory() {
  const data = JSON.parse(localStorage.getItem("history") || "[]");
  historyBody.innerHTML = "";
  if (data.length === 0) {
    historyEmpty.classList.remove("hidden");
    document.getElementById("historyTable").classList.add("hidden");
    return;
  }
  historyEmpty.classList.add("hidden");
  document.getElementById("historyTable").classList.remove("hidden");

  data.forEach(row => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${row.date}</td>
      <td>${row.name}</td>
      <td>${row.career}</td>
      <td>${row.score}</td>
      <td>${row.total}</td>
      <td>${row.percent}%</td>
    `;
    historyBody.appendChild(tr);
  });
}

// ----------------- EXPORTAR -----------------
document.getElementById("exportJsonBtn").addEventListener("click", () => {
  download("historial.json", localStorage.getItem("history"));
});

document.getElementById("exportCsvBtn").addEventListener("click", () => {
  const data = JSON.parse(localStorage.getItem("history") || "[]");
  if (!data.length) return;
  const csv = "Fecha,Nombre,Carrera,Aciertos,Total,Porcentaje\n" +
    data.map(r => `${r.date},${r.name},${r.career},${r.score},${r.total},${r.percent}%`).join("\n");
  download("historial.csv", csv);
});

function download(filename, text) {
  const a = document.createElement("a");
  a.href = "data:text/plain;charset=utf-8," + encodeURIComponent(text);
  a.download = filename;
  a.click();
}

// ----------------- LIMPIAR HISTORIAL -----------------
document.getElementById("clearHistoryBtn").addEventListener("click", () => {
  localStorage.removeItem("history");
  loadHistory();
});

// ----------------- VOLVER / REINICIAR -----------------
document.getElementById("restartBtn").addEventListener("click", () => location.reload());
document.getElementById("homeBtn").addEventListener("click", () => location.reload());

// ----------------- ENVÍO A SHEETMONKEY -----------------
const sendStatusEl = document.getElementById("sendStatus");
const restartBtn = document.getElementById("restartBtn");
const homeBtn = document.getElementById("homeBtn");

/**
 * Helper to safely read response body as JSON or text
 */
async function safeText(response) {
  try {
    const text = await response.text();
    try {
      return JSON.parse(text);
    } catch {
      return text;
    }
  } catch {
    return null;
  }
}

/**
 * Generates a UUID for traceability. Falls back to timestamp-based ID if crypto.randomUUID is unavailable.
 */
function generateUUID() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  // Fallback for older browsers
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/**
 * Updates the send status UI
 */
function updateSendStatus(message, type) {
  if (!sendStatusEl) return;
  sendStatusEl.textContent = message;
  sendStatusEl.className = "send-status send-status--" + type;
  sendStatusEl.classList.remove("hidden");
}

/**
 * Async function to send quiz results to SheetMonkey with error handling and timeout
 */
async function sendToSheet(name, career, score, total, percent) {
  // Disable buttons during send
  if (restartBtn) restartBtn.disabled = true;
  if (homeBtn) homeBtn.disabled = true;
  
  updateSendStatus("Enviando resultados…", "pending");

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000);

  const payload = {
    Nombre: name,
    Carrera: career,
    Puntaje: `${score}/${total} (${percent}%)`,
    Aciertos: score,
    Total: total,
    Porcentaje: percent,
    FechaISO: new Date().toISOString(),
    FechaLocal: new Date().toLocaleString(),
    UUID: generateUUID()
  };

  try {
    const response = await fetch(formEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const body = await safeText(response);
      console.error("SheetMonkey error:", response.status, body);
      updateSendStatus("Error al enviar", "error");
    } else {
      updateSendStatus("Resultados enviados", "success");
    }
  } catch (err) {
    clearTimeout(timeoutId);
    if (err.name === "AbortError") {
      console.error("SheetMonkey timeout: request aborted after 8s");
      updateSendStatus("Error al enviar", "error");
    } else {
      console.error("SheetMonkey network error:", err);
      updateSendStatus("Error al enviar", "error");
    }
  } finally {
    // Re-enable buttons
    if (restartBtn) restartBtn.disabled = false;
    if (homeBtn) homeBtn.disabled = false;
  }
}

// Cargar historial en inicio de resultados
loadHistory();





