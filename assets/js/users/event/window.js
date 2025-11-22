import { listenWindow } from "../../systems/utils/utils.js";
import { loadURL } from "../../systems/utils/url.js";

export function initListenWindow() {
    listenWindow('load', () => {
        const avatar__image = document.querySelector(".avatar__image");
        if (avatar__image) loadURL("assets/image/avatar/avatar_0.jpg", avatar__image, true, false);

        const slider__images = document.querySelectorAll(".slider__image");
        if (slider__images.length) {
            slider__images.forEach(img => {
                loadURL(`assets/image/slider/${img.dataset.index}.jpg`, img, true, false);
            });
        }
    });

    listenWindow('load', () => {
        const sliderImages = document.querySelectorAll(".slider__image");
        const imageList = Array.from(sliderImages);
        let currentIndex = 0;

        function showImage(index) {
            imageList.forEach((img, i) => {
                img.classList.remove("active");
                if (i === index) {
                    // loadURL(`assets/image/slider/${img.dataset.index}.jpg`, img, true, false);
                    img.classList.add("active");
                }
            });
        }

        showImage(currentIndex); // Hiển thị ảnh đầu tiên

        setInterval(() => {
            currentIndex = (currentIndex + 1) % imageList.length;
            showImage(currentIndex);
        }, 4000); // Chuyển ảnh mỗi 8 giây
    });


    listenWindow('scroll', () => {
        const header = document.getElementById('header');
        if (window.scrollY > 50) { // 50px trở xuống là top
            header.classList.add('scrolled');
            return;
        }
        header.classList.remove('scrolled');
    });

    listenWindow('offline', () => {
        console.log('Offline event fired');
    });

    listenWindow('online', () => {
        console.log('Online event fired');
    });
}