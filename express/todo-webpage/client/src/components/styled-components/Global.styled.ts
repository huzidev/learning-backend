import { createGlobalStyle } from "styled-components"

export const GlobalStyles = createGlobalStyle`
    .Dark {
        background-color: #292929;
        color: white;
        transition: all 700ms ease-in-out;
        h1, h2, h3, h4, h5, p {
            color: white;
        }
        .Border {
            border: 1px solid white
        }
    }
`