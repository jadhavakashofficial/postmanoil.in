// components/PostmanOilCategories.js
import Link from "next/link";
import { getImageSEO } from '../utils/imageSEO';

export default function PostmanOilCategories() {
  const categories = [
    {
      id: 1,
      title: "Kacchi Ghani Mustard Oil",
      image: "https://postmanoil.com/blog/wp-content/uploads/2025/08/Untitled-2-scaled.png",
      link: "/mustard-oil"
    },
    {
      id: 2,
      title: "Groundnut Filtered Oil", 
      image: "https://postmanoil.com/blog/wp-content/uploads/2025/08/Untitled-3-scaled.png",
      link: "/groundnut-oil"
    },
    {
      id: 3,
      title: "Refined Groundnut Oil",
      image: "https://postmanoil.com/blog/wp-content/uploads/2025/08/Untitled-1-scaled.png",
      link: "/refined-groundnut-oil"
    }
  ];

  // Component for individual category card
  const CategoryCard = ({ category }) => {
    // Adjust position for Kacchi Ghani (mustard oil) to prevent bottom cropping
    const imagePosition = category.title.toLowerCase().includes('mustard') 
      ? 'center 60%'  // Push image UP by using higher percentage (shows more bottom, crops top)
      : 'center 40%'; // Keep original for others
    
    return (
      <Link 
        href={category.link}
        className="group block"
      >
        <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl hover:shadow-orange-500/20 transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 overflow-hidden border border-orange-100 relative group">
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-orange-400/0 via-orange-400/5 to-red-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          {/* Image Container */}
          <div className="relative z-10 overflow-hidden bg-gradient-to-br from-orange-50 to-red-50">
            <div className="w-full h-32 sm:h-40 md:h-48 lg:h-56">
              <img
                src={category.image}
                {...getImageSEO(
                  category.title.toLowerCase().includes('mustard') ? 'mustard-oil' :
                  category.title.toLowerCase().includes('refined') ? 'refined-oil' :
                  'groundnut-oil',
                  category.title
                )}
                className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
                style={{ objectPosition: imagePosition }}
                loading="lazy"
              />
            </div>
          </div>
        
        {/* Title */}
        <div className="p-2 sm:p-3 md:p-4 text-center bg-gradient-to-r from-orange-500 to-red-500 relative z-10">
          <h3 className="text-[10px] sm:text-xs md:text-sm lg:text-base xl:text-lg font-bold text-white group-hover:text-yellow-100 transition-colors duration-300 drop-shadow-md whitespace-nowrap">
            {category.title}
          </h3>
        </div>
        
          {/* Modern accent */}
          <div className="absolute top-2 right-2 sm:top-4 sm:right-4 w-2 h-2 sm:w-3 sm:h-3 bg-orange-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
        </div>
      </Link>
    );
  };

  return (
    <section className="py-6 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-orange-600 via-red-500 to-pink-500 bg-clip-text text-transparent mb-3 whitespace-nowrap">
            Postman Oil Categories
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-orange-400 to-red-500 mx-auto rounded-full"></div>
        </div>

        {/* T-Format Layout */}
        <div className="space-y-6">
          {/* Top Row - First Two Categories */}
          <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:gap-8">
            {categories.slice(0, 2).map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>

          {/* Bottom Row - Third Category Centered with Same Width */}
          <div className="flex justify-center">
            <div className="w-1/2 px-[6px] sm:px-3 lg:px-4">
              <CategoryCard category={categories[2]} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}