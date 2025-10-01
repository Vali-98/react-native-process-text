const { withAndroidManifest, createRunOncePlugin } = require('@expo/config-plugins')

/**
 * Adds a ProcessTextActivity to AndroidManifest with a custom label.
 * @param {import('@expo/config-plugins').ExpoConfig} config
 * @param {{ label?: string }} options
 */
const withProcessTextActivity = (config, { label = 'Process Text' } = {}) => {
    return withAndroidManifest(config, (config) => {
        const androidManifest = config.modResults

        // Avoid adding duplicate activity
        const existingActivity = androidManifest.manifest.application[0].activity?.find(
            (activity) => activity.$['android:name'] === 'com.processtext.ProcessTextActivity'
        )

        if (!existingActivity) {
            androidManifest.manifest.application[0].activity = [
                ...(androidManifest.manifest.application[0].activity || []),
                {
                    $: {
                        'android:name': 'com.processtext.ProcessTextActivity',
                        'android:exported': 'true',
                        'android:launchMode': 'singleTask',
                        'android:taskAffinity': '${applicationId}.processtext',
                        'android:excludeFromRecents': 'true',
                        'android:label': label,
                    },
                    'intent-filter': [
                        {
                            action: [
                                { $: { 'android:name': 'android.intent.action.PROCESS_TEXT' } },
                            ],
                            category: [
                                { $: { 'android:name': 'android.intent.category.DEFAULT' } },
                            ],
                            data: [{ $: { 'android:mimeType': 'text/plain' } }],
                        },
                    ],
                },
            ]
        }

        return config
    })
}

const PLUGIN_NAME = 'react-native-process-text'
const PLUGIN_VERSION = '0.1.1'

module.exports = createRunOncePlugin(withProcessTextActivity, PLUGIN_NAME, PLUGIN_VERSION)
