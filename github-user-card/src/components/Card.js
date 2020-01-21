import React from "react";
import styled from "styled-components";

const Card = styled.div`
    width: 300px;
    box-sizing: border-box;
    border-radius: 8px;
    box-shadow: 0px 0px 5px 0px #a4a4a4;
    display: flex;
    flex-direction: column;
`;

const ImgWrapper = styled.div`
    width: 100%;
    height: auto;
    max-height: 300px;
`;

const TextContainer = styled.div`
    width: 100%;
    padding: 0 10px;
`;

const Name = styled.h2`
    text-align: center;
`;

const Info = styled.div`
    display: grid;
    grid-template-columns: 100px 1fr;
    grid-gap: 10px;
`;

const UserCard = ({ user }) => {
    return (
        <Card>
            <ImgWrapper>
                <img
                    width="300"
                    src={user["avatar_url"]}
                    alt={`Avatar for ${user.name}`}
                />
            </ImgWrapper>
            <TextContainer>
                <Name>{user.name}</Name>
                <Info>
                    <p>Blog:</p>
                    <p>{user.blog}</p>
                    <p>Repos:</p>
                    <p>{user["public_repos"]}</p>
                    <p>Followers:</p>
                    <p>{user.followers}</p>
                    <p>Following:</p>
                    <p>{user.following}</p>
                </Info>
            </TextContainer>
        </Card>
    );
};

export default UserCard;
