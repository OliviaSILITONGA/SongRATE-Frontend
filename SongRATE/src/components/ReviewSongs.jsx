import { useState, useEffect } from 'react';

export default function ReviewSongs({
  reviewId,  // Added: unique ID for this review
  name,
  review,
  rating,
  likes: initialLikes = 0,
  reviewer,
  reviewerHandle,
  songTitle,
  artist,
  songImage,
  onLikeChange  // Optional callback when like changes
}) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(initialLikes);

  // Get first letter of username for avatar (like navbar in Home.jsx)
  const getInitial = () => {
    if (reviewerHandle) return reviewerHandle.charAt(0).toUpperCase();
    if (reviewer) return reviewer.charAt(0).toUpperCase();
    return "?";
  };

  // Load liked state from localStorage on mount
  useEffect(() => {
    const likedReviews = JSON.parse(localStorage.getItem('likedReviews') || '{}');
    if (reviewId && likedReviews[reviewId]) {
      setLiked(true);
    }

    // Load like count from localStorage
    const reviewLikes = JSON.parse(localStorage.getItem('reviewLikes') || '{}');
    if (reviewId && reviewLikes[reviewId] !== undefined) {
      setLikeCount(reviewLikes[reviewId]);
    }
  }, [reviewId]);

  // Handle like/unlike
  const handleLike = () => {
    const likedReviews = JSON.parse(localStorage.getItem('likedReviews') || '{}');
    const reviewLikes = JSON.parse(localStorage.getItem('reviewLikes') || '{}');

    let newLikeCount;

    if (liked) {
      // Unlike
      delete likedReviews[reviewId];
      newLikeCount = Math.max(0, likeCount - 1);
    } else {
      // Like
      likedReviews[reviewId] = true;
      newLikeCount = likeCount + 1;
    }

    // Save to localStorage
    reviewLikes[reviewId] = newLikeCount;
    localStorage.setItem('likedReviews', JSON.stringify(likedReviews));
    localStorage.setItem('reviewLikes', JSON.stringify(reviewLikes));

    // Update state
    setLiked(!liked);
    setLikeCount(newLikeCount);

    // Optional callback
    if (onLikeChange) {
      onLikeChange(reviewId, !liked, newLikeCount);
    }
  };

  return (
    <div className="bg-[#1C1D22] w-full rounded-2xl p-5 shadow-md border border-white/10 text-white">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          {/* Profile Avatar with Initial - like navbar */}
          <div className="w-10 h-10 rounded-full bg-green-600 border-2 border-yellow-400 flex items-center justify-center text-white font-bold shadow-sm text-sm">
            {getInitial()}
          </div>
          <span className="font-semibold text-sm md:text-base">
            {reviewerHandle}
          </span>
        </div>
        <div className="flex gap-1 text-yellow-400">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className={`w-4 h-4 ${i < rating ? 'fill-current' : 'fill-gray-600'}`}
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
      </div>

      {/* SONG INFO & REVIEW */}
      <div className="flex gap-4 mb-4">
        <img
          src={songImage}
          alt={songTitle}
          className="w-16 h-16 rounded-lg object-cover border border-gray-700"
        />

        <div className="flex-1">
          <h3 className="font-bold text-lg text-white">{songTitle}</h3>
          <p className="text-gray-400 text-sm mb-2">{artist}</p>
        </div>
      </div>

      {/* REVIEW TEXT */}
      <div className="mb-4">
        <p className="text-gray-200 text-sm leading-relaxed italic">"{review}"</p>
      </div>

      {/* FOOTER - TIME & LIKES */}
      <div className="flex justify-between items-center text-gray-400 text-sm border-t border-white/10 pt-4">
        <span className="text-xs">{name}</span>
        <button
          onClick={handleLike}
          className="flex items-center gap-2 cursor-pointer hover:scale-105 transition-transform duration-200 group"
        >
          <div className="flex items-center gap-1">
            <svg
              className={`w-5 h-5 transition-all duration-300 ${liked
                  ? 'text-red-500 fill-red-500 scale-110'
                  : 'text-gray-400 hover:text-red-400 fill-transparent stroke-current stroke-2'
                }`}
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                clipRule="evenodd"
              />
            </svg>
            <span className={`font-medium transition-colors duration-200 ${liked ? 'text-red-500' : 'text-white'}`}>
              {likeCount}
            </span>
          </div>
          <span className={`text-xs transition-colors duration-200 ${liked ? 'text-red-400' : 'group-hover:text-red-400'}`}>
            {liked ? 'Liked' : 'Like'}
          </span>
        </button>
      </div>
    </div>
  );
}