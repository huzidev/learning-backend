import { createGlobalStyle } from "styled-components"

interface Props {
    dark : boolean
    darkModeBG: any
    darkModeC: any
    transition: any
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
            background-color: ${(p: any) => p.darkModeBG};
            color: ${(p: any) => p.darkModeC};
            transition: ${(p: any) => p.transition};
        }
    }
    ${(p: any) => p.dark ? (`
        .ant-modal-body, .ant-modal-header, .ant-modal-footer {
            background-color: ${p.darkModeBG};
            color: ${p.darkModeC};
            transition: ${p.transition};
            h1, h2, h3, h4, h5, div {
                color: ${p.darkModeC};
                transition: ${p.transition};
            }
            input, textarea {
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