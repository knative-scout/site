export default interface ServerlessApp {
    app_id: string;
    name: string;
    version: string;
    author: string;
    tagline: string;
    logo_url: string;
    description: string;
    tags: string[];
    maintainer: string;
    categories: string[];
    verification_status: string[];
    github_url: string;
    screenshots_urls: string[];
    deployment_file_urls: string[];
}