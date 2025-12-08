import { IoBulbOutline, IoEarthOutline, IoWalletOutline } from "react-icons/io5";

const Stats = () => {
  const features = [
    { icon: IoEarthOutline, description: "Flexible learning, any device" },
    { icon: IoBulbOutline, description: "Personalized pace, instant feedback" },
    { icon: IoWalletOutline, description: "Access top tutors, affordably" }
  ];

  return (
    <div className='py-16 bg-gray-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        
        {/* Header */}
        <div className='text-center mb-12'>
            <h2 className='text-3xl font-bold text-gray-900'>Why Choose Us?</h2>
            
        </div>
        
        {/* Features Grid */}
        <div className='grid p-9  grid-cols-1 md:grid-cols-3 gap-8'>
          
          {features.map((feature, index) => {
            
            
            const IconComponent = feature.icon; 
            
            return (
              <div 
                key={index} 
                className="bg-white p-6 md:p-10 rounded-lg shadow-xl text-center hover:shadow-2xl transition duration-300"
              >
                
                {/* Icon */}
                <div className="flex justify-center mb-4">
                  
                  <IconComponent className="text-4xl text-indigo-600 p-3 bg-indigo-100 rounded-full" />
                </div>
                
                {/* Description */}
                <p className="text-lg font-semibold text-gray-800">{feature.description}</p>
              </div>
            );
          })}
          
          
        </div>
        
      </div>
    </div>
  );
}

export default Stats