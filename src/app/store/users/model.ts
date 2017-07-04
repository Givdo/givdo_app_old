import * as Factory from 'factory.ts'

export interface User {
  id: number,
  name: string,
  image: string,
  cover: string,
  nickname: string,
  organizationId: number,
}

export const userFactory = Factory.makeFactory<User>({
  id: Factory.each(i => i),
  name: 'User name',
  image: 'some-image-url',
  cover: 'some-cover-url',
  nickname: 'user-nickname',
  organizationId: 123,
});
