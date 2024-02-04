import React from "react";
import { Typed } from "react-typed";
import ContactForm from "./ContactForm";
import Lottie from "lottie-react";
import Helper from "../../assets/lottie/Helper.json";
import MoodSwing from "../../assets/lottie/MoodSwing.json";
import Diagnose from "../../assets/lottie/Diagnose.json";
class TypedReactDemo extends React.Component {
  componentDidMount() {
    const { strings } = this.props;
    const options = {
      strings: strings,
      typeSpeed: 40,
      backSpeed: 50,
      startWhenVisible: true,
      loop: true,
    };

    this.typed = new Typed(this.el, options);
  }

  componentWillUnmount() {
    this.typed.destroy();
  }

  render() {
    return (
      <div className="wrap">
        <h1>Typed.js</h1>
        <div className="type-wrap">
          <span
            style={{ whiteSpace: "pre" }}
            ref={(el) => {
              this.el = el;
            }}
          />
        </div>
      </div>
    );
  }
}
<age></age>;

const Landing = () => {
  return (
    <>
      <div className="landing_container">
        <div className="landing_left">
          <div className="landing_maintext">
            Unlock your mind's potential: Track your mental health and thrive.
          </div>
          <Lottie
            style={{ width: "20rem", height: "20rem" }}
            animationData={Helper}
          />
          <div className="landing_subtext">
            Curious about your well-being? Take the journey to self-discovery.
          </div>
          <Lottie
            style={{ width: "20rem", height: "20rem" }}
            animationData={MoodSwing}
          />
          <div className="landing_subtext">
            Beyond mood swings: Gain insights and improve your mental state.
          </div>
          <Lottie
            style={{ width: "20rem", height: "20rem" }}
            animationData={Diagnose}
          />
          <div className="landing_subtext">
            Empower your mental health: AI-powered guidance just a click away.
            Get personalized recommendations based on your unique thoughts and
            feelings.
          </div>
          <TypedReactDemo
            strings={[
              "Some <i>strings</i> are slanted",
              "Some <strong>strings</strong> are bold",
              "HTML characters &times; &copy;",
            ]}
          />
        </div>
      </div>
      <div className="contact_form_wrapper">
        <ContactForm />
      </div>
    </>
  );
};

export default Landing;
