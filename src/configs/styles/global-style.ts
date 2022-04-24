import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;300;400;500;700;900&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&display=swap');
    * {
        font-family: Inter, -apple-system, BlinkMacSystemFont, 'Noto Sans KR', sans-serif;
        margin: 0;
        padding: 0;
        color: inherit;
        box-sizing: border-box;
    }
    body {
        background-color: #fffefc;
        height: 100%;
        overscroll-behavior-y: none
    }
    div#root{
        height: 100%;
    }
    :root {-webkit-tap-highlight-color:transparent;-webkit-text-size-adjust:100%;text-size-adjust:100%;cursor:default;line-height:1.5;overflow-wrap:break-word;-moz-tab-size:4;tab-size:4}
    html, body {height:100%;}
    img, picture, video, canvas, svg {display: block;max-width:100%;}
    button {background:none;border:0;cursor:pointer;}
    a {text-decoration:none}
    table {border-collapse:collapse;border-spacing:0}
    .tooltip {
        font-size: 11px !important;
        padding: 8px !important;
    }
`;
