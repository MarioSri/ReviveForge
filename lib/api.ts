import { useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider, UseQueryResult, UseMutationResult } from '@tanstack/react-query';
import axios from 'axios';
import { useSession } from '@/components/AuthProvider';
import { useRef } from 'react';
import { toast } from 'sonner';

export const queryClient = new QueryClient();

// --- Onboarding Checklist ---
export function useCompleteStep(step: 'profile' | 'browse' | 'valuation' | 'offer'): UseMutationResult<void, Error, void> {
  const session = useSession();
  const queryClient = useQueryClient();
  return useMutation<void, Error, void>({
    mutationFn: async () => {
      await axios.post('/api/onboarding/checklist', { step });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['onboarding-checklist', session?.user?.id] });
    },
  });
}

// --- Projects ---
export interface Project {
  // Define all fields as in your DB, e.g.:
  id: string;
  title: string;
  // ...other fields
}

export interface ProjectsResponse {
  data: Project[];
  count: number;
}

export type ProjectsFilter = Record<string, string | number | boolean | undefined>;

export async function fetchProjects(filters: ProjectsFilter = {}, page = 1, pageSize = 12): Promise<ProjectsResponse> {
  const params = new URLSearchParams(
    Object.entries({ ...filters, page, pageSize }).reduce((acc, [k, v]) => {
      if (v !== undefined) acc[k] = String(v);
      return acc;
    }, {} as Record<string, string>)
  );
  const res = await axios.get(`/api/projects?${params}`);
  if (res.status !== 200) throw new Error(res.statusText);
  return res.data;
}

export function useProjects(filters: ProjectsFilter = {}, page = 1, pageSize = 12) {
  const completeStep = useCompleteStep('browse');
  const firstFetch = useRef(true);
  return useQuery<ProjectsResponse, Error, ProjectsResponse, [string, ProjectsFilter, number, number]>({
    queryKey: ['projects', filters, page, pageSize],
    queryFn: () => fetchProjects(filters, page, pageSize),
    select: (data) => data,
    onSuccess: (res: ProjectsResponse) => {
      if (firstFetch.current && res.data.length > 0) {
        completeStep.mutate();
        firstFetch.current = false;
      }
    },
  });
}

export function useProject(id: string): UseQueryResult<any, Error> {
  return useQuery<any, Error>({
    queryKey: ['project', id],
    queryFn: async () => {
      const { data } = await axios.get(`/api/projects/${id}`);
      return data.project;
    },
    enabled: !!id,
  });
}

export function useCreateProject(): UseMutationResult<any, Error, any> {
  const queryClient = useQueryClient();
  return useMutation<any, Error, any>({
    mutationFn: async (payload: any) => {
      const { data } = await axios.post('/api/projects', payload);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });
}

export function useUpdateProject(id: string): UseMutationResult<any, Error, any> {
  const queryClient = useQueryClient();
  const completeStep = useCompleteStep('profile');
  const sentRef = useRef(false);
  return useMutation<any, Error, any>({
    mutationFn: async (payload: any) => {
      const { data } = await axios.put(`/api/projects/${id}`, payload);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['project', id] });
      if (!sentRef.current) {
        completeStep.mutate();
        sentRef.current = true;
      }
    },
  });
}

