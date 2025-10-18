import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

export const renderStars = (rating) => {
  /**
   * pushes full stars at first
   * pushes half star if needed
   * fills the rest with empty stars
   */
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const totalStars = 5;

  for (let i = 0; i < fullStars; i++) {
    stars.push(<FaStar key={i} className="text-yellow-300" />);
  }

  if (hasHalfStar) {
    stars.push(<FaStarHalfAlt key="half" className="text-yellow-300" />);
  }

  while (stars.length < totalStars) {
    stars.push(
      <FaRegStar key={`empty-${stars.length}`} className="text-yellow-300" />
    );
  }

  return stars;
};
