// ProcessText.ts
import { NativeEventEmitter, NativeModules } from 'react-native'
import NativeProcessText from './NativeProcessText'

const { ProcessText } = NativeModules

const emitter = new NativeEventEmitter(ProcessText)

export function setProcessTextEnabled(enabled: boolean) {
    return NativeProcessText.setProcessTextIntentEnabled(enabled)
}

export function isProcessTextEnabled(): Promise<boolean> {
    return NativeProcessText.isProcessTextIntentEnabled()
}

export function addProcessTextListener(listener: (text: string) => void) {
    return emitter.addListener('onRNProcessTextModule', (event) => {
        console.log(event)
        if (typeof event === 'string') {
            listener(event)
        }
    })
}

export function getProcessTextIntent() {
    return NativeProcessText.getProcessTextIntent()
}
