const { withAndroidManifest } = require('@expo/config-plugins')

const withProcessTextActivity = (config) => {
    return withAndroidManifest(config, (config) => {
        const androidManifest = config.modResults

        // Check if activity already exists to avoid duplicates
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

module.exports = withProcessTextActivity
