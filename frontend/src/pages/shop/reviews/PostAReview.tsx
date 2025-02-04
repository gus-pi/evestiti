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
      productId: id,
    };

    try {
      await postReview(newComment).unwrap();
      alert('Comment posted successfully!');
      setComment('');
      setRating(0);
      refetch();
    } catch (error: any) {
      if (!user) {
        alert('Please log in to submit a review');
      } else alert(error.data.message);
    }
    handleClose();
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
                <i className="ri-star-line"></i>
              )}
            </span>
          ))}
        </div>
        <textarea
          className="w-full border border-x-gray-300 p-2 rounded-md mb-4 focus:outline-none"
          rows={4}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></textarea>
        <div className="flex justify-end gap-2">
          <button
            onClick={handleClose}
            className="px-4 py-2 bg-gray-300 rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-primary text-white rounded-md "
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostAReview;
