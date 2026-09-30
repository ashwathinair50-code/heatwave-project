// Advisory subscription form - plain JavaScript (the original used jQuery from a CDN,
// which disabled the whole form whenever the CDN could not load).
'use strict';
(function () {
  const form = document.getElementById('subscription-form');
  const success = document.getElementById('form-success');
  form.noValidate = true;   // JavaScript takes over; without JavaScript the browser's own checks still run
  const touched = new Set();

  const REGIONS = ['nagpur', 'pune', 'mumbai', 'delhi'];
  const LANGUAGES = ['english', 'hindi', 'marathi'];

  function setError(id, message) {
    const el = document.getElementById(id);
    const out = document.getElementById(id + '-error');
    if (out) out.textContent = message;
    if (el) el.setAttribute('aria-invalid', message ? 'true' : 'false');
    return !message;
  }

  const validators = {
    name: function () {
      const v = document.getElementById('name').value.trim();
      if (!v) return setError('name', 'Enter your full name.');
      if (v.length < 2 || v.length > 80 || !/^[\p{L}\p{M}][\p{L}\p{M} .'’\-]*$/u.test(v))
        return setError('name', 'Use 2–80 characters: letters, spaces, apostrophes, periods or hyphens.');
      return setError('name', '');
    },
    email: function () {
      const v = document.getElementById('email').value.trim();
      if (!v) return setError('email', 'Enter your email address.');
      if (v.length > 254 || !/^[^\s@]+@[^\s@.]+(?:\.[^\s@.]+)+$/.test(v))
        return setError('email', 'Enter a valid email address, such as name@example.com.');
      return setError('email', '');
    },
    mobile: function () {
      const v = document.getElementById('mobile').value.trim();
      if (!v) return setError('mobile', 'Enter your mobile number.');
      if (!/^[6-9]\d{9}$/.test(v)) return setError('mobile', 'Enter 10 digits starting with 6–9, without spaces or +91.');
      return setError('mobile', '');
    },
    region: function () {
      const v = document.getElementById('region').value;
      if (!v) return setError('region', 'Select your region.');
      if (REGIONS.indexOf(v) === -1) return setError('region', 'Select one of the listed regions.');
      return setError('region', '');
    },
    language: function () {
      const checked = form.querySelector('input[name="language"]:checked');
      const ok = checked && LANGUAGES.indexOf(checked.value) !== -1;
      document.getElementById('language-group').classList.toggle('invalid-group', !ok);
      document.getElementById('language-error').textContent = ok ? '' : 'Choose a preferred alert language.';
      return !!ok;
    },
    alerts: function () {
      const ok = form.querySelectorAll('input[name="alerts"]:checked').length > 0;
      document.getElementById('alerts-group').classList.toggle('invalid-group', !ok);
      document.getElementById('alerts-error').textContent = ok ? '' : 'Select at least one alert type.';
      return ok;
    }
  };

  function markTouched(key) { touched.add(key); validators[key](); }

  form.addEventListener('submit', function (event) {
    event.preventDefault();               // demo only: nothing is sent anywhere
    success.hidden = true;
    let firstInvalid = null;
    Object.keys(validators).forEach(function (key) {
      touched.add(key);
      if (!validators[key]() && firstInvalid === null) firstInvalid = key;
    });
    if (firstInvalid !== null) {
      const target = form.querySelector('#' + firstInvalid + ', [name="' + firstInvalid + '"]');
      if (target) target.focus();
      return;
    }
    const region = document.getElementById('region');
    const language = form.querySelector('input[name="language"]:checked').nextSibling.textContent.trim();
    const count = form.querySelectorAll('input[name="alerts"]:checked').length;
    success.textContent = 'Validation successful for ' + region.options[region.selectedIndex].text +
      ' (' + language + ', ' + count + ' alert type' + (count === 1 ? '' : 's') + '). ' +
      'No data was saved or sent, and no subscription was created.';
    success.hidden = false;
    success.focus();
  });

  form.addEventListener('reset', function () {
    touched.clear();
    success.hidden = true;
    form.querySelectorAll('.error').forEach(function (e) { e.textContent = ''; });
    form.querySelectorAll('[aria-invalid]').forEach(function (e) { e.removeAttribute('aria-invalid'); });
    form.querySelectorAll('.invalid-group').forEach(function (e) { e.classList.remove('invalid-group'); });
  });

  ['name', 'email', 'mobile', 'region'].forEach(function (key) {
    const el = document.getElementById(key);
    el.addEventListener('blur', function () { markTouched(key); });
    el.addEventListener('input', function () { success.hidden = true; if (touched.has(key)) validators[key](); });
    el.addEventListener('change', function () { success.hidden = true; if (touched.has(key)) validators[key](); });
  });
  form.querySelectorAll('input[name="language"]').forEach(function (el) {
    el.addEventListener('change', function () { success.hidden = true; markTouched('language'); });
  });
  form.querySelectorAll('input[name="alerts"]').forEach(function (el) {
    el.addEventListener('change', function () { success.hidden = true; markTouched('alerts'); });
  });
})();
