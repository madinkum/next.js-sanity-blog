export interface Post {
    title: string;
    overview: string;
    content: any;
    code: object;
    _id: string;
    slug: {
      current: string;
    };
    _createdAt: string;
  }