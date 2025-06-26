export interface Book {
  success: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  _id?: string;
  title: string;
  author: string;
  gradeLevel?: string;
  subject?: string;
  series?: string;
  coverImageUrl?: string;
  createdAt?: string;
}