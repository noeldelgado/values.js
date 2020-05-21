/**
---
$bundle: true
---
*/
/* global document */

import Values from '../../../../';

const $ = (query, el = document) => el.querySelector(query);

function f(section, type, weight) {
  const frag = document.createDocumentFragment();
  const color = section.style.getPropertyValue('--demo-color').trim();
  const instance = new Values(color);
  let values = instance[type](weight);

  if (!values.length) values = [values];

  for (let i = 0; i < values.length; i += 1) {
    const e = document.createElement('div');
    const value = values[i];

    e.className = 'color';
    e.style.backgroundColor = value.hexString();
    e.textContent = `${value.weight}%`;
    e.style.color = value.getBrightness() > 50 ? 'black' : 'white';

    if (value.type === 'base') e.className += ' orig';

    frag.appendChild(e);
  }

  $('.colors', section).appendChild(frag);
  $('.demo-color-text', section).textContent = color;
  $('.demo-fn-info', section).innerHTML = `<b>${type}</b> ${weight}%`;
}

$('[data-lib-version]').textContent = `${Values.VERSION}`;

f($('.ex-all'), 'all', 16);
f($('.ex-tints'), 'tints', 10);
f($('.ex-shades'), 'shades', 12);
f($('.ex-shade'), 'shade', 20);
f($('.ex-tint'), 'tint', 25);
f($('.ex-tints2'), 'tints', 16);
f($('.ex-shades2'), 'shades', 16);
