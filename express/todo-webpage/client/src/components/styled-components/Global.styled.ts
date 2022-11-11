import { createGlobalStyle } from "styled-components"

interface Props {
    dark : boolean
}

export const GlobalStyles = createGlobalStyle<Props>`

    .Dark {
        background-color: ${(p: any) => p.dark ? '#292929' : 'rgb(240 242 245 / 1)'};
        color: white;
        transition: all 700ms ease-in-out;
        h1, h2, h3, h4, h5, p, span, label {
            color: white;
            transition: all 700ms ease-in-out;
        }
        input, textarea {
            transition: all 700ms ease-in-out;
            background-color: #292929;
            color: white;
        }
    }
    /* .ant-modal-body, .ant-modal-header, .ant-modal-footer {
        background-color: #292929;
        color: white;
        transition: all 700ms ease-in-out;
        h1, h2, h3, h4, h5, div {
            color: white;
            transition: all 700ms ease-in-out;
        }
        input, textarea {
            transition: all 700ms ease-in-out;
            background-color: #292929;
            color: white;
        }
    } */
`