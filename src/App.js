import React from "react";
import axios from "axios";
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
import Home from './Home';
import Example from './Example';
import "bootstrap/dist/css/bootstrap.min.css";

const UI_PARAMS_API_URL = "/params";


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      output: "",
      input: "",
      buttonText: "Submit",
      description: "Description",
      showExampleForm: false,
      examples: {}
    };

  }

  componentDidMount() {
    // Call API for the UI params
    axios
      .get(UI_PARAMS_API_URL)
      .then(
        ({
          data: { placeholder, button_text, description, show_example_form }
        }) => {
          this.setState({
            input: placeholder,
            buttonText: button_text,
            description: description,
            showExampleForm: show_example_form
          });
        }
      );
  }



  render() {
    return (
          <HashRouter>
            <div>
              <h3>Translate clinical radiology reports into lay versions</h3>
              <ul className="header">
                <li><NavLink exact to="/">Home</NavLink></li>
                <li><NavLink to="/example">Examples</NavLink></li>
              </ul>
              <div className="content">
                <Route exact path="/" component={Home}/>
                <Route path="/example" component={Example}/>
              </div>
            </div>
          </HashRouter>
      );
    }
}

export default App;
