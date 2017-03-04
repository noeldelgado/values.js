(function(){
  var Values = require('../../../../');

  var dom = {
    e1: document.querySelector('.ex-01'),
    e2: document.querySelector('.ex-02'),
    e3: document.querySelector('.ex-03'),
    e4: document.querySelector('.ex-04'),
    e5: document.querySelector('.ex-05'),
    e6: document.querySelector('.ex-06')
  };

  // Helper Function
  var f = function (obj, values, section, container, brightnessSample) {
    var frag = document.createDocumentFragment();

    for (var i = 0; i < values.length; i += 1) {
      var e = document.createElement('div');
      e.className = "color";
      e.style.backgroundColor = values[i].hexString();

      if (values[i].hex === obj.hex) {
        e.className += " orig";
      }

      if (brightnessSample) {
        var brightness = values[i].getBrightness();
        e.textContent = brightness;
        e.style.color = (brightness < 50) ? "#fff" : "#000";
      }

      frag.appendChild(e);
    }

    // section.querySelector('.total').textContent = values.length;
    container.appendChild( frag );
  };

  var ex1 = new Values('#2ecc71');
  f(ex1, ex1.all(5), dom.e1, dom.e1.querySelector('.colors'));

  var ex3 = new Values('#9b59b6')
  f(ex3, ex3.tints(10), dom.e3, dom.e3.querySelector('.colors'));

  var ex2 = new Values('#3498db');
  f(ex2, ex2.shades(10), dom.e2, dom.e2.querySelector('.colors'));

  var ex4 = new Values('#e74c3c');
  f(ex4, [ex4].concat(ex4.tint(20)), dom.e4, dom.e4.querySelector('.colors'));

  var ex5 = new Values('#f1c40f');
  f(ex5, [ex5].concat(ex5.shade(10)), dom.e5, dom.e5.querySelectorAll('.colors')[0]);

  var ex6 = new Values('#ee0');
  f(ex6, ex6.all(10), dom.e6, dom.e6.querySelector('.colors'), true);
}());
