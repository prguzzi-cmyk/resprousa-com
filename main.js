// Respro site — interactions.
// Forms deliver to FORM_EMAIL via FormSubmit (no account needed).
// NOTE: the very first submission triggers a one-time activation email to
// FORM_EMAIL — click "Activate" in that email once and delivery is live.
const CONFIG = {
  FORM_EMAIL: "prguzzi@gmail.com",
};

(function () {
  // year
  var yr = document.getElementById("yr");
  if (yr) yr.textContent = new Date().getFullYear();

  // analytics stub
  function track(event, props) {
    if (window.analytics && window.analytics.track) window.analytics.track(event, props || {});
    else console.log("[track]", event, props || {});
  }
  document.querySelectorAll("[data-analytics]").forEach(function (el) {
    el.addEventListener("click", function () { track(el.getAttribute("data-analytics")); });
  });

  // form submission → FormSubmit AJAX endpoint
  var SUBJECTS = {
    "service-request": "Respro website — Service Request",
    "partner-inquiry": "Respro website — Partner Inquiry",
    "operator-inquiry": "Respro website — Territory / Operator Inquiry",
  };

  document.querySelectorAll("form[data-form]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var status = form.querySelector("[data-form-status]");
      var type = form.getAttribute("data-form");
      var data = Object.fromEntries(new FormData(form).entries());
      track("submit_" + type, data);

      var payload = Object.assign({}, data, {
        _subject: SUBJECTS[type] || "Respro website — Inquiry",
        _template: "table",
      });

      if (status) status.textContent = "Sending…";
      var btn = form.querySelector('button[type="submit"]');
      if (btn) btn.disabled = true;

      fetch("https://formsubmit.co/ajax/" + CONFIG.FORM_EMAIL, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      })
        .then(function (r) { return r.json().catch(function () { return {}; }); })
        .then(function () {
          if (status) status.textContent = "✓ Received — we'll be in touch right away. For emergencies, call 1-888-737-8078.";
          form.reset();
        })
        .catch(function () {
          if (status) status.textContent = "Couldn't send just now — please call 1-888-737-8078 or email contact@resprousa.com.";
        })
        .finally(function () { if (btn) btn.disabled = false; });
    });
  });
})();
