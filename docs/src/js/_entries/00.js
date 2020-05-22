/**
---
$bundle: true
---
*/
/* global document */
// import Prism from 'prismjs';

import Values from '../../../../';

// Prism.manual = true;

const $ = (query, el = document) => el.querySelector(query);

const printVersion = (version) => {
  $('[data-lib-version]').textContent = version;
};

const createColor = (value) => {
  const e = document.createElement('div');

  e.className = 'color';
  e.style.backgroundColor = value.hexString();
  // e.textContent = `${value.weight}%`;
  // e.style.color = value.getBrightness() > 50 ? 'black' : 'white';

  if (value.type === 'base') e.className += ' orig';

  return e;
};

const updateDemo = (section, type, weight) => {
  const frag = document.createDocumentFragment();
  const color = section.style.getPropertyValue('--demo-color').trim();
  const instance = new Values(color);
  const values = instance[type](weight);
  const details = $('details pre', section);

  if (Array.isArray(values)) {
    for (let i = 0; i < values.length; i += 1) {
      frag.appendChild(createColor(values[i]));
    }
  } else {
    frag.appendChild(createColor(values));
  }

  $('.colors', section).appendChild(frag);
  $('.demo-color-text', section).textContent = color;
  $('.demo-fn-info', section).innerHTML = `<b>${type}</b> ${weight}%`;

  if (details) {
    details.innerHTML = JSON.stringify(values, null, 2);
    // details.innerHTML = Prism.highlight(
    //   JSON.stringify(values, null, 2),
    //   Prism.languages.javascript,
    //   'javascript'
    // );
  }
};

printVersion(`${Values.VERSION}`);
updateDemo($('.ex-all'), 'all', 16);
updateDemo($('.ex-tints'), 'tints', 10);
updateDemo($('.ex-shades'), 'shades', 12);
updateDemo($('.ex-shade'), 'shade', 14);
updateDemo($('.ex-tint'), 'tint', 25);
