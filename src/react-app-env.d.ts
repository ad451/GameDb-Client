/// <reference types="react-scripts" />

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      REACT_APP_GOOGLE_CLIENT_ID: string;
      REACT_APP_GOOGLE_CLIENT_SECRET: string;
      REACT_APP_BACKEND_URL: string;
      // add more environment variables and their types here
    }
  }
}

export {}