export function useDeleteProject(id: string): UseMutationResult<void, Error, void> {
  const queryClient = useQueryClient();
  return useMutation<void, Error, void>({
    mutationFn: async () => {
      await axios.delete(`/api/projects/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });
}

// --- Offers ---
export function useOffers(received: boolean): UseQueryResult<any[], Error> {
  return useQuery<any[], Error>({
    queryKey: ['offers', received],
    queryFn: async () => {
      const { data } = await axios.get(`/api/offers?received=${received}`);
      return data.data;
    },
  });
}

export function useCreateOffer(): UseMutationResult<any, Error, any> {
  const queryClient = useQueryClient();
  const completeStep = useCompleteStep('offer');
  const sentRef = useRef(false);
  return useMutation<any, Error, any>({
    mutationFn: async (payload: any) => {
      return await toast.promise(
        axios.post('/api/offers', payload).then(res => res.data),
        {
          loading: 'Sending…',
          success: 'Done 🎉',
          error: (e) => e.message,
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['offers'] });
      if (!sentRef.current) {
        completeStep.mutate();
        sentRef.current = true;
      }
    },
  });
}

export function useActOnOffer(): UseMutationResult<any, Error, { id: string; action: 'accept' | 'reject' }> {
  const queryClient = useQueryClient();
  const completeStep = useCompleteStep('offer');
  const sentRef = useRef(false);
  return useMutation<any, Error, { id: string; action: 'accept' | 'reject' }>({
    mutationFn: async ({ id, action }) => {
      return await toast.promise(
        axios.put(`/api/offers/${id}`, { action }).then(res => res.data),
        {
          loading: 'Sending…',
          success: 'Done 🎉',
          error: (e) => e.message,
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['offers'] });
      if (!sentRef.current) {
        completeStep.mutate();
        sentRef.current = true;
      }
    },
  });
}

// --- Favorites ---
export function useFavorites(): UseQueryResult<any[], Error> {
  return useQuery<any[], Error>({
    queryKey: ['favorites'],
    queryFn: async () => {
      const { data } = await axios.get('/api/favorites');
      return data.data;
    },
  });
}

export function useToggleFavorite(): UseMutationResult<any, Error, { projectId?: string; favoriteId?: string }> {
  const queryClient = useQueryClient();
  return useMutation<any, Error, { projectId?: string; favoriteId?: string }>({
    mutationFn: async ({ projectId, favoriteId }) => {
      if (favoriteId) {
        await axios.delete(`/api/favorites/${favoriteId}`);
        return { removed: true };
      } else if (projectId) {
        const { data } = await axios.post('/api/favorites', { projectId });
        return { added: true, favorite: data };
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
    },
  });
}

// --- AI Valuation ---
export function useAIEvaluate(): UseMutationResult<any, Error, { githubUrl: string }> {
  const completeStep = useCompleteStep('valuation');
  const sentRef = useRef(false);
  return useMutation<any, Error, { githubUrl: string }>({
    mutationFn: async (payload) => {
      return await toast.promise(
        axios.post('/api/ai/valuate', payload).then(res => res.data),
        {
          loading: 'Sending…',
          success: 'Done 🎉',
          error: (e) => e.message,
        }
      );
    },
    onSuccess: () => {
      if (!sentRef.current) {
        completeStep.mutate();
        sentRef.current = true;
      }
    },
  });
}

// --- Profile ---
export function useProfile(): UseQueryResult<any, Error> {
  return useQuery<any, Error>({
    queryKey: ['profile'],
    queryFn: async () => {
      const { data } = await axios.get('/api/user/profile');
      return data.profile;
    },
  });
}

export function useUpdateProfile(): UseMutationResult<any, Error, any> {
  const queryClient = useQueryClient();
  const completeStep = useCompleteStep('profile');
  const sentRef = useRef(false);
  return useMutation<any, Error, any>({
    mutationFn: async (payload: any) => {
      return await toast.promise(
        axios.put('/api/user/profile', payload).then(res => res.data.profile),
        {
          loading: 'Saving…',
          success: 'Profile updated!',
          error: (e) => e.message,
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      if (!sentRef.current) {
        completeStep.mutate();
        sentRef.current = true;
      }
    },
  });
}

// --- Stripe Checkout ---
export function useCreateCheckout(): UseMutationResult<any, Error, string> {
  return useMutation<any, Error, string>({
    mutationFn: async (priceId: string) => {
      return await toast.promise(
        axios.post('/api/stripe/create-checkout-session', { priceId }).then(res => res.data),
        {
          loading: 'Redirecting to checkout…',
          success: 'Redirected!',
          error: (e) => e.message,
        }
      );
    },
  });
}

export function useChecklist(): UseQueryResult<string[], Error> {
  const session = useSession();
  return useQuery<string[], Error>({
    queryKey: ['onboarding-checklist', session?.user?.id],
    queryFn: async () => {
      const { data } = await axios.get('/api/onboarding/checklist');
      return data;
    },
    enabled: !!session?.user?.id,
  });
}

export { QueryClientProvider };
