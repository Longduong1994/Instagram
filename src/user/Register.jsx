import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [user, setUser] = useState({
    email: '',
    fullname: '',
    username: '',
    password: '',
    status:"true",
    follow:[],
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate()

  const handleInputChange = (event) => {
  const { name, value } = event.target;
  setUser((prevUser) => ({ ...prevUser, [name]: value }));
};

const handleRegister = async (event) => {
  event.preventDefault();
  const formErrors = validateForm(user);
  setErrors(formErrors);

  if (Object.keys(formErrors).length === 0) {
    setIsLoading(true);

    try {
      // Lấy dữ liệu từ máy chủ
      const response = await axios.get('http://localhost:5000/user');
      const existingUsers = response.data;

      // Kiểm tra sự trùng lặp của email
      const isEmailDuplicate = existingUsers.find((existingUser) => existingUser.email === user.email);
      if (isEmailDuplicate) {
        formErrors.email = 'Email already exist';
        setErrors(formErrors);
        setIsLoading(false);
        return;
      }

      // Kiểm tra sự trùng lặp của username
      const isUsernameDuplicate = existingUsers.find((existingUser) => existingUser.username === user.username);
      if (isUsernameDuplicate) {
        formErrors.username = 'Username already exist';
        setErrors(formErrors);
        setIsLoading(false);
        return;
      }

      // Gửi yêu cầu POST đến máy chủ
      const registerResponse = await axios.post('http://localhost:5000/user', user);
      
      // Đặt lại trạng thái người dùng và lỗi
      setUser({
        email: '',
        fullname: '',
        username: '',
        password: ''
      });
      setErrors({});
      setIsLoading(false);
      navigate("/login")
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  }
};

function validateForm(user) {
  let errors = {};

  // Kiểm tra email, fullname, username và password
  if (!user.email) {
    errors.email = 'Email is required';
  } else if (!/\S+@\S+\.\S+/.test(user.email)) {
    errors.email = 'Email is invalid';
  }

  if (!user.fullname) {
    errors.fullname = 'Fullname is required';
  }

  if (!user.username) {
    errors.username = 'Username is required';
  }

  if (!user.password) {
    errors.password = 'Password is required';
  } else if (user.password.length < 6) {
    errors.password = 'Password must contain at least 6 characters';
  }

  return errors;
}


  return (
    <div>
      <div className="main-register">
        <div className="register-logo">
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
          <div>
            <h4>Sign up to see photos and videos</h4>
            <h4>from your friends.</h4>
          </div>
          <button>
            <i className="fa-brands fa-facebook" />
            <span>Log in with Facebook</span>
          </button>
          <div>
            <b>---------</b>
            <b>OR</b>
            <b>---------</b>
          </div>
        </div>
        <form className="register-form" onSubmit={handleRegister}>
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={user.email}
            onChange={handleInputChange}
          />
          {errors.email && <span className="error">{errors.email}</span>}
          <br />
          <input
            type="text"
            placeholder="Fullname"
            name="fullname"
            value={user.fullname}
            onChange={handleInputChange}
          />
           {errors.fullname && <span className="error">{errors.fullname}</span>}
          <br />
          <input
            type="text"
            placeholder="Username"
            name="username"
            value={user.username}
            onChange={handleInputChange}
          />
          {errors.username && <span className="error">{errors.username}</span>}
          <br />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={user.password}
            onChange={handleInputChange}
            
          />
          {errors.password && <span className="error">{errors.password}</span>}
          <p>
            People who use our service may have uploaded
            <br />
            your contact information to Instagram. Learn
          </p>
          <a href="">More</a>
          <p>
            By signing up, you agree to our Terms , Privacy <br />
            Policy and Cookies Policy .
          </p>
          <button type="submit">Sign up</button>
        </form>
        <div className="back-login">
          <strong>Have an account?</strong>
          <a href="">Login</a>
        </div>
        <div className="register-app">
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
  );
}

export default Register;
