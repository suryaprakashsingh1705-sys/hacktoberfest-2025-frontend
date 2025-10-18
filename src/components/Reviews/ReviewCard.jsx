import { renderStars } from '../common/ReviewStars';

const ReviewCard = ({ product, comment, name, rating }) => {
  return (
    <li className="review-card min-w-[200px] relative w-full max-w-full h-max gap-6 flex flex-col p-6 bg-white border border-[#DDDDDD] items-center justify-center rounded-lg shadow-md cursor-default hover:shadow-xl scale-3d hover:scale-105 transition-all ease-in-out duration-300 ">
      <img
        src={`/icons/material-icon-theme_verified.svg`}
        alt={'verified'}
        className="verified-badge absolute top-[-10px] right-[-12px]"
      />
      <h3 className="review-title  font-bold text-lg --font-inter text-[#0D1B2A]">
        {product}
      </h3>
      <p className="review-comment text-sm text-center min-h-[calc(1.5em*3)] line-clamp-3  --font-montserrat text-[#333333]">
        {comment}
      </p>
      <h3 className="review-name  font-bold text-lg --font-inter text-[#0D1B2A]">
        {name}
      </h3>
      <div className="flex gap-1">{renderStars(rating)}</div>
    </li>
  );
};

export default ReviewCard;
