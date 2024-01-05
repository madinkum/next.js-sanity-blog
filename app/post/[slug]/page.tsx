'use client'
import { Post } from "@/library/interface";
import client from "@/library/sanity.client";
import { urlFor } from "@/library/sanityImageUrl";
const BlockContent = require("@sanity/block-content-to-react");
import SyntaxHighlighter from "react-syntax-highlighter";
import Image from "next/image";

async function getData(slug: string) {
  const query = `*[_type == "post" && slug.current == "${slug}"][0]`;

  const data = await client.fetch(query, {
    next: { revalidate: 60 },
  }
  );

  return data;
}

export default async function SlugPage({
  params,
}: {
  params: { slug: string };
}) {
  const data = (await getData(params.slug)) as Post;

  const PortableTextComponent = {
    types: {
      image: ({ value }: { value: any }) => (
        <Image
          src={urlFor(value).url()}
          alt="Image"
          className="rounded-lg"
          width={800}
          height={800}
        />
      ),
    },
  };
  const serializers = {
    types: {
      code: (props: any) => (
        <div className="my-2">
          <SyntaxHighlighter language={props.node.language}>
            {props.node.code}
          </SyntaxHighlighter>
        </div>
      ),
    },
  };

  return (
    <div className="xl:divide-y xl:divide-gray-200 xl:dark:divide-gray-700">
      <header className="pt-6 xl:pb-6">
        <div className="space-y-1 text-center">
          <div className="space-y-10">
            <div>
              <p className="text-base font-medium leading-6 text-teal-500">
                {new Date(data._createdAt).toISOString().split("T")[0]}
              </p>
            </div>
          </div>

          <div>
            <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
              {data.title}
            </h1>
          </div>
        </div>
      </header>

      <div className="divide-y divide-gray-200 pb-7 dark:divide-gray-700 xl:divide-y-0">
        <div className="divide-y divide-gray-200 dark:divide-gray-700 xl:col-span-3 xl:row-span-2 xl:pb-0">
          <div className="prose max-w-none pb-8 pt-10 dark:prose-invert prose-lg">
            <BlockContent
              blocks={data.content}
              projectId="00t91dbd"
              dataset="production"
              serializers={serializers}
              components={PortableTextComponent}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
