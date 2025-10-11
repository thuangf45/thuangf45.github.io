// Base/js/base.js
document.addEventListener('DOMContentLoaded', () => {
    // ========= Element event =========
    // ========= Pagination event =========
    listenIfExists('.pagination', 'click', (e) => {
        const target = e.target.closest('.pagination-item');
        console.log(target);
        if (!target) return; // Không click vào item thì bỏ qua

        // Tìm pagination cha gần nhất (để giới hạn phạm vi)
        const pagination = target.closest('.pagination');
        if (!pagination) return;

        // Chỉ lấy item trong pagination này thôi
        const items = pagination.querySelectorAll('.pagination-item');

        // Xóa active ở tất cả item
        items.forEach(i => i.classList.remove('active'));

        // Thêm active cho item vừa click
        target.classList.add('active');
    });

    listenIfExists('#menu-toggle', 'click', (e) => {
        const sidebar = document.querySelector('#sidebar');
        console.log(sidebar);
        if (!sidebar) return; // Không click vào item thì bỏ qua

        // Thêm active cho item vừa click
        sidebar.classList.toggle('active');
    });

    // ========= Window event =========
    listenWindow('load', () => {
        // Lấy phần tử đầu tiên trong pagination
        const firstItems = document.querySelectorAll('.pagination-item:first-child');
        if (!firstItems.length) return;

        firstItems.forEach(i => i.classList.add('active'));
    });

    listenWindow('offline', () => {
        View.showWarning('Bạn đang ngoại tuyến');
        console.log('Offline event fired');
    });

    listenWindow('online', () => {
        View.showSuccess('Bạn đã kết nối lại internet');
        console.log('Online event fired');
    });

    listenWindow('scroll', () => {
        const header = document.getElementById('header');
        if (window.scrollY > 50) { // 50px trở xuống là top
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

});

// Hàm tiện ích: chỉ thêm sự kiện nếu phần tử tồn tại
function listenIfExists(selector, event, handler) {
    const elements = document.querySelectorAll(selector);
    if (!elements.length || typeof handler !== 'function') return;

    elements.forEach(el => el.addEventListener(event, handler));
}

// Hàm tiện ích: Thêm listener vào window nếu tồn tại (luôn tồn tại)
function listenWindow(event, handler) {
    if (typeof handler !== 'function') return;
    window.addEventListener(event, handler);
}
function loadCSS(url) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = url;
    document.head.appendChild(link);
}

function loadScript(url) {
    const script = document.createElement('script');
    script.src = url;
    script.type = 'text/javascript';
    document.body.appendChild(script);
}
