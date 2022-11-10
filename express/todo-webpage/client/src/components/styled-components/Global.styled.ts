import { createGlobalStyle } from "styled-components"

export const GlobalStyles = createGlobalStyle`
    .Dark {
        background-color: #292929;
        color: white;
        transition: all 700ms ease-in-out;
        h1, h2, h3, h4, h5, p, span, label {
            color: white;
            transition: all 700ms ease-in-out;
        }
        input, textarea, .antd-modal-content, .ant-modal-body {
            transition: all 700ms ease-in-out;
            background-color: #292929;
            color: white;
        }
    }
`