import { createImage } from './createImage'; // You’ll need to implement this helper as well

const getCroppedImg = async (imageSrc, crop) => {
  const image = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  canvas.width = crop.width;
  canvas.height = crop.height;

  ctx.drawImage(
    image,
    crop.x, crop.y, crop.width, crop.height,
    0, 0, crop.width, crop.height
  );

  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      if (blob) {
        const file = new File([blob], 'croppedImage.jpg', { type: 'image/jpeg' });
        resolve(file);
      }
    }, 'image/jpeg');
  });
};

export default getCroppedImg;
