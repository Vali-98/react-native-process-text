import { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useTextIntentStatus, useTextIntentOnForeground } from 'react-native-process-text'

export default function App() {
    const [text, setText] = useState('')
    const { enabled, setEnabled } = useTextIntentStatus()
    useTextIntentOnForeground((a) => a && setText(a), [])

    return (
        <View style={styles.container}>
            <Text>Result: {text}</Text>
            <Text>Enabled: {enabled ? 'True' : 'False'}</Text>
            <TouchableOpacity
                onPress={() => {
                    setEnabled(!enabled)
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
