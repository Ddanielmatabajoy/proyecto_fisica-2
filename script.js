const qs = (sel) => document.querySelector(sel);

/* ===================== PREGUNTAS ===================== */
const questionsBase = [
  { question: "¿Qué tipo de carga eléctrica tienen los protones?", options: ["Negativa","Positiva","Neutra","Variable"], correctIndex: 1, explanation: "El protón posee la carga elemental +e; su carga es positiva." },
  { question: "La fuerza entre dos cargas aumenta si:", options: ["Aumenta la distancia","Disminuye la carga de una","Disminuye la distancia entre ellas","No depende de la distancia"], correctIndex: 2, explanation: "Ley de Coulomb: F = k|q₁q₂|/r². Disminuir r aumenta F." },
  { question: "El campo eléctrico en un punto se define como:", options: ["Energía por unidad de carga","Fuerza por unidad de carga","Voltaje por distancia","Corriente por resistencia"], correctIndex: 1, explanation: "E = F/q. Fuerza sobre una carga positiva de prueba dividida por su magnitud." },
  { question: "Una partícula con carga positiva se mueve en la dirección del campo eléctrico porque:", options: ["Es atraída por potenciales más bajos","Es repelida por potenciales bajos","No siente fuerza","Depende del material"], correctIndex: 0, explanation: "Para q>0, F = qE. Se mueve hacia menor potencial ya que E = −∇V." },
  { question: "El potencial eléctrico se mide en:", options: ["Coulombios","Voltios","Newtons","Amperios"], correctIndex: 1, explanation: "Unidad: voltio (J/C)." },
  { question: "La corriente eléctrica es:", options: ["Energía que circula","Flujo de carga por tiempo","Fuerza entre cargas","Movimiento de fotones"], correctIndex: 1, explanation: "I = ΔQ/Δt: carga por unidad de tiempo." },
  { question: "Según la ley de Ohm:", options: ["V = I · R","V = R / I","R = I / V","I = R + V"], correctIndex: 0, explanation: "Relación lineal: V = I·R." },
  { question: "En un circuito con resistencias en serie:", options: ["La corriente es igual en todas","El voltaje es igual","La resistencia total es menor","No hay caída de tensión"], correctIndex: 0, explanation: "La misma corriente atraviesa todos los elementos." },
  { question: "En un circuito con resistencias en paralelo:", options: ["La corriente es la misma","El voltaje es el mismo","La resistencia total aumenta","No se conserva la corriente"], correctIndex: 1, explanation: "Cada rama comparte el mismo voltaje aplicado." },
  { question: "El capacitor almacena:", options: ["Carga eléctrica","Corriente eléctrica","Campo magnético","Energía térmica"], correctIndex: 0, explanation: "Almacena carga y energía en el campo eléctrico." },
  { question: "La Ley de corrientes de Kirchhoff establece que:", options: ["La suma de corrientes que entran es igual a la que sale","La suma de voltajes es cero","La corriente total es igual al voltaje total","La energía se disipa en calor"], correctIndex: 0, explanation: "Conservación de carga en un nodo: lo que entra sale." },
  { question: "El campo magnético se mide en:", options: ["Tesla","Newton","Weber","Faradio"], correctIndex: 0, explanation: "Unidad SI: tesla (T)." },
  { question: "La fuerza sobre una carga en movimiento depende de:", options: ["Solo del campo","Solo de la carga","De la carga, velocidad y campo magnético","Solo de la dirección"], correctIndex: 2, explanation: "F = q(v × B)." },
  { question: "La inducción electromagnética ocurre cuando:", options: ["Cambia el flujo magnético","El campo eléctrico es constante","El conductor es perfecto","Hay corriente continua"], correctIndex: 0, explanation: "Ley de Faraday: variación de flujo → f.e.m. inducida." },
  { question: "Según la ley de Lenz, la corriente inducida:", options: ["Se opone a la causa","Se suma al flujo","Aumenta la energía","No tiene dirección"], correctIndex: 0, explanation: "Se opone al cambio de flujo (conservación de energía)." },
  { question: "¿Cuál NO es una fuente de energía renovable?", options: ["Solar","Eólica","Nuclear","Hidráulica"], correctIndex: 2, explanation: "La nuclear usa combustible finito (uranio/plutonio)." },
  { question: "Los paneles solares transforman:", options: ["Energía solar en eléctrica","Energía térmica en mecánica","Energía eléctrica en luz","Energía cinética en potencial"], correctIndex: 0, explanation: "Efecto fotovoltaico." },
  { question: "Los aerogeneradores convierten:", options: ["Energía eléctrica en mecánica","Energía cinética del viento en eléctrica","Energía química en calor","Energía térmica en sonido"], correctIndex: 1, explanation: "Viento → turbina → generador eléctrico." },
  { question: "La energía hidroeléctrica aprovecha:", options: ["Energía potencial del agua almacenada","Radiación solar","Calor del subsuelo","Movimiento de las olas"], correctIndex: 0, explanation: "Energía potencial gravitatoria del agua." },
  { question: "Una ventaja de las energías renovables es que:", options: ["Aumentan el CO₂","Son más contaminantes","Reducen el impacto ambiental","No generan energía suficiente"], correctIndex: 2, explanation: "Menor emisión de CO₂ y contaminantes locales." }
];

