declare namespace Cloudflare {
  interface Env {
    DB?: D1Database;
    BUCKET?: R2Bucket;
    PASSUS_SETUP_EMAIL?: string;
    PASSUS_SETUP_TOKEN?: string;
    PASSUS_MAIL_API_KEY?: string;
    PASSUS_MAIL_FROM?: string;
    PASSUS_PUBLIC_ORIGIN?: string;
    PASSUS_ADMIN_PREVIEW?: string;
  }
}
