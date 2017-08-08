import * as Factory from 'factory.ts'

export interface Token {
  token: string,
  expiresIn: number,
}

export const tokenFactory = Factory.makeFactory<Token>({
  token: Factory.each(i => `${i}`),
  expiresIn: 3600,
});
