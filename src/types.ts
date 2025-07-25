export interface SignupFormData {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  image?: string;
  release_date: string;
  available: number;
  short_description: string;
  long_description: string;
  category_id: string;
}
