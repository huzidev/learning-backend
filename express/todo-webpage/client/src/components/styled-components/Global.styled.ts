import { createGlobalStyle } from "styled-components"

interface Props {
    darkModeBG: String
    darkModeC: String
    transition: String
    LModeBG: String
}

export const GlobalStyles = createGlobalStyle<Props>`
    .Dark, .ant-modal-body, .ant-modal-header, .ant-modal-footer {
        background-color: ${(p: any) => p.darkModeBG};
        color: ${(p: any) => p.darkModeC};
        transition: ${(p: any) => p.transition};
        h1, h2, h3, h4, h5, p, span, label, div {
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
    .ant-btn-primary span{
        color: white;
    }
    .ant-btn-default span {
        color: black;
    }
    .ant-modal-close-x {
        color: ${(p: any) => p.darkModeC};
    }
    .styleMargin {
        margin-top: 15px;
    }
    .ant-input-password-icon.anticon {
        color: ${(p: any) => p.darkModeC};
        &:hover {
            color: ${(p: any) => p.darkModeC};
        }
    }
`