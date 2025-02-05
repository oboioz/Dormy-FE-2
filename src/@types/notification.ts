
export type INotification = {
  notificationID: number;
  content: string;
  date: string; // Using string to represent date (ISO format recommended)
  title: string;
  description: string;
  isRead: boolean;
  userID: number;
  adminID: number;
};