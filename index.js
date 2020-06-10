import { NativeModules, DeviceEventEmitter, Platform } from 'react-native'
const { RNHidenavbar } = NativeModules

const unSupportedError = __DEV__
  ? () => { throw new Error('[react-native-immersive] should not be called on iOS') }
  : () => {}

let isListenerEnabled = false

const Immersive = Platform.OS === 'android' ? {
  on: () => RNHidenavbar.setImmersive(true),
  off: () => RNHidenavbar.setImmersive(false),
  setImmersive: (isOn) => RNHidenavbar.setImmersive(isOn),
  getImmersive: () => RNHidenavbar.getImmersive(), // do not always match actual display state
  addImmersiveListener: (listener) => {
    DeviceEventEmitter.addListener('@@IMMERSIVE_STATE_CHANGED', listener)
    if (isListenerEnabled) return
    isListenerEnabled = true
    RNHidenavbar.addImmersiveListener()
  },
  removeImmersiveListener: (listener) => DeviceEventEmitter.removeListener('@@IMMERSIVE_STATE_CHANGED', listener)
} : {
  on: unSupportedError,
  off: unSupportedError,
  setImmersive: unSupportedError,
  getImmersive: unSupportedError,
  addImmersiveListener: unSupportedError,
  removeImmersiveListener: unSupportedError
}

export { Immersive }
export default Immersive
