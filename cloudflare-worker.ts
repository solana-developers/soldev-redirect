// See https://developers.cloudflare.com/workers/examples/redirect/
export default {
  async fetch(request): Promise<Response> {
    const PERMANENT_REDIRECT = 301;

    const url = new URL(request.url);
    const { pathname } = url;

    let destination = "https://www.ironforge.cloud/";

    if (pathname.startsWith("/course")) {
      destination = "https://solana.com/developers/courses";
    }

    console.log(`Redirecting ${pathname} to ${destination}`);

    return Response.redirect(`destination`, PERMANENT_REDIRECT);
  },
} satisfies ExportedHandler;
