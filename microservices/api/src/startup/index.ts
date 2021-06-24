import "./env";
import { kernel } from "./kernel";
import "./bundles";

Error.stackTraceLimit = Infinity;

kernel.init().catch((e) => {
  console.error(e);
  process.exit(0);
});
