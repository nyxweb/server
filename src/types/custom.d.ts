import { Secret } from 'jsonwebtoken';
// import express from 'express';

declare module 'express' {
  export interface Request {
    /** User account (available after use of auth middleware) */
    username: string;
  }
}

declare module 'jsonwebtoken' {
  export function verify(
    token: string,
    secretOrPublicKey: Secret
  ): { username: string };
}
