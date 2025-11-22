import { listenElement, capitalizeFirst } from '../../systems/utils/utils.js';

export function initListenElement() {
    listenElement('.pagination', 'click', (e) => {
        const target = e.target.closest('.pagination-item');
        if (!target) return;

        const pagination = target.closest('.pagination');
        if (!pagination) return;

        // Xử lý tab
        const items = pagination.querySelectorAll('.pagination-item');
        items.forEach(i => i.classList.remove('active'));
        target.classList.add('active');

        // Xử lý nội dung
        const contentBodies = pagination.querySelectorAll('.pagination__body');
        contentBodies.forEach(body => body.classList.remove('active'));

        const targetKey = target.dataset.target;
        const activeBody = pagination.querySelector(`.pagination__body--${targetKey}`);
        if (activeBody) {
            activeBody.classList.add('active');
        }

        // Cập nhật tiêu đề nếu cần
        const heading = pagination.querySelector('.pagination__heading');
        if (heading) {
            heading.textContent = capitalizeFirst(targetKey);
        }
    });

    listenElement('.menu-toggle', 'click', () => {
        const sidebar = document.querySelector('.sidebar');
        if (!sidebar) return; // Không click vào item thì bỏ qua
        // Thêm active cho item vừa click
        sidebar.classList.toggle('sidebar--active');

    });

    listenElement('.overlay', 'click', () => {
        const sidebar = document.querySelector('.sidebar');
        if (!sidebar) return; // Không click vào item thì bỏ qua
        // Thêm active cho item vừa click
        sidebar.classList.remove('sidebar--active');
    });
}

