import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState } from '../../../redux/store';
import { useFetchProductByIdQuery } from '../../../redux/features/products/productApi';
import { usePostReviewMutation } from '../../../redux/features/reviews/reviewsApi';

type PostAReviewProps = {
  isModalOpen: boolean;
  handleClose: () => void;
};

const PostAReview = ({ isModalOpen, handleClose }: PostAReviewProps) => {
  const { id } = useParams();
  const { user } = useSelector((state: RootState) => state.auth);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const { refetch } = useFetchProductByIdQuery(id, { skip: !id });
  const [postReview] = usePostReviewMutation();

  const handleRating = (value: number) => {
    setRating(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newComment = {
      comment,
      rating,
      userId: user?._id,
      product: id,
    };

    try {
    } catch (error) {}
  };

  return (
    <div
      className={`fixed inset-0 bg-black/90 flex items-center justify-center z-40 px-2 ${
        isModalOpen ? 'block' : 'hidden'
      }`}
    >
      <div className="bg-white p-6 rounded-md shadow-lg w-96 z-50">
        <h2 className="text-lg font-medium mb-4">Post A Review</h2>

        <div className="flex items-center mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              onClick={() => handleRating(star)}
              className="cursor-pointer text-yellow-500 text-lg"
            >
              {rating >= star ? (
                <i className="ri-star-fill"></i>
              ) : (
                <i className="ri-star-fill"></i>
              )}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostAReview;
