export interface Post {
  code: string;
  post: Post;
  _id: string;
  publishedAt: string;
  title: string;
  author: {
    name: string;
    image: string;
  };
  comments: Comment[];
  description: string;
  mainImage: {
    asset: {
      url: string;
    };
  };
  slug: {
    current: string;
  };
  body: [object];
  replies: Reply[];
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
  publishedAt: string;
  _id: string;
  _rev: string;
  _type: string;
  _updatedAt: string;
  
  replies?: Comment[];
  parentCommentId?: string;
}


export interface Reply {
  reply: string;
  _id: string;
  name: string;
  email: string;
  comment: {
    _ref: string;
    _type: string;
  };
}
