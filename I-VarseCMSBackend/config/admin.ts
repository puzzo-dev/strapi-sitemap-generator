import { config } from "process";

export default ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET'),
    sessions: {
      /**
       * How long a refresh token remains valid
       * Example: 7 days
       */
      maxRefreshTokenLifespan: 7 * 24 * 60 * 60 * 1000, // in ms

      /**
       * Maximum session lifespan
       * Example: 1 day
       */
      maxSessionLifespan: 24 * 60 * 60 * 1000, // in ms
    },
  },
  apiToken: {
    salt: env('API_TOKEN_SALT'),
  },
  transfer: {
    token: {
      salt: env('TRANSFER_TOKEN_SALT'),
    },
  },
  secrets: {
    encryptionKey: env('ENCRYPTION_KEY'),
  },
  flags: {
    nps: env.bool('FLAG_NPS', true),
    promoteEE: env.bool('FLAG_PROMOTE_EE', true),
  },
});
