// Shared submit handling for every lead-capture form on the site. Builds
// the normalized Lead DTO and POSTs it as JSON to the same-origin proxy
// (site.forms.endpoint → functions/api/lead.ts). Never posts to a GHL URL
// from the browser — that path dies on CORS preflight and silently loses
// the lead.
import { buildLead, captureAttribution } from './lead';

export function initLeadForms(selector = '[data-lead-form]') {
  captureAttribution();

  document.querySelectorAll<HTMLFormElement>(selector).forEach((form) => {
    if (form.dataset.leadFormBound === 'true') return;
    form.dataset.leadFormBound = 'true';

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      // Demo mode never submits anywhere, even if an endpoint is configured
      // — the visible call/text fallback is the mock.
      const isDemo = form.dataset.mode === 'demo';
      const endpoint = isDemo ? '' : form.dataset.endpoint;
      const fallbackPhone = form.dataset.fallbackPhone;
      const status = form.querySelector<HTMLElement>('[data-form-status]');
      const show = (text: string) => {
        if (status) {
          status.textContent = text;
          status.classList.remove('hidden');
        }
      };

      if (!endpoint) {
        show(
          fallbackPhone
            ? `Online booking isn't connected yet — call or text us at ${fallbackPhone} and we'll get right back to you.`
            : "Online booking isn't connected yet — please call us."
        );
        return;
      }

      try {
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify(buildLead(form)),
        });
        if (!res.ok) throw new Error(String(res.status));
        show("Thanks — we'll text you back shortly.");
        form.reset();
      } catch {
        // Never swallow a submission: any failure surfaces the direct
        // call/text path so the lead isn't lost.
        show(
          fallbackPhone
            ? `Something went wrong — call or text us at ${fallbackPhone} instead.`
            : 'Something went wrong — please call us instead.'
        );
      }
    });
  });
}
