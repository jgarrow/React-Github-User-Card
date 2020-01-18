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
            followers: []
        };
    }

    componentDidMount() {
        fetch("https://api.github.com/users/jgarrow")
            .then(res => res.json())
            .then(res => {
                this.setState({ ...this.state, user: res });
            })
            .then(res => {
                const user = { ...this.state.user };
                const followersUrl = user["followers_url"];

                fetch(followersUrl)
                    .then(res => res.json())
                    .then(res => {
                        console.log("followers: ", res);
                        this.setState({ ...this.state, followers: res });
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
                {this.state.followers !== [] &&
                    this.state.followers.map((user, index) => (
                        <UserCard key={index} user={user} />
                    ))}
            </CardsContainer>
        );
    }
}

export default App;
