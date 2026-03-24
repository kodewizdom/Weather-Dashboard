import { useEffect, useRef } from "react";
import gsap from "gsap";
import { CircleDot } from "lucide-react";

const Loader = ({ onFinish }) => {
  const loaderRef = useRef();

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: onFinish,
    });

    tl.fromTo(loaderRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5 })
      .to(loaderRef.current, {
        scale: 1.1,
        duration: 0.6,
      })
      .to(loaderRef.current, {
        opacity: 0,
        duration: 0.5,
        delay: 0.3,
      });
  }, []);

  return (
    <div className="fixed inset-0 bg-white flex flex-col items-center justify-center gap-6 z-50">
      
      <div className="flex items-center text-orange-500 animate-pulse">
        <CircleDot size={25} />
        <span className="text-black text-4xl font-medium">‿</span>
        <CircleDot size={25} />
      </div>

      
      <h1
        ref={loaderRef}
        className="text-xl md:text-2xl font-semibold text-gray-700 tracking-tight"
      >
        Weather Dashboard
      </h1>
    </div>
  );
};

export default Loader;
