// System Console Simulation
const logs = [
    "[BOOT] System Architect Profile v2.6.4 Loaded",
    "[OK] Memory Pool Initialized (Zero-Alloc Mode)",
    "[OK] SIMD-128 Instruction Sets Enabled",
    "[INFO] LuciferCore NuGet status: 21,432 downloads",
    "[INFO] Handshaking with VNU-HCMUS Servers...",
    "[OK] Buffer-Model Architecture validated",
    "[READY] Thuan.sys is Online & Performing."
];

const consoleBody = document.getElementById("console-logs");
let logIdx = 0;

function runLogs() {
    if (logIdx < logs.length) {
        const p = document.createElement("p");
        p.textContent = `> ${logs[logIdx]}`;
        p.style.color = "#00ff41";
        p.style.fontFamily = "'Fira Code', monospace";
        p.style.fontSize = "0.8rem";
        p.style.marginBottom = "8px";
        consoleBody.appendChild(p);
        logIdx++;
        consoleBody.scrollTop = consoleBody.scrollHeight;
        setTimeout(runLogs, 600);
    }
}

// Contact Form Handlers
document.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault();
    const btn = e.target.querySelector("button");
    btn.textContent = "SIGNAL TRANSMITTED";
    btn.style.background = "#27c93f";
    btn.style.color = "white";
    setTimeout(() => {
        btn.textContent = "Transmit Signal";
        btn.style.background = "#00f3ff";
        btn.style.color = "black";
        e.target.reset();
    }, 3000);
});

window.onload = runLogs;

async function fetchStats() {
    // 1. Fetch NuGet Downloads for LuciferCore
    // NuGet API v3 search service
    const nugetPkg = "LuciferCore";
    try {
        const response = await fetch(`https://azuresearch-usnc.nuget.org/query?q=packageid:${nugetPkg}`);
        const data = await response.json();
        if (data.data && data.data.length > 0) {
            const totalDownloads = data.data[0].totalDownloads;
            // Format number: 21432 -> 21,432
            document.getElementById("nuget-count").textContent = 
                new Intl.NumberFormat().format(totalDownloads) + " Downloads";
        }
    } catch (err) {
        console.error("NuGet API Error:", err);
        document.getElementById("nuget-count").textContent = "21K+ Downloads"; // Fallback
    }

    // 2. Fetch Dev.to Article Stats (Optional but cool)
    // Dùng API để lấy thông tin bài viết dựa trên ID hoặc Username
    try {
        const response = await fetch(`https://dev.to/api/articles?username=thuangf45`);
        const articles = await response.json();
        // Tìm đúng bài "Breaking the Memory Wall"
        const target = articles.find(a => a.slug.includes("breaking-the-memory-wall"));
        if (target) {
            document.getElementById("devto-reactions").textContent = 
                `#${target.public_reactions_count} Reactions`;
        }
    } catch (err) {
        console.error("Dev.to API Error:", err);
        document.getElementById("devto-reactions").textContent = "#Performance"; // Fallback
    }
}

// Chạy hàm fetch khi trang web đã load xong
window.addEventListener('DOMContentLoaded', () => {
    runLogs(); // Hàm log cũ của bạn
    fetchStats();
});