/* ===================== ELEMENTOS DOM ===================== */
const homeSection = qs('#home');
const homeValidation = qs('#homeValidation');
const playerNameInput = qs('#playerName');
const playerCareerInput = qs('#playerCareer');

const startBtn = qs('#startBtn');
const nextBtn = qs('#nextBtn');
const restartBtn = qs('#restartBtn');
const homeBtn = qs('#homeBtn');

const questionContainer = qs('#questionContainer');
const resultContainer = qs('#resultContainer');
const questionElement = qs('#question');
const optionsElement = qs('#options');
const questionLegend = qs('#questionLegend');
const scoreElement = qs('#score');
const validationMsg = qs('#validationMsg');
const progressText = qs('#progressText');
const progressFill = qs('#progressFill');
const scoreInline = qs('#scoreInline');
const explanationEl = qs('#explanation');
const resultTitle = qs('#resultTitle');
const playerMeta = qs('#playerMeta');

const shuffleQuestionsChk = qs('#shuffleQuestions');
const shuffleOptionsChk = qs('#shuffleOptions');

/* Historial / exportación */
const historyBody = qs('#historyBody');
const historyTable = qs('#historyTable');
const historyEmpty = qs('#historyEmpty');
const exportJsonBtn = qs('#exportJsonBtn');
const exportCsvBtn = qs('#exportCsvBtn');
const clearHistoryBtn = qs('#clearHistoryBtn');

/* ===================== ESTADO ===================== */
let questions = [];
let currentQuestion = 0;
let score = 0;
let answersHistory = [];
let stage = 'answering'; // 'answering' | 'reviewing'
let currentEvaluation = null;
let playerName = '';
let playerCareer = '';

/* ===================== EVENTOS ===================== */
startBtn?.addEventListener('click', startQuiz);
nextBtn?.addEventListener('click', onNextClick);
restartBtn?.addEventListener('click', restartQuiz);
homeBtn?.addEventListener('click', goHome);

optionsElement?.addEventListener('change', (e) => {
  if (e.target && e.target.matches('input[name="option"]')) {
    nextBtn.disabled = false;
    validationMsg.hidden = true;
  }
});

exportJsonBtn?.addEventListener('click', exportJSON);
exportCsvBtn?.addEventListener('click', exportCSV);
clearHistoryBtn?.addEventListener('click', clearHistory);

/* ===================== QUIZ ===================== */

