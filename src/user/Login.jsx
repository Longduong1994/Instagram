import React, { useState, useEffect } from 'react';
import { NavLink,useNavigate } from 'react-router-dom';
import axios from "axios";

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const [images, setImages] = useState([
    'https://firebasestorage.googleapis.com/v0/b/long1994-5a507.appspot.com/o/login1.png?alt=media&token=96fda221-f97c-49b4-a067-8f6eeb2d99f7',
    'https://firebasestorage.googleapis.com/v0/b/long1994-5a507.appspot.com/o/login2.png?alt=media&token=405bcfa7-c21a-4f76-ac4c-f367734c652d',
    'https://firebasestorage.googleapis.com/v0/b/long1994-5a507.appspot.com/o/login3.png?alt=media&token=e2e51192-8ef5-471e-9453-7736d6b5749a',
    'https://firebasestorage.googleapis.com/v0/b/long1994-5a507.appspot.com/o/login4.png?alt=media&token=4dee2a78-661b-421b-8e92-43d1189903c5'
  ]);
  const [currentImage, setCurrentImage] = useState(0);

  const changeImage = (index) => {
    setCurrentImage(index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage === images.length - 1 ? 0 : prevImage + 1));
    }, 2000);
    return () => clearInterval(interval);
  }, [images.length]);

  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible((prevPasswordVisible) => !prevPasswordVisible);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send a request to API to check login information
      const response = await axios.get('http://localhost:5000/user');
      const users = response.data;

      // Find the user with matching username and password
      const foundUser = users.find((user) => user.username === username && user.password === password);

      if (foundUser) {
        if (foundUser.status) {
          // Login successful, save user information to localStorage
          localStorage.setItem('isLogin', 'true');
          localStorage.setItem('currentUser', JSON.stringify(foundUser));
          navigate('/'); // Redirect to the dashboard or any other page
        } else {
          // User is blocked, display an error message
          setErrorMessage('Account has been blocked.');
        }
      } else {
        // Login failed, display an error message
        setErrorMessage('Incorrect account or password');
      }
    } catch (error) {
      // Handle connection error or API error
      console.log(error);
      setErrorMessage('An error occurred during login. Please try again later.');
    }
  };


  

  return (
    <div>
      <div className="main-login">
        <div className="login-img">
          <img src="https://static.cdninstagram.com/images/instagram/xig/homepage/phones/home-phones.png?__makehaste_cache_breaker=HOgRclNOosk" alt="Instagram" />
          <div>
            <img className="carosel" src={images[currentImage]} alt="Login Carousel" />
          </div>
        </div>
        <div className="login-container">
          <div>
            <i
              data-visualcompletion="css-img"
              aria-label="Instagram"
              className=""
              role="img"
              style={{
                backgroundImage:
                  'url("https://static.cdninstagram.com/rsrc.php/v3/yx/r/WtxJZZ3-9ZP.png")',
                backgroundPosition: "0px 0px",
                backgroundSize: "176px 186px",
                width: 174,
                height: 50,
                backgroundRepeat: "no-repeat",
                display: "inline-block"
              }}
            />
          </div>
          <form className="form-login" onSubmit={handleSubmit}>
            <input type="text" placeholder="Username" onChange={handleUsernameChange} />
            <div>
              <input type={passwordVisible ? 'text' : 'password'} placeholder="Password" onChange={handlePasswordChange} />
              <p className="show-hide" onClick={togglePasswordVisibility}>
                {passwordVisible ? 'Hide' : 'Show'}
              </p>
            {errorMessage && <strong className='show-error'>{errorMessage}</strong>}
            </div>
            <button type="submit">Log in</button>
            <p className="line">
              <b>-----------</b> <b>OR</b> <b>-----------</b>
            </p>
            <div className="face-login">
              <i className="fa-brands fa-facebook" />
              <strong>Log in with Facebook</strong>
            </div>
            <p className="forgot">Forgot password?</p>
          </form>
          <div className="sign-up">
            <div>Don't have an account?</div>
            <NavLink to="/login/register">Sign up</NavLink>
          </div>
          <div>
            <div>Get the app</div>
            <div className="app">
              <img
                alt="Get it on Google Play"
                className="img-googleplay"
                src="https://static.cdninstagram.com/rsrc.php/v3/yz/r/c5Rp7Ym-Klz.png"
              />
              <img
                alt="Get it from Microsoft"
                className="img-microsoft"
                src="https://static.cdninstagram.com/rsrc.php/v3/yu/r/EHY6QnZYdNX.png"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="user-footer">
        <p>
          Meta About Blog Jobs Help API Privacy Terms Top Accounts Locations
          Instagram Lite Contact Uploading &amp; Non-Users Meta Verified
        </p>
        <p>
          <select name="" id="">
            <option value="">English</option>
            <option value="">Tiếng Việt</option>
            <option value="">日本語</option>
          </select>
          <i className="fa-regular fa-copyright" />
          <span>2023 Instagram from Meta</span>
        </p>
      </div>
    </div>
  );
}

export default Login;
