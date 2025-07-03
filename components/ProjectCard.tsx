"use client";
import Link from "next/link";
import { useToggleFavorite } from "@/hooks/use-favorite";
import { toast } from "sonner";

export default function ProjectCard({ project }: { project: any }) {
  const { isFavorited, toggle } = useToggleFavorite(project.id);
  const health = project.health_score ?? 0;
  let healthColor = "bg-red-500";
  if (health >= 80) healthColor = "bg-green-500";
  else if (health >= 50) healthColor = "bg-yellow-500";

  function handleFavorite(e: React.MouseEvent) {
    e.preventDefault();
    toggle();
    toast.success(isFavorited ? "Removed from favorites" : "Added to favorites");
  }

  return (
    <Link href={`/projects/${project.id}`} className="block bg-white/10 dark:bg-neutral-900/80 rounded-lg shadow hover:shadow-lg transition overflow-hidden relative group">
      <div className="relative">
        <img
          src={project.thumbnail || "/placeholder.jpg"}
          alt={project.title + ' thumbnail'}
          className="w-full h-40 object-cover rounded-t-lg"
          loading="lazy"
          sizes="(max-width:768px) 100vw, 25vw"
        />
        <button
          aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
          onClick={handleFavorite}
          className="absolute top-2 right-2 bg-white/80 rounded-full p-2 text-red-500 hover:bg-white shadow group-hover:scale-110 transition"
        >
          {isFavorited ? "" : ""}
        </button>
      </div>
      <div className="p-4">
        <div className="font-semibold truncate mb-1">{project.title}</div>
        <div className="flex flex-wrap gap-1 mb-2">
          {project.tech_stack?.map((tech: string) => (
            <span key={tech} className="px-2 py-0.5 text-xs rounded bg-blue-900 text-blue-200">{tech}</span>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <span className="font-bold text-lg">{typeof project.value_min === 'number' ? project.value_min.toLocaleString("en-US", { style: "currency", currency: "USD" }) : "$0"}</span>
          <span className={`ml-auto px-2 py-0.5 text-xs rounded ${health >= 80 ? 'bg-green-600 text-white' : health >= 50 ? 'bg-yellow-600 text-black' : 'bg-red-700 text-white'}`}>{health}</span>
        </div>
      </div>
    </Link>
  );
}
