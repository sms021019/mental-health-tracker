import React from "react";
import { Typed } from "react-typed";
import ContactForm from "./ContactForm";
import Features from "./Features";
class TypedReactDemo extends React.Component {
  componentDidMount() {
    const { strings } = this.props;
    const options = {
      strings: strings,
      typeSpeed: 80,
      startWhenVisible: true,
    };

    this.typed = new Typed(this.el, options);
  }

  componentWillUnmount() {
    this.typed.destroy();
  }

  render() {
    return (
      <div className="wrap">
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
            <h1>Unlock your mind's potential.</h1>
            <div>
              <TypedReactDemo
                strings={[" Track your mental health and thrive."]}
              />
            </div>
          </div>
          <Features />
        </div>
      </div>
      <div className="contact_form_wrapper">
        <ContactForm />
      </div>
    </>
  );
};

export default Landing;
