export const randomPLImage = () => {
  const images = [
    '/images/pl-hol1.png',
    '/images/pl-hol2.png',
    '/images/pl-hol3.png',
    '/images/pl-hol4.png',
    '/images/pl-hol5.png'
  ];

  return images[Math.floor(Math.random() * images.length)];
};
