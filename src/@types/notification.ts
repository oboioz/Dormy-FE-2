import { CustomFile } from "../components/upload";

export type INotification = {
  notificationID: number;
  content: string;
  date: string; // Using string to represent date (ISO format recommended)
  title: string;
  description: string;
  isRead: boolean;
  userID: number;
  adminID: number;
  cover: CustomFile | string | null;
};

export type INotificationNew = {
  content: string;
  title: string;
  description: string;
  cover: CustomFile | string | null;
};