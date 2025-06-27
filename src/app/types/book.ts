export interface Book {
  _id: string;
  title: string;
  author: string;
  gradeLevel?: string;
  subject?: string;
  series?: string;
  coverImage?: string;
  coverImageType?: string;
  createdAt: Date;
}