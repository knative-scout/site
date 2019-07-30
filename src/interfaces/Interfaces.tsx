/**
 * Type representing all info of a single serverless app.
 */
export default interface ServerlessApp {
    name: string;
    homepage_url: string;
    tagline: string;
    tags: string[];
    categories: string[];
    author: {
	   name: string,
	   email: string
    };
    app_id: string;
    description: string;
    screenshot_urls: string[];
    logo_url: string;
    verification_status: string;
    github_url: string;
    version: string;
    site_url: string;
}
