import { FunctionComponent, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import FormGroup from 'react-bootstrap/FormGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

import './Auth.scss';

import bgImg from '../../assets/images/bgcf.webp';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Signup: FunctionComponent = () => {
  // indicates the visibility of the password field
  const [togglePassword, settogglePassword] = useState<boolean>(false);

  // user signup details
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  console.log(username, password);

  return (
    <Container
      className="body cover-img bg-dark d-flex flex-column align-items-center justify-content-center"
      fluid
    >
      {/* Heading and Subtitle */}
      <Card className="auth-card">
        <Card.Header>
          <div className="justify-content-center text-center mb-5 mt-5">
            <h2 className="heading-section">gameDB</h2>
            <h3 className="heading-section-subtitle">
              Your personal recommender for pop culture and entertainment!
            </h3>
          </div>
        </Card.Header>

        {/* Signup Form */}
        <Card.Body>
          <Row className="justify-content-center">
            <Col>
              <div className="login-wrap p-0">
                <h3 className="mb-4 text-center">Create an account.</h3>
                <Form className="signin-form mx-5">
                  {/* Email field */}
                  <FormGroup className="form-group">
                    <Form.Control
                      type="text"
                      className="form-control"
                      placeholder="Email"
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </FormGroup>
                  {/* Password field */}
                  <FormGroup className="form-group">
                    <FormControl
                      type={togglePassword ? 'text' : 'password'}
                      className="form-control"
                      placeholder="Password"
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    {!togglePassword ? (
                      <AiOutlineEye
                        className="field-icon"
                        cursor={'pointer'}
                        onClick={() => {
                          settogglePassword(true);
                        }}
                      />
                    ) : (
                      <AiOutlineEyeInvisible
                        className="field-icon"
                        cursor={'pointer'}
                        onClick={() => {
                          settogglePassword(false);
                        }}
                      />
                    )}
                  </FormGroup>
                  <FormGroup className="form-group">
                    <FormControl
                      type={togglePassword ? 'text' : 'password'}
                      className="form-control"
                      placeholder="Confirm Password"
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    {!togglePassword ? (
                      <AiOutlineEye
                        className="field-icon"
                        cursor={'pointer'}
                        onClick={() => {
                          settogglePassword(true);
                        }}
                      />
                    ) : (
                      <AiOutlineEyeInvisible
                        className="field-icon"
                        cursor={'pointer'}
                        onClick={() => {
                          settogglePassword(false);
                        }}
                      />
                    )}
                  </FormGroup>
                  <FormGroup className="form-group">
                    <Button
                      type="submit"
                      variant="primary"
                      className="form-control submit px-3"
                    >
                      Sign Up
                    </Button>
                  </FormGroup>
                </Form>
                <p className="w-100 text-center">
                  Already Registered? Login <Link to="/login">here</Link>
                </p>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Signup;