function startQuiz() {
  playerName = playerNameInput?.value?.trim() || '';
  playerCareer = playerCareerInput?.value?.trim() || '';
  if (!playerName || !playerCareer) {
    homeValidation.hidden = false;
    (!playerName ? playerNameInput : playerCareerInput)?.focus();
    return;
  }
  homeValidation.hidden = true;

  questions = prepareQuestions(questionsBase, {
    shuffleQuestions: !!shuffleQuestionsChk.checked,
    shuffleOptions: !!shuffleOptionsChk.checked
  });

  currentQuestion = 0;
  score = 0;
  answersHistory = [];
  stage = 'answering';
  currentEvaluation = null;

  homeSection.classList.add('hidden');
  homeSection.setAttribute('inert', '');
  resultContainer.classList.add('hidden');
  resultContainer.setAttribute('inert', '');

  questionContainer.classList.remove('hidden');
  questionContainer.removeAttribute('inert');

  renderQuestion();
  updateProgress();
  updateInlineScore();
}

function prepareQuestions(source, { shuffleQuestions, shuffleOptions }) {
  let list = structuredClone(source).map(q => {
    const choices = q.options.map((text, i) => ({
      text,
      correct: i === q.correctIndex
    }));
    if (shuffleOptions) shuffleArray(choices);
    return { question: q.question, choices, explanation: q.explanation || '' };
  });
  if (shuffleQuestions) shuffleArray(list);
  return list;
}

function renderQuestion() {
  const q = questions[currentQuestion];
  if (!q) return;
  stage = 'answering';
  currentEvaluation = null;

  questionElement.textContent = q.question;
  questionLegend.textContent = q.question;

  optionsElement.innerHTML = '';
  nextBtn.disabled = true;
  nextBtn.textContent = 'Siguiente';
  explanationEl.classList.add('hidden');
  explanationEl.innerHTML = '';
  validationMsg.hidden = true;

  q.choices.forEach((choice, idx) => {
    const id = `opt-${currentQuestion}-${idx}`;
    const wrapper = document.createElement('label');
    wrapper.className = 'option';
    const input = document.createElement('input');
    input.type = 'radio';
    input.name = 'option';
    input.value = choice.text;
    input.id = id;
    input.dataset.correct = String(choice.correct);
    const txt = document.createElement('span');
    txt.textContent = choice.text;
    wrapper.appendChild(input);
    wrapper.appendChild(txt);
    optionsElement.appendChild(wrapper);
  });

  optionsElement.querySelector('input[type="radio"]')?.focus();
}

function onNextClick() {
  if (stage === 'answering') {
    const selected = document.querySelector('input[name="option"]:checked');
    if (!selected) {
      validationMsg.hidden = false;
      return;
    }
    evaluateCurrent();
    return;
  }
  currentQuestion++;
  if (currentQuestion < questions.length) {
    renderQuestion();
    updateProgress();
  } else {
    showResults();
  }
}

function evaluateCurrent() {
  const selected = document.querySelector('input[name="option"]:checked');
  const wrappers = Array.from(optionsElement.querySelectorAll('.option'));
  const q = questions[currentQuestion];
  const correctChoice = q.choices.find(c => c.correct);
  const userAnswer = selected.value;
  const isCorrect = selected.dataset.correct === 'true';

  wrappers.forEach(w => {
    const input = w.querySelector('input[type="radio"]');
    const isThisCorrect = input.dataset.correct === 'true';
    if (isThisCorrect) w.classList.add('correct');
    if (input.checked && !isThisCorrect) w.classList.add('incorrect');
    input.disabled = true;
  });

  if (isCorrect) {
    score++;
    updateInlineScore();
  }

  explanationEl.innerHTML = `<h3 style="margin:0 0 6px;">Explicación</h3><p style="margin:0;">${q.explanation}</p>`;
  explanationEl.classList.remove('hidden');

  currentEvaluation = {
    question: q.question,
    user: userAnswer,
    correct: correctChoice?.text ?? '',
    isCorrect,
    explanation: q.explanation
  };
  answersHistory.push(currentEvaluation);

  stage = 'reviewing';
  nextBtn.textContent = (currentQuestion === questions.length - 1) ? 'Ver resultados' : 'Continuar';
  nextBtn.disabled = false;
}

