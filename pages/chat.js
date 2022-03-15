import { Box, Text, TextField, Image, Button } from '@skynexui/components'
import React from 'react'
import appConfig from '../config.json'
import moment from 'moment'
import { createClient } from '@supabase/supabase-js'

const SUPABASE_ANON_KEY =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImltanlmZ2pmemtrd2hla3dremN2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDczMDIyNzAsImV4cCI6MTk2Mjg3ODI3MH0.JEtJ2gLxUj0cZCe5a1k4FjOi7PZPZ5yAIGJ01LaRxv0'
const SUPABASE_URL = 'https://imjyfgjfzkkwhekwkzcv.supabase.co'
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

export default function ChatPage() {
    /*
    -> Usuário
    - Digita no campo textarea
    - Aperta o enter para enviar
    - Tem que adicionar o texto a listagem

    -> Dev
    - [X] Campo criado
    - [X] Vamos usar o onChange, o useState (ter if para caso seja enter para limpar a variável)
    - [X] Lista de mensagem
    */
    const [mensagem, setMensagem] = React.useState('')
    const [listaMensagens, setListaMensagens] = React.useState([])

    React.useEffect(() => {
        supabaseClient
            .from('mensagens')
            .select('*')
            .order('id', { ascending: false })
            .then(({ data }) => {
                setListaMensagens(data)
            })
    }, [])

    function handleNovaMensagem(novaMensagem) {
        const message = {
            //id: listaMensagens.length + 1,
            from: 'AjnaMoreira',
            msg: novaMensagem
        }

        supabaseClient
            .from('mensagens')
            .insert([
                // Tem que ser um objeto com os MESMOS CAMPOS que você escreveu no supabase
                message
            ])
            .then(({ data }) => {
                // console.log('Criando mensagem: ', data)
                setListaMensagens([data[0], ...listaMensagens])
            })

        setMensagem('')
    }

    return (
        <Box
            styleSheet={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: appConfig.theme.colors.primary[500],
                backgroundImage: `url(https://www.gamespot.com/a/uploads/original/1581/15811374/3692632-last%20of%20us%202%20catalina.jpg)`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundBlendMode: 'multiply',
                color: appConfig.theme.colors.neutrals['000']
            }}
        >
            <Box
                styleSheet={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                    borderRadius: '5px',
                    backgroundColor: appConfig.theme.colors.neutrals[700],
                    height: '100%',
                    maxWidth: '95%',
                    maxHeight: '95vh',
                    padding: '32px',
                    opacity: 0.8
                }}
            >
                <Header />
                <Box
                    styleSheet={{
                        position: 'relative',
                        display: 'flex',
                        flex: 1,
                        height: '80%',
                        backgroundColor: appConfig.theme.colors.neutrals[600],
                        flexDirection: 'column',
                        borderRadius: '5px',
                        padding: '16px'
                    }}
                >
                    <Text
                        styleSheet={{
                            fontSize: '10px',
                            marginLeft: '8px',
                            color: appConfig.theme.colors.neutrals['300']
                        }}
                        tag="span"
                    >
                        {mensagem.date}
                    </Text>
                    <MessageList mensagens={listaMensagens} />
                    {/* {listaMensagens.map(mensagemAtual => {
                        return (
                            <li key={mensagemAtual.id}>
                                {mensagemAtual.from}: {mensagemAtual.msg}
                            </li>
                        )
                    })} */}
                    <Box
                        as="form"
                        styleSheet={{
                            display: 'flex',
                            alignItems: 'center'
                        }}
                    >
                        <TextField
                            value={mensagem}
                            onChange={event => {
                                const valor = event.target.value
                                setMensagem(valor)
                            }}
                            onKeyPress={event => {
                                if (event.key === 'Enter') {
                                    event.preventDefault()
                                    handleNovaMensagem(mensagem)
                                }
                            }}
                            placeholder="Insira sua mensagem aqui..."
                            type="textarea"
                            styleSheet={{
                                width: '100%',
                                border: '0',
                                resize: 'none',
                                borderRadius: '5px',
                                padding: '6px 8px',
                                backgroundColor:
                                    appConfig.theme.colors.neutrals[800],
                                marginRight: '12px',
                                color: appConfig.theme.colors.neutrals[200]
                            }}
                        />

                        <Button
                            disabled={!mensagem}
                            onClick={() => {
                                if (mensagem.trim() !== '')
                                    handleNovaMensagem(mensagem)
                                else setMensagem('')
                            }}
                            iconName="paperPlane"
                            rounded="none"
                            buttonColors={{
                                contrastColor: `${appConfig.theme.colors.primary[500]}`,
                                mainColor: `${appConfig.theme.colors.neutrals[800]}`,
                                mainColorLight: `${appConfig.theme.colors.neutrals[600]}`,
                                mainColorStrong: `${appConfig.theme.colors.neutrals[900]}`
                            }}
                            styleSheet={{
                                borderRadius: '50%',
                                padding: '0 3px 0 0',
                                minWidth: '50px',
                                minHeight: '50px',
                                fontSize: '20px',
                                margin: '0 8px',
                                lineHeight: '0',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

function Header() {
    return (
        <>
            <Box
                styleSheet={{
                    width: '100%',
                    marginBottom: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}
            >
                <Text variant="heading5">Chat</Text>
                <Button
                    variant="tertiary"
                    colorVariant="neutral"
                    label="Logout"
                    href="/"
                />
            </Box>
        </>
    )
}

function MessageList(props) {
    return (
        <Box
            className="ulChat"
            tag="ul"
            styleSheet={{
                overflowY: 'scroll',
                display: 'flex',
                flexDirection: 'column-reverse',
                flex: 1,
                color: appConfig.theme.colors.neutrals['000'],
                marginBottom: '16px'
            }}
        >
            {props.mensagens.map(mensagem => {
                return (
                    <Text
                        key={mensagem.id}
                        tag="li"
                        styleSheet={{
                            borderRadius: '5px',
                            padding: '6px',
                            marginBottom: '12px',
                            hover: {
                                backgroundColor:
                                    appConfig.theme.colors.neutrals['700']
                            }
                        }}
                    >
                        <Box
                            styleSheet={{
                                marginBottom: '8px',
                                display: 'flex',
                                alignItems: 'flex-end'
                            }}
                        >
                            <Image
                                styleSheet={{
                                    width: '20px',
                                    height: '20px',
                                    borderRadius: '50%',
                                    display: 'inline-block',
                                    marginRight: '8px'
                                }}
                                src={`https://github.com/${mensagem.from}.png`}
                            />

                            <Text
                                tag="strong"
                                styleSheet={{
                                    color: appConfig.theme.colors.primary['300']
                                }}
                            >
                                {mensagem.from}
                            </Text>
                            <Text
                                styleSheet={{
                                    fontSize: '10px',
                                    marginLeft: '8px',
                                    color: appConfig.theme.colors.neutrals[
                                        '300'
                                    ]
                                }}
                                tag="span"
                            >
                                {/* {mensagem.create_at} */}
                            </Text>
                        </Box>
                        {mensagem.msg}
                    </Text>
                )
            })}
        </Box>
    )
}
