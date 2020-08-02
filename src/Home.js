import React from "react";
import { Form, Button} from "react-bootstrap";
import axios from "axios";
import {MdContentCopy} from 'react-icons/md';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import "bootstrap/dist/css/bootstrap.min.css";

const UI_PARAMS_API_URL = "/params";
const TRANSLATE_API_URL = "/translate";

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            output: "",
            input: "",
            showCopy: false,
            buttonText: "Submit",
            description: "Description",
            showExampleForm: false,
            examples: {},
            error: false,
        };
        // Bind the event handlers
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
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
                        input: "",
                        buttonText: button_text,
                        description: description,
                        showExampleForm: show_example_form
                    });
                }
            );
    }


    handleInputChange(e) {
        this.setState({ input: e.target.value, showCopy:false, output: "" });
    }

    handleClick(e) {
        e.preventDefault();
        let body = {
            prompt: this.state.input
        };
        axios.post(TRANSLATE_API_URL, body).then(({ data: {status, text } }) => {
            if (status === 'success')
                this.setState({ output: text, showCopy: true, error:false });
            else
                this.setState({ output: text, showCopy: false, error:true });
        });
    }

    render() {
        return (
            <div>
                <Form onSubmit={this.handleClick}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Radiology report</Form.Label>
                        <Form.Control
                            type="text"
                            as="textarea"
                            placeholder="Enter text here"
                            value={this.state.input}
                            onChange={this.handleInputChange}
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        {this.state.buttonText}
                    </Button>
                </Form>
                <div className="row">
                    {this.state.error ? (<div className="col-md-10" style={{color: 'red'}}>
                        {this.state.output}
                    </div>) :
                        (<div className="col-md-10" >
                        {this.state.output}
                    </div>)}

                    <div className="col-md-2">
                        {this.state.showCopy ? (
                        <CopyToClipboard text={this.state.output}
                                         onCopy={() => this.setState({copied: true})}>
                            <button className="btn"><MdContentCopy/> Copy to clipboard</button>
                        </CopyToClipboard>) : ''}
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;
