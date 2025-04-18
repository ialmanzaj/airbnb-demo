import '@testing-library/jest-native/extend-expect';

// Mock AsyncStorage
const mockAsyncStorage = {
  setItem: jest.fn(() => Promise.resolve()),
  getItem: jest.fn(() => Promise.resolve(null)),
  removeItem: jest.fn(() => Promise.resolve()),
  clear: jest.fn(() => Promise.resolve()),
  getAllKeys: jest.fn(() => Promise.resolve([])),
  multiGet: jest.fn(() => Promise.resolve([])),
  multiSet: jest.fn(() => Promise.resolve()),
  multiRemove: jest.fn(() => Promise.resolve()),
};

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);

// Mock ExpoRouter
jest.mock('expo-router', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
  }),
  useLocalSearchParams: () => ({}),
  Stack: {
    Screen: jest.fn(),
  },
}));

// Mock safe-area-context
jest.mock('react-native-safe-area-context', () => ({
  SafeAreaProvider: ({ children }) => children,
  useSafeAreaInsets: () => ({ top: 0, right: 0, bottom: 0, left: 0 }),
}));

// Mock Dimensions
jest.mock('react-native/Libraries/Utilities/Dimensions', () => ({
  get: jest.fn().mockReturnValue({ width: 375, height: 812 }),
}));

// Mock colors constant
jest.mock('@/constants/colors', () => ({
  light: {
    text: '#000000',
    background: '#ffffff',
    primary: '#FF385C',
    lightText: '#717171',
  },
}));

// Mock lucide-react-native icons
jest.mock('lucide-react-native', () => {
  const mockIcon = ({ size, color, fill, testID }) => {
    return {
      type: 'svg',
      props: { size, color, fill, testID },
    };
  };

  return {
    Heart: mockIcon,
    Star: mockIcon,
    Search: mockIcon,
    MapPin: mockIcon,
    Users: mockIcon,
    Flame: mockIcon,
    Home: mockIcon,
    Building: mockIcon,
    Tent: mockIcon,
    Warehouse: mockIcon,
    Palmtree: mockIcon,
    Castle: mockIcon,
    Sailboat: mockIcon,
  };
});

// Mock react-native-css-interop
jest.mock('react-native-css-interop', () => ({
  get: jest.fn().mockReturnValue({}),
  cssInterop: jest.fn().mockReturnValue({}),
  createCssEngine: jest.fn(),
  createUnitObservables: jest.fn().mockReturnValue({}),
  createConditions: jest.fn().mockReturnValue({}),
  createNativeInterop: jest.fn().mockReturnValue({}),
  createApi: jest.fn().mockReturnValue({}),
  wrapJsx: jest.fn().mockReturnValue({}),
  jsx: jest.fn().mockReturnValue({}),
  jsxs: jest.fn().mockReturnValue({}),
}));

// Mock expo-haptics
jest.mock('expo-haptics', () => ({
  impactAsync: jest.fn(),
  notificationAsync: jest.fn(),
  selectionAsync: jest.fn(),
}));

// Mock expo-status-bar
jest.mock('expo-status-bar', () => ({
  StatusBar: () => null,
}));

// Mock react-native-reanimated
jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.call = () => {};
  return Reanimated;
});

// Silence the warning: Animated: `useNativeDriver` is not supported
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper'); 