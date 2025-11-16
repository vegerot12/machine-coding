import { useEffect, useState } from "react";
import './backToTop.css';

function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Add scroll event listener to toggle visibility
  
    
    const scrollHandler = () => {
      
            setIsVisible(window.scrollY > window.innerHeight);
        
    }

    const debounce = (fn: ()=> void, delay: number) => {
        let timer: ReturnType<typeof setTimeout>; // type-safe timer for setTimeout
        return () => {
            clearTimeout(timer);
            timer = setTimeout(() => {
                fn();
            }, delay);
        }

        
    }
    const debouncedScroll = debounce(scrollHandler, 100);



    

    window.addEventListener('scroll', debouncedScroll); // this is called on every scroll event
    // and the func is called only after delay 

    return () => {
        window.removeEventListener('scroll',  debouncedScroll);
    }
  }, []);

  function scrollToTop() {
    // Implement smooth scroll to top
    window.scrollTo({ top:0, behavior:'smooth'})
  }
  return (
    <div className="backToTop">
      <h1>Back To Top</h1>

      {/* Add some content to enable scrolling */}
      {Array(400).fill(100).map((_,index) => (
        <div key={index}>{index}</div>

      ))}

      <div className="container">
        {/* Show this button only after scrolling down */}
        { isVisible && <button
          className="backtotop-btn"
          onClick={scrollToTop}
          data-testid="back-to-top-btn"
        >
          Back to Top
        </button>}
      </div>
    </div>
  );
}
export default BackToTop;
