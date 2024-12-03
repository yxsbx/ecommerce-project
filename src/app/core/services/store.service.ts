import { Injectable } from '@angular/core';
import { supabase } from './supabase.client';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  async getRewards() {
    const { data, error } = await supabase.from('rewards').select('*');
    if (error) throw error;
    return data;
  }

  async purchaseReward(childId: string, rewardId: string, price: number) {
    const { data, error } = await supabase
      .from('purchases')
      .insert([{ child_id: childId, reward_id: rewardId, price }]);
    if (error) throw error;
    return data;
  }
}
