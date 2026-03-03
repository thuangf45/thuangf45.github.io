// Console Logs System
const logs = [
    "[BOOT] System Architect Profile Loading...",
    "[OK] Memory Pool Initialized",
    "[OK] Zero-Allocation Mode Enabled",
    "[OK] LuciferCore v1.x Status: STABLE",
    "[INFO] Handshaking with VNU-HCMUS Servers...",
    "[INFO] Buffer-Model Trending on Dev.to",
    "[READY] Thuan.sys is Online."
];

const consoleBody = document.getElementById("console-logs");
let i = 0;

function runLogs() {
    if (i < logs.length) {
        const p = document.createElement("p");
        p.textContent = `> ${logs[i]}`;
        p.style.color = "#00ff41";
        p.style.fontFamily = "Fira Code, monospace";
        p.style.fontSize = "0.8rem";
        p.style.marginBottom = "5px";
        consoleBody.appendChild(p);
        i++;
        setTimeout(runLogs, 600);
    }
}

window.onload = runLogs;