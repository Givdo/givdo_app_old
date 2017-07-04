import * as Factory from 'factory.ts';

export interface Organization {
  id: number,
  name: string,
  picture: string,
}


export const organizationFactory = Factory.makeFactory<Organization>({
  id: Factory.each(i => i),
  name: 'Organization name',
  picture: 'organization-picture-url',
});
