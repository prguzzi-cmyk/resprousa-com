// Respro homepage — interactions.
// Set FORM_ENDPOINT to a real endpoint (Formspree / CRM webhook) before launch.
// Until then, submissions log to console + show a confirmation (nothing lost silently).
const CONFIG = {
  FORM_ENDPOINT: "", // e.g. "https://formspree.io/f/xxxx"
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

  // form submission
  document.querySelectorAll("form[data-form]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var status = form.querySelector("[data-form-status]");
      var type = form.getAttribute("data-form");
      var data = Object.fromEntries(new FormData(form).entries());
      track("submit_" + type, data);

      var done = function () {
        if (status) status.textContent = "✓ Received — we'll be in touch right away. For emergencies, call 1-888-737-8078.";
        form.reset();
      };

      if (CONFIG.FORM_ENDPOINT) {
        fetch(CONFIG.FORM_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ form: type, data: data }),
        }).then(done).catch(done);
      } else {
        console.warn("[FORM CAPTURE — configure CONFIG.FORM_ENDPOINT]", { form: type, data: data });
        done();
      }
    });
  });
})();
