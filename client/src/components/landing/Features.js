import React, { useState, useEffect, useRef } from "react";
import Lottie from "lottie-react";
import Helper from "../../assets/lottie/Helper.json";
import MoodSwing from "../../assets/lottie/MoodSwing.json";
import Diagnose from "../../assets/lottie/Diagnose.json";
import "./features.css";

const Features = () => {
  const featureData = [
    {
      animationData: Helper,
      text: "Curious about your well-being? Take the journey to self-discovery.",
    },
    {
      animationData: MoodSwing,
      text: "Beyond mood swings? Gain insights and improve your mental state.",
    },
    {
      animationData: Diagnose,
      text: "Empower yourself by AI-powered guidance: Get personalized recommendations, based on your unique thoughts and feelings.",
    },
  ];
  const delay = 6000;

  const [index, setIndex] = useState(0);
  const timeoutRef = useRef(null);

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setIndex((prevIndex) =>
          prevIndex === featureData.length - 1 ? 0 : prevIndex + 1
        ),
      delay
    );

    return () => {
      resetTimeout();
    };
  }, [index]);

  return (
    <div className="slideshow">
      <div
        className="slideshowSlider"
        style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
      >
        {featureData.map((item, idx) => (
          <div className="slide" key={idx}>
            <div className="animation_container">
              <Lottie
                style={{ width: "20rem", height: "20rem" }}
                animationData={item.animationData}
              />
            </div>
          </div>
        ))}
      </div>

      {featureData[index] && (
        <div className="landing_subtext">
          {featureData[index].text
            .split(/(\.|\?|\,|\:)(?=\s|$)/)
            .map((part, partIndex) => (
              <React.Fragment key={partIndex}>
                {partIndex % 2 === 0 ? (
                  part
                ) : (
                  <>
                    {part}
                    <br />
                  </>
                )}
              </React.Fragment>
            ))}
        </div>
      )}

      <div className="slideshowDots">
        {featureData.map((_, idx) => (
          <div
            key={idx}
            className={`slideshowDot${index === idx ? " active" : ""}`}
            onClick={() => {
              setIndex(idx);
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Features;
