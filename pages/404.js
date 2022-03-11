import { Box, Text } from '@skynexui/components'
import appConfig from '../config.json'

export default function Error404() {
    return (
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
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'spaceBetween',
                    width: '100%',
                    maxWidth: '400px',
                    height: '100%',
                    maxHeight: '200px',
                    borderRadius: '5px',
                    padding: '32px',
                    boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                    backgroundColor: appConfig.theme.colors.primary[500],
                    opacity: 0.7
                }}
            >
                <Text
                    variant="heading2"
                    styleSheet={{
                        color: appConfig.theme.colors.neutrals['800'],
                        marginBottom: '20px'
                    }}
                >
                    Erro 404!
                </Text>
                <Text
                    styleSheet={{
                        color: appConfig.theme.colors.neutrals['200'],
                        marginBottom: '20px'
                    }}
                >
                    Ops! A página que você procura não existe!
                </Text>
            </Box>
        </Box>
    )
}
