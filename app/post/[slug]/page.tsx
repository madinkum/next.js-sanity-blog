const BlockContent = require("@sanity/block-content-to-react");
import SyntaxHighlighter from "react-syntax-highlighter";
import type { Post } from "../../../library/typings";
import client from "@/library/sanity";
import CopyToClipboardButton from "@/app/components/CopyButton";

export const revalidate = 60;
async function getData(slug: string) {
  const query = `*[_type == "post" && slug.current == "${slug}"][0]{
    _id,
    publishedAt,
    title,
    slug,
    author->{
        name,
        image,
    },
    "comments":*[_type=="comment" && post._ref == ^._id ],
    description,
    mainImage,
    body,
}`;

  const data = await client.fetch(query, {});

  return data;
}
export default async function Post({ params }: { params: { slug: string } }) {
  const data = (await getData(params.slug)) as Post;

  const serializers = {
    types: {
      code: (props: any) => (
        <div className="my-2">
          <SyntaxHighlighter language={props.node.language}>
            {props.node.code}
          </SyntaxHighlighter>
          <CopyToClipboardButton code={props.node.code} />
        </div>
      ),
      h1: (props: any) => <h1 className="my-5 text-2xl font-bold" {...props} />,
      h2: (props: any) => <h2 className="my-5 text-xl font-bold" {...props} />,
      h3: (props: any) => <h3 className="my-5 text-l font-bold" {...props} />,
      li: ({ children }: any) => (
        <li className="ml-4 list-disc"> {children}</li>
      ),
      link: ({ href, children }: any) => (
        <a href={href} className="text-blue-500 hover:underline">
          {children}
        </a>
      ),
    },
  };

  return (
    <div>
      <header className="pt-6 xl:pb-6">
        <div className="space-y-1 text-center">
          <div className="space-y-10">
            <div>
              <p className="text-base font-medium leading-6 text-teal-500">
                {new Date(data.publishedAt).toISOString().split("T")[0]}
              </p>
            </div>
            <h2 className="text-[18px]">{data.description}</h2>
            <div>
              <p>
                Blog post by {""} <span>{data.author.name}</span>
              </p>
            </div>
            <div>
              <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
                {data.title}
              </h1>
            </div>
          </div>
        </div>
      </header>
      <div className="divide-y divide-gray-200 pb-7 dark:divide-gray-700 xl:divide-y-0">
        <div className="divide-y divide-gray-200 dark:divide-gray-700 xl:col-span-3 xl:row-span-2 xl:pb-0">
          <div className="prose max-w-none pb-8 pt-10 dark:prose-invert prose-lg">
            <BlockContent
              blocks={data.body}
              projectId="dbfhkj94"
              dataset="production"
              serializers={serializers}
            />
          </div>
          
        </div>
      </div>
    </div>
  );
}
