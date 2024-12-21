type Review = {
  id: string;
  title: string;
  content: string;
  rating: number;
  name_reviewer: string;
  sentiment?: string;
};

export default Review;
