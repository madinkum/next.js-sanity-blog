export interface Post {
  post: Post;
   _id:string;
   publishedAt:string;
   title:string;
   author:{
    name:string;
    image:string;
   }
   comments:Comment[];
description:string;
mainImage:{
    asset:{
        url:string;
    };
};
slug:{
    current:string;
};
body:[object];
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
    publishedAt:string;
    _id: string;
    _rev: string;
    _type: string;
    _updatedAt: string;
    replies: Reply[];
    }

    export interface Reply {
      _id: string;
      name: string;
      email: string;
      reply: string;
      publishedAt: string;
      nestedReplies: Reply[];

    }