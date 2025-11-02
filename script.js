// Datos: tus preguntas con correctIndex, más explicaciones añadidas
const questionsBase = [
  {
    question: "¿Qué tipo de carga eléctrica tienen los protones?",
    options: ["Negativa","Positiva","Neutra","Variable"],
    correctIndex: 1,
    explanation: "El protón posee la carga elemental +e; por definición, su carga es positiva."
  },
  {
    question: "La fuerza entre dos cargas aumenta si:",
    options: ["Aumenta la distancia","Disminuye la carga de una","Disminuye la distancia entre ellas","No depende de la distancia"],
    correctIndex: 2,
    explanation: "Por la ley de Coulomb F = k|qq‚|/r²; al disminuir la distancia r, la fuerza aumenta con 1/r²."
  },
  {
    question: "El campo eléctrico en un punto se define como:",
    options: ["Energía por unidad de carga","Fuerza por unidad de carga","Voltaje por distancia","Corriente por resistencia"],
    correctIndex: 1,
    explanation: "E = F/q. Es la fuerza que experimenta una carga positiva de prueba por unidad de carga."
  },
  {
    question: "Una partícula con carga positiva se mueve en la dirección del campo eléctrico porque:",
    options: ["Es atraída por potenciales más bajos","Es repelida por potenciales bajos","No siente fuerza","Depende del material"],
    correctIndex: 0,
    explanation: "La fuerza es F = qE. Para q>0, apunta como E. Además, E = V, por lo que va hacia potencial menor."
  },
  {
    question: "El potencial eléctrico se mide en:",
    options: ["Coulombios","Voltios","Newtons","Amperios"],
    correctIndex: 1,
    explanation: "El potencial (diferencia de potencial) se mide en voltios: 1 V = 1 J/C."
  },
  {
    question: "La corriente eléctrica es:",
    options: ["Energía que circula","Flujo de carga por tiempo","Fuerza entre cargas","Movimiento de fotones"],
    correctIndex: 1,
    explanation: "I = ”Q/”t: cantidad de carga que atraviesa una sección por unidad de tiempo."
  },
  {
    question: "Según la ley de Ohm:",
    options: ["V = I · R","V = R / I","R = I / V","I = R + V"],
    correctIndex: 0,
    explanation: "La ley de Ohm relaciona voltaje, corriente y resistencia: V = I·R."
  },
  {
    question: "En un circuito con resistencias en serie:",
    options: ["La corriente es igual en todas","El voltaje es igual","La resistencia total es menor","No hay caída de tensión"],
    correctIndex: 0,
    explanation: "En serie circula la misma corriente por todos los elementos; el voltaje se reparte."
  },
  {
    question: "En un circuito con resistencias en paralelo:",
    options: ["La corriente es la misma","El voltaje es el mismo","La resistencia total aumenta","No se conserva la corriente"],
    correctIndex: 1,
    explanation: "En paralelo cada rama tiene el mismo voltaje aplicado; las corrientes se reparten."
  },
  {
    question: "El capacitor almacena:",
    options: ["Carga eléctrica","Corriente eléctrica","Campo magnético","Energía térmica"],
    correctIndex: 0,
    explanation: "Un capacitor almacena carga en sus placas y energía en el campo eléctrico entre ellas."
  },
  {
    question: "La Ley de corrientes de Kirchhoff establece que:",
    options: ["La suma de corrientes que entran es igual a la que sale","La suma de voltajes es cero","La corriente total es igual al voltaje total","La energía se disipa en calor"],
    correctIndex: 0,
    explanation: "LCK: la suma algebraica de corrientes en un nodo es cero; lo que entra debe salir."
  },
  {
    question: "El campo magnético se mide en:",
    options: ["Tesla","Newton","Weber","Faradio"],
    correctIndex: 0,
    explanation: "La unidad SI para B (densidad de flujo magnético) es el tesla (T)."
  },
  {
    question: "La fuerza sobre una carga en movimiento depende de:",
    options: ["Solo del campo","Solo de la carga","De la carga, velocidad y campo magnético","Solo de la dirección"],
    correctIndex: 2,
    explanation: "F = q(v × B). Depende de q, de la velocidad (módulo y dirección) y del campo magnético."
  },
  {
    question: "La inducción electromagnética ocurre cuando:",
    options: ["Cambia el flujo magnético","El campo eléctrico es constante","El conductor es perfecto","Hay corriente continua"],
    correctIndex: 0,
    explanation: "Una f.e.m. se induce cuando varía el flujo magnético enlazado (ley de Faraday)."
  },
  {
    question: "Según la ley de Lenz, la corriente inducida:",
    options: ["Se opone a la causa","Se suma al flujo","Aumenta la energía","No tiene dirección"],
    correctIndex: 0,
    explanation: "La corriente inducida se opone al cambio de flujo que la produce, conservando energía."
  },
  {
    question: "¿Cuál NO es una fuente de energía renovable?",
    options: ["Solar","Eólica","Nuclear","Hidráulica"],
    correctIndex: 2,
    explanation: "La energía nuclear usa combustible finito (uranio/plutonio), por eso no es renovable."
  },
  {
    question: "Los paneles solares transforman:",
    options: ["Energía solar en eléctrica","Energía térmica en mecánica","Energía eléctrica en luz","Energía cinética en potencial"],
    correctIndex: 0,
    explanation: "Los paneles fotovoltaicos convierten la luz (fotones) en electricidad (efecto fotovoltaico)."
  },
  {
    question: "Los aerogeneradores convierten:",
    options: ["Energía eléctrica en mecánica","Energía cinética del viento en eléctrica","Energía química en calor","Energía térmica en sonido"],
    correctIndex: 1,
    explanation: "Transforman la energía cinética del viento en eléctrica mediante turbina y generador."
  },
  {
    question: "La energía hidroeléctrica aprovecha:",
    options: ["Energía potencial del agua almacenada","Radiación solar","Calor del subsuelo","Movimiento de las olas"],
    correctIndex: 0,
    explanation: "Se basa en la energía potencial gravitatoria del agua embalsada que se convierte en eléctrica."
  },
  {
    question: "Una ventaja de las energías renovables es que:",
    options: ["Aumentan el CO‚","Son más contaminantes","Reducen el impacto ambiental","No generan energía suficiente"],
    correctIndex: 2,
    explanation: "En general emiten menos CO‚ y contaminantes locales que los combustibles fósiles."
  }
];

