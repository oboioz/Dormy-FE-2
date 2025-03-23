import moment from 'moment';

export const getNextExpiresTime = (expiresIn: number): string => {
  return moment().add(expiresIn, 'seconds').format();
};

export const isTokenStillValid = (expiresTime: string): boolean => {
  return moment(expiresTime).isAfter(moment());
};
