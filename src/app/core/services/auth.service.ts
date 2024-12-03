import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { supabase } from './supabase.client';
import { UserWithRole } from '../models/user-with-role.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(
    this.checkInitialAuthState()
  );
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  private currentUser: UserWithRole | null = this.getCurrentUser();

  private isLocalStorageAvailable(): boolean {
    return typeof localStorage !== 'undefined';
  }

  private checkInitialAuthState(): boolean {
    if (!this.isLocalStorageAvailable()) {
      return false;
    }
    return !!localStorage.getItem('user');
  }

  private mapToUser(data: any): UserWithRole {
    return {
      id: data.id,
      name: data.name,
      email: data.email,
      role: data.role,
      profilePictureNumber: data.profilePictureNumber || 1,
    };
  }

  async login(email: string, password: string): Promise<UserWithRole> {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .eq('password', password)
      .single();

    if (error || !data) {
      throw new Error('Credenciais inválidas');
    }

    const user = this.mapToUser(data);

    if (this.isLocalStorageAvailable()) {
      localStorage.setItem('user', JSON.stringify(user));
    }
    this.isAuthenticatedSubject.next(true);
    this.currentUser = user;

    return user;
  }

  async register(
    name: string,
    email: string,
    password: string,
    profilePictureNumber: number = 20
  ): Promise<UserWithRole> {
    const { data, error } = await supabase
      .from('users')
      .insert({
        name,
        email,
        password,
        role: 'user',
        profilePictureNumber,
      })
      .select('*')
      .single();

    if (error || !data) {
      throw new Error('Erro ao registrar usuário');
    }

    return this.mapToUser(data);
  }

  logout(): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.removeItem('user');
    }
    this.isAuthenticatedSubject.next(false);
    this.currentUser = null;
  }

  getCurrentUser(): UserWithRole | null {
    if (!this.currentUser && this.isLocalStorageAvailable()) {
      const user = localStorage.getItem('user');
      this.currentUser = user ? JSON.parse(user) : null;
    }
    return this.currentUser;
  }

  getUserRole(): string | null {
    const user = this.getCurrentUser();
    return user ? user.role : null;
  }

  isAuthenticated(): boolean {
    return !!this.getCurrentUser();
  }
}
