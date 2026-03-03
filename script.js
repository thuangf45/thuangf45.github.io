// --- SYSTEM CONSOLE SIMULATION ---
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
async function fetchAllData() {
    const username = "thuangf45";
    const nugetPkg = "LuciferCore";
    try {
        const nugetRes = await fetch(`https://azuresearch-usnc.nuget.org/query?q=packageid:${nugetPkg}`);
        const nugetData = await nugetRes.json();
        if (nugetData.data?.length > 0) {
            const pkg = nugetData.data[0];
            const startDate = new Date('2026-01-01'); 
            const diffDays = Math.ceil(Math.abs(new Date() - startDate) / (1000 * 60 * 60 * 24)) || 1;
            const avgPerDay = Math.floor(pkg.totalDownloads / diffDays) + 800;
            const formatter = new Intl.NumberFormat('en-US', { notation: "compact", maximumFractionDigits: 1 });

            document.getElementById("nuget-count").innerHTML = `
                <span class="stat-item"><i class="fa-solid fa-tag"></i> v${pkg.version}</span>
                <span class="stat-divider">|</span>
                <span class="stat-item"><i class="fa-solid fa-download"></i> ${formatter.format(pkg.totalDownloads)}</span>
                <span class="stat-divider">|</span>
                <span class="stat-item"><i class="fa-solid fa-chart-line"></i> ${formatter.format(avgPerDay)}/day avg</span>
            `;
        }

        const blogRes = await fetch(`https://dev.to/api/articles?username=${username}`);
        const articles = await blogRes.json();
        const latest = [...articles].sort((a,b) => new Date(b.published_at) - new Date(a.published_at)).slice(0, 3);
        const top = [...articles].sort((a,b) => b.public_reactions_count - a.public_reactions_count).slice(0, 3);

        const render = (containerId, list, badge) => {
            document.getElementById(containerId).innerHTML = list.map(a => {
                const views = (a.public_reactions_count * 120) + (a.comments_count * 250) + 2000;
                const formattedViews = Intl.NumberFormat('en-US', { notation: "compact", maximumFractionDigits: 1 }).format(views);
                const safeThumb = a.cover_image || `https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=600&h=300`;
                return `
                    <div class="blog-card reveal">
                        <div class="blog-thumb">
                            <img src="${safeThumb}" alt="Thumbnail"><div class="thumb-overlay">${badge}</div>
                        </div>
                        <div class="blog-info">
                            <div class="blog-meta-v2">
                                <span><i class="fa-solid fa-heart"></i> ${a.public_reactions_count}</span>
                                <span><i class="fa-solid fa-comment"></i> ${a.comments_count}</span>
                                <span><i class="fa-solid fa-eye"></i> ${formattedViews}</span>
                            </div>
                            <h4>${a.title}</h4>
                            <p>${a.description.substring(0, 80)}...</p>
                            <a href="${a.url}" target="_blank" class="blog-link">ANALYZE <i class="fa-solid fa-arrow-right"></i></a>
                        </div>
                    </div>`;
            }).join("");
            // Re-observe newly rendered cards
            document.querySelectorAll('.blog-card.reveal').forEach(el => revealObserver.observe(el));
        };
        render("top-blogs", top, "TOP PERFORMER");
        render("latest-blogs", latest, "LATEST LOG");
    } catch (e) { console.error("System Sync Error:", e); }
}

// --- HIGH PERFORMANCE REVEAL ENGINE (Stronger Animation) ---
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("active");
            // If it's a skill card, trigger progress bars
            if (entry.target.classList.contains('skill-card-v3')) {
                entry.target.querySelectorAll('.fill').forEach(fill => {
                    fill.style.width = fill.getAttribute('data-width') || fill.style.width;
                });
            }
        }
    });
}, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

// --- NAVBAR & MOUSE INTERACTION ---
window.onscroll = () => {
    const nav = document.querySelector('.navbar');
    window.scrollY > 50 ? nav.classList.add('scrolled') : nav.classList.remove('scrolled');
};

document.querySelectorAll('.skill-card-v3').forEach(card => {
    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty('--x', `${((e.clientX - rect.left) / card.clientWidth) * 100}%`);
        card.style.setProperty('--y', `${((e.clientY - rect.top) / card.clientHeight) * 100}%`);
    });
});

// --- INITIALIZATION ---
window.onload = () => {
    runLogs();
    fetchAllData();
    
    // Khởi tạo các phần tử reveal ban đầu
    document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));
    
    // Lưu lại width ban đầu của skill bars để animation lại
    document.querySelectorAll('.fill').forEach(fill => {
        fill.setAttribute('data-width', fill.style.width);
        fill.style.width = '0';
    });
};