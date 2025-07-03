export interface Project {
  id: string;
  seller_id: string;
  title: string;
  description?: string;
  github_url?: string;
  tech_stack?: string[];
  health_score?: number;
  value_min?: number;
  value_max?: number;
  ai_analysis?: any;
  status: string;
  created_at: string;
  updated_at: string;
}
