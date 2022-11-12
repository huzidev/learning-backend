import { createGlobalStyle } from "styled-components"

interface Props {
    dark : boolean
    darkModeBG: any
    darkModeC: any
    transition: any
    LModeBG: any
}

export const GlobalStyles = createGlobalStyle<Props>`
    .Dark {
        background-color: ${(p: any) => p.darkModeBG};
        color: ${(p: any) => p.darkModeC};
        transition: ${(p: any) => p.transition};
        h1, h2, h3, h4, h5, p, span, label {
            color: ${(p: any) => p.darkModeC};
            transition: ${(p: any) => p.transition};
        }
        input, textarea {
            background-color: ${(p: any) => p.LModeBG};
            color: ${(p: any) => p.darkModeC};
            transition: ${(p: any) => p.transition};
        }
    }
    .Border {
        background-color: ${(p: any) => p.LModeBG};
    }
    ${(p: any) => p.dark ? (`
        .ant-modal-body, .ant-modal-header, .ant-modal-footer {
            background-color: ${p.darkModeBG};
            color: ${p.darkModeC};
            transition: ${p.transition};
            h1, h2, h3, h4, h5, div, span {
                color: ${p.darkModeC};
                transition: ${p.transition};
            }
            .ant-btn-default span {
                color: black;
            }
            input {
                background-color: ${p.darkModeBG};
                color: ${p.darkModeC};
                transition: ${p.transition};
            }
        }
        .anticon {
            color: ${p.darkModeC};
        }
    `) : ''}
`