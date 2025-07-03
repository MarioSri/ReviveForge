import { useFavorites, useToggleFavorite } from '@/lib/api';
import ProjectCard from '@/components/mobile-project-card';
import Button from '@/components/ui/button';
import { Heart } from 'lucide-react';

export default function FavoritesPage() {
  const { data: favorites, isLoading, error } = useFavorites();
  const { mutate: toggleFavorite, isLoading: favLoading } = useToggleFavorite();

  return (
    <div className="max-w-5xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Favorites</h1>
      {isLoading && <div>Loading...</div>}
      {error && <div>Error loading favorites</div>}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {favorites?.map((fav: any) => (
          <div key={fav.id} className="relative">
            <ProjectCard project={fav.project} />
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2"
              onClick={() => toggleFavorite({ favoriteId: fav.id })}
              disabled={favLoading}
            >
              <Heart className="fill-red-500 text-red-500" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
