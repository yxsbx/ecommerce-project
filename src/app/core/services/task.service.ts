import { Injectable } from '@angular/core';
import { supabase } from './supabase.client';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  async getTasks(childId: string) {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('child_id', childId);
    if (error) throw error;
    return data;
  }

  async addTask(
    childId: string,
    title: string,
    description: string,
    value: number,
    label: string
  ) {
    const { data, error } = await supabase
      .from('tasks')
      .insert([{ child_id: childId, title, description, value, label }]);
    if (error) throw error;
    return data;
  }
}
