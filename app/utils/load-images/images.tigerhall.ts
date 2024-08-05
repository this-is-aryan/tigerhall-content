export const images = {
  image_tigerhall_logo: require('../../screens/home-screen/assets/tigerhall-logo.webp')
}

/**
 * Converts an image URL by inserting resize dimensions into the path.
 *
 * @param {string} url - The original image URL.
 * @param {number} width - The desired width for resizing.
 * @param {number} height - The desired height for resizing.
 * @returns {string} - The updated image URL with resize dimensions.
 */
export const resizeImageUrl = (url: string, width: number, height: number): string => {
  // Parse the URL using the URL constructor
  const urlObject = new URL(url)
  // Extract the path segments from the URL
  const pathSegments = urlObject.pathname.split('/')
  pathSegments.splice(1, 0, `resize/${width}x${height}`)
  urlObject.pathname = pathSegments.join('/')
  return urlObject.toString()
}
