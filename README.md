# react-native-process-text

An Android process text module for React Native.

This only works for Android. iOS wil simply return stub values.

## Features

- Adds a function to read texts sent via ProcessText Intent
    - This text is stored by a ProcessTextActivity first. It then routes the intent to open your app which can then retrieve the text intent.
- Enable or disable ProcessText for your app

## Installation

```sh
npm install "@vali98/react-native-process-text"
```

### For React Native CLI

Add the following activity to your AndroidManifest.xml:

```xml
<!--
    android:label controls what text is displayed in
    context menus, change it as needed
-->
 <activity
    android:name="com.processtext.ProcessTextActivity"
    android:exported="true"
    android:launchMode="singleTask"
    android:label="Your Label Here!"
    android:taskAffinity="${applicationId}.processtext"
    android:excludeFromRecents="true">
    <intent-filter>
        <action android:name="android.intent.action.PROCESS_TEXT" />
        <category android:name="android.intent.category.DEFAULT" />
        <data android:mimeType="text/plain" />
    </intent-filter>
</activity>
```

### Expo

Add the config plugin to your `app.config.json` or `app.config.js`

```js
module.exports = {
    expo: {
        plugins: [
            [
                '@vali98/react-native-process-text',
                {
                    label: 'Your Label Here!',
                },
            ],
        ],
    },
}
```

## Usage

```js
import { useTextIntentStatus, useTextIntentOnForeground } from 'react-native-process-text'


const App = () => {
    const [text, setText] = useState('')
    // useful helper functions
    const { enabled, setEnabled } = useTextIntentStatus()
    useTextIntentOnForeground((a) => a && setText(a), [])
    // ...

```

## Contributing

- [Development workflow](CONTRIBUTING.md#development-workflow)
- [Sending a pull request](CONTRIBUTING.md#sending-a-pull-request)
- [Code of conduct](CODE_OF_CONDUCT.md)

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
