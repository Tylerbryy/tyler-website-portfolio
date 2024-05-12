import BackButton from "@/components/ui/back-button";
import Mdx from "@/components/ui/mdx";
import { constructOgImageUri, getUrl } from "@/lib/utils";
import { allPosts } from "contentlayer/generated";
import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

interface PostPageProps {
  params: {
    slug: string[];
  };
}

async function getPostFromParams(params: { slug: string[] }) {
  const slug = params?.slug?.join("/");
  const post = allPosts.find((post) => post.slugAsParams === slug);

  if (!post) {
    null;
  }

  return post;
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const post = await getPostFromParams(params);
  if (!post) {
    return {};
  }

  const ogImageUrl = post.image;

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      type: "article",
      url: `${getUrl()}/blog/${post.slug}`,
      title: post.title,
      description: post.description,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [ogImageUrl],
    },
  };
}

export async function generateStaticParams(): Promise<
  PostPageProps["params"][]
> {
  return allPosts.map((post) => ({
    slug: post.slugAsParams.split("/"),
  }));
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await getPostFromParams(params);

  if (!post) {
    notFound();
  }

  return (
    <div className="flex flex-col md:flex-row max-w-full md:max-w-7xl">
      <div className="mx-auto mb-5 flex-none md:mb-0">
        <BackButton />
      </div>
      <div className="mx-auto max-w-full md:max-w-5xl">
        <div className="relative mx-auto max-w-full md:max-w-3xl border-b border-l border-dashed border-slate-500/50 px-6 py-4 md:border-y">
          <h1 className="mx-auto font-calsans text-2xl md:text-3xl tracking-tight text-slate-900 dark:text-slate-100">
            {post.title}
          </h1>
        </div>
        <div className="relative mx-auto max-w-full md:max-w-3xl border-l border-dashed border-slate-500/50 px-6 py-2">
          <span className="mb-4 block text-md md:text-lg leading-8 text-slate-600 dark:text-slate-500">
            {post.description}
          </span>
          <div className="ring-photo shadow-photo lg:aspect-square relative mx-auto mt-4 flex aspect-[16/9] rounded-2xl text-center shadow-md ring-1 sm:aspect-[2/1] lg:max-w-3xl">
            <Image
              src={post.image}
              alt="Profile photo"
              fill={true}
              priority={true}
              className="absolute inset-0 h-full w-full rounded-2xl bg-gray-50 object-cover"
            />
          </div>
          <figcaption className="my-4 text-sm text-slate-400 dark:text-slate-500 sm:mb-6">
            {post.imageCaption}
          </figcaption>
        </div>
        <div className="relative mx-auto max-w-full md:max-w-3xl border-slate-500/50 px-6">
          <Mdx code={post.body.code} />
        </div>
      </div>
    </div>
  );
}
