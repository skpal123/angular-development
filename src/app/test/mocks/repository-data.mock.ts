import { IRepository } from "src/app/repository/interfaces/repository.interface";

export const repositoryMockData: IRepository = {
    id: '1',
    name: 'angular project task',
    description: 'This is a test project',
    owner: { login: 'Soman' },
    language: 'Typescript',
    stargazers_count: 9999,
    updated_at: new Date().toDateString(),
    html_url: 'https://github.com/skpal123/angular-development',
}