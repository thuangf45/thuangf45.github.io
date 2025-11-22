export function loadCSS(url) {
  if (!url) return;
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = url;
  document.head.appendChild(link);
}

export function loadScript(url) {
  if (!url) return;
  const script = document.createElement('script');
  script.src = url;
  script.type = 'text/javascript';
  document.body.appendChild(script);
}

// export async function tryFetch(url) {
//   try {
//     const res = await fetch(url);
//     return res.ok ? res : null;
//   } catch {
//     return null;
//   }
// }

function revokeBlob(blobUrl, element) {
  URL.revokeObjectURL(blobUrl);
  element.onload = null;
  element.onloadeddata = null;
}

export function loadURL(url, element, isRevoke = false, isBigFile = false) {
  fetch(url)
    .then(res => res.blob())
    .then(blob => {
      const blobUrl = URL.createObjectURL(blob);
      element.src = blobUrl;

      if (isRevoke) {
        const revokeHandler = () => revokeBlob(blobUrl, element);
        isBigFile ? element.onloadeddata = revokeHandler : element.onload = revokeHandler;
      }
    })
    .catch(err => console.error("Error:", err));
}

export function urlIncludes(keyword) {
  return window.location.href.includes(keyword);
}