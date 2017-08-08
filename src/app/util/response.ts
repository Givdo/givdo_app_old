import { Response } from '@angular/http';

export const toJSON = (res: Response) => {
  return res.json();
}

export const toData = (res: Response) => {
  return toJSON(res).data;
}
