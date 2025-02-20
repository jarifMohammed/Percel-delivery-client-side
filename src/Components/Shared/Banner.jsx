

const Banner = () => {
  return (
    <div 
      className="relative h-[500px] w-full mt-3 flex items-center justify-center bg-cover bg-center"
      style={{ 
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80')`
      }}
    >
      <div className="text-center text-white z-10 px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Fast & Reliable Parcel Delivery
        </h1>
        <p className="text-lg md:text-xl mb-8">
          Track your shipment or book a new delivery
        </p>
        
        {/* Search Bar */}
        <div className="max-w-2xl   mx-auto">
          <form className="flex  gap-2">
            <input
              type="text"
              placeholder="Enter tracking number..."
              className="w-full px-6 py-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            />
            <button
              type="submit"
              className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap"
            >
              Track Parcel
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Banner;