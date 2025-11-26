declare module "jsonwebtoken" {
  export interface SignOptions {
    expiresIn?: string | number;
    [key: string]: unknown;
  }

  export function sign(
    payload: string | Buffer | object,
    secretOrPrivateKey: string | Buffer,
    options?: SignOptions
  ): string;

  export function verify<T = unknown>(
    token: string,
    secretOrPublicKey: string | Buffer,
    options?: SignOptions
  ): T;

  export type JwtPayload = Record<string, unknown>;

  const _default: {
    sign: typeof sign;
    verify: typeof verify;
  };
  export default _default;
}
