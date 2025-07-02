import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="relative h-screen w-full">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('./src/images/tower-bridge.jpg')" }}
      ></div>

      {/* Subtle Overlay */}
      <div className="absolute inset-0 bg-black/30"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
        <h1 className="mt-0 text-4xl md:text-5xl font-extrabold mb-6 drop-shadow-md">
          Bridge the gap. Land the job.
        </h1>
        <p className="mt-0 text-lg md:text-xl mb-8 max-w-2xl text-gray-150 drop-shadow-sm">
          Search once. Get matched forever. Let Career Bridge find jobs that fit — even before you apply.
        </p>
        
      </div>
    </div>
  );
};

export default Home;
