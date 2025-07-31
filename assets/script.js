document.getElementById("carousel-container").innerHTML = `
  <div
    id="carouselExampleCaptions"
    class="relative"
    data-twe-carousel-init
    data-twe-carousel-slide
  >
    <!-- Slide 1 -->
    <div class="relative w-full overflow-hidden after:clear-both after:block after:content-['']">
      <div class="relative float-left w-full" data-twe-carousel-item data-twe-carousel-active>
        <img src="https://tecdn.b-cdn.net/img/Photos/Slides/img%20(15).jpg" class="block w-full" alt="Slide 1" />
      </div>
      <!-- More slides if needed -->
    </div>
  </div>
`;
