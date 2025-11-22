export function fontawesomeLoad() {
  fetch("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css", { method: "HEAD" })
    .then(response => {
      if (response.ok) {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css";
        link.crossOrigin = "anonymous";
        link.referrerPolicy = "no-referrer";
        document.head.appendChild(link);
      } else {
        throw new Error("CDN lỗi");
      }
    })
    .catch(() => {
      console.warn("CDN lỗi, dùng bản local.");
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "assets/fonts/css/all.min.css";
      document.head.appendChild(link);
    });

}