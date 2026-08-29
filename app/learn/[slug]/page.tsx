import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { getTopicBySlug, topics } from "@/lib/content/topics";
import TopicFlow from "@/components/learn/TopicFlow";

export function generateStaticParams() {
  return topics.map((t) => ({ slug: t.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const topic = getTopicBySlug(params.slug);
  return { title: topic ? `${topic.title} — MoneySense AI` : "Learn — MoneySense AI" };
}

export default function TopicPage({ params }: { params: { slug: string } }) {
  const topic = getTopicBySlug(params.slug);
  if (!topic) notFound();

  return (
    <div className="container-page max-w-2xl py-10">
      <Link href="/learn" className="inline-flex items-center gap-1 text-sm font-medium text-forest-600 hover:underline">
        <ChevronLeft size={16} /> Back to Learn
      </Link>
      <h1 className="mt-4 text-3xl font-bold">{topic.title}</h1>

      <TopicFlow topic={topic} />
    </div>
  );
}
