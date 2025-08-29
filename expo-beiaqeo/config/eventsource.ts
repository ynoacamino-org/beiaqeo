import eventsource from 'react-native-sse';

// @ts-expect-error: EventSource is not defined in React Native, using polyfill
global.EventSource = eventsource;
