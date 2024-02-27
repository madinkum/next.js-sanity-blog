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
    comments:Comment[];
  }


  export interface Comment {
    approved: boolean;
    comment: string;
    email: string;
    name: string;
    post: {
      _ref: string;
      _type: string;
    };
    _createdAt:string;
    _id: string;
    _rev: string;
    _type: string;
    _updatedAt: string;
    }