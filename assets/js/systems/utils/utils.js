import { urlIncludes } from "./url.js";

// Hàm tiện ích: chỉ thêm sự kiện nếu phần tử tồn tại
export function listenElement(selector, event, handler) {
  if (typeof handler !== 'function') return;

  const elements = document.querySelectorAll(selector);
  if (!elements.length) return;

  elements.forEach(el => el.addEventListener(event, handler));
}

// Hàm tiện ích: Thêm listener vào document
export function listenDocument(event, handler) {
  if (typeof handler !== 'function') return;
  document.addEventListener(event, handler);
}

// Hàm tiện ích: Thêm listener vào window nếu tồn tại (luôn tồn tại)
export function listenWindow(event, handler) {
  if (typeof handler !== 'function') return;
  window.addEventListener(event, handler);
}

export function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export function isLocalhost() {
  return ['localhost', '127.0.0.1'].includes(window.location.hostname);
}

export function isLocalEnv() {
  return urlIncludes("github.io") || isLocalhost();
}

export function endsWith(str = '', suffix = '') {
  return typeof str === 'string' && str.endsWith(suffix);
}

export function startsWith(str = '', prefix = '') {
  return typeof str === 'string' && str.startsWith(prefix);
}

export function capitalizeFirst(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

