import { Box, Button, Text, TextField, Image } from '@skynexui/components'
import React from 'react'
import { useRouter } from 'next/router'
import appConfig from '../config.json'

function Title(props) {
    const Tag = props.tag || 'h1'
    return (
        <>
            <Tag>{props.children}</Tag>
            <style jsx>
                {`
                    ${Tag} {
                        color: ${appConfig.theme.colors.neutrals['000']};
                        font-size: 24px;
                        font-weight: 600;
                    }
                `}
            </style>
        </>
    )
}

export default function HomePage() {
    // const username = "AjnaMoreira"
    const [username, setUsername] = React.useState('')
    const roteamento = useRouter()

    return (
        <>
            <Box
                styleSheet={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: appConfig.theme.colors.primary[500],
                    backgroundImage:
                        'url(https://www.gamespot.com/a/uploads/original/1581/15811374/3692632-last%20of%20us%202%20catalina.jpg)',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundBlendMode: 'multiply'
                }}
            >
                <Box
                    styleSheet={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexDirection: {
                            xs: 'column',
                            sm: 'row'
                        },
                        width: '100%',
                        maxWidth: '650px',
                        borderRadius: '5px',
                        padding: '32px',
                        margin: '16px',
                        boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                        backgroundColor: appConfig.theme.colors.neutrals[700],
                        opacity: 0.8
                    }}
                >
                    {/* Formulário */}
                    <Box
                        as="form"
                        onSubmit={function (event) {
                            event.preventDefault()
                            // sistema de roteamento do next é o recurso mais adequado para mudar de página:
                            roteamento.push(`/chat?username=${username}`)
                            // modo tradicional do navegador para mudar de página, porém precisa fazer um reload:
                            // window.location.href = '/chat'
                        }}
                        styleSheet={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: { xs: '100%', sm: '50%' },
                            textAlign: 'center',
                            marginBottom: '32px'
                        }}
                    >
                        <Title tag="h2">Boas vindas de volta!</Title>
                        <Text
                            variant="body3"
                            styleSheet={{
                                marginBottom: '32px',
                                color: appConfig.theme.colors.neutrals[300]
                            }}
                        >
                            {appConfig.name}
                        </Text>

                        <TextField
                            value={username}
                            onChange={event => {
                                // Onde tá o valor?
                                const valor = event.target.value
                                // Trocar o valor da variável
                                // através do React e avise a quem precisa
                                setUsername(valor)
                            }}
                            fullWidth
                            textFieldColors={{
                                neutral: {
                                    textColor:
                                        appConfig.theme.colors.neutrals[200],
                                    mainColor:
                                        appConfig.theme.colors.neutrals[900],
                                    mainColorHighlight:
                                        appConfig.theme.colors.primary[500],
                                    backgroundColor:
                                        appConfig.theme.colors.neutrals[800]
                                }
                            }}
                        />

                        <Button
                            type="submit"
                            label="Entrar"
                            disabled={!username}
                            fullWidth
                            buttonColors={{
                                contrastColor:
                                    appConfig.theme.colors.neutrals['000'],
                                mainColor: appConfig.theme.colors.primary[500],
                                mainColorLight:
                                    appConfig.theme.colors.primary[400],
                                mainColorStrong:
                                    appConfig.theme.colors.primary[600]
                            }}
                        />
                    </Box>
                    {/* Formulário */}

                    {/* Photo Area */}
                    <Box
                        styleSheet={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            maxWidth: '200px',
                            padding: '16px',
                            backgroundColor:
                                appConfig.theme.colors.neutrals[800],
                            border: '1px solid',
                            borderColor: appConfig.theme.colors.neutrals[999],
                            borderRadius: '10px',
                            flex: 1,
                            minHeight: '240px'
                        }}
                    >
                        <Image
                            styleSheet={{
                                borderRadius: '50%',
                                marginBottom: '16px'
                            }}
                            src={
                                username
                                    ? `https://github.com/${username}.png`
                                    : `https://cdn.shopify.com/s/files/1/0396/9643/3315/products/navy_1024x.jpg?v=1592507389`
                            }
                        />
                        <Text
                            variant="body4"
                            styleSheet={{
                                color: appConfig.theme.colors.neutrals[200],
                                backgroundColor:
                                    appConfig.theme.colors.neutrals[900],
                                padding: '3px 10px',
                                borderRadius: '1000px'
                            }}
                        >
                            {username || 'usuário'}
                        </Text>
                    </Box>
                    {/* Photo Area */}
                </Box>
            </Box>
        </>
    )
}
