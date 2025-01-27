type PostAReviewProps = {
  isModalOpen: boolean;
  handleClose: () => void;
};

const PostAReview = ({ isModalOpen, handleClose }: PostAReviewProps) => {
  return <div>Post a review {isModalOpen}</div>;
};

export default PostAReview;
