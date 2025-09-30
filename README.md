# react-native-process-text

An Android process text module for React Native.

This only works for Android. iOS wil simply return stub values.

## Installation

```sh
npm install "@vali98/react-native-process-text"
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
