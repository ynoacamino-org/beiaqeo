import eventsource from 'react-native-sse';

global.EventSource = eventsource as any;
