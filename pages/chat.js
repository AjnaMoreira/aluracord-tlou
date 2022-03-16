import { Box, Text, TextField, Image, Button } from '@skynexui/components'
import React from 'react'
import appConfig from '../config.json'

import { useRouter } from 'next/router'
import { createClient } from '@supabase/supabase-js'
import { ButtonSendSticker } from '../src/components/ButtonSendSticker'

const SUPABASE_ANON_KEY =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImltanlmZ2pmemtrd2hla3dremN2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDczMDIyNzAsImV4cCI6MTk2Mjg3ODI3MH0.JEtJ2gLxUj0cZCe5a1k4FjOi7PZPZ5yAIGJ01LaRxv0'
const SUPABASE_URL = 'https://imjyfgjfzkkwhekwkzcv.supabase.co'
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

function escutaMensagensTempoReal(adicionaMensagem) {
    return supabaseClient
        .from('mensagens')
        .on('INSERT', respostaLive => {
            adicionaMensagem(respostaLive.new)
        })
        .subscribe()
}
export default function ChatPage() {
    const roteamento = useRouter()
    const usuarioLogado = roteamento.query.username

    const [mensagem, setMensagem] = React.useState('')
    const [listaMensagens, setListaMensagens] = React.useState([
        /* {
            id: 1,
            from: 'AjnaMoreira',
            msg: ':sticker: https://www.alura.com.br/imersao-react-4/assets/figurinhas/Figurinha_1.png'
        },
        {
            id: 2,
            from: 'filgmac',
            msg: 'Oi'
        }*/
    ])

    React.useEffect(() => {
        supabaseClient
            .from('mensagens')
            .select('*')
            .order('id', { ascending: false })
            .then(({ data }) => {
                setListaMensagens(data)
            })

        escutaMensagensTempoReal(novaMensagem => {
            console.log('Nova mensagem: ', novaMensagem)
            /* 
            - o trecho abaixo gera um looping infinito.
             handleNovaMensagem(novaMensagem)
            - quando essa parte abaixo estava no then de handleNovaMensagem 
            */

            // setListaMensagens([novaMensagem, ...valorAtualLista])

            /*
           - sempre passava um valor para o set, agora estamos passando uma função
           - se passar somente o valor, ela vai pegar a primeira foto que o react tirou, e vai passar a lista vazia
            */

            // Quando quero passar um valor de referencia (objeto/array): devo passar uma função para o setState

            setListaMensagens(valorAtualLista => {
                return [novaMensagem, ...valorAtualLista]
            })
        })
    }, [])

    function handleNovaMensagem(novaMensagem) {
        const message = {
            //id: listaMensagens.length + 1,
            from: usuarioLogado,
            msg: novaMensagem
        }

        supabaseClient
            .from('mensagens')
            .insert([
                // Tem que ser um objeto com os MESMOS CAMPOS que você escreveu no supabase
                message
            ])
            .then(({ data }) => {
                console.log('Criando mensagem: ', data)
                //setListaMensagens([data[0], ...listaMensagens])
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
                            alignItems: 'center',
                            justifyContent: 'spaceBetween'
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
                                marginBottom: '8px',
                                lineHeight: '0',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor:
                                    appConfig.theme.colors.neutrals[300],
                                marginRight: '12px'
                            }}
                        />
                        {/* CALLBACK -  chamada de retorno: quando alguma coisa que você queria terminou, ele vai executar a função que você passou */}
                        <ButtonSendSticker
                            onStickerClick={sticker => {
                                /* console.log(
                                    '[USANDO O COMPONENTE] salva esse sticker no banco',
                                    sticker
                                )*/
                                handleNovaMensagem(':sticker:' + sticker)
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
                                {/* {new Date().toLocaleDateString()} */}
                                {/* {mensagem.create_at} */}
                            </Text>
                        </Box>
                        {/* Condicional:
                        {mensagem.msg.startsWith(':sticker:').toString()} */}
                        {mensagem.msg.startsWith(':sticker:') ? (
                            <Image
                                src={mensagem.msg.replace(':sticker:', '')}
                                styleSheet={{
                                    width: '100px'
                                }}
                            />
                        ) : (
                            mensagem.msg
                        )}
                        {/* {mensagem.msg} */}
                    </Text>
                )
            })}
        </Box>
    )
}
