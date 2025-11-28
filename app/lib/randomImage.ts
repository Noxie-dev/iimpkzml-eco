export const randomPLImage = () => {
  const images = [
    '/images/pl-hol1.jpg',
    '/images/pl-hol2.jpg',
    '/images/pl-hol3.jpg'
  ];

  return images[Math.floor(Math.random() * images.length)];
};
