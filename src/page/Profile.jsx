import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import axios from 'axios';

function Profile() {
  const [avatar, setAvatar] = useState('https://firebasestorage.googleapis.com/v0/b/long1994-5a507.appspot.com/o/username.jpg?alt=media&token=3fa7c83e-dd63-48d2-84f6-d36ecfdfb413');
  const [user, setUser] = useState([]);
  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('currentUser')));

  const [userEdit, setUserEdit] = useState({
    email: '',
    fullname: '',
    bio: '',
    email: '',
    phone: '',
    gender: '',
  });

  // Lấy dữ liệu user
  useEffect(() => {
    axios.get('http://localhost:5000/user')
      .then((res) => setUser(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserEdit((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = currentUser.id;
    console.log(id)
    axios
      .patch(`http://localhost:5000/user/${id}`, userEdit)
      .then((res) => {
        console.log('User data updated successfully:', res.data);
        // Update the user state or perform any additional actions
        setCurrentUser({ ...currentUser, ...userEdit }); // Update currentUser state with the new values
        localStorage.setItem('currentUser', JSON.stringify({ ...currentUser, ...userEdit })); // Update the localStorage as well
      })
      .catch((err) => console.log(err));

    // Update localStorage with the new user data
    const updatedUser = { ...currentUser, ...userEdit };
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
  };

  return (
    <div>
      <Outlet />
      <div className="wrapper">

        <div className="profile-box">
          <div className="profile-sidebar">
            <div className="profile-meta-info">
              <h4>
                <i className="fa-brands fa-meta" />
                Meta
              </h4>
              <h5>Some account settings are moving</h5>
              <p>
                Soon, Accounts Center will be the primary place to manage your account
                info, settings and experiences across Meta technologies like Facebook
                and Instagram.
              </p>
              <a href="">Learn more</a>
            </div>
            <div className="edit-sidebar">
              <ul>
                <li>Edit profile</li>
                <li>Change password</li>
                <li>Apps and websites</li>
                <li>Email notifications</li>
                <li>Push notifications</li>
                <li>Manage Contacts</li>
                <li>Privacy and security</li>
                <li>Ads</li>
                <li>Supervision</li>
                <li>Login Activity</li>
                <li>Emails from Intagram</li>
                <li>Help</li>
                <li>
                  {" "}
                  <a href="">Switch to professional account</a>
                </li>
              </ul>
            </div>
            <div className="meta-controls">
              <h4>
                <i className="fa-brands fa-meta" />
                Meta
              </h4>
              <h5>Accounts Center</h5>
              <p>
                Control settings for connected experiences across Instagram, the
                Facebook app and Messenger, including story and post sharing and
                logging in.
              </p>
            </div>
          </div>
          <div className="profile-information">
            <form onSubmit={(e) => handleSubmit(e)}>
              <div className="fl username-profile">
                <div className="img-box-profile">
                  <img
                    src={currentUser.avatar ? currentUser.avatar : avatar}
                    alt=""
                  />
                </div>
                <div>
                  <p>dglong1994</p>
                  <button className="change-photo">Change profile photo</button>
                </div>
              </div>
              <div className="fl">
                <b>Name</b>
                <div className="box-info">
                  <p className="press">{currentUser.username}</p>
                  <p>
                    You are using the same name on Instagram and Facebook. Go to
                    Facebook to change your name.
                    <a href="">Change Name</a>
                  </p>
                </div>
              </div>
              <div className="fl">
                <b>FullName</b>
                <div className="box-info">
                  <input
                    className="box-info"
                    type="text"
                    placeholder={currentUser.fullname?currentUser.fullname:""}
                    name="fullname"
                    onChange={handleChange}
                  />
                  <p>
                    dglong1994 In most cases, you'll be able to change your username
                    back to dglong1994 for another 14 days.
                    <a href="">Learn more</a>
                  </p>
                </div>
              </div>
              <div className="fl">
                <b>Website</b>
                <div className="box-info">
                  <p className="press">Website</p>
                  <p>
                    Editing your links is only available on mobile. Visit the
                    Instagram app and edit your profile to change the websites in your
                    bio.
                  </p>
                </div>
              </div>
              <div className="fl">
                <b>Bio</b>
                <div>
                  <textarea
                    className="box-info"
                    name="bio"
                    defaultValue={currentUser.bio}
                    onChange={handleChange}
                  />
                  <p>0/150</p>
                </div>
              </div>
              <div>
                <div className="box-info-pesonal">
                  <p>Personal information</p>
                  <p>
                    Provide your personal information, even if the account is used for
                    a business, a pet or something else. This won't be a part of your
                    public profile
                  </p>
                </div>
              </div>
              <div className="fl">
                <b>Email</b>
                <input
                  className="box-info"
                  type="email"
                  placeholder={currentUser.email}
                  name="email"
                  onChange={handleChange}
                />
              </div>
              <div className="fl">
                <b>Phone number</b>
                <input
                  className="box-info"
                  type="text"
                  placeholder={`${currentUser.phone}`}
                  name='phone'
                  onChange={handleChange}
                />
              </div>
              <div className="fl">
                <b>Gender</b>
                <input
                  className="box-info"
                  type="text"
                  placeholder={currentUser.gender}
                  name="gender"
                  onChange={handleChange}
                />
              </div>
              <div className="fl chexbox-info">
                <b>Show account suggestions on profiles</b>
                <div className="box-info checked">
                  <p>
                    Choose whether people can see similar account suggestions on your
                    profile, and whether your account can be suggested on other
                    profiles.
                  </p>
                </div>
              </div>
              <div className="fl">
                <button className="btn-submit-info" type='submit'>Submit</button>
                <a href="">Temporality deactivate my accout</a>
              </div>
            </form>
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
        </div>
      </div>

    </div>
  )
}

export default Profile