import { createGlobalStyle } from "styled-components"

interface Props {
    dark : boolean
    darkModeBG: any
    darkModeC: any
}

export const GlobalStyles = createGlobalStyle<Props>`

    .Dark {
        background-color: ${(p: any) => p.darkModeBG};
        color: ${(p: any) => p.darkModeC};
        transition: all 700ms ease-in-out;
        h1, h2, h3, h4, h5, p, span, label {
            color: ${(p: any) => p.darkModeC};
            transition: all 700ms ease-in-out;
        }
        input, textarea {
            background-color: ${(p: any) => p.darkModeBG};
            color: ${(p: any) => p.darkModeC};
            transition: all 700ms ease-in-out;
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