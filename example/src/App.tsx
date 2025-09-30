import { useEffect, useState } from 'react'
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    type AppStateStatus,
    AppState,
} from 'react-native'
import {
    getProcessTextIntent,
    isProcessTextEnabled,
    setProcessTextEnabled,
} from 'react-native-process-text'

export default function App() {
    const [text, setText] = useState('')

    const [enabled, setEnabled] = useState(false)

    useEffect(() => {
        isProcessTextEnabled().then((a) => {
            console.log('Enabled', a)
            setEnabled(a)
        })

        const listener = (state: AppStateStatus) => {
            if (state === 'active') {
                getProcessTextIntent().then((a) => a && setText(a))
            }
        }
        const appState = AppState.addEventListener('change', listener)
        return () => appState.remove()
    }, [])

    return (
        <View style={styles.container}>
            <Text>Result: {text}</Text>
            <Text>Enabled: {enabled ? 'True' : 'False'}</Text>
            <TouchableOpacity
                onPress={() => {
                    setProcessTextEnabled(!enabled).then(() => {
                        isProcessTextEnabled().then((a) => {
                            console.log('Enabled', a)
                            setEnabled(a)
                        })
                    })
                }}>
                <Text>Toggle</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
    },
})
