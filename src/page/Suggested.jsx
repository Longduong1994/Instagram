import React,{useState,useEffect} from 'react'
import { Outlet } from 'react-router-dom'
import axios from 'axios' 

function Suggested() {
const [user,setUser] = useState([]) 
const [avatar, setAvatar] = useState('https://firebasestorage.googleapis.com/v0/b/long1994-5a507.appspot.com/o/username.jpg?alt=media&token=3fa7c83e-dd63-48d2-84f6-d36ecfdfb413');

  // Lấy dữ liệu user
  useEffect(() => {
    axios.get('http://localhost:5000/user')
      .then((res) => setUser(res.data))
      .catch((err) => console.log(err));
  }, []);


  return (


    <div>
      <Outlet/>
        <div className='wrapper'>
  <div className="list-suggested-user">
    <strong className="sg">Suggested</strong>
    {user.map((user,i) =>(
      <div className="suggested-user" key={i}>
      <div className="user-suggested">
        <img
          className="img-suggested"
          src={(user.avatar) ? (user.avatar || avatar) : avatar}
          alt=""
        />
        <div className='introduce'>
          <strong>{user.username}</strong>
          <div>{user.fullname}</div>
          <p>Followad by tanjro</p>
        </div>
      </div>
      <button>Follow</button>
    </div>
    ))}

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
  )
}

export default Suggested