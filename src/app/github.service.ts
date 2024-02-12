// Import necessary modules
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GithubService {
  // GitHub API base URL
  private baseUrl = 'https://api.github.com';

  constructor(private http: HttpClient) { }

  // // newly added
  // getRepositories(username: string, page: number, pageSize: number): Observable<any> {
  //   const url = `https://api.github.com/users/${username}/repos?page=${page}&per_page=${pageSize}`;
  //   return this.http.get(url);
  // }

  // Method to fetch repositories by username
  getRepositories(username: string): Observable<any[]> {
    const url = `${this.baseUrl}/users/${username}/repos`;
    return this.http.get<any[]>(url);
  }

  getUserData(username: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/users/${username}`);
  }

  getRepositoryLanguages(username: string, repoName: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/repos/${username}/${repoName}/languages`);
  }

  getRepositoryDescription(username: string, repoName: string): Observable<string> {
    return this.http.get(`${this.baseUrl}/repos/${username}/${repoName}`).pipe(
      map((repo: any) => repo.description)
    );
  }
}

