// components/BuyNowButtons.js
export default function BuyNowButtons({ buyButtons, getPlatformLogo, colorScheme = 'orange' }) {
  // Get platform-specific styling - all same size for consistency
  const getPlatformStyles = (platform) => {
    // All platforms now use same height for better structure
    return { height: 'h-10', padding: 'p-1.5' };
  };

  const getHoverBorderColor = () => {
    switch (colorScheme) {
      case 'purple':
        return 'hover:border-purple-300';
      case 'yellow':
        return 'hover:border-yellow-300';
      default:
        return 'hover:border-orange-300';
    }
  };

  const hoverBorderColor = getHoverBorderColor();

  if (buyButtons.length === 0) return null;

  return (
    <div className="space-y-2">
      {buyButtons.length === 1 ? (
        // Single button - full width
        <a
          href={buyButtons[0].url}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full h-10 hover:scale-105 transition-transform duration-300 shadow-md hover:shadow-lg"
        >
          <img
            src={getPlatformLogo(buyButtons[0].platform)}
            alt={`Buy on ${buyButtons[0].platform}`}
            className={`w-full h-full object-contain bg-white rounded-lg border-2 border-gray-200 ${hoverBorderColor} p-1 ${buyButtons[0].platform === 'Amazon' ? 'scale-110' : ''}`}
          />
        </a>
      ) : (
        <>
          {/* Desktop: Single row with platform-specific heights */}
          <div className="hidden md:flex md:space-x-2">
            {buyButtons.map((button, index) => {
              const { height, padding } = getPlatformStyles(button.platform);
              
              return (
                <a
                  key={index}
                  href={button.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block flex-1 ${height} hover:scale-105 transition-transform duration-300 shadow-md hover:shadow-lg`}
                >
                  <img
                    src={getPlatformLogo(button.platform)}
                    alt={`Buy on ${button.platform}`}
                    className={`w-full h-full object-contain bg-white rounded-lg border-2 border-gray-200 ${hoverBorderColor} ${padding} ${button.platform === 'Amazon' ? 'scale-110' : ''}`}
                  />
                </a>
              );
            })}
          </div>

          {/* Mobile: Two rows */}
          <div className="md:hidden space-y-2">
            <div className="grid grid-cols-2 gap-2">
              {buyButtons.slice(0, 2).map((button, index) => (
                <a
                  key={index}
                  href={button.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block h-8 hover:scale-105 transition-transform duration-300 shadow-md hover:shadow-lg"
                >
                  <img
                    src={getPlatformLogo(button.platform)}
                    alt={`Buy on ${button.platform}`}
                    className={`w-full h-full object-contain bg-white rounded-lg border-2 border-gray-200 ${hoverBorderColor} p-0.5 ${button.platform === 'Amazon' ? 'scale-110' : ''}`}
                  />
                </a>
              ))}
            </div>
            
            {buyButtons.length > 2 && (
              <div className={`grid gap-2 ${buyButtons.length === 3 ? 'grid-cols-1' : 'grid-cols-2'}`}>
                {buyButtons.slice(2).map((button, index) => (
                  <a
                    key={index + 2}
                    href={button.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block h-8 hover:scale-105 transition-transform duration-300 shadow-md hover:shadow-lg"
                  >
                    <img
                      src={getPlatformLogo(button.platform)}
                      alt={`Buy on ${button.platform}`}
                      className={`w-full h-full object-contain bg-white rounded-lg border-2 border-gray-200 ${hoverBorderColor} p-0.5`}
                    />
                  </a>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}