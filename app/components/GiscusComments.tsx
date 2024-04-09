'use client'

import Giscus from '@giscus/react';

export default function GiscusComments() {
  return (
    <Giscus
      id="comments"
      repo="madinkum/next.js-sanity-blog"
      repoId="R_kgDOK2zaCg"
      category="Q&A"
      categoryId="DIC_kwDOK2zaCs4Cc1bV"
      mapping="pathname"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="top"
      theme="dark"
      lang="en"
      loading="lazy"
    />
  );
}