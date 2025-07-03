"use client";
import { useParams, useRouter } from "next/navigation";
import { useState, Suspense } from "react";
import { useProject, useAIEvaluate, useProjects } from "@/lib/api";
import dynamic from "next/dynamic";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import MakeOfferDialog from "@/components/MakeOfferDialog";
import { useToggleFavorite } from "@/hooks/use-favorite";

const Swiper = dynamic(() => import("swiper/react").then(mod => mod.Swiper), { ssr: false }) as any;
const SwiperSlide = dynamic(() => import("swiper/react").then(mod => mod.SwiperSlide), { ssr: false }) as any;
const ReactMarkdown = dynamic(() => import("react-markdown"), { ssr: false }) as any;

export async function generateMetadata({ params }: { params: { id: string } }) {
  // Fetch project for SEO
  // ...existing code for title/description...
  return {
    title: `Project | ReviveForge`,
    description: `Project detail page for ReviveForge.`
  };
}

export default function ProjectDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [offerOpen, setOfferOpen] = useState(false);
  const { data, isLoading, isError, refetch } = useProject(id as string);
  const { isFavorited, toggle } = useToggleFavorite(id as string);
  const aiEval = useAIEvaluate();
  const related = useProjects({ tech: data?.tech_stack?.[0], limit: 4 });

  if (isLoading) return (
    <div className="max-w-3xl mx-auto py-8 animate-pulse">
      <div className="h-56 bg-gray-800 rounded-lg mb-4" />
      <div className="h-8 bg-gray-800 rounded w-1/2 mb-2" />
      <div className="h-4 bg-gray-800 rounded w-1/3 mb-6" />
      <div className="h-6 bg-gray-800 rounded w-1/4 mb-2" />
      <div className="h-6 bg-gray-800 rounded w-1/4 mb-2" />
      <div className="h-32 bg-gray-800 rounded mb-4" />
    </div>
  );
  if (isError || !data) {
    toast.error("Failed to load project");
    return <div className="text-center py-12">Error loading project. <Button onClick={() => refetch()}>Retry</Button></div>;
  }

  const health = data.health_score ?? 0;
  let healthColor = "bg-red-500";
  if (health >= 80) healthColor = "bg-green-500";
  else if (health >= 50) healthColor = "bg-yellow-500";

  return (
    <div className="max-w-3xl mx-auto py-8">
      {/* Carousel */}
      <div data-testid="carousel" className="mb-6">
        <Suspense fallback={<div className="h-56 bg-gray-800 rounded-lg" />}>
          <Swiper slidesPerView={1} navigation={true}>
            {(data.screenshots || [data.thumbnail || "/placeholder.jpg"]).map((src: string, i: number) => (
              <SwiperSlide key={i}>
                <img src={src} alt={`${data.title} screenshot`} className="w-full h-56 object-cover rounded-lg" />
              </SwiperSlide>
            ))}
          </Swiper>
        </Suspense>
      </div>
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div>
          <h1 className="text-2xl font-bold mb-1">{data.title}</h1>
          <div className="flex gap-2 flex-wrap">
            {data.tech_stack?.map((tech: string) => (
              <span key={tech} className="px-2 py-0.5 text-xs rounded bg-blue-900 text-blue-200">{tech}</span>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <a href={`/profile/${data.seller_id}`} className="flex items-center gap-1">
            <img src={data.seller_avatar || "/placeholder-user.jpg"} alt="Seller avatar" className="w-8 h-8 rounded-full" />
            <span className="text-sm font-medium">{data.seller_name}</span>
          </a>
          <button
            aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
            onClick={toggle}
            className="ml-2 bg-white/80 rounded-full p-2 text-red-500 hover:bg-white shadow"
          >{isFavorited ? "♥" : "♡"}</button>
        </div>
      </div>
      {/* Metrics */}
      <div data-testid="metrics-strip" className="flex gap-4 mb-4">
        <span className={`px-2 py-0.5 text-xs rounded ${healthColor} text-white`}>Health: {health}</span>
        <span className="px-2 py-0.5 text-xs rounded bg-gray-800 text-white">Value: ${data.value_min} - ${data.value_max}</span>
        <span className="px-2 py-0.5 text-xs rounded bg-gray-800 text-white">Stars: {data.stars ?? "-"}</span>
        <span className="px-2 py-0.5 text-xs rounded bg-gray-800 text-white">Forks: {data.forks ?? "-"}</span>
        <span className="px-2 py-0.5 text-xs rounded bg-gray-800 text-white">Last commit: {data.last_commit ?? "-"}</span>
      </div>
      {/* Actions */}
      <div className="flex gap-2 mb-4">
        <Button onClick={() => aiEval.mutate({ githubUrl: data.github_url }, {
          onSuccess: () => { toast.success("AI valuation complete"); refetch(); },
          onError: () => toast.error("AI valuation failed")
        })} disabled={aiEval.isPending} aria-label="Run AI Valuation">
          {aiEval.isPending ? "Running..." : "Run AI Valuation"}
        </Button>
        <Button onClick={() => setOfferOpen(true)} aria-label="Make Offer">Make Offer</Button>
      </div>
      <MakeOfferDialog projectId={data.id} isOpen={offerOpen} onClose={() => setOfferOpen(false)} />
      {/* Description */}
      <div className="prose dark:prose-invert my-6">
        <Suspense fallback={<div className="h-32 bg-gray-800 rounded" />}>
          <ReactMarkdown>{data.description}</ReactMarkdown>
        </Suspense>
      </div>
      {/* Related projects */}
      <div className="mt-8">
        <h2 className="font-semibold mb-2">Related Projects</h2>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
          {related.data?.projects?.map((p: any) => (
            <div key={p.id} className="bg-white/10 dark:bg-neutral-900/80 rounded-lg p-4">
              <a href={`/projects/${p.id}`} className="font-semibold hover:underline">{p.title}</a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