// Utilidades DOM
const $ = (sel) => document.querySelector(sel);

const startBtn = $('#startBtn');
const nextBtn = $('#nextBtn');
const restartBtn = $('#restartBtn');
const questionContainer = $('#questionContainer');
const resultContainer = $('#resultContainer');
const questionElement = $('#question');
const optionsElement = $('#options');
const scoreElement = $('#score');
const validationMsg = $('#validationMsg');
const progressText = $('#progressText');
const progressFill = $('#progressFill');
const scoreInline = $('#scoreInline');
const explanationEl = $('#explanation');

const shuffleQuestionsChk = $('#shuffleQuestions');
const shuffleOptionsChk = $('#shuffleOptions');

// Estado
let questions = []; // [{ question, choices:[{text,correct}], explanation }]
let currentQuestion = 0;
let score = 0;
let answersHistory = [];
let stage = 'answering'; // 'answering' | 'reviewing'
let currentEvaluation = null;

startBtn?.addEventListener('click', startQuiz);
nextBtn?.addEventListener('click', onNextClick);
restartBtn?.addEventListener('click', restartQuiz);

optionsElement?.addEventListener('change', (e) => {
  if (e.target && e.target.matches('input[name="option"]')) {
    nextBtn.disabled = false;
    validationMsg.hidden = true;
  }
});

function startQuiz() {
  // Preparar preguntas con estructura interna y (opcional) barajar
  questions = prepareQuestions(questionsBase, {
    shuffleQuestions: !!shuffleQuestionsChk?.checked,
    shuffleOptions: !!shuffleOptionsChk?.checked
  });

  // Reset estado
  currentQuestion = 0;
  score = 0;
  answersHistory = [];
  stage = 'answering';
  currentEvaluation = null;

  // UI
  startBtn.classList.add('hidden');
  resultContainer.classList.add('hidden');
  questionContainer.classList.remove('hidden');

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
    return {
      question: q.question,
      choices,
      explanation: q.explanation || ''
    };
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
    wrapper.setAttribute('for', id);

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

  // Foco accesible
  optionsElement.querySelector('input[type="radio"]')?.focus();
}

function onNextClick() {
  if (stage === 'answering') {
    // Validar selección
    const selected = document.querySelector('input[name="option"]:checked');
    if (!selected) {
      validationMsg.hidden = false;
      return;
    }
    // Evaluar y mostrar explicación
    evaluateCurrent();
    return;
  }

  // stage === 'reviewing' -> pasar a la siguiente
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

  // Estilos de corrección
  wrappers.forEach(w => {
    const input = w.querySelector('input[type="radio"]');
    const isThisCorrect = input.dataset.correct === 'true';
    if (isThisCorrect) w.classList.add('correct');
    if (input.checked && !isThisCorrect) w.classList.add('incorrect');
    input.disabled = true;
  });

  // Actualizar puntaje inmediato
  if (isCorrect) {
    score++;
    updateInlineScore();
  }

  // Mostrar explicación
  explanationEl.innerHTML = `
    <h3 style="margin:0 0 6px 0;">Explicación</h3>
    <p style="margin:0;">${q.explanation}</p>
  `;
  explanationEl.classList.remove('hidden');

  // Guardar evaluación para el repaso final
  currentEvaluation = {
    question: q.question,
    user: userAnswer,
    correct: correctChoice?.text ?? '',
    isCorrect,
    explanation: q.explanation
  };
  answersHistory.push(currentEvaluation);

  // Cambiar de etapa
  stage = 'reviewing';
  nextBtn.textContent = (currentQuestion === questions.length - 1) ? 'Ver resultados' : 'Continuar';
  nextBtn.disabled = false;

  // Progreso (opcional mantener igual hasta avanzar)
  // updateProgress(); // si quisieras reflejar progreso tras evaluar, descomenta.
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
  resultContainer.classList.remove('hidden');

  const total = questions.length;
  const percent = Math.round((score / total) * 100);
  const feedback =
    percent === 100 ? "¡Perfecto! ¡"
    : percent >= 80 ? "¡Muy bien! ="
    : percent >= 60 ? "Buen trabajo, puedes mejorar. ='"
    : "Sigue practicando. =Ø";

  scoreElement.textContent = `Tu puntuación final es ${score} de ${total} (${percent}%). ${feedback}`;

  renderReview();
}

function renderReview() {
  const review = document.getElementById('review');
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
    expl.style.margin = '6px 0 0 0';
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
  startBtn.classList.remove('hidden');

  // Reset UI parciales
  progressFill.style.width = '0%';
  scoreInline.textContent = '';
  validationMsg.hidden = true;
  explanationEl.classList.add('hidden');
  explanationEl.innerHTML = '';
}

// Helpers
function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = (Math.random() * (i + 1)) | 0;
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}