function updateProgress() {
  const total = questions.length || 1;
  const index = Math.min(currentQuestion + 1, total);
  progressText.textContent = `Pregunta ${index} de ${total}`;
  const percent = Math.round((currentQuestion / total) * 100);
  progressFill.style.width = `${percent}%`;
  const progressbar = progressFill.parentElement;
  progressbar?.setAttribute('aria-valuenow', String(percent));
  progressbar?.setAttribute('aria-valuetext', `${percent}% completado`);
}

function updateInlineScore() {
  scoreInline.textContent = `Aciertos: ${score}`;
}

function showResults() {
  questionContainer.classList.add('hidden');
  questionContainer.setAttribute('inert', '');
  resultContainer.classList.remove('hidden');
  resultContainer.removeAttribute('inert');

  resultTitle.textContent = `Resultados de ${playerName}`;
  playerMeta.textContent = `Carrera: ${playerCareer}`;

  const total = questions.length;
  const percent = Math.round((score / total) * 100);
  const feedback =
    percent === 100 ? "¡Perfecto! ⚡"
    : percent >= 80 ? "¡Muy bien! 🔋"
    : percent >= 60 ? "Buen trabajo, puedes mejorar. 🔧"
    : "Sigue practicando. 📘";

  scoreElement.textContent = `Tu puntuación final es ${score} de ${total} (${percent}%). ${feedback}`;
  renderReview();

  saveAttempt({
    name: playerName,
    career: playerCareer,
    score,
    total,
    percent,
    timestamp: new Date().toISOString(),
    answers: answersHistory.map(a => ({
      question: a.question,
      user: a.user,
      correct: a.correct,
      isCorrect: a.isCorrect
    }))
  });
  renderHistory();
}

function renderReview() {
  const review = qs('#review');
  review.innerHTML = '';
  const wrong = answersHistory.filter(a => !a.isCorrect);
  if (wrong.length === 0) {
    const ok = document.createElement('p');
    ok.textContent = 'Has respondido todas las preguntas correctamente. ¡Excelente!';
    review.appendChild(ok);
    return;
  }
  const title = document.createElement('p');
  title.textContent = 'Repaso de respuestas incorrectas:';
  review.appendChild(title);

  wrong.forEach(item => {
    const card = document.createElement('div');
    card.className = 'review-item';
    const h3 = document.createElement('h3');
    h3.textContent = item.question;
    const your = document.createElement('p');
    your.className = 'your';
    your.textContent = `Tu respuesta: ${item.user}`;
    const correct = document.createElement('p');
    correct.className = 'correct';
    correct.textContent = `Respuesta correcta: ${item.correct}`;
    const expl = document.createElement('p');
    expl.style.margin = '6px 0 0';
    expl.textContent = `Explicación: ${item.explanation}`;
    card.appendChild(h3);
    card.appendChild(your);
    card.appendChild(correct);
    card.appendChild(expl);
    review.appendChild(card);
  });
}

function restartQuiz() {
  currentQuestion = 0;
  score = 0;
  answersHistory = [];
  stage = 'answering';
  currentEvaluation = null;

  resultContainer.classList.add('hidden');
  resultContainer.setAttribute('inert', '');
  questionContainer.classList.remove('hidden');
  questionContainer.removeAttribute('inert');

  progressFill.style.width = '0%';
  scoreInline.textContent = '';
  validationMsg.hidden = true;
  explanationEl.classList.add('hidden');
  explanationEl.innerHTML = '';

  renderQuestion();
  updateProgress();
  updateInlineScore();
}

