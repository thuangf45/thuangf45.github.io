import { protectDevtool } from '../systems/security/devtool.js';
import { initGoTo } from '../systems/utils/goto.js';
import { initListenWindow } from './event/window.js';
import { initListenElement } from './event/element.js';
import { fontawesomeLoad } from './logic/link.js';
import { initMap } from './logic/map.js';
import { listenElement } from '../systems/utils/utils.js';
import { Modal } from './ui/modal.js';

document.addEventListener('DOMContentLoaded', async () => {
    protectDevtool();

    fontawesomeLoad();

    initListenWindow();
    initListenElement();

    initGoTo();
    initMap();

    listenElement('.contact-popup-trigger', 'click', () => {
        console.log('Contact clicked!');
        Modal.show({
            title: 'Please reach out via ',
            body: 'Email: kingnemacc@gmail.com or phone: 0834 311 855',
            onOk: () => console.log('OK clicked'),
            onCancel: () => console.log('Cancel clicked')
        });
    });

});

