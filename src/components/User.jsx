import React, { useState, useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL, listAll } from "firebase/storage";
import axios from "axios";

function User() {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  // Khai báo state để lưu trữ giá trị title cần chỉnh sửa
  const [editingTitle, setEditingTitle] = useState('');

  // Khai báo state để kiểm soát trạng thái hiển thị trường nhập liệu
  const [isEditing, setIsEditing] = useState(false);

  const [listPost, setListPost] = useState([])
  const [myPost, setMyPost] = useState([])

  const [avatar, setAvatar] = useState('https://firebasestorage.googleapis.com/v0/b/long1994-5a507.appspot.com/o/username.jpg?alt=media&token=3fa7c83e-dd63-48d2-84f6-d36ecfdfb413');

  // State upload ảnh lên
  const [imageUpload, setImageUpload] = useState(null);
  // State lấy url ảnh về
  const [imageUrls, setImageUrls] = useState([]);

  // Tạo storage lưu trữ từ dịch vụ của firebase
  const imagesListRef = ref(storage, "images/");

  // Viết hàm upload
  const uploadFile = () => {
    if (imageUpload == null) return;

    const imageRef = ref(storage, `images/${imageUpload.name}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageUrls((prev) => [...prev, url]);
      });
    });
  };

  // Lấy dữ liệu trả về từ firebase
  useEffect(() => {
    listAll(imagesListRef).then((res) => {
      res.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageUrls((prev) => [...prev, url]);
        });
      });
    });
  }, []);

  const uploadAvatar = (event) => {
    const file = event.target.files[0];
    const avatarRef = ref(storage, `images/${currentUser.username}.jpg`);

    uploadBytes(avatarRef, file).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setAvatar(url);

        // Update currentUser with new avatar URL
        const updatedUser = {
          ...currentUser,
          avatar: url
        };

        // Save updated currentUser to localStorage
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));

        // Send avatar and user ID to API endpoint
        axios.patch(`http://localhost:5000/user/${currentUser.id}`, {
          avatar: updatedUser.avatar,
        })
          .then((response) => {
            console.log('Avatar uploaded successfully');
          })
          .catch((error) => {
            console.error('Error uploading avatar', error);
          });
      });
    });
  };

  function filterPostsByUsername(listPost, username) {
    return listPost.filter((post) => post.name === username);
  }

  useEffect(() => {
    axios.get('http://localhost:5000/post')
      .then((res) => {
        setListPost(res.data);
        const tempUsername = currentUser.username;
        const filteredPosts = filterPostsByUsername(res.data, tempUsername);
        setMyPost(filteredPosts);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDeletePost = (id) => {
    // Gửi request DELETE đến API endpoint
    axios
      .delete(`http://localhost:5000/post/${id}`)
      .then(() => {
        // Xóa bài viết khỏi danh sách myPost
        const updatedPosts = myPost.filter((post) => post.id !== id);
        setMyPost(updatedPosts);
        console.log('Post deleted successfully');
      })
      .catch((error) => {
        console.error('Error deleting post', error);
      });
  };

  // Hàm xử lý khi click vào nút "Edit"
  const handleEditPost = (id) => {
    // Tìm bài viết cần chỉnh sửa dựa vào id
    const postToEdit = myPost.find((post) => post.id === id);

    // Gán giá trị title cần chỉnh sửa vào state "editingTitle"
    setEditingTitle(postToEdit.title);

    // Đặt trạng thái "isEditing" thành true để hiển thị trường nhập liệu
    setIsEditing(true);
  };

  // Hàm xử lý khi hoàn thành chỉnh sửa title
  const handleUpdateTitle = (id) => {
    // Gửi request PATCH đến API endpoint để cập nhật title
    axios
      .patch(`http://localhost:5000/post/${id}`, {
        title: editingTitle
      })
      .then(() => {
        // Cập nhật giá trị title mới cho bài viết trong danh sách "myPost"
        const updatedPosts = myPost.map((post) => {
          if (post.id === id) {
            return {
              ...post,
              title: editingTitle
            };
          } return post;
        });
        setMyPost(updatedPosts);
        setIsEditing(false); // Ẩn trường nhập liệu sau khi hoàn thành chỉnh sửa
        console.log('Post title updated successfully');
      })
      .catch((error) => {
        console.error('Error updating post title', error);
      });
  };


  return (
    <div>
      <div className="wrapper">
        <div className="user-infomation">
          <div className="user-profile">
            <label htmlFor="upload-avatar">
              <img
                className="img-user-profile"
                src={currentUser.avatar ? currentUser.avatar : avatar}
                alt=""
              />
              <input
                id='upload-avatar'
                type="file"
                onChange={uploadAvatar}
              />
            </label>
            <div>
              <div className="profile-edit">
                <b>{currentUser.username}</b>
                <Link to="/user/profile">
                  <button className="btn-edit-profile">Edit Profile</button>
                </Link>
                <svg
                  aria-label="Options"
                  className="x1lliihq x1n2onr6"
                  color="rgb(0, 0, 0)"
                  fill="rgb(0, 0, 0)"
                  height={24}
                  role="img"
                  viewBox="0 0 24 24"
                  width={24}
                >
                  <title>Options</title>
                  <circle
                    cx={12}
                    cy={12}
                    fill="none"
                    r="8.635"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                  />
                  <path
                    d="M14.232 3.656a1.269 1.269 0 0 1-.796-.66L12.93 2h-1.86l-.505.996a1.269 1.269 0 0 1-.796.66m-.001 16.688a1.269 1.269 0 0 1 .796.66l.505.996h1.862l.505-.996a1.269 1.269 0 0 1 .796-.66M3.656 9.768a1.269 1.269 0 0 1-.66.796L2 11.07v1.862l.996.505a1.269 1.269 0 0 1 .66.796m16.688-.001a1.269 1.269 0 0 1 .66-.796L22 12.93v-1.86l-.996-.505a1.269 1.269 0 0 1-.66-.796M7.678 4.522a1.269 1.269 0 0 1-1.03.096l-1.06-.348L4.27 5.587l.348 1.062a1.269 1.269 0 0 1-.096 1.03m11.8 11.799a1.269 1.269 0 0 1 1.03-.096l1.06.348 1.318-1.317-.348-1.062a1.269 1.269 0 0 1 .096-1.03m-14.956.001a1.269 1.269 0 0 1 .096 1.03l-.348 1.06 1.317 1.318 1.062-.348a1.269 1.269 0 0 1 1.03.096m11.799-11.8a1.269 1.269 0 0 1-.096-1.03l.348-1.06-1.317-1.318-1.062.348a1.269 1.269 0 0 1-1.03-.096"
                    fill="none"
                    stroke="currentColor"
                    strokeLinejoin="round"
                    strokeWidth={2}
                  />
                </svg>
              </div>
              <div className="user-profile-action">
                <p>
                  <span>{myPost.length}</span> post
                </p>
                <p>
                  <span>0</span> followers
                </p>
                <p>
                  <span>{currentUser.follow.length}</span> following
                </p>
              </div>
              <b>{currentUser.fullname}</b>
            </div>
          </div>
          <div className="activate">
            <ul>
              <li className='user-chose'>
                <svg
                  aria-label=""
                  color="rgb(115, 115, 115)"
                  fill="rgb(115, 115, 115)"
                  height={12}
                  role="img"
                  viewBox="0 0 24 24"
                  width={12}
                >
                  <rect
                    fill="none"
                    height={18}
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    width={18}
                    x={3}
                    y={3}
                  />
                  <line
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    x1="9.015"
                    x2="9.015"
                    y1={3}
                    y2={21}
                  />
                  <line
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    x1="14.985"
                    x2="14.985"
                    y1={3}
                    y2={21}
                  />
                  <line
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    x1={21}
                    x2={3}
                    y1="9.015"
                    y2="9.015"
                  />
                  <line
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    x1={21}
                    x2={3}
                    y1="14.985"
                    y2="14.985"
                  />
                </svg>
                POSTS
              </li>
              <li>
                <svg
                  aria-label=""
                  color="rgb(115, 115, 115)"
                  fill="rgb(115, 115, 115)"
                  height={12}
                  role="img"
                  viewBox="0 0 24 24"
                  width={12}
                >
                  <polygon
                    fill="none"
                    points="20 21 12 13.44 4 21 4 3 20 3 20 21"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                  />
                </svg>
                SAVED
              </li>
              <li>
                <svg
                  aria-label=""
                  color="rgb(0, 0, 0)"
                  fill="rgb(0, 0, 0)"
                  height={12}
                  role="img"
                  viewBox="0 0 24 24"
                  width={12}
                >
                  <path
                    d="M10.201 3.797 12 1.997l1.799 1.8a1.59 1.59 0 0 0 1.124.465h5.259A1.818 1.818 0 0 1 22 6.08v14.104a1.818 1.818 0 0 1-1.818 1.818H3.818A1.818 1.818 0 0 1 2 20.184V6.08a1.818 1.818 0 0 1 1.818-1.818h5.26a1.59 1.59 0 0 0 1.123-.465Z"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                  />
                  <path
                    d="M18.598 22.002V21.4a3.949 3.949 0 0 0-3.948-3.949H9.495A3.949 3.949 0 0 0 5.546 21.4v.603"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                  />
                  <circle
                    cx="12.072"
                    cy="11.075"
                    fill="none"
                    r="3.556"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                  />
                </svg>
                TAGGED
              </li>
            </ul>

            {myPost.length > 0 ? (
              <div className='box-mypost'>
                {myPost.map((e, i) => (
                  <div className='mypost' key={i}>
                    <div className='img-mypost'>
                      <img src={e.img} alt="" />
                    </div>
                    <div className='mypost-action'>
                      {isEditing ? (
                        <input
                          className='mypost-title'
                          value={editingTitle}
                          onChange={(e) => setEditingTitle(e.target.value)}
                        />
                      ) : (
                        <h3 className='mypost-title'>{e.title}</h3>
                      )}
                      <div className='mypost-btn-box'>
                        <button
                          className='btn-mypost-edit'
                          onClick={() => handleEditPost(e.id)}
                        >
                          <i className="fa-solid fa-pen-to-square"></i>
                        </button>
                        <button
                          className='btn-mypost-delete'
                          onClick={() => handleDeletePost(e.id)}
                        >
                          <i className="fa-solid fa-trash"></i>
                        </button>
                      </div>
                      {isEditing && (
                        <button
                          className='btn-mypost-save'
                          onClick={() => handleUpdateTitle(e.id)}
                        >
                         <i class="fa-solid fa-download"></i>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="photo">
                <i className="fa-solid fa-camera" />
                <h1>Photos of you</h1>
                <p>When people tag you in photos, they'll appear here.</p>
              </div>
            )}


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
      </div>
      <Outlet />
    </div>
  );
}

export default User;
