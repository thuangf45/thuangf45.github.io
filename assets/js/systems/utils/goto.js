import { endsWith, listenElement } from './utils.js';

export function goTo(page = "404", hash = null) {
  const fullUrl = buildUrl(page, hash);
  if (endsWith(window.location.href, fullUrl) && !hash) return;
  window.location.href = fullUrl;
}

export function initGoTo() {
  listenElement("[data-page]", "click", (event) => {
    const el = event.currentTarget;
    const page = el.dataset.page;
    goTo(page);
  });

  listenElement("[data-hash]", "click", (event) => {
    const el = event.currentTarget;
    const hashValue = el.dataset.hash === "home" ? "" : el.dataset.hash;
    goTo("index", `#${hashValue}`);
  });
}

function isStaticDevMode() {
  return ["5500", "3000", "8080"].includes(window.location.port);
}

function buildUrl(page = "404", hash = null) {
  const isStaticDev = isStaticDevMode();
  let targetPage;
  if (page === "index") targetPage = isStaticDev ? "/index.html" : "/";
  else targetPage = isStaticDev ? `/${page}.html` : `/${page}`;

  const baseUrl = window.location.origin;
  return `${baseUrl}${targetPage}${hash ? hash : ""}`;
}