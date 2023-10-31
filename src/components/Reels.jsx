import React,{useEffect,useState} from 'react'
import axios from 'axios'

function Reels() {
const [post,setPost] = useState([])





    return (
        <div>
            <div className='wrapper'>
                <div className="reels-main">
                    <div className="video-box">
                            <video className='video-element' src="https://firebasestorage.googleapis.com/v0/b/long1994-5a507.appspot.com/o/black_-_13495%20(360p).mp4?alt=media&token=8cd2b593-aebf-49a3-8695-aa14572f374d" controls muted />
                        <div className='sound-box'>
                            <svg
                                aria-label="Audio is muted"
                                className="x1lliihq x1n2onr6"
                                color="rgb(255, 255, 255)"
                                fill="rgb(255, 255, 255)"
                                height={12}
                                role="img"
                                viewBox="0 0 48 48"
                                width={12}
                            >
                                <title>Audio is muted</title>
                                <path
                                    clipRule="evenodd"
                                    d="M1.5 13.3c-.8 0-1.5.7-1.5 1.5v18.4c0 .8.7 1.5 1.5 1.5h8.7l12.9 12.9c.9.9 2.5.3 2.5-1v-9.8c0-.4-.2-.8-.4-1.1l-22-22c-.3-.3-.7-.4-1.1-.4h-.6zm46.8 31.4-5.5-5.5C44.9 36.6 48 31.4 48 24c0-11.4-7.2-17.4-7.2-17.4-.6-.6-1.6-.6-2.2 0L37.2 8c-.6.6-.6 1.6 0 2.2 0 0 5.7 5 5.7 13.8 0 5.4-2.1 9.3-3.8 11.6L35.5 32c1.1-1.7 2.3-4.4 2.3-8 0-6.8-4.1-10.3-4.1-10.3-.6-.6-1.6-.6-2.2 0l-1.4 1.4c-.6.6-.6 1.6 0 2.2 0 0 2.6 2 2.6 6.7 0 1.8-.4 3.2-.9 4.3L25.5 22V1.4c0-1.3-1.6-1.9-2.5-1L13.5 10 3.3-.3c-.6-.6-1.5-.6-2.1 0L-.2 1.1c-.6.6-.6 1.5 0 2.1L4 7.6l26.8 26.8 13.9 13.9c.6.6 1.5.6 2.1 0l1.4-1.4c.7-.6.7-1.6.1-2.2z"
                                    fillRule="evenodd"
                                />
                            </svg>
                        </div>
                        <div className='fl-video user-video'>
                            <div className="user-post ">
                                <img
                                    className="img-user-post"
                                    src="https://firebasestorage.googleapis.com/v0/b/long1994-5a507.appspot.com/o/tomiokaa.jpg?alt=media&token=4d0594a0-ba6b-42db-89fe-b99678f40e35"
                                    alt=""
                                />
                            </div>
                            <strong>Lalana</strong>
                            <span>.</span>
                            <button>Follow</button>
                        </div>
                        <div className='fl-video content-video' >
                            <p className="status-video">098765432134</p>
                            <p>...more</p>
                        </div>
                        <div className='fl-video video-muzik' >
                            <svg
                                aria-label="Audio image"
                                className="x1lliihq x1n2onr6"
                                color="rgb(255, 255, 255)"
                                fill="rgb(255, 255, 255)"
                                height={12}
                                role="img"
                                viewBox="0 0 24 24"
                                width={12}
                            >
                                <title>Audio image</title>
                                <path d="M21.002 16.972V2.044a.999.999 0 0 0-.36-.769 1.012 1.012 0 0 0-.823-.214L6.816 3.479A1 1 0 0 0 6 4.462v10.864A3.75 3.75 0 1 0 9 19V9.56l9.003-1.675v5.442A3.75 3.75 0 1 0 21.005 17c0-.01-.003-.02-.003-.029Z" />
                            </svg>
                            <strong>muzik...</strong>
                            <span>.</span>
                            <strong>singer</strong>
                        </div>
                    </div>
                    <div className="operation-box">
                        <div className='fl-oper'>
                        <svg aria-label="Like" class="x1lliihq x1n2onr6" color="rgb(38, 38, 38)" fill="rgb(38, 38, 38)" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Like</title><path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"></path></svg>
                            <span>3000</span>
                        </div>
                        <div   className='fl-oper'>
                            <svg
                                aria-label="Comment"
                                className="x1lliihq x1n2onr6"
                                color="rgb(38, 38, 38)"
                                fill="rgb(38, 38, 38)"
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
                            <span>50</span>
                        </div>
                        <div>
                            <svg
                                aria-label="Direct"
                                className="x1lliihq x1n2onr6"
                                color="rgb(38, 38, 38)"
                                fill="rgb(38, 38, 38)"
                                height={24}
                                role="img"
                                viewBox="0 0 24 24"
                                width={24}
                            >
                                <title>Direct</title>
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
                        </div>
                        <div>
                            <svg
                                aria-label="Save"
                                className="x1lliihq x1n2onr6"
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
                        </div>
                        <div>
                            <svg
                                aria-label="More"
                                className="x1lliihq x1n2onr6"
                                color="rgb(38, 38, 38)"
                                fill="rgb(38, 38, 38)"
                                height={24}
                                role="img"
                                viewBox="0 0 24 24"
                                width={24}
                            >
                                <title>More</title>
                                <circle cx={12} cy={12} r="1.5" />
                                <circle cx={6} cy={12} r="1.5" />
                                <circle cx={18} cy={12} r="1.5" />
                            </svg>
                        </div>
                        <div className='img-muzik-box'>
                            <img className='img-muzik' src="https://i.pinimg.com/736x/90/39/04/903904f3f295098a20d0ec961d17eb09.jpg" alt="" />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Reels