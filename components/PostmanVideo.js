import { useState, useRef, useEffect } from 'react';

export default function PostmanVideo() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showVolumePrompt, setShowVolumePrompt] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    // Start playing muted on page load for smooth experience
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play().catch(() => {
        // Autoplay failed, that's okay
      });
    }
  }, []);

  const handleMouseEnter = () => {
    if (videoRef.current && !isPlaying) {
      videoRef.current.play();
      setIsPlaying(true);
      setShowVolumePrompt(true);
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current && isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
      setShowVolumePrompt(false);
    }
  };

  const handleClick = () => {
    if (videoRef.current) {
      if (isMuted) {
        // Unmute on click
        videoRef.current.muted = false;
        setIsMuted(false);
        setShowVolumePrompt(false);
        if (!isPlaying) {
          videoRef.current.play();
          setIsPlaying(true);
        }
      } else {
        // Toggle play/pause if already unmuted
        if (isPlaying) {
          videoRef.current.pause();
          setIsPlaying(false);
        } else {
          videoRef.current.play();
          setIsPlaying(true);
        }
      }
    }
  };

  return (
    <section className="py-12 bg-gradient-to-br from-orange-50 via-white to-yellow-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-orange-600 via-red-500 to-pink-500 bg-clip-text text-transparent mb-3">
            Discover Postman Oils Legacy
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Watch how we've been crafting premium quality oils with traditional methods since 1967
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-orange-400 to-red-500 mx-auto rounded-full mt-4"></div>
        </div>

        <div 
          className="relative rounded-2xl overflow-hidden shadow-2xl max-w-4xl mx-auto group cursor-pointer"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleClick}
        >
          {/* Amazing animated border effect */}
          <div className="absolute inset-0 rounded-2xl p-[3px] bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 animate-pulse">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-yellow-400 via-orange-500 to-red-600 opacity-75 blur-md animate-pulse"></div>
          </div>
          
          {/* Glow effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-orange-600 via-red-500 to-pink-600 rounded-2xl opacity-30 blur-2xl group-hover:opacity-50 transition-opacity duration-500"></div>
          
          {/* Inner container with gradient border */}
          <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-orange-100 via-white to-yellow-100 p-1">
            <div className="relative rounded-xl overflow-hidden">
              <video
                ref={videoRef}
                className="w-full h-auto"
                controls={false}
                poster="https://postmanoil.com/blog/wp-content/uploads/2025/06/Logo.png"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                muted
                loop
              >
                <source src="https://postmanoil.com/blog/wp-content/uploads/2025/06/postman-oill_17-1.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              
              {/* Play/Pause and Volume Indicators */}
              {!isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 pointer-events-none transition-all duration-300">
                  <div className="bg-white/90 rounded-full p-6 transition-transform duration-300 shadow-2xl group-hover:scale-110">
                    <svg className="w-12 h-12 text-orange-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                </div>
              )}
              
              {/* Volume Control Prompt */}
              {showVolumePrompt && isMuted && (
                <div className="absolute top-4 right-4 bg-black/80 text-white px-4 py-2 rounded-lg flex items-center space-x-2 animate-pulse">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M11 5L6 9H2v6h4l5 4V5zM15.54 8.46a5 5 0 010 7.07M17.66 6.34a8 8 0 010 11.32"/>
                  </svg>
                  <span className="text-sm font-medium">Click to unmute</span>
                </div>
              )}
              
              {/* Mute/Unmute Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (videoRef.current) {
                    videoRef.current.muted = !videoRef.current.muted;
                    setIsMuted(!isMuted);
                  }
                }}
                className="absolute bottom-4 right-4 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg transition-all duration-200 hover:scale-110"
                aria-label={isMuted ? "Unmute video" : "Mute video"}
              >
                {isMuted ? (
                  <svg className="w-6 h-6 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
                  </svg>
                ) : (
                  <svg className="w-6 h-6 text-orange-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}