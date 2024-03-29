// import crashlytics from '@react-native-firebase/crashlytics';
const logger = {
  log: (m: string) => console.log(m),
  error: (error: any) => console.log(error),
};
export default logger;
