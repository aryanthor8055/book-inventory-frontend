export interface Book {
  success: boolean;
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