function goHome() {
  resultContainer.classList.add('hidden');
  resultContainer.setAttribute('inert', '');
  questionContainer.classList.add('hidden');
  questionContainer.setAttribute('inert', '');
  homeSection.classList.remove('hidden');
  homeSection.removeAttribute('inert');

  progressFill.style.width = '0%';
  scoreInline.textContent = '';
  validationMsg.hidden = true;
  explanationEl.classList.add('hidden');
  explanationEl.innerHTML = '';
}

/* ===================== HISTORIAL / EXPORTACIÓN ===================== */

function loadStoredAttempts() {
  try {
    const raw = localStorage.getItem('quizResults');
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.warn('Error leyendo localStorage', e);
    return [];
  }
}

function saveAttemptsArray(arr) {
  try {
    localStorage.setItem('quizResults', JSON.stringify(arr));
  } catch (e) {
    console.warn('Error guardando localStorage', e);
  }
}

function saveAttempt(attempt) {
  const attempts = loadStoredAttempts();
  const id = attempts.length ? (attempts[attempts.length - 1].id + 1) : 1;
  attempts.push({ id, ...attempt });
  saveAttemptsArray(attempts);
}

function renderHistory() {
  const attempts = loadStoredAttempts();
  historyBody.innerHTML = '';

  if (!attempts.length) {
    historyTable.classList.add('hidden');
    historyEmpty.classList.remove('hidden');
    return;
  }

  historyEmpty.classList.add('hidden');
  historyTable.classList.remove('hidden');

  attempts.forEach(att => {
    const tr = document.createElement('tr');
    const dateStr = formatDate(att.timestamp);
    tr.innerHTML = `
      <td>${dateStr}</td>
      <td>${escapeHtml(att.name)}</td>
      <td>${escapeHtml(att.career)}</td>
      <td>${att.score}</td>
      <td>${att.total}</td>
      <td>${att.percent}%</td>
    `;
    historyBody.appendChild(tr);
  });
}

function formatDate(iso) {
  try {
    const d = new Date(iso);
    return d.toLocaleString('es-ES', { dateStyle: 'short', timeStyle: 'short' });
  } catch {
    return iso;
  }
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g,'&gt;')
    .replace(/"/g,'&quot;')
    .replace(/'/g,'&#39;');
}

function exportJSON() {
  const attempts = loadStoredAttempts();
  if (!attempts.length) {
    alert('No hay datos para exportar.');
    return;
  }
  const blob = new Blob([JSON.stringify(attempts, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  downloadFile(url, 'resultados_quiz.json');
}

function exportCSV() {
  const attempts = loadStoredAttempts();
  if (!attempts.length) {
    alert('No hay datos para exportar.');
    return;
  }
  const header = ['id','timestamp','name','career','score','total','percent'];
  const lines = [header.join(',')];
  attempts.forEach(a => {
    const row = [
      a.id,
      a.timestamp,
      csvEscape(a.name),
      csvEscape(a.career),
      a.score,
      a.total,
      a.percent
    ];
    lines.push(row.join(','));
  });
  const blob = new Blob([lines.join('\n')], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  downloadFile(url, 'resultados_quiz.csv');
}

function csvEscape(v) {
  const s = String(v);
  return /[",\n]/.test(s) ? `"${s.replace(/"/g,'""')}"` : s;
}

function downloadFile(url, filename) {
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    URL.revokeObjectURL(url);
    a.remove();
  }, 1000);
}

function clearHistory() {
  if (!confirm('¿Seguro que quieres borrar todo el historial?')) return;
  localStorage.removeItem('quizResults');
  renderHistory();
  alert('Historial borrado.');
}

/* ===================== UTILIDADES ===================== */
function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = (Math.random() * (i + 1)) | 0;
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

/* Inicializar historial al cargar */
document.addEventListener('DOMContentLoaded', () => {
  renderHistory();
});




