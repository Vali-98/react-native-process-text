// ProcessText.ts
import { useEffect, useState } from 'react'
import { AppState, type AppStateStatus } from 'react-native'
import NativeProcessText from './NativeProcessText'

export function setTextIntentEnabled(enabled: boolean) {
    return NativeProcessText.setProcessTextIntentEnabled(enabled)
}

export function getTextIntentEnabled(): Promise<boolean> {
    return NativeProcessText.isProcessTextIntentEnabled()
}

export function getTextIntentResult() {
    return NativeProcessText.getProcessTextIntent()
}

export function useTextIntentOnForeground(
    callback: (text: string | null) => void,
    deps: any[] = []
) {
    useEffect(() => {
        const listener = (state: AppStateStatus) => {
            if (state === 'active') {
                getTextIntentResult().then(callback)
            }
        }
        getTextIntentResult().then(callback)
        const appState = AppState.addEventListener('change', listener)
        return () => appState.remove()
    }, [callback, ...deps])
}

export function useTextIntentStatus() {
    const [enabled, setEnabledInternal] = useState(false)

    useEffect(() => {
        getTextIntentEnabled().then((result) => {
            setEnabledInternal(result)
        })
    }, [])

    const setEnabled = async (enabledStart: boolean) => {
        await setTextIntentEnabled(enabledStart)
        const enabledEnd = await getTextIntentEnabled()
        setEnabledInternal(enabledEnd)
    }

    return { enabled, setEnabled }
}
