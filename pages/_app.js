import appConfig from '../config.json'
import React from 'react'

function GlobalStyle() {
    return (
        <style global jsx>{`
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
                list-style: none;
            }
            body {
                font-family: 'Open Sans', sans-serif;
            }
            /* App fit Height */
            html,
            body,
            #__next {
                min-height: 100vh;
                display: flex;
                flex: 1;
            }
            #__next {
                flex: 1;
            }
            #__next > * {
                flex: 1;
            }
            /* ./App fit Height */

            /* Scrollbar chat */
            .ulChat::-webkit-scrollbar,
            .ulSticker::-webkit-scrollbar {
                width: 5px;
            }

            .ulChat::-webkit-scrollbar-thumb,
            .ulSticker::-webkit-scrollbar-thumb {
                background-color: ${appConfig.theme.colors.primary['200']};
                border-radius: 30px;
            }

            /* Div abaixo do textfield do chat*/
            .jsx-601528156 {
                width: 0;
                height: 0;
            }
        `}</style>
    )
}

// Roda em todas as páginas
export default function MyApp({ Component, pageProps }) {
    return (
        <>
            <GlobalStyle />
            <Component {...pageProps} />
        </>
    )
}
