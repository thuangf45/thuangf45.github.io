
export class Notification {
    static showSuccess(message, duration = 4000) {
        Notification.show(message, NotificationType.SUCCESS, duration);
    }

    static showError(message, duration = 4000) {
        Notification.show(message, NotificationType.ERROR, duration);
    }

    static showWarning(message, duration = 4000) {
        Notification.show(message, NotificationType.WARNING, duration);
    }

    static showInfo(message, duration = 4000) {
        Notification.show(message, NotificationType.INFO, duration);
    }


    static show(message, type = NotificationType.INFO, duration = 4000) {
        let container = document.getElementById('notificationContainer');
        if (!container) {
            container = document.createElement('div');
            container.id = 'notificationContainer';
            document.body.appendChild(container);
        }

        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        notification.innerHTML = `
            <div class="notification__content">
                <div class="notification__icon">${Notification.getIcon(type)}</div>
                <div class="notification__text">${message}</div>
                <button class="notification__close" title="Đóng">&times;</button>
            </div>
        `;

        container.appendChild(notification);

        // Hiệu ứng vào
        setTimeout(() => notification.classList.add('notification--visible'), 10);

        // Tự động đóng
        if (duration > 0) {
            setTimeout(() => Notification.remove(notification), duration);
        }

        // Click nút đóng
        notification.querySelector('.notification__close')
            .addEventListener('click', () => Notification.remove(notification));
    }

    static remove(notification) {
        notification.classList.remove('notification--visible');
        notification.classList.add('notification--hide');
        setTimeout(() => notification.remove(), 300);
    }

    static getIcon(type) {
        switch (type) {
            case NotificationType.SUCCESS: return '<i class="fas fa-check-circle"></i>';
            case NotificationType.ERROR: return '<i class="fas fa-times-circle"></i>';
            case NotificationType.WARNING: return '<i class="fas fa-exclamation-triangle"></i>';
            case NotificationType.INFO:
            default: return '<i class="fas fa-info-circle"></i>';
        }
    }
}

export const NotificationType = Object.freeze({
    SUCCESS: 'success',
    ERROR: 'error',
    WARNING: 'warning',
    INFO: 'info',
});