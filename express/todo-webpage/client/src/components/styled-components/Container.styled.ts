import styled from "styled-components";

interface Props {
    dark: boolean;
}

export const Wrapper = styled.div<Props>`
    height: 100vh;
    width: 100%;
    background-color: ${((p) => p.dark ? '#292929' : '')};
    transition: all 700ms ease-in-out;
`