import React, { Component } from 'react';

import './App.css';
import { isCompositeComponent } from 'react-dom/test-utils';


const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const formValid = ({ formErrors, ...rest }) => {
  let valid = true;

  // validate form errors being empty
  Object.values(formErrors).forEach(val => {
    val.length > 0 && (valid = false);
  });

  // validate the form was filled out
  Object.values(rest).forEach(val => {
    val === null && (valid = false);
  });

  return valid;
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      LoginId: null,
      FirrstName: null,
      email: null,
      password: null,
     confirmpassword: null,
      formErrors: {
        LoginId: "",
        firstName: "",
        email: "",
        password: "",
        confirmpassword: ""
    
      }
    };
  }

  handleSubmit = e => {
    e.preventDefault();

    if (formValid(this.state)) {
      console.log(`
        --SUBMITTING--
        Login Id: ${this.state.LoginId}
         Name: ${this.state.firstName}
        Email: ${this.state.email}
        Password: ${this.state.password}
       Confirm Password: ${this.state.confirmpassword}
      `);
    } else {
      console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
    }
  };

  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };

    switch (name) {
      case "LoginId":
        formErrors.LoginId =
          value.length < 3 ? "minimum 3 characaters required" : "";
        break;
      case "firstName":
        formErrors.firstName =
          value.length < 3 ? "minimum 3 characaters required" : "";
        break;
      case "email":
        formErrors.email = emailRegex.test(value)
          ? ""
          : "invalid email address";
        break;
      case "password":
        formErrors.password =
          value.length < 6 ? "minimum 6 characaters required" : "";
        break;
        case "confirmpassword":
          formErrors.confirmpassword =
            value.length < 6 ? "minimum 6 characaters required" : "";
          break;
      default:
        break;
    }

    this.setState({ formErrors, [name]: value }, () => console.log(this.state));
  };

  render() {
    const { formErrors } = this.state;

    return (
      <div className="wrapper">
        <div className="form-wrapper">
          <h1>Create Account</h1>
          <form onSubmit={this.handleSubmit} noValidate>
            <div className="LoginId">
              <label htmlFor="LoginId">Login Id </label>
              <input
                className={formErrors.LoginId.length > 0 ? "error" : null}
                placeholder="Login Id"
                type="text"
                name="LoginId"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.LoginId.length > 0 && (
                <span className="errorMessage">{formErrors.LoginId}</span>
              )}
            </div>

            <div className="firstName">
              <label htmlFor="firstName">Name</label>
              <input
                className={formErrors.firstName.length > 0 ? "error" : null}
                placeholder=" Name"
                type="text"
                name="First Name"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.firstName.length > 0 && (
                <span className="errorMessage">{formErrors.firstName}</span>
              )}
            </div>
            <div className="email">
              <label htmlFor="email">Email</label>
              <input
                className={formErrors.email.length > 0 ? "error" : null}
                placeholder="Email"
                type="email"
                name="email"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.email.length > 0 && (
                <span className="errorMessage">{formErrors.email}</span>
              )}
            </div>
            <div className="password">
              <label htmlFor="password">Password</label>
              <input
                className={formErrors.password.length > 0 ? "error" : null}
                placeholder="Password"
                type="password"
                name="password"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.password.length > 0 && (
                <span className="errorMessage">{formErrors.password}</span>
              )}
            </div>

            <div className="confirmpassword">
              <label htmlFor="confirmpassword">ConfirmPassword</label>
              <input
                className={formErrors.confirmpassword.length > 0 ? "error" : null}
                placeholder="Password"
                type="password"
                name="confirmpassword"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.confirmpassword.length > 0 && (
                <span className="errorMessage">{formErrors.confirmpassword}</span>
              )}
            </div>

            <div className="button">
            <a href="index.html">Login In</a>

             
            </div>
          </form>
        </div>
        </div>
      
    );
  }
}
export default App;
