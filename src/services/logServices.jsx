
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";

function init() {

    // Sentry.init({ dsn: "https://3e3594a5f3b046e99835e1081cd4d8d6@o432736.ingest.sentry.io/5386827" });
    Sentry.init({
        dsn: "https://3f5d4255478c4546983daa7018a5503d@o432736.ingest.sentry.io/5823979",
        integrations: [new Integrations.BrowserTracing()],
      
        // Set tracesSampleRate to 1.0 to capture 100%
        // of transactions for performance monitoring.
        // We recommend adjusting this value in production
        tracesSampleRate: 1.0,
      });
}

function log () {
    // logging errors
}

export default {
    init,
    log
}