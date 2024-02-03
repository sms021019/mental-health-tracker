import React from "react";
import { ReactTyped, Typed } from "react-typed";
const Landing = () => {
  return (
    <div className="landing_container">
      <div className="landing_maintext">
        Unlock your mind's potential: Track your mental health and thrive.
      </div>
      <div className="landing_subtext">
        Curious about your well-being? Take the journey to self-discovery.
      </div>
      <div className="landing_subtext">
        Beyond mood swings: Gain insights and improve your mental state.
      </div>
      <div className="landing_subtext">
        Empower your mental health: AI-powered guidance just a click away. Get
        personalized recommendations based on your unique thoughts and feelings.
      </div>

      <ReactTyped
        startWhenVisible
        strings={[
          "If <strong>startWhenVisible</strong> is <strong>true</strong>, will start when is visible in the dom",
          "text2",
        ]}
        typeSpeed={40}
        loop
        className="typed_text"
      />
    </div>
  );
};

export default Landing;
