import { type TurboModule, TurboModuleRegistry } from 'react-native'

export interface Spec extends TurboModule {
    /**
     * Returns whether the ProcessText activity is enabled in the system.
     */
    isProcessTextIntentEnabled(): Promise<boolean>

    /**
     * Enable or disable the ProcessText activity system-wide for this app.
     */
    setProcessTextIntentEnabled(enabled: boolean): Promise<void>

    /**
     * Returns the text passed to the app when launched via "Process Text".
     * Resolves to `null` if none was provided.
     */
    getProcessTextIntent(): Promise<string | null>
}

export default TurboModuleRegistry.getEnforcing<Spec>('ProcessText')
