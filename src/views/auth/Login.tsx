import { FunctionComponent, useState } from 'react';
import { Card, FormLabel, Image } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import FormGroup from 'react-bootstrap/FormGroup';
import Row from 'react-bootstrap/Row';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { Link } from 'react-router-dom';

import { GoogleLogin } from '@react-oauth/google';

import './Auth.scss';
import { handleGoogleLogin } from '../../api/auth';

const Login: FunctionComponent = () => {
  // indicates the visibility of the password field
  const [togglePassword, settogglePassword] = useState<boolean>(false);
  // indicator of the remember me checkbox ticked or not
  const [rememberMe, setRememberMe] = useState<boolean>(false);

  // user login details
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

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

        {/* Login Form */}
        <Card.Body>
          <Row className="justify-content-center">
            <Col>
              <div className="login-wrap p-0">
                <h3 className="mb-4 text-center">Have an account?</h3>
                <Form className="signin-form mx-5">
                  {/* Username field */}
                  <FormGroup className="form-group">
                    <Form.Control
                      type="text"
                      className="form-control"
                      placeholder="Username"
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
                    <Button
                      type="submit"
                      variant="primary"
                      className="form-control submit px-3"
                    >
                      Sign In
                    </Button>
                  </FormGroup>
                  <FormGroup className="form-group d-md-flex" as={Row}>
                    <div className="w-50 d-flex flex-row ps-4">
                      <Form.Check
                        type={'checkbox'}
                        size={10}
                        checked={rememberMe}
                        onChange={() => setRememberMe(!rememberMe)}
                      />
                      <FormLabel className="checkbox-wrap checkbox-primary">
                        Remember Me
                      </FormLabel>
                    </div>
                    <div className="w-50 text-md-right d-flex justify-content-end pe-4">
                      <Link
                        to="/forgot-password"
                        style={{ textDecoration: 'none' }}
                      >
                        Forgot Password
                      </Link>
                    </div>
                  </FormGroup>
                </Form>
                <p className="w-100 text-center">
                  First time? Register <Link to="/signup">here</Link>
                </p>
                <p className="w-100 text-center">&mdash; or &mdash;</p>
                {/* Social Login */}
                <div className="social d-flex text-center d-flex flex-column align-items-center">
                  <GoogleLogin
                    onSuccess={(credentialResponse) => {
                      if (credentialResponse['credential'] !== undefined) {
                        handleGoogleLogin(credentialResponse['credential']);
                      }
                    }}
                    onError={() => {
                      console.log('Login Failed');
                    }}
                  />
                </div>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Login;
