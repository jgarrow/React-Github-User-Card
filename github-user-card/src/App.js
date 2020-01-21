import React, { Component } from "react";
import styled from "styled-components";
import "./App.css";

import UserCard from "./components/Card";

const CardsContainer = styled.div`
    width: 80%;
    max-width: 1040px;
    margin: 2rem auto;
    display: flex;
    justify-content: space-evenly;
`;

class App extends Component {
    constructor() {
        super();
        this.state = {
            user: {},
            followers: [],
            followersInfo: []
        };
    }

    // did it all in componentDidMount because I want all the info rendered to screen at the same time without waiting for any updates and then rerendering
    componentDidMount() {
        // get my github info
        fetch("https://api.github.com/users/jgarrow")
            .then(res => res.json())
            .then(res => {
                this.setState({ ...this.state, user: res });
            })
            .then(res => {
                const user = { ...this.state.user };
                const followersUrl = user["followers_url"];

                // then get my followers urls
                fetch(followersUrl)
                    .then(res => res.json())
                    .then(res => {
                        console.log("followers: ", res);
                        this.setState({ ...this.state, followers: res });

                        // then get my followers' github info
                        this.state.followers.forEach((user, index) => {
                            fetch(`https://api.github.com/users/${user.login}`)
                                .then(res => res.json())
                                .then(res => {
                                    let myFollowers = [
                                        ...this.state.followersInfo
                                    ];

                                    myFollowers[index] = res;

                                    this.setState({
                                        ...this.setState,
                                        followersInfo: myFollowers
                                    });
                                })
                                .catch(err =>
                                    console.log(
                                        "Error fetching follower data",
                                        err
                                    )
                                );
                        });
                    })
                    .catch(err =>
                        console.log(
                            "There was an error fetching followers",
                            err
                        )
                    );
            })
            .catch(err =>
                console.log("There was an error fetching the data", err)
            );
    }

    render() {
        return (
            <CardsContainer>
                {this.state.user !== {} && <UserCard user={this.state.user} />}
                {this.state.followersInfo !== [] &&
                    this.state.followersInfo.map((user, index) => (
                        <UserCard key={index} user={user} />
                    ))}
            </CardsContainer>
        );
    }
}

export default App;
