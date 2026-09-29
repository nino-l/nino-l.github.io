const parts = {
  prefixes: ['Talk2', 'Concept', 'Counterfactual', 'Multimodal', 'Texture2', 'Thermal', 'Semantic', 'Gaussian'],
  main: ['VIS', 'SAR', 'Drone', 'Satellite', 'CubeSat', 'Pose', 'LoD3'],
  suffixes: ['Lupe', 'Reconstruction', 'Masking', '6D', 'Splat']
};

const emoji = {
  VIS: '📸', SAR: '📡', Drone: '🚁', Satellite: '🛰️🌍', CubeSat: '🛰️📦', Gaussian: '🔔✨',
  Pose: '🧍‍♀️📐', LoD3: '🏙️🧱', Lupe: '🔍', Reconstruction: '🏗️🧩',
  Masking: '🎭', '6D': '🧭', Splat: '✨🌐', Talk2: '💬', Concept: '💡🧠',
  Counterfactual: '🔀🌍', Multimodal: '🎛️👁️', Texture2: '🧱', Thermal: '🌡️🔥', Semantic: '🏷️🗺️'
};
const ideas = document.querySelector('#ideas');
const count = document.querySelector('#session-count');
const batchLabel = document.querySelector('#batch-count');
let batches = 0;

function pick(list) { return list[Math.floor(Math.random() * list.length)]; }

function makeIdea() {
  // Choose two or three of the three vocabularies, then keep their order.
  const groups = ['prefixes', 'main', 'suffixes'];
  const shuffled = [...groups].sort(() => Math.random() - .5);
  const groupCount = Math.random() < .5 ? 2 : 3;
  const chosen = shuffled.slice(0, groupCount).sort((a, b) => groups.indexOf(a) - groups.indexOf(b))
    .map(group => pick(parts[group]));
  const title = chosen.join('');
  const marks = chosen.map(part => emoji[part]).join(' ');
  const label = chosen.length === 2 ? 'A starting point' : 'A research direction';
  return {title, marks, label};
}

function generate() {
  const generated = new Set();
  while (generated.size < 3) generated.add(JSON.stringify(makeIdea()));
  ideas.innerHTML = [...generated].map((row, i) => {
    const idea = JSON.parse(row);
    return `<article class="idea-card"><div class="card-top"><span class="idea-index">IDEA / 0${i + 1}</span><span class="idea-emoji" role="img" aria-label="${idea.marks}">${idea.marks}</span></div><h3 class="idea-title">${idea.title}</h3><div class="idea-kind">${idea.label}</div></article>`;
  }).join('');
  batches++;
  count.textContent = batches;
  batchLabel.textContent = '03';
}

document.querySelector('#generate').addEventListener('click', generate);
document.addEventListener('keydown', event => {
  if (event.code === 'Space' && !['INPUT', 'TEXTAREA', 'BUTTON'].includes(document.activeElement.tagName)) {
    event.preventDefault();
    generate();
  }
});

generate();
