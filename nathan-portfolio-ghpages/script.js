// Simple hash router + content rendering (no frameworks)
const app = document.getElementById("app");
const yearEl = document.getElementById("year");
yearEl.textContent = new Date().getFullYear();

// Fake data — replace with your real projects
const PROJECTS = [
  {
    id: "msa",
    title: "Maritime Surveillance Aircraft",
    img: "assets/p1.jpg",
    tags: ["concept", "systems", "cad"],
    summary:
      "Concept study and structural layout for a maritime surveillance platform.",
    details:
      "Defined mission requirements, performed initial weight estimation, and developed fuselage frames and payload bay hardpoints. Completed aero/propulsion trades and maintenance access considerations.",
    links: ["#", "#"],
  },
  {
    id: "breakerbot",
    title: "BreakerBot",
    img: "assets/p2.jpg",
    tags: ["robotics", "manufacturing"],
    summary:
      "Compact, serviceable combat robot focusing on drivetrain reliability and quick-change modules.",
    details:
      "Designed modular armor panels, integrated brushless drivetrain with overload protection, and validated gear train with FEA and benchtop torque testing.",
    links: ["#", "#"],
  },
  {
    id: "gearbox",
    title: "Planetary Gearbox",
    img: "assets/p3.jpg",
    tags: ["cad", "fea"],
    summary:
      "Compact planetary set optimized for mass and stiffness using simulation-driven design.",
    details:
      "Performed contact and bending stress checks vs. AGMA, ran modal analysis on carrier to prevent mesh-induced resonance, and validated with dye-penetrant inspection.",
    links: ["#", "#"],
  },
  {
    id: "truss",
    title: "Truss Analysis & Optimization",
    img: "assets/p4.jpg",
    tags: ["structures", "optimization"],
    summary:
      "Parametric truss optimizer with buckling and deflection constraints.",
    details:
      "Implemented penalty method to enforce Euler buckling margins, with sensitivity-based member sizing and manufacturing grouping constraints.",
    links: ["#", "#"],
  },
  {
    id: "pneumatic-brake",
    title: "Pneumatic Brake Module",
    img: "assets/p5.jpg",
    tags: ["mechatronics", "safety"],
    summary:
      "Fail-safe pneumatic brake module with diagnostic telemetry and overpressure protection.",
    details:
      "Sized valves and reservoir per duty cycle, implemented leak-down detection, and added redundant relief per ISO 4414 guidance.",
    links: ["#", "#"],
  },
  {
    id: "mode-converter",
    title: "Microbend Mode Converter",
    img: "assets/p6.jpg",
    tags: ["photonics", "test"],
    summary:
      "Fiber microbend mode converter for lab validation and low-cost manufacturing.",
    details:
      "Built adjustable microbend fixture with sub-50 µm repeatability, wrote Python scripts for mode purity quantification, and documented process for transfer to production.",
    links: ["#", "#"],
  },
];

// Routing
const routes = {
  portfolio: renderPortfolio,
  aviation: renderAviation,
  blog: renderBlog,
  about: renderAbout,
};

