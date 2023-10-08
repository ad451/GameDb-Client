import { FunctionComponent, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import FormGroup from 'react-bootstrap/FormGroup';
import Row from 'react-bootstrap/Row';
import { Link } from 'react-router-dom';

import bgImg from '../../assets/images/bgcf.webp';
import './Auth.scss';

const ForgotPassword: FunctionComponent = () => {
  const [email, setEmail] = useState<string>('');

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
                <h3 className="mt-5 mb-4 text-center">Enter your email</h3>
                <Form className="signin-form mx-5">
                  {/* Email field */}
                  <FormGroup className="form-group">
                    <Form.Control
                      type="text"
                      className="form-control"
                      placeholder="Email"
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </FormGroup>
                  <FormGroup className="form-group">
                    <Button
                      type="submit"
                      variant="primary"
                      className="form-control submit px-3"
                    >
                      Forgot Password
                    </Button>
                  </FormGroup>
                </Form>
                <p className="w-100 text-center">
                  Go back to Login <Link to="/login">here</Link>
                </p>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ForgotPassword;
