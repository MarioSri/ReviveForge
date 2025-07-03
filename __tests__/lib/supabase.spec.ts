import { supabase, supabaseService } from '../../lib/supabase';

describe('Supabase Client', () => {
  it('should initialize anon client', () => {
    expect(supabase).toBeDefined();
    expect(typeof supabase).toBe('object');
  });
  it('should initialize service client', () => {
    expect(supabaseService).toBeDefined();
    expect(typeof supabaseService).toBe('object');
  });
});
