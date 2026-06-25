// Mobile menu
const toggle = document.getElementById("menu-toggle");
const menu = document.getElementById("mobile-menu");
const iconOpen = document.getElementById("menu-icon-open");
const iconClose = document.getElementById("menu-icon-close");

if (toggle && menu) {
  toggle.addEventListener("click", () => {
    const isOpen = !menu.classList.contains("hidden");
    menu.classList.toggle("hidden", isOpen);
    iconOpen.classList.toggle("hidden", !isOpen);
    iconClose.classList.toggle("hidden", isOpen);
    toggle.setAttribute("aria-expanded", String(!isOpen));
  });
}

// Close menu on nav link click (mobile)
document.querySelectorAll("#mobile-menu a").forEach((link) => {
  link.addEventListener("click", () => {
    menu.classList.add("hidden");
    iconOpen.classList.remove("hidden");
    iconClose.classList.add("hidden");
    toggle.setAttribute("aria-expanded", "false");
  });
});

// Form submission
document.querySelectorAll("[data-form]").forEach((form) => {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const name = formData.get("name")?.trim() || "";
    const firstName = name.split(" ")[0];
    const formType = form.dataset.form;

    const errorEl = form.querySelector(".form-error");
    if (errorEl) {
      errorEl.textContent = "";
      errorEl.classList.add("hidden");
    }

    // Basic client-side validation
    if (!name) {
      if (errorEl) {
        errorEl.textContent = "Please enter your name.";
        errorEl.classList.remove("hidden");
      }
      return;
    }

    const submitBtn = form.querySelector('[type="submit"]');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = "Sending…";
    }

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      });

      if (res.ok) {
        // Swap to success state
        form.innerHTML = `
          <div class="text-center py-6">
            <span class="inline-flex w-12 h-12 rounded-full bg-teal-tint items-center justify-center mb-4">
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="#5AA7A7" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="4 11 9 16 18 7"/></svg>
            </span>
            <h3 class="font-display font-bold text-navy text-[20px] mb-2">Thanks, ${firstName || "you"}!</h3>
            <p class="text-[#4A5568] text-[15px] leading-relaxed">${
              formType === "contact"
                ? "Your message is on its way. We’ll get back to you the same day."
                : "Your quote request is in. We’ll get back to you the same day at the contact details you provided."
            }</p>
          </div>
        `;

        // GA4 conversion event
        if (typeof gtag === "function") {
          gtag("event", "generate_lead", { form_type: formType });
        }
      } else {
        throw new Error("Server error");
      }
    } catch {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = submitBtn.dataset.originalText || "Get My Free Quote";
      }
      if (errorEl) {
        errorEl.textContent =
          "Something went wrong. Please call us at (905) 555-0199 or try again.";
        errorEl.classList.remove("hidden");
      }
    }
  });

  // Store original button text
  const submitBtn = form.querySelector('[type="submit"]');
  if (submitBtn) submitBtn.dataset.originalText = submitBtn.textContent;
});
