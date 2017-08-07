import * as Factory from 'factory.ts'

export interface Notification {
  id: number,
  name: string,
  status: string,
  category: string,
  senderImage: string,
  acceptUrl: string,
  rejectUrl: string,
}

export const notificationFactory = Factory.makeFactory<Notification>({
  id: Factory.each(i => i),
  name: 'Notification User name',
  status: 'unread',
  category: 'Magic',
  senderImage: 'some-fancy-url',
  acceptUrl: 'accept-url',
  rejectUrl: 'reject-url',
});
