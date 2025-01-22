import { ShieldCheckIcon, BoltIcon, MapPinIcon } from '@heroicons/react/24/outline';

const OurFeatures = () => {
  const features = [
    {
      icon: ShieldCheckIcon,
      title: "Parcel Safety",
      description: "Secure handling and insurance coverage for all your shipments"
    },
    {
      icon: BoltIcon,
      title: "Superfast Delivery",
      description: "Guaranteed next-day delivery across major cities"
    },
    {
      icon: MapPinIcon,
      title: "Real-Time Tracking",
      description: "Live GPS tracking updates for complete shipment visibility"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h5 className='text-5xl mb-5 flex justify-center'>Our Features</h5>
       
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
         
        {features.map((feature, index) => (
          <div 
            key={index}
            className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <div className="flex flex-col items-center text-center">
              <div className="p-4 bg-blue-100 rounded-full mb-4">
                <feature.icon className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-base">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurFeatures;