export function loadCss() {
  const css = 'https://js.arcgis.com/4.25/@arcgis/core/assets/esri/themes/light/main.css'
  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = css
  document.head.appendChild(link)
}
