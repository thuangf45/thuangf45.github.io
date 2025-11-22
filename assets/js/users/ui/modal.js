import { listenElement } from "../../systems/utils/utils";

export class Modal {
    static show({ title = 'Thông báo', body = 'Nội dung...', onOk = null, onCancel = null } = {}) {
        const overlay = Modal.getOrAdd();
        // Gán nội dung động
        overlay.querySelector('.modal-header').textContent = title;
        overlay.querySelector('.modal-body').textContent = body;

        Modal.onOk = onOk;
        Modal.onCancel = onCancel;

        // Hiển thị
        overlay.classList.remove('hidden');
    }

    static hide() {
        const overlay = Modal.getOrAdd();
        if (overlay) overlay.classList.add('hidden');
    }

    static initEvent() {
        listenElement('#modalOverlay .btn-ok', 'click', () => {
            if (typeof Modal.onOk === 'function') Modal.onOk();
            Modal.hide();
        });

        listenElement('#modalOverlay .btn-cancel', 'click', () => {
            if (typeof Modal.onCancel === 'function') Modal.onCancel();
            Modal.hide();
        });
    }

    static getOrAdd() {
        let overlay = document.getElementById('modalOverlay');

        // Nếu chưa có thì tạo mới
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.id = 'modalOverlay';
            overlay.className = 'modal-overlay hidden';
            overlay.innerHTML = `
                <div class="modal">
                    <div class="modal-header"></div>
                    <div class="modal-body"></div>
                    <div class="modal-footer">
                        <button class="btn btn-ok">OK</button>
                        <button class="btn btn-cancel">Hủy</button>
                    </div>
                </div>
            `;
            document.body.appendChild(overlay);

            Modal.initEvent();
        }

        return overlay;
    }
}
