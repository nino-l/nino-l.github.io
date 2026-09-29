const parts = {
  prefixes: ['Talk2', 'Concept', 'Counterfactual', 'Multimodal', 'Texture2', 'Thermal', 'Semantic', 'Gaussian', 'Agentic'],
  main: ['VIS', 'SAR', 'Drone', 'Satellite', 'CubeSat', 'Pose', 'LoD3', 'CrimeScene'],
  suffixes: ['Lupe', 'Reconstruction', 'Masking', '6D', 'Splat']
};

const emoji = {
  VIS: '📸', SAR: '📡', Drone: '🚁', Satellite: '🛰️🌍', CubeSat: '🛰️📦', Gaussian: '🔔✨',
  Pose: '🧍‍♀️📐', LoD3: '🏙️🧱', Lupe: '🔍', Reconstruction: '🏗️🧩',
  Masking: '🎭', '6D': '🧭', Splat: '✨🌐', Talk2: '💬', Concept: '💡🧠',
  Counterfactual: '🔀🌍', Multimodal: '🎛️👁️', Texture2: '🧱', Thermal: '🌡️🔥', Semantic: '🏷️🗺️',
  CrimeScene: '🔪🩸', Agentic: '🤖🧭'
};
const ideas = document.querySelector('#ideas');

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
    return `<li><span class="number">0${i + 1}</span><span class="title">${idea.title}</span><span class="emoji" role="img" aria-label="${idea.marks}">${idea.marks}</span></li>`;
  }).join('');
}

document.querySelector('#generate').addEventListener('click', generate);
document.addEventListener('keydown', event => {
  if (event.code === 'Space' && !['INPUT', 'TEXTAREA', 'BUTTON'].includes(document.activeElement.tagName)) {
    event.preventDefault();
    generate();
  }
});

generate();
