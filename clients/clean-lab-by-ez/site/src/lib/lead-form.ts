// Shared submit handling for every lead-capture form on the site (the full
// contact form and the compact hero quote form). Extracted so both forms
// behave identically instead of duplicating the same fetch/fallback logic.
export function initLeadForms(selector = '[data-lead-form]') {
  document.querySelectorAll<HTMLFormElement>(selector).forEach((form) => {
    if (form.dataset.leadFormBound === 'true') return;
    form.dataset.leadFormBound = 'true';

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const webhookUrl = form.dataset.webhookUrl;
      const fallbackPhone = form.dataset.fallbackPhone;
      const status = form.querySelector<HTMLElement>('[data-form-status]');

      if (!webhookUrl) {
        if (status) {
          status.textContent = fallbackPhone
            ? `Online booking isn't connected yet — call or text us at ${fallbackPhone} and we'll get right back to you.`
            : "Online booking isn't connected yet — please call us.";
          status.classList.remove('hidden');
        }
        return;
      }

      const formData = new FormData(form);
      try {
        await fetch(webhookUrl, { method: 'POST', body: formData });
        if (status) {
          status.textContent = "Thanks — we'll text you back shortly.";
          status.classList.remove('hidden');
        }
        form.reset();
      } catch {
        if (status) {
          status.textContent = fallbackPhone
            ? `Something went wrong — call or text us at ${fallbackPhone} instead.`
            : 'Something went wrong — please call us instead.';
          status.classList.remove('hidden');
        }
      }
    });
  });
}
