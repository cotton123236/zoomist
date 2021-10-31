import {
  CLASS_CONTAINER,
  CLASS_WRAPPER,
  CLASS_IMAGE
} from './../shared/constants'

export default (zoomist) => {
  const { url, style } = zoomist

  return `
  <div class="${CLASS_WRAPPER}">
    <img class="${CLASS_IMAGE}" src="${url}" />
  </div>
  `
}