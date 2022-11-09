import styled from "styled-components";

interface Props {
    dark: boolean;
}

export const Wrapper = styled.div<Props>`
    height: 100vh;
    width: 100%;
    background-color: ${((props) => props.dark ? '#292929' : 'white')};
    transition: all 700ms ease-in-out;
`