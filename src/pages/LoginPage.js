import { useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {AuthContext} from '../context/auth.context';

function LoginPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
  
  const navigate = useNavigate();

  const {storeToken, authenticateUser} = useContext(AuthContext);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password };
 
    axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, requestBody)
      .then((response) => {
      // Request to the server's endpoint `/auth/login` returns a response
      // with the JWT string ->  response.data.authToken
        console.log('JWT token', response.data.authToken );
        
        storeToken(response.data.authToken);
        // Verify the token by sending a request 
        // to the server's JWT validation endpoint. 
        authenticateUser(); 

        navigate('/');
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        console.log("error login account", errorDescription);
        setErrorMessage("Error loggin to your account please make sure to provide the correct information or register");
      })
  };
  
  return (
    <div className="LoginPage">
      <h1>Login</h1>

      { errorMessage && <p className="error-message">{errorMessage}</p> }

      <form onSubmit={handleLoginSubmit}>
        <label>Email:</label>
        <input 
          type="email"
          name="email"
          value={email}
          required= {true}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={password}
          required= {true}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Login</button>
      </form>

      <p>Don't have an account yet?</p>
      <Link to={"/signup"}> Sign Up</Link>
    </div>
  )
}

export default LoginPage;
