import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import 할아버지의나눔 from './Fonts/할아버지의나눔.ttf';
import 미생체 from './Fonts/미생체.ttf';
import 전소민체 from './Fonts/전소민체.ttf';
import 성실체 from './Fonts/나눔손글씨성실체.ttf';
import 딸에게엄마가 from './Fonts/나눔손글씨딸에게엄마가.ttf';
import NanumGothic from './Fonts/NanumGothic.ttf';
import DoHyeon from './Fonts/DoHyeon.ttf';

export default createGlobalStyle` 
    ${reset};
    @import url('https://fonts.googleapis.com/css?family=Open+Sans:400,600,700');
    @font-face {
        font-family: '할아버지의나눔';
        font-style: normal;
        font-weight: normal;
        src: url(${할아버지의나눔}) format('truetype');
    }
    @font-face {
        font-family: '미생체';
        font-style: normal;
        font-weight: normal;
        src: url(${미생체}) format('truetype');
    }
    @font-face {
        font-family: '전소민체';
        font-style: normal;
        font-weight: normal;
        src: url(${전소민체}) format('truetype');
    }
    @font-face {
        font-family: '성실체';
        font-style: normal;
        font-weight: normal;
        src: url(${성실체}) format('truetype');
    }
    @font-face {
        font-family: '딸에게엄마가';
        font-style: normal;
        font-weight: normal;
        src: url(${딸에게엄마가}) format('truetype');
    }
    @font-face {
        font-family: 'NanumGothic';
        font-style: normal;
        font-weight: normal;
        src: url(${NanumGothic}) format('truetype');
    }
    @font-face {
        font-family: 'DoHyeon';
        font-style: normal;
        font-weight: normal;
        src: url(${DoHyeon}) format('truetype');
    }
    * {
        box-sizing:border-box;
    }
    body {
        background-color:${(props) => props.theme.bgColor};
        color:${(props) => props.theme.blackColor};
        font-size:14px;
        font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        padding-top: 0px;
    }
    a {
        color:${(props) => props.theme.blueColor};
        text-decoration:none;
    }
    input:focus{
        outline:none;
    }
`;
