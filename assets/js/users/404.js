import { initPet } from './logic/pet.js';

document.addEventListener('DOMContentLoaded', () => {
  initPet();
  const q = new URLSearchParams(location.search).get('q') || '';
  const input = document.getElementById('q');
  if (input) input.value = q;

  document.getElementById('searchForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const v = (input.value || '').trim();
    if (!v) { input.focus(); return; }
    // chuyển hướng tới trang tìm kiếm backend/frontend xử lý
    // thay đổi '/search' theo route dự án của bạn nếu cần
    location.href = '/search?q=' + encodeURIComponent(v);
  });

  document.getElementById('reportBtn').addEventListener('click', function () {
    // mở form báo lỗi, thay đổi link theo hệ thống báo lỗi của bạn
    const mailto = 'mailto:admin@example.com?subject=Broken%20link%20(404)&body=URL: ' + encodeURIComponent(location.href);
    location.href = mailto;
  });

  // keyboard: Enter on Escape focus search
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') input.focus();
  });

});

