const header = document.querySelector("[data-header]");
const form = document.querySelector("[data-contact-form]");
const productButtons = document.querySelectorAll("[data-product]");

const setHeaderState = () => {
  header.classList.toggle("is-scrolled", window.scrollY > 18);
};

setHeaderState();
window.addEventListener("scroll", setHeaderState, { passive: true });

productButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const product = button.dataset.product;
    const details = form?.elements.message;
    const service = form?.elements.service;

    if (service) {
      service.value = "Merch inquiry";
    }

    if (details) {
      const note = `I am interested in the ${product}.`;
      details.value = details.value ? `${details.value}\n${note}` : note;
    }

    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  });
});

form?.addEventListener("submit", (event) => {
  event.preventDefault();

  const data = new FormData(form);
  const name = data.get("name")?.toString().trim() || "Champion Syndicate inquiry";
  const email = data.get("email")?.toString().trim() || "";
  const service = data.get("service")?.toString() || "General inquiry";
  const message = data.get("message")?.toString().trim() || "Tell me more about Champion Syndicate services.";
  const subject = encodeURIComponent(`${service} from ${name}`);
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nService: ${service}\n\n${message}`);

  window.location.href = `mailto:championsyndicate@example.com?subject=${subject}&body=${body}`;
});
