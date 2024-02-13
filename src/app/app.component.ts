import { Component } from '@angular/core';
import { GithubService } from './github.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  username: string = ''; // Property to store the entered username
  repositories: any[] = [];
  userProfilePhotoUrl: string = ''; // Property to store the user's profile photo URL
  userProfileName: string = ''; // Property to store the user's GitHub username

  constructor(private githubService: GithubService) {}

  fetchRepositories() {
    // Check if the username is provided
    if (!this.username) {
      console.error('Please enter a GitHub username');
      return;
    }

    // Fetch user data (including profile photo and username)
    this.githubService.getUserData(this.username).subscribe(
      (userData) => {
        this.userProfilePhotoUrl = userData.avatar_url;
        this.userProfileName = userData.login;

        // Fetch repositories using the entered username
        this.githubService.getRepositories(this.username).subscribe(
          (repos) => {
            this.repositories = repos;

            this.githubService.getRepositories(this.username).subscribe(
              (repos) => {
                // Fetch repository details including description
                this.repositories = repos.map(repo => {
                  return {
                    name: repo.name,
                    description: repo.description, // Store repository description
                    languages_url: repo.languages_url // You may need this URL for fetching languages separately
                  };
                });
      
                // Fetch repository languages
                this.repositories.forEach(repo => {
                  this.githubService.getRepositoryLanguages(this.username, repo.name).subscribe(
                    (languages) => {
                      repo.languages = Object.keys(languages); // Store languages used in the repository
                    },
                    (error) => {
                      console.error('Error fetching repository languages:', error);
                    }
                  );
                });
              },
              (error) => {
                console.error('Error fetching repositories:', error);
              }
            );

          },
          (error) => {
            console.error('Error fetching repositories:', error);
          }
        );
      },
      (error) => {
        console.error('Error fetching user data:', error);
      }
    );

  }

}

