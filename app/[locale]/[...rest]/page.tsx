import { notFound } from "next/navigation";

// Routes every unmatched localized path to the localized not-found page.
export default function CatchAllPage() {
  notFound();
}
