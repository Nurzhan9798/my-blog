import React from 'react';

const Post = (props) => {
    return (
        <div className="post">
            <img
                src="https://global-uploads.webflow.com/5ef5480befd392489dacf544/5f9f5e5943de7e69a1339242_5f44a7398c0cdf460857e744_img-image.jpeg"
                alt="" className="post__img"/>
            <div className="post__body">
                <h2 className="post__title"><a href="#">Post Title</a></h2>
                <div className="post__info">
                    <p className="post__author">post author</p>
                    <p className="post__date">post date</p>
                </div>
                <p className="post__summary">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto
                    aspernatur consequuntur esse est laudantium maxime, minima modi nam nobis non optio quia quisquam,
                    repellendus sunt tempora veniam vero voluptates. Facere.</p>
            </div>
        </div>
    )
}

export default Post;