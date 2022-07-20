import styled from "styled-components";

export const Button = styled.button`
    background: linear-gradient(45deg, aqua 10%, purple 90%);
    border-radius: 3px;
    border: 0px;
    color: white;
    height: 35px;
    margin-top: 10px;
    padding: 0px 30px;
    box-shadow: 0px 3px 5px 2px rgba(255, 105, 135, .3);
    &:hover {
        background: linear-gradient(95deg, aqua 10%, purple 90%);
    }
`