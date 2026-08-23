import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'shop.danpung.app',
  appName: '단풍지지',
  webDir: 'public',
  server: {
    url: 'https://www.danpung.shop',
    cleartext: false,
  },
};

export default config;
