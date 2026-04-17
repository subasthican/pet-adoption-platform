export const getImageUrl = (imagePath) => {
  if (!imagePath) {
    return "https://via.placeholder.com/400x250?text=No+Image";
  }

  return `${import.meta.env.VITE_IMAGE_BASE_URL}${imagePath}`;
};