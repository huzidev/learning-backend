import { createGlobalStyle } from "styled-components"

interface Props {
    darkModeBG: string
    darkModeC: string
    transition: string
    LModeBG: string
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
    .css-6hp17o-MuiList-root-MuiMenu-list {
        background-color: ${(p: any) => p.darkModeBG};
        color: ${(p: any) => p.darkModeC};
    }
    .Border {
        border: 2px solid #efefef;
        box-shadow: 1px 1px 2px rgb(0 0 0 / 5%);
    }
    .ant-btn-primary span {
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
    .ant-input-affix-wrapper.ant-input-password.Dark.ant-input-affix-wrapper-status-error.ant-input-affix-wrapper-has-feedback {
        background: none;
    }
    .margin-input {
        margin: 15px 0px;
    }
    .marginTop {
        margin-top: 10px;
    }
    .fontWeight {
        font-weight: 500;
    }
    .ant-notification-notice {
        background-color: ${(p: any) => p.darkModeBG};
        box-shadow: 0 0px 6px 0 ${(p: any) => p.darkModeC}, 0 0px 2px -4px ${(p: any) => p.darkModeC}, 0 2px 11px -3px ${(p: any) => p.darkModeC};
        div, span {
            color: ${(p: any) => p.darkModeC};
        }
    }
    @media only screen and (max-width: 1600px) {
      .Dark {
      }
    }
`