function currentRoute() {
  const clean = (location.hash || "#/portfolio").replace(/^#\/?/, "");
  return clean || "portfolio";
}

function setActiveNav() {
  document.querySelectorAll("[data-route]").forEach((a) => {
    const r = a.getAttribute("href").replace(/^#\/?/, "").toLowerCase();
    if (r === currentRoute()) a.classList.add("active");
    else a.classList.remove("active");
  });
}

function render() {
  setActiveNav();
  const route = currentRoute();
  const view = routes[route] || renderPortfolio;
  app.innerHTML = view();
  bindProjectClicks();
}

window.addEventListener("hashchange", render);
window.addEventListener("load", render);

// Views
function pageTitle(title, subtitle="") {
  return `
    <div class="page-title">
      <h1>${title}</h1>
      ${subtitle ? `<p>${subtitle}</p>` : ""}
    </div>
  `;
}

function renderPortfolio() {
  const cards = PROJECTS.map(cardHTML).join("");
  return `
    ${pageTitle("Portfolio")}
    <div class="grid">${cards}</div>
  `;
}

function renderAviation() {
  const cards = [1,2,3].map(n => `
    <article class="card">
      <div class="card-media"><img src="assets/aviation.jpg" alt="Aviation project ${n}"></div>
      <div class="card-body">
        <h3>Aviation Project ${n}</h3>
        <p>Short description and key outcomes.</p>
      </div>
    </article>
  `).join("");
  return `
    ${pageTitle("Aviation","Aerospace and flight-adjacent projects")}
    <div class="prose">
      <p>Highlight flight-related builds and research—airframes, avionics, control systems, or propulsion.</p>
      <ul>
        <li>UAV airframe concepts with weight/balance breakdown</li>
        <li>Propeller/EDF trade studies and performance maps</li>
        <li>Flight computer stack and wiring harness drawings</li>
      </ul>
    </div>
    <div class="grid" style="margin-top:16px">${cards}</div>
  `;
}

function renderBlog() {
  const posts = [
    { title: "Design log — simulation to shop", date: "2025-09-14", excerpt: "Notes on moving from quick parametric models to testable prototypes and back again." },
    { title: "Baja suspension: anti-squat, roll steer, and real bumps", date: "2025-08-03", excerpt: "Sketches + equations that help tune the car on dirt." }
  ];
  return `
    ${pageTitle("Blog","Short write-ups and notes")}
    <div class="prose">
      ${posts.map(p => `
        <a class="pill" href="#" style="margin-bottom:12px">
          <div style="display:flex;align-items:baseline;justify-content:space-between;gap:12px">
            <strong>${p.title}</strong>
            <time style="color:#6b7280">${p.date}</time>
          </div>
          <div style="color:#374151;margin-top:4px">${p.excerpt}</div>
        </a>
      `).join("")}
    </div>
  `;
}

function renderAbout() {
  return `
    ${pageTitle("About")}
    <div class="grid" style="grid-template-columns: 1fr; gap:24px">
      <div class="card">
        <div class="card-media" style="aspect-ratio:1/1"><img src="assets/portrait.jpg" alt="Portrait of Nathan"></div>
      </div>
      <div class="prose">
        <h2 style="margin-top:0">Hi, I’m Nathan.</h2>
        <p>I build mechanical and mechatronic systems—vehicle dynamics, powertrain, test rigs, and simulation-driven design. I’ve worked on Baja SAE, assembly-line 3D printing integration at BMW, and powertrain engineering at Harbinger Motors.</p>
        <p>I like minimal, serviceable designs and validating ideas quickly with bench testing, instrumentation, and FEA.</p>
        <ul>
          <li><a href="#" class="underline">Resume (PDF)</a></li>
          <li><a href="#" class="underline">LinkedIn</a></li>
          <li><a href="#" class="underline">Email</a></li>
        </ul>
      </div>
    </div>
  `;
}

function cardHTML(p) {
  const tags = p.tags.map(t => `<span class="tag">${t}</span>`).join("");
  return `
    <article class="card" data-project-id="${p.id}">
      <div class="card-media"><img src="${p.img}" alt="${p.title}"></div>
      <div class="card-body">
        <div class="tags">${tags}</div>
        <h3>${p.title}</h3>
        <p>${p.summary}</p>
      </div>
    </article>
  `;
}

// Modal controls
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modal-title");
const modalImg = document.getElementById("modal-img");
const modalText = document.getElementById("modal-text");
const modalLink1 = document.getElementById("modal-link-1");
const modalLink2 = document.getElementById("modal-link-2");

function bindProjectClicks() {
  document.querySelectorAll("[data-project-id]").forEach(card => {
    card.addEventListener("click", () => {
      const id = card.getAttribute("data-project-id");
      const p = PROJECTS.find(x => x.id === id);
      if (!p) return;
      modalTitle.textContent = p.title;
      modalImg.src = p.img;
      modalText.textContent = p.details;
      modalLink1.href = p.links[0] || "#";
      modalLink2.href = p.links[1] || "#";
      modal.classList.remove("hidden");
      modal.setAttribute("aria-hidden", "false");
    });
  });
}

modal.addEventListener("click", (e) => {
  if (e.target.hasAttribute("data-close") || e.target === modal) closeModal();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});
function closeModal(){
  modal.classList.add("hidden");
  modal.setAttribute("aria-hidden", "true");
}
