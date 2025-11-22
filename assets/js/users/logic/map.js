import { listenElement } from "../../systems/utils/utils";

export function initMap() {
    listenElement('.map-toggle', 'click', (e) => {
        const streetMap = document.querySelector('.map-frame--street');
        const normalMap = document.querySelector('.map-frame--normal');

        if (streetMap.classList.contains('active')) {
            streetMap.classList.remove('active');
            normalMap.classList.add('active');
        } else {
            normalMap.classList.remove('active');
            streetMap.classList.add('active');
        }
    });
}
