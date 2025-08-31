import { useState, useEffect } from 'react';

export default function StatisticsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [counters, setCounters] = useState({
    families: 0,
    rating: 0,
    recommend: 0,
    liters: 0
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('statistics-section');
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000;
    const steps = 60;
    const stepTime = duration / steps;

    const targets = {
      families: 10000,
      rating: 4.9,
      recommend: 98,
      liters: 100000
    };

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      
      setCounters({
        families: Math.floor(targets.families * progress),
        rating: (targets.rating * progress).toFixed(1),
        recommend: Math.floor(targets.recommend * progress),
        liters: Math.floor(targets.liters * progress)
      });

      if (currentStep >= steps) {
        clearInterval(timer);
        setCounters(targets);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isVisible]);

  const stats = [
    {
      value: `${counters.families.toLocaleString()}+`,
      label: 'Happy Families',
      icon: '👨‍👩‍👧‍👦',
      color: 'from-orange-500 to-red-500'
    },
    {
      value: `${counters.rating}/5`,
      label: 'Average Rating',
      icon: '⭐',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      value: `${counters.recommend}%`,
      label: 'Recommend Us',
      icon: '👍',
      color: 'from-green-500 to-emerald-500'
    },
    {
      value: `${counters.liters.toLocaleString()}+`,
      label: 'Liters Delivered',
      icon: '🛢️',
      color: 'from-blue-500 to-indigo-500'
    }
  ];

  return (
    <section id="statistics-section" className="py-4 md:py-8 bg-gradient-to-br from-orange-50 via-white to-yellow-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-3 md:grid-cols-4 gap-2 md:gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`group relative bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden ${
                index === 3 ? 'hidden md:block' : ''
              }`}
            >
              {/* Gradient border effect */}
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-10 group-hover:opacity-20 transition-opacity duration-300`}></div>
              
              <div className="relative p-2 md:p-6 text-center">
                {/* Icon */}
                <div className="text-lg md:text-3xl mb-1 md:mb-2 transform group-hover:scale-110 transition-transform duration-300">
                  {stat.icon}
                </div>
                
                {/* Value */}
                <div className={`text-sm md:text-3xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-0.5 md:mb-1`}>
                  {stat.value}
                </div>
                
                {/* Label */}
                <div className="text-[10px] md:text-sm text-gray-600 font-medium leading-tight">
                  {stat.label}
                </div>
              </div>
              
              {/* Hover effect accent */}
              <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`}></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}