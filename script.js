// System Console Simulation
const logs = [
    "[BOOT] System Architect Profile v2.6.4 Loaded",
    "[OK] Memory Pool Initialized (Zero-Alloc Mode)",
    "[OK] SIMD-128 Instruction Sets Enabled",
    "[INFO] Initializing Real-time API Handlers...",
    "[INFO] Handshaking with VNU-HCMUS Servers...",
    "[OK] Buffer-Model Architecture validated",
    "[READY] Thuangf45.sys is Online & Performing."
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

// --- DYNAMIC DATA FETCHING ---

async function fetchDynamicStats() {
    // 1. NuGet Data
    const nugetPkg = "LuciferCore";
    try {
        const response = await fetch(`https://azuresearch-usnc.nuget.org/query?q=packageid:${nugetPkg}`);
        const data = await response.json();
        if (data.data && data.data.length > 0) {
            const totalDownloads = data.data[0].totalDownloads;
            document.getElementById("nuget-count").textContent = 
                new Intl.NumberFormat().format(totalDownloads) + " Downloads";
        }
    } catch (e) { 
        console.error("NuGet API Error", e);
        document.getElementById("nuget-count").textContent = "21K+ Downloads";
    }

    // 2. Dev.to Data
    try {
        const response = await fetch(`https://dev.to/api/articles?username=thuangf45`);
        const articles = await response.json();
        const target = articles.find(a => a.slug.includes("breaking-the-memory-wall"));
        
        if (target) {
            document.getElementById("devto-reactions").textContent = target.public_reactions_count;
            document.getElementById("devto-comments").textContent = target.comments_count;
            // page_views_count usually requires API key, showing fallback or estimation
            document.getElementById("devto-views").textContent = target.page_views_count || "1.6K+";
        }
    } catch (e) { 
        console.error("Dev.to API Error", e);
    }
}

// Contact Form Handler
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

// Initialization
window.onload = () => {
    runLogs();
    fetchDynamicStats();
};