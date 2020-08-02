import React, { Component } from "react";
import {Button, Col, Form, Row} from "react-bootstrap";
import axios from "axios";
import {debounce} from "lodash";
const EXAMPLE_API_URL = "/examples";
const DEBOUNCE_INPUT = 250;

class Example extends Component {
    constructor(props) {
        super(props);
        this.state = {
            output: "",
            input: "",
            buttonText: "Submit",
            description: "Description",
            showExampleForm: true,
            examples: {}
        };
    }

    componentDidMount() {
        axios.get(EXAMPLE_API_URL).then(({ data: examples }) => {
            this.setState({ examples });
        });
    }
    updateExample(id, body) {
        axios.put(`${EXAMPLE_API_URL}/${id}`, body);
    }

    debouncedUpdateExample = debounce(this.updateExample, DEBOUNCE_INPUT);

    handleExampleChange = (id, field) => e => {
        const text = e.target.value;

        let body = { [field]: text };
        let examples = { ...this.state.examples };
        examples[id][field] = text;

        this.setState({ examples });
        this.debouncedUpdateExample(id, body);
    };

    handleExampleDelete = id => e => {
        e.preventDefault();
        axios.delete(`${EXAMPLE_API_URL}/${id}`).then(({ data: examples }) => {
            this.setState({ examples });
        });
    };

    handleExampleAdd = e => {
        e.preventDefault();
        axios.post(EXAMPLE_API_URL).then(({ data: examples }) => {
            this.setState({ examples });
        });
    };



    render() {
        const showExampleForm = this.state.showExampleForm;

        return (
            <div>
                {showExampleForm && (
                    <div>
                        <h4 style={{ marginBottom: "25px" }}>Examples</h4>
                        {Object.values(this.state.examples).map(example => (
                            <span key={example.id}>
                        <Form.Group
                            as={Row}
                            controlId={"formExampleInput" + example.id}
                        >
                          <Form.Label column="sm" lg={2}>
                            Example Input
                          </Form.Label>
                          <Col sm={10}>
                            <Form.Control
                                type="text"
                                as="input"
                                placeholder="Enter text"
                                value={example.input}
                                onChange={this.handleExampleChange(
                                    example.id,
                                    "input"
                                )}
                            />
                          </Col>
                        </Form.Group>
                        <Form.Group
                            as={Row}
                            controlId={"formExampleOutput" + example.id}
                        >
                          <Form.Label column="sm" lg={2}>
                            Example Output
                          </Form.Label>
                          <Col sm={10}>
                            <Form.Control
                                type="text"
                                as="textarea"
                                placeholder="Enter text"
                                value={example.output}
                                onChange={this.handleExampleChange(
                                    example.id,
                                    "output"
                                )}
                            />
                          </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                          <Col sm={{ span: 10, offset: 2 }}>
                            <Button
                                type="button"
                                size="sm"
                                variant="danger"
                                onClick={this.handleExampleDelete(example.id)}
                            >
                              Delete example
                            </Button>
                          </Col>
                        </Form.Group>
                      </span>
                        ))}
                        <Form.Group as={Row}>
                            <Col sm={{ span: 10 }}>
                                <Button
                                    type="button"
                                    variant="primary"
                                    onClick={this.handleExampleAdd}
                                >
                                    Add example
                                </Button>
                            </Col>
                        </Form.Group>
                    </div>
                )}
            </div>
        );
    }
}

export default Example;
