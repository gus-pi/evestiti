import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { useGetReviewsByUserIdQuery } from '../../../redux/features/reviews/reviewsApi';
import { Review } from '../../../types/types';
import { useNavigate } from 'react-router-dom';

const UserReviews = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const {
    data: reviews,
    error,
    isLoading,
  } = useGetReviewsByUserIdQuery(user._id);

  const navigate = useNavigate();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>failed to load reviews.</div>;

  const handleCardClick = () => {
    navigate('/shop');
  };

  return (
    <div className="py-6">
      <h2 className="text-2xl font-bold mb-6">Your reviews</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-8 gap-6">
        {reviews &&
          reviews.map((review: Review, index: number) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-4 border-gray-200 cursor-pointer hover:scale-105 transition-all duration-200"
            >
              <p className="text-lg font-semibold mb-2">
                Rating: {review.rating}
              </p>
              <p className="mb-2">
                <strong>Comment: </strong>
                {review.comment}
              </p>
              <p className="text-sm text-gray-500">
                <strong>Product ID: </strong> {review.productId}
              </p>
              <p className="text-sm text-gray-500">
                <strong>Date: </strong>{' '}
                {new Date(review.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        <div
          onClick={handleCardClick}
          className="bg-gray-100 text-black flex items-center justify-center rounded-lg p-6 border cursor-pointer hover:bg-primary hover:text-white transition-all duration-200"
        >
          <span>+</span>
          <p>Add new review</p>
        </div>
      </div>
    </div>
  );
};

export default UserReviews;
