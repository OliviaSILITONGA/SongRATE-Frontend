export default function ReviewCard({ image, name, review, rating, likes, reviewer, reviewerHandle, songTitle, artist, songImage }) {
  return (
    <div className="bg-[#D6D6D6] p-6 rounded-xl text-black w-80 border border-gray-300">
      {/* Header dengan gambar lagu, judul lagu dan artis */}
      <div className="flex items-start gap-4 mb-4">
        {/* Gambar lagu */}
        <img 
          src={songImage} 
          className="w-16 h-16 rounded-lg object-cover border border-gray-400"
          alt={`${songTitle} cover`}
        />
        
        {/* Judul lagu dan artis */}
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900">{songTitle}</h3>
          <p className="text-gray-600 text-sm mt-1">{artist}</p>
        </div>
      </div>

      {/* Bagian tengah: review dan rating */}
      <div className="mb-6">
        {/* Rating bintang */}
        <div className="flex items-center gap-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className={`w-5 h-5 ${i < rating ? 'text-yellow-500' : 'text-gray-400'}`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>

        {/* Isi review */}
        <p className="text-gray-700 text-sm italic mb-4">"{review}"</p>
      </div>

      {/* Bagian bawah: likes dan info reviewer - VERTICAL LAYOUT */}
      <div className="space-y-4">
        {/* Likes section */}
        <div className="flex items-center gap-2">
          {/* Icon hati untuk likes */}
          <div className="flex items-center gap-1">
            <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
            <span className="text-gray-900 font-medium">{likes}</span>
          </div>
          
          {/* Teks "Like" */}
          <span className="text-gray-600 text-sm">Like</span>
        </div>

        {/* Review by section */}
        <div className="text-sm">
          <div className="text-gray-500 mb-1">Review by</div>
          <div className="flex items-center gap-3">
            <img 
              src={image} 
              className="w-10 h-10 rounded-full border border-gray-300" 
              alt={reviewer}
            />
            <div>
              <p className="font-medium text-gray-900">{reviewer}</p>
              <p className="text-gray-500 text-xs">@{reviewerHandle}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}