import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { NavLink } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

function Index() {
  const uuid = uuidv4();
  const [avatar, setAvatar] = useState('https://firebasestorage.googleapis.com/v0/b/long1994-5a507.appspot.com/o/username.jpg?alt=media&token=3fa7c83e-dd63-48d2-84f6-d36ecfdfb413');
  const [listpost, setListpost] = useState([]);
  const [user, setUser] = useState([])
  const [showComment, setShowComment] = useState(false);
  const [comment, setComment] = useState('');
  const [changed, setChanged] = useState(false);
  const [renderComment, setRenderComment] = useState()
  const [renderPost, setRenderPost] = useState("")
  const [like, setLike] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  const [follow, setFollow] = useState([]);
  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('currentUser')));
  const [listFollow, setListFollow] = useState([])




  const handleGetListpost = () => {
    axios
      .get('http://localhost:5000/post')
      .then((res) => {
        // Lọc những bài viết có status là true
        const filteredPosts = res.data.filter((post) => post.status);
        setListpost(filteredPosts);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    handleGetListpost();
  }, [changed]);


  const handleChangeComment = (e) => {
    setComment(e.target.value);
  };

  //comment index
  const handPostComment = async (e) => {

    const newComment = {
      idcmt: uuid,
      avatarcmt: currentUser.avatar,
      comment: comment,
      usernamecomment: currentUser.username,
    };
    const id = e.id

    let addComments = [...e.comments]
    addComments.push(newComment)


    try {
      await axios.patch(`http://localhost:5000/post/${id}`, {
        comments: [...addComments],
      });
      setComment('')
      setChanged(!changed);
      // console.log("Comment added successfully.");
    } catch (error) {
      // console.log("Error adding comment:", error);
    }
  };
  // comment modal
  const handleCommentModal = async (renderPost) => {

    const newComment = {
      idcmt: (uuid),
      avatarcmt: currentUser.avatar,
      comment: comment,
      usernamecomment: currentUser.username,
    };
    const id = renderPost.id;


    let addComments = [...renderPost.comments];
    addComments.push(newComment);

    try {
      await axios.patch(`http://localhost:5000/post/${id}`, {
        comments: [...addComments],
      });
      setComment('');
      setChanged(!changed);
    } catch (error) {
    }
  };


  // Lấy dữ liệu user
  useEffect(() => {
    axios.get('http://localhost:5000/user')
      .then((res) => setUser(res.data))
      .catch((err) => console.log(err));
  }, [changed]);



  const handleShowComment = (e) => {
    setShowComment(!showComment)
    setRenderPost(e)
    setRenderComment(e.comments)
  }
  // delete comment

  const handleDeleteComment = async (renderPost, e) => {
    if (currentUser.username === e.usernamecomment) {
      const id = renderPost.id
      try {
        // Kiểm tra xem 'idcmt' đã được xác định trước đó hay chưa
        if (id) {
          await axios.delete(`http://localhost:5000/post/${id}`);
          ;
        } else {
        }
      } catch (error) {
      }
    } else {
    }
  };

  const [activeLike, setActiveLink] = useState("")
  const toggleLike = async (e, i) => {
    setActiveLink(e.id)



    const id = e.id;
    setLike(e.like);

    const newLike = { username: currentUser.username, isLiked: true };
    let updatedLike = [...(e.like)];


    const index = updatedLike.findIndex((item) => item.username === newLike.username);

    if (index === -1) {
      // Thêm currentUser vào mảng like
      updatedLike.push(newLike);
      setIsLiked(true);
    } else {
      // Xóa currentUser khỏi mảng like
      updatedLike.splice(index, 1);
      setIsLiked(false);
    }

    await axios.patch(`http://localhost:5000/post/${id}`, { like: [...updatedLike] });
    setLike(updatedLike);
    setChanged(!changed)
  };

  const handleFollow = async (e) => {
    try {
      const userId = currentUser.id;
      const newFollow = {
        username: e.username,
        avatar: e.avatar
      };

      const updatedFollow = [...currentUser.follow, newFollow];

      const response = await axios.patch(`http://localhost:5000/user/${userId}`, {
        follow: updatedFollow
      });

      setFollow(updatedFollow);
      setChanged(true);
      const updatedCurrentUser = {
        ...currentUser,
        follow: updatedFollow
      };
      setCurrentUser(updatedCurrentUser);
      localStorage.setItem('currentUser', JSON.stringify(updatedCurrentUser));
    } catch (error) {
      // Xử lý lỗi tại đây (nếu cần)
    }
  };

  useEffect(() => {
    const updatedCurrentUser = {
      ...currentUser,
      follow: follow
    };
    setCurrentUser(updatedCurrentUser);
  }, [follow]);

  useEffect(() => {
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
  }, [currentUser]);

  console.log(currentUser.follow);






  return (
    <div>

      <div className='navbar-ip'>
        <svg aria-label="Instagram" className="_ab6-" color="rgb(0, 0, 0)" fill="rgb(0, 0, 0)" height="29" role="img" viewBox="32 4 113 32" width="103"><path clipRule="evenodd" d="M37.82 4.11c-2.32.97-4.86 3.7-5.66 7.13-1.02 4.34 3.21 6.17 3.56 5.57.4-.7-.76-.94-1-3.2-.3-2.9 1.05-6.16 2.75-7.58.32-.27.3.1.3.78l-.06 14.46c0 3.1-.13 4.07-.36 5.04-.23.98-.6 1.64-.33 1.9.32.28 1.68-.4 2.46-1.5a8.13 8.13 0 0 0 1.33-4.58c.07-2.06.06-5.33.07-7.19 0-1.7.03-6.71-.03-9.72-.02-.74-2.07-1.51-3.03-1.1Zm82.13 14.48a9.42 9.42 0 0 1-.88 3.75c-.85 1.72-2.63 2.25-3.39-.22-.4-1.34-.43-3.59-.13-5.47.3-1.9 1.14-3.35 2.53-3.22 1.38.13 2.02 1.9 1.87 5.16ZM96.8 28.57c-.02 2.67-.44 5.01-1.34 5.7-1.29.96-3 .23-2.65-1.72.31-1.72 1.8-3.48 4-5.64l-.01 1.66Zm-.35-10a10.56 10.56 0 0 1-.88 3.77c-.85 1.72-2.64 2.25-3.39-.22-.5-1.69-.38-3.87-.13-5.25.33-1.78 1.12-3.44 2.53-3.44 1.38 0 2.06 1.5 1.87 5.14Zm-13.41-.02a9.54 9.54 0 0 1-.87 3.8c-.88 1.7-2.63 2.24-3.4-.23-.55-1.77-.36-4.2-.13-5.5.34-1.95 1.2-3.32 2.53-3.2 1.38.14 2.04 1.9 1.87 5.13Zm61.45 1.81c-.33 0-.49.35-.61.93-.44 2.02-.9 2.48-1.5 2.48-.66 0-1.26-1-1.42-3-.12-1.58-.1-4.48.06-7.37.03-.59-.14-1.17-1.73-1.75-.68-.25-1.68-.62-2.17.58a29.65 29.65 0 0 0-2.08 7.14c0 .06-.08.07-.1-.06-.07-.87-.26-2.46-.28-5.79 0-.65-.14-1.2-.86-1.65-.47-.3-1.88-.81-2.4-.2-.43.5-.94 1.87-1.47 3.48l-.74 2.2.01-4.88c0-.5-.34-.67-.45-.7a9.54 9.54 0 0 0-1.8-.37c-.48 0-.6.27-.6.67 0 .05-.08 4.65-.08 7.87v.46c-.27 1.48-1.14 3.49-2.09 3.49s-1.4-.84-1.4-4.68c0-2.24.07-3.21.1-4.83.02-.94.06-1.65.06-1.81-.01-.5-.87-.75-1.27-.85-.4-.09-.76-.13-1.03-.11-.4.02-.67.27-.67.62v.55a3.71 3.71 0 0 0-1.83-1.49c-1.44-.43-2.94-.05-4.07 1.53a9.31 9.31 0 0 0-1.66 4.73c-.16 1.5-.1 3.01.17 4.3-.33 1.44-.96 2.04-1.64 2.04-.99 0-1.7-1.62-1.62-4.4.06-1.84.42-3.13.82-4.99.17-.8.04-1.2-.31-1.6-.32-.37-1-.56-1.99-.33-.7.16-1.7.34-2.6.47 0 0 .05-.21.1-.6.23-2.03-1.98-1.87-2.69-1.22-.42.39-.7.84-.82 1.67-.17 1.3.9 1.91.9 1.91a22.22 22.22 0 0 1-3.4 7.23v-.7c-.01-3.36.03-6 .05-6.95.02-.94.06-1.63.06-1.8 0-.36-.22-.5-.66-.67-.4-.16-.86-.26-1.34-.3-.6-.05-.97.27-.96.65v.52a3.7 3.7 0 0 0-1.84-1.49c-1.44-.43-2.94-.05-4.07 1.53a10.1 10.1 0 0 0-1.66 4.72c-.15 1.57-.13 2.9.09 4.04-.23 1.13-.89 2.3-1.63 2.3-.95 0-1.5-.83-1.5-4.67 0-2.24.07-3.21.1-4.83.02-.94.06-1.65.06-1.81 0-.5-.87-.75-1.27-.85-.42-.1-.79-.13-1.06-.1-.37.02-.63.35-.63.6v.56a3.7 3.7 0 0 0-1.84-1.49c-1.44-.43-2.93-.04-4.07 1.53-.75 1.03-1.35 2.17-1.66 4.7a15.8 15.8 0 0 0-.12 2.04c-.3 1.81-1.61 3.9-2.68 3.9-.63 0-1.23-1.21-1.23-3.8 0-3.45.22-8.36.25-8.83l1.62-.03c.68 0 1.29.01 2.19-.04.45-.02.88-1.64.42-1.84-.21-.09-1.7-.17-2.3-.18-.5-.01-1.88-.11-1.88-.11s.13-3.26.16-3.6c.02-.3-.35-.44-.57-.53a7.77 7.77 0 0 0-1.53-.44c-.76-.15-1.1 0-1.17.64-.1.97-.15 3.82-.15 3.82-.56 0-2.47-.11-3.02-.11-.52 0-1.08 2.22-.36 2.25l3.2.09-.03 6.53v.47c-.53 2.73-2.37 4.2-2.37 4.2.4-1.8-.42-3.15-1.87-4.3-.54-.42-1.6-1.22-2.79-2.1 0 0 .69-.68 1.3-2.04.43-.96.45-2.06-.61-2.3-1.75-.41-3.2.87-3.63 2.25a2.61 2.61 0 0 0 .5 2.66l.15.19c-.4.76-.94 1.78-1.4 2.58-1.27 2.2-2.24 3.95-2.97 3.95-.58 0-.57-1.77-.57-3.43 0-1.43.1-3.58.19-5.8.03-.74-.34-1.16-.96-1.54a4.33 4.33 0 0 0-1.64-.69c-.7 0-2.7.1-4.6 5.57-.23.69-.7 1.94-.7 1.94l.04-6.57c0-.16-.08-.3-.27-.4a4.68 4.68 0 0 0-1.93-.54c-.36 0-.54.17-.54.5l-.07 10.3c0 .78.02 1.69.1 2.09.08.4.2.72.36.91.15.2.33.34.62.4.28.06 1.78.25 1.86-.32.1-.69.1-1.43.89-4.2 1.22-4.31 2.82-6.42 3.58-7.16.13-.14.28-.14.27.07l-.22 5.32c-.2 5.37.78 6.36 2.17 6.36 1.07 0 2.58-1.06 4.2-3.74l2.7-4.5 1.58 1.46c1.28 1.2 1.7 2.36 1.42 3.45-.21.83-1.02 1.7-2.44.86-.42-.25-.6-.44-1.01-.71-.23-.15-.57-.2-.78-.04-.53.4-.84.92-1.01 1.55-.17.61.45.94 1.09 1.22.55.25 1.74.47 2.5.5 2.94.1 5.3-1.42 6.94-5.34.3 3.38 1.55 5.3 3.72 5.3 1.45 0 2.91-1.88 3.55-3.72.18.75.45 1.4.8 1.96 1.68 2.65 4.93 2.07 6.56-.18.5-.69.58-.94.58-.94a3.07 3.07 0 0 0 2.94 2.87c1.1 0 2.23-.52 3.03-2.31.09.2.2.38.3.56 1.68 2.65 4.93 2.07 6.56-.18l.2-.28.05 1.4-1.5 1.37c-2.52 2.3-4.44 4.05-4.58 6.09-.18 2.6 1.93 3.56 3.53 3.69a4.5 4.5 0 0 0 4.04-2.11c.78-1.15 1.3-3.63 1.26-6.08l-.06-3.56a28.55 28.55 0 0 0 5.42-9.44s.93.01 1.92-.05c.32-.02.41.04.35.27-.07.28-1.25 4.84-.17 7.88.74 2.08 2.4 2.75 3.4 2.75 1.15 0 2.26-.87 2.85-2.17l.23.42c1.68 2.65 4.92 2.07 6.56-.18.37-.5.58-.94.58-.94.36 2.2 2.07 2.88 3.05 2.88 1.02 0 2-.42 2.78-2.28.03.82.08 1.49.16 1.7.05.13.34.3.56.37.93.34 1.88.18 2.24.11.24-.05.43-.25.46-.75.07-1.33.03-3.56.43-5.21.67-2.79 1.3-3.87 1.6-4.4.17-.3.36-.35.37-.03.01.64.04 2.52.3 5.05.2 1.86.46 2.96.65 3.3.57 1 1.27 1.05 1.83 1.05.36 0 1.12-.1 1.05-.73-.03-.31.02-2.22.7-4.96.43-1.79 1.15-3.4 1.41-4 .1-.21.15-.04.15 0-.06 1.22-.18 5.25.32 7.46.68 2.98 2.65 3.32 3.34 3.32 1.47 0 2.67-1.12 3.07-4.05.1-.7-.05-1.25-.48-1.25Z" fill="currentColor" fillRule="evenodd"></path></svg>
        <input type="text" placeholder='Search' />
        <svg aria-label="Notifications" className="_ab6-" color="rgb(0, 0, 0)" fill="rgb(0, 0, 0)" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"></path></svg>
      </div>
      <div className="wrapper">

        <div className="main">
          <div className="container">
            <div className="list-folowing">
              <div className='list-folowing-box'>
                {currentUser.follow.length > 0 ? (
                  currentUser.follow.map((e, i) => (
                    <div key={i}>
                      <div className='folowing-box'>
                        <img src={(e.avatar) ? (e.avatar || avatar) : avatar} alt="" />
                      </div>
                      <p className='folow-username'>{e.username}</p>
                    </div>
                  ))
                ) : (
                  <></>
                )}
              </div>
            </div>
            <div className="list-post">
              {listpost.map((e, i) => (
                <div className="post" key={i}>
                  <div className="post-header">
                    <div className="user-post">
                      <img
                        className="img-user-post"
                        src={e.avatar ? e.avatar || avatar : avatar}
                        alt=""
                      />

                      <b>{e.name}</b>
                      <trong>{e.time}</trong>
                    </div>
                    <div>
                      <svg
                        aria-label="More options"
                        className="_ab6-"
                        color="rgb(0, 0, 0)"
                        fill="rgb(0, 0, 0)"
                        height={24}
                        role="img"
                        viewBox="0 0 24 24"
                        width={24}
                      >
                        <circle cx={12} cy={12} r="1.5" />
                        <circle cx={6} cy={12} r="1.5" />
                        <circle cx={18} cy={12} r="1.5" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <img
                      className="img-post"
                      src={e.img}
                      alt=""
                    />
                  </div>
                  <div className="post-main">
                    <section className="post-icon">
                      <div className="post-icon-active">
                        <span>
                          <button onClick={() => toggleLike(e, i)}>
                            {activeLike === e.id && isLiked ?


                              (<svg
                                aria-label="Unlike"
                                className="x1lliihq x1n2onr6"
                                color="rgb(255, 48, 64)"
                                fill="rgb(255, 48, 64)"
                                height={24}
                                role="img"
                                viewBox="0 0 48 48"
                                width={24}
                              >
                                <title>Unlike</title>
                                <path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z" />
                              </svg>)
                              :

                              (<svg
                                aria-label="Like"
                                className="x1lliihq x1n2onr6"
                                color="rgb(38, 38, 38)"
                                fill="rgb(38, 38, 38)"
                                height={24}
                                role="img"
                                viewBox="0 0 24 24"
                                width={24}
                              >
                                <title>Like</title>
                                <path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z" />
                              </svg>)
                            }



                          </button>
                        </span>
                        <span>
                          <button onClick={() => handleShowComment(e)}>
                            <svg
                              aria-label="Comment"
                              color="rgb(0, 0, 0)"
                              fill="rgb(0, 0, 0)"
                              height={24}
                              role="img"
                              viewBox="0 0 24 24"
                              width={24}
                            >
                              <title>Comment</title>
                              <path
                                d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z"
                                fill="none"
                                stroke="currentColor"
                                strokeLinejoin="round"
                                strokeWidth={2}
                              />
                            </svg>
                          </button>
                        </span>
                        <span>
                          <button>
                            <svg
                              aria-label="Share Post"
                              color="rgb(0, 0, 0)"
                              fill="rgb(0, 0, 0)"
                              height={24}
                              role="img"
                              viewBox="0 0 24 24"
                              width={24}
                            >
                              <title>Share Post</title>
                              <line
                                fill="none"
                                stroke="currentColor"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                x1={22}
                                x2="9.218"
                                y1={3}
                                y2="10.083"
                              />
                              <polygon
                                fill="none"
                                points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334"
                                stroke="currentColor"
                                strokeLinejoin="round"
                                strokeWidth={2}
                              />
                            </svg>
                          </button>
                        </span>
                      </div>
                      <span>
                        <button>
                          <svg
                            aria-label="Save"
                            color="rgb(0, 0, 0)"
                            fill="rgb(0, 0, 0)"
                            height={24}
                            role="img"
                            viewBox="0 0 24 24"
                            width={24}
                          >
                            <title>Save</title>
                            <polygon
                              fill="none"
                              points="20 21 12 13.44 4 21 4 3 20 3 20 21"
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                            />
                          </svg>
                        </button>
                      </span>
                    </section>
                    <div className="like"><b>{e.like.length}</b><b>likes</b></div>
                    <div className="title">
                      <b>{e.name}</b>
                      <div className='post-title-box'>{e.title}</div>
                    </div>
                    <div className="translation">See translation</div>
                    <div className='fl-comment'>

                      {e.comments.length > 0 && (
                        <>
                          <b>{e.comments[e.comments.length - 1].usernamecomment}</b>
                          <span>{e.comments[e.comments.length - 1].comment}</span>
                        </>
                      )}
                    </div>
                    <div className="comment">
                      <input type="text" placeholder="Add a comment" value={comment} onChange={handleChangeComment} />
                      <button className='btn-comment' onClick={() => handPostComment(e)}>post</button>
                      <svg
                        aria-label="Emoji"
                        color="rgb(115, 115, 115)"
                        fill="rgb(115, 115, 115)"
                        height={13}
                        role="img"
                        viewBox="0 0 24 24"
                        width={13}
                      >
                        <title>Emoji</title>
                        <path d="M15.83 10.997a1.167 1.167 0 1 0 1.167 1.167 1.167 1.167 0 0 0-1.167-1.167Zm-6.5 1.167a1.167 1.167 0 1 0-1.166 1.167 1.167 1.167 0 0 0 1.166-1.167Zm5.163 3.24a3.406 3.406 0 0 1-4.982.007 1 1 0 1 0-1.557 1.256 5.397 5.397 0 0 0 8.09 0 1 1 0 0 0-1.55-1.263ZM12 .503a11.5 11.5 0 1 0 11.5 11.5A11.513 11.513 0 0 0 12 .503Zm0 21a9.5 9.5 0 1 1 9.5-9.5 9.51 9.51 0 0 1-9.5 9.5Z" />
                      </svg>
                    </div>
                  </div>
                </div>
              )
              )

              }
            </div>
          </div>
          <div className="sidebar-right">
            <div className="user-sidebar-right-swich">
              <NavLink to="/user" className="user-sidebar-right">
                <img
                  className="img-sidebar-right"
                  src={currentUser.avatar ? currentUser.avatar : avatar}
                  alt=""
                />
                <span>
                  <b>{currentUser.username}</b>
                  <div>{currentUser.fullname}</div>
                </span>
              </NavLink>
              <button>swich</button>
            </div>
            <div className="suggested">
              <div>Suggested for you</div>
              <div>
                <NavLink to="/index/suggested">
                  <button>See All</button>
                </NavLink>
              </div>
            </div>
            <ul className="list-suggested">
              {user
                .filter((e) => e.username !== currentUser.username && !currentUser.follow.some(f => f.username === e.username))
                .slice(0, 6)
                .map((e, i) => (
                  <li key={i}>
                    <div className="user-suggested">
                      <img
                        className="img-suggested"
                        src={e.avatar ? e.avatar : avatar}
                        alt=""
                      />
                      <span>
                        <b>{e.username}</b>
                        <div>{e.fullname}</div>
                      </span>
                    </div>
                    <button onClick={() => handleFollow(e)}>Follow</button>
                  </li>
                ))}
            </ul>

            {showComment && (


              <div className='comment-box'>
                <div className='img-comment-box' >
                  <img src={renderPost.img} alt="" />
                </div>
                <div className='list-comment'>
                  <div className='comment-bars'>
                    <svg
                      aria-label="More options"
                      className="_ab6-"
                      color="rgb(0, 0, 0)"
                      fill="rgb(0, 0, 0)"
                      height={24}
                      role="img"
                      viewBox="0 0 24 24"
                      width={24}
                    >
                      <circle cx={12} cy={12} r="1.5" />
                      <circle cx={6} cy={12} r="1.5" />
                      <circle cx={18} cy={12} r="1.5" />
                    </svg>
                    <i onClick={handleShowComment} class="fa-solid fa-xmark"></i>
                  </div>
                  <div>
                    <ul>
                      {renderComment.map((e, i) => (
                        <li className='comment-info' key={i}>
                          <div className='user-cmt'>
                            <div className='img-user-cmt'>
                              <img src={(e.avatarcmt) ? (e.avatarcmt || avatar) : avatar} alt="" />
                            </div>
                            <b>{e.usernamecomment}</b>
                            <span>{e.comment}</span>
                          </div>
                          <div className='comment-right-action' >
                            <svg
                              aria-label="Like"
                              className="x1lliihq x1n2onr6"
                              color="rgb(38, 38, 38)"
                              fill="rgb(38, 38, 38)"
                              height={12}
                              role="img"
                              viewBox="0 0 24 24"
                              width={12}
                            >
                              <title>Like</title>
                              <path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z" />
                            </svg>
                            <i onClick={() => handleDeleteComment(renderPost, e)} class="fa-solid fa-delete-left"></i>
                          </div>
                        </li>
                      ))}
                    </ul>
                    <div className='nav-comment'>
                      <div>
                        <div>
                          <section className="comment-icon">
                            <div className="comment-icon-active">
                              <span>
                                <button>
                                  <svg
                                    aria-label="Unlike"
                                    color="rgb(255, 48, 64)"
                                    fill="rgb(255, 48, 64)"
                                    height={24}
                                    role="img"
                                    viewBox="0 0 48 48"
                                    width={24}
                                  >
                                    <title>Unlike</title>
                                    <path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z" />
                                  </svg>
                                </button>
                              </span>
                              <span>
                                <button>
                                  <svg
                                    aria-label="Comment"
                                    color="rgb(0, 0, 0)"
                                    fill="rgb(0, 0, 0)"
                                    height={24}
                                    role="img"
                                    viewBox="0 0 24 24"
                                    width={24}
                                  >
                                    <title>Comment</title>
                                    <path
                                      d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                    />
                                  </svg>
                                </button>
                              </span>
                              <span>
                                <button>
                                  <svg
                                    aria-label="Share Post"
                                    color="rgb(0, 0, 0)"
                                    fill="rgb(0, 0, 0)"
                                    height={24}
                                    role="img"
                                    viewBox="0 0 24 24"
                                    width={24}
                                  >
                                    <title>Share Post</title>
                                    <line
                                      fill="none"
                                      stroke="currentColor"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      x1={22}
                                      x2="9.218"
                                      y1={3}
                                      y2="10.083"
                                    />
                                    <polygon
                                      fill="none"
                                      points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334"
                                      stroke="currentColor"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                    />
                                  </svg>
                                </button>
                              </span>
                            </div>
                            <span>
                              <button>
                                <svg
                                  aria-label="Save"
                                  color="rgb(0, 0, 0)"
                                  fill="rgb(0, 0, 0)"
                                  height={24}
                                  role="img"
                                  viewBox="0 0 24 24"
                                  width={24}
                                >
                                  <title>Save</title>
                                  <polygon
                                    fill="none"
                                    points="20 21 12 13.44 4 21 4 3 20 3 20 21"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                  />
                                </svg>
                              </button>
                            </span>
                          </section>
                          <div className='comment-like'><b>123</b><b>likes</b></div>
                          <div className='cmt-post'>
                            <svg aria-label="Emoji" class="x1lliihq x1n2onr6" color="rgb(0, 0, 0)" fill="rgb(0, 0, 0)" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Emoji</title><path d="M15.83 10.997a1.167 1.167 0 1 0 1.167 1.167 1.167 1.167 0 0 0-1.167-1.167Zm-6.5 1.167a1.167 1.167 0 1 0-1.166 1.167 1.167 1.167 0 0 0 1.166-1.167Zm5.163 3.24a3.406 3.406 0 0 1-4.982.007 1 1 0 1 0-1.557 1.256 5.397 5.397 0 0 0 8.09 0 1 1 0 0 0-1.55-1.263ZM12 .503a11.5 11.5 0 1 0 11.5 11.5A11.513 11.513 0 0 0 12 .503Zm0 21a9.5 9.5 0 1 1 9.5-9.5 9.51 9.51 0 0 1-9.5 9.5Z"></path></svg>
                            <input type="text" value={comment} onChange={handleChangeComment} />
                            <button onClick={() => handleCommentModal(renderPost)}>Post</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>

              </div>


            )

            }
            <div className="footer">
              <p>
                About-Help-Press-API-Jobs-Privacy-Terms-Locations-Language Meta
                Verified
              </p>
              <p>© 2023 INSTAGRAM FROM META</p>
            </div>
          </div>
        </div>
      </div>


      <div className='side-footer'>
        <div>
          <svg aria-label="Home" className="_ab6-" color="rgb(0, 0, 0)" fill="rgb(0, 0, 0)" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M22 23h-6.001a1 1 0 0 1-1-1v-5.455a2.997 2.997 0 1 0-5.993 0V22a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V11.543a1.002 1.002 0 0 1 .31-.724l10-9.543a1.001 1.001 0 0 1 1.38 0l10 9.543a1.002 1.002 0 0 1 .31.724V22a1 1 0 0 1-1 1Z"></path></svg>
        </div>
        <div>
          <svg aria-label="Explore" className="_ab6-" color="rgb(0, 0, 0)" fill="rgb(0, 0, 0)" height="24" role="img" viewBox="0 0 24 24" width="24"><polygon fill="none" points="13.941 13.953 7.581 16.424 10.06 10.056 16.42 7.585 13.941 13.953" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></polygon><polygon fillRule="evenodd" points="10.06 10.056 13.949 13.945 7.581 16.424 10.06 10.056"></polygon><circle cx="12.001" cy="12.005" fill="none" r="10.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></circle></svg>
        </div>
        <div>
          <svg aria-label="Reels" className="_ab6-" color="rgb(0, 0, 0)" fill="rgb(0, 0, 0)" height="24" role="img" viewBox="0 0 24 24" width="24"><line fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2" x1="2.049" x2="21.95" y1="7.002" y2="7.002"></line><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="13.504" x2="16.362" y1="2.001" y2="7.002"></line><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="7.207" x2="10.002" y1="2.11" y2="7.002"></line><path d="M2 12.001v3.449c0 2.849.698 4.006 1.606 4.945.94.908 2.098 1.607 4.946 1.607h6.896c2.848 0 4.006-.699 4.946-1.607.908-.939 1.606-2.096 1.606-4.945V8.552c0-2.848-.698-4.006-1.606-4.945C19.454 2.699 18.296 2 15.448 2H8.552c-2.848 0-4.006.699-4.946 1.607C2.698 4.546 2 5.704 2 8.552Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path><path d="M9.763 17.664a.908.908 0 0 1-.454-.787V11.63a.909.909 0 0 1 1.364-.788l4.545 2.624a.909.909 0 0 1 0 1.575l-4.545 2.624a.91.91 0 0 1-.91 0Z" fillRule="evenodd"></path></svg>
        </div>
        <div>
          <svg aria-label="New post" className="_ab6-" color="rgb(0, 0, 0)" fill="rgb(0, 0, 0)" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M2 12v3.45c0 2.849.698 4.005 1.606 4.944.94.909 2.098 1.608 4.946 1.608h6.896c2.848 0 4.006-.7 4.946-1.608C21.302 19.455 22 18.3 22 15.45V8.552c0-2.849-.698-4.006-1.606-4.945C19.454 2.7 18.296 2 15.448 2H8.552c-2.848 0-4.006.699-4.946 1.607C2.698 4.547 2 5.703 2 8.552Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="6.545" x2="17.455" y1="12.001" y2="12.001"></line><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="12.003" x2="12.003" y1="6.545" y2="17.455"></line></svg>
        </div>
        <div>
          <svg aria-label="Direct" className="_ab6-" color="rgb(0, 0, 0)" fill="rgb(0, 0, 0)" height="24" role="img" viewBox="0 0 24 24" width="24"><line fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2" x1="22" x2="9.218" y1="3" y2="10.083"></line><polygon fill="none" points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334" stroke="currentColor" strokeLinejoin="round" strokeWidth="2"></polygon></svg>
        </div>
        <div className='sidebar-footer-img'>
          <img src="https://firebasestorage.googleapis.com/v0/b/long1994-5a507.appspot.com/o/cano.jpg?alt=media&token=60ddcd26-0b61-4665-a21f-0eaf0a4a4003" alt="" />
        </div>
      </div>
    </div >
  )
}

export default Index