import React, { useState } from 'react';
import { Form, Button, Alert, Container, Row, Col, Card } from 'react-bootstrap';
import { auth } from './FirebaseInit';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { db } from './FirebaseInit';
import { get,ref } from 'firebase/database';

function Login({ selectedColor, selectedTextColor }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      //console.log(user.displayName)

      const dbRef = ref(db, `/Users/${user.displayName}`);
      const snapshot = await get(dbRef)
      const userData = snapshot.val();
      //console.log("userData:", userData.Admin);

      if (userData && userData.Admin === true) {
        // User is an admin, navigate to the main page
        navigate("/Home");
      } else {
        // User is not an admin, display an error message
        setError("You do not have admin privileges.");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
    <Container className='mt-3'>
      <Row>
        <Col>
          <Card className='p-5 rounded-5' style={{ '--primary-color': selectedColor, '--text-color': selectedTextColor }}>
            <h1 className='pb-3 text-custom'>Login</h1>
            <div className='bg-white p-5 rounded-5'>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleLogin}>
                <Form.Group controlId="email">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control 
                    type="email" 
                    placeholder="Enter email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                  />
                </Form.Group>
                <Form.Group className='mt-2' controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control 
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                  />
                </Form.Group>
                <Button className='mt-3' type="submit">
                  Login
                </Button>
              </Form>
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  </>
  );
}

export default Login;
