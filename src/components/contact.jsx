import { useState } from "react";
import emailjs from "emailjs-com";
import React from "react";

const initialState = {
  name: "",
  email: "",
  message: "",
};
export const Contact = (props) => {
  const [{ name, email, message }, setState] = useState(initialState);
  const [formKey, setFormKey] = useState(0); // Add this line

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };
  const clearState = () => setState({ ...initialState });
  
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name, email, message);
  
    // Check if message has at least 20 words
    const wordCount = message.split(' ').filter(word => word).length;
    if (wordCount < 20) {
      alert('Your message should contain at least 20 words.');
      return;
    }

    emailjs
      .sendForm("default_service", "template_85vrz8y", e.target, "tJrXxXw820OWp169G")
      .then(
        (result) => {
          console.log(result.text);
          clearState();
          setFormKey(formKey + 1); // force a re-render
        },
        (error) => {
          console.log(error.text);
        }
      );
  };
  return (
    <div>
      <div id="contact">
        <div className="container">
          <div className="col-md-8">
            <div className="row">
              <div className="section-title">
                <h2>Contact Me Here</h2>
                <p>
                  Fill out the form below and I will reach out to you soon!
                </p>
              </div>
              <form name="sentMessage" validate onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className="form-control"
                        placeholder="Name"
                        required
                        onChange={handleChange}
                        value={name}
                      />
                      <p className="help-block text-danger"></p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="form-control"
                        placeholder="Email"
                        required
                        onChange={handleChange}
                        value={email}
                      />
                      <p className="help-block text-danger"></p>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <textarea
                    name="message"
                    id="message"
                    className="form-control"
                    rows="4"
                    placeholder="Message (20 words minimum)"
                    required
                    onChange={handleChange}
                    value={message}
                  ></textarea>
                  <p className="help-block text-danger"></p>
                </div>
                <div id="success"></div>
                <button type="submit" className="btn btn-custom btn-lg">
                  Send Message
                </button>
              </form>
            </div>
          </div>
          <div className="col-md-3 col-md-offset-1 contact-info">
            <div className="contact-item">
              <h3>Contact Info</h3>
              {/* <p>
                <span>
                  <i className="fa fa-map-marker"></i> Address
                </span>
                {props.data ? props.data.address : "loading"}
              </p> */}
            </div>
            <div className="contact-item">
              <p>
                <span>
                  <i className="fa fa-envelope-o"></i> Email
                </span>{" "}
                {props.data ? <a href={`mailto:${props.data.email}`} style={{color: 'inherit'}}>{props.data.email}</a> : "loading"}
              </p>
            </div>
            <div className="contact-item">
              <p>
                <span>
                  <i className="fa fa-linkedin"></i> LinkedIn
                </span>{" "}
                {props.data ? <a href={`https://${props.data.LinkedIn}`} target="_blank" rel="noopener noreferrer" style={{color: 'inherit'}}>{props.data.LinkedIn}</a> : "loading"}
              </p>
            </div>
            {/* <div className="contact-item">
            <p>
              <span>
                <i className="fa fa-github"></i> GitHub
              </span>{" "}
              {props.data ? <a href={`https://${props.data.GitHub}`} target="_blank" rel="noopener noreferrer" style={{color: 'inherit'}}>{props.data.GitHub}</a> : "loading"}
            </p>
          </div> */}
          </div>
        </div>
      </div>
      <div id="footer">
        <div className="container text-center">
          <p>
            Website design built off of Issaaf Kattan's React Land Page Template. {" "}
            <a href="https://github.com/issaafalkattan/React-Landing-Page-Template?tab=readme-ov-file" rel="nofollow">
              See Original Code Here
            </a> {" and "}
            <a href="https://github.com/jimballl/React-Personal-Website" rel="nofollow">
              See My Code Here.
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
