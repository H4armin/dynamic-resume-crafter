// Type declarations for Deno modules
declare module "https://deno.land/std@0.168.0/http/server.ts" {
  export function serve(handler: (request: Request) => Promise<Response>): void;
}

declare module "https://deno.land/x/xhr@0.1.0/mod.ts" {
  // This is just a placeholder, as this module is used for its side effects
}
