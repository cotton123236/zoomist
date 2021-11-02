import {
  CLASS_IMAGE
} from './../shared/constants'

export default (zoomist) => {
  const { url } = zoomist

  return `
  <img class="${CLASS_IMAGE}" src="${url}" />
  `
}