// utils/pwLogger.ts

const COLORS = {
  reset: "\x1b[0m",
  bold: "\x1b[1m",
  dim: "\x1b[2m",
  red: "\x1b[31m",
  yellow: "\x1b[33m",
  cyan: "\x1b[36m",
  green: "\x1b[32m"
};

export const PWLogger = {
  info: (...args: any[]) => {
    if (__DEV__) {
      console.log(
        `${COLORS.cyan}${COLORS.bold}[PushWave INFO]${COLORS.reset}`,
        ...args
      );
    }
  },

  warn: (...args: any[]) => {
    if (__DEV__) {
      console.warn(
        `${COLORS.yellow}${COLORS.bold}⚠️  [PushWave WARNING]${COLORS.reset}`,
        ...args
      );
    }
  },

  error: (...args: any[]) => {
    if (__DEV__) {
      console.error(
        `${COLORS.red}${COLORS.bold}❌  [PushWave ERROR]${COLORS.reset}`,
        ...args
      );
    }
  },

  success: (...args: any[]) => {
    if (__DEV__) {
      console.log(
        `${COLORS.green}${COLORS.bold}✔️  [PushWave]${COLORS.reset}`,
        ...args
      );
    }
  }
};