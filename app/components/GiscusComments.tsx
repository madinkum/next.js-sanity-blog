// components/GiscusComments.tsx
import React from 'react';
import Giscus  from '@giscus/react';


const GiscusComments = () => {
  return (
    <div>
        <Giscus
        id="comments"
        repo="madinkum/next.js-sanity-blog"
        repoId="R_kgDOK2zaCg"
        category="Announcements"
        categoryId="DIC_kwDOK2zaCs4Cc1bT"
        mapping="pathname"
        strict="0"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="bottom"
        theme="noborder_light"
        lang="en"
        />

    </div>
  )
}

export default GiscusComments