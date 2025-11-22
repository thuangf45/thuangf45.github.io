import { listenWindow, isLocalhost } from '../utils/utils.js';

export function protectDevtool() {
  if (isLocalhost()) return;
  listenWindow('keydown', e => {
    const k = e.key.toLowerCase();
    if (k === 'f12' || (e.ctrlKey && (k === 'u' || (e.shiftKey && k === 'i')))) {
      e.preventDefault();
    }
  });
}

export async function generateObfuscatedCode(key, size = 25) {
    const salt = crypto.getRandomValues(new Uint8Array(16)).join("");
    const data = key + salt;

    const encoder = new TextEncoder();
    const dataBuffer = encoder.encode(data);

    const hashBuffer = await crypto.subtle.digest("SHA-256", dataBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");

    return hashHex.slice(0, size); // ✅ Trả về chuỗi đã xử lý
}

