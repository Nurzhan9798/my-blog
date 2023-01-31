import React from 'react';
import Post from "../components/Post";

const Home = (props) => {
    return (
        <div className="home">
            <div className="home__container container">
                <Post/>
                <Post/>
                <Post/>
                <Post/>
                <Post/>
                <Post/>
            </div>

        </div>

    );
}

export default Home;