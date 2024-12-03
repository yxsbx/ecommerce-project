import { Injectable } from '@angular/core';
import { supabase } from './supabase.client';

@Injectable({
  providedIn: 'root',
})
export class ChildService {
  async getChildren() {
    const { data, error } = await supabase.from('children').select('*');
    if (error) throw error;
    return data;
  }

  async addChild(
    parentId: string,
    name: string,
    birthDate: Date,
    avatarUrl?: string,
    interests?: any
  ) {
    const { data, error } = await supabase
      .from('children')
      .insert([
        {
          parent_id: parentId,
          name,
          birth_date: birthDate,
          avatar_url: avatarUrl,
          interests,
        },
      ]);
    if (error) throw error;
    return data;
  }
}
