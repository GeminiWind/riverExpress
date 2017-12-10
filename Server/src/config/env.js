import dotenv from 'dotenv';

const loadEnv = () => {
  const path = (process.env.NODE_ENV === 'production') ? '.env.production' : '.env.development';
  dotenv.load({ path });
};

export { loadEnv };
