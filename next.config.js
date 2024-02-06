/** @type {import('next').NextConfig} */
const nextConfig = {
    
    images: {
        domains:["cdn.sanity.io"],
    },
    env: {
        NEXT_PUBLIC_GISCUS_REPO: 'next.js-sanity-blog',
        NEXT_PUBLIC_GISCUS_REPO_ID: 'R_kgDOK2zaCg',
        NEXT_PUBLIC_GISCUS_CATEGORY: 'Announcements',
        NEXT_PUBLIC_GISCUS_CATEGORY_ID: 'DIC_kwDOK2zaCs4Cc1bT',
        NEXT_PUBLIC_GISCUS_MAPPING: 'pathname',
      },
}

module.exports = nextConfig
