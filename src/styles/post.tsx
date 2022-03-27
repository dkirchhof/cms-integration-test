import styled from "styled-components";

export const Header = styled.header`
    position: relative;
    height: 300px;

    > img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    > div {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;

        color: white;
        background: linear-gradient(0deg, #242424, transparent);

        text-align: center;
    }
`;

export const Footer = styled.footer`
    > ul {
        display: flex;
        list-style: none;
        justify-content: center;
        gap: 16px;

        > li {
            padding: 8px 32px;
            border: 1px solid;
            border-radius: 20px;
        }
    }

    > div {
        text-align: center;
    }

    margin-bottom: 32px;
`;
