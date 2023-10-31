import React, { useEffect, useState } from 'react'
import axios from 'axios'
function Explore() {

    const [posts, setPosts] = useState([])

    useEffect(async () => {
        await axios.get(`http://localhost:5000/post`)
            .then((res) => {
                // Lọc những bài viết có status là true
                const filteredPosts = res.data.filter((post) => post.status);
                setPosts(filteredPosts);
            })
            .catch((err) => console.log(err));
    }, [])

    return (
        <div>

            <div className="wrapper">
                <div className="list-explore">
                    <div className="explore-box">
                        <div className="row-box">

                            {posts.map((e, i) => (<div className="img-box">
                                <img
                                    className="img-row"
                                    src={e.img}
                                    alt=""
                                />
                            </div>))}



                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Explore