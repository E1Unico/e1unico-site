"use client";

import { useSyncExternalStore } from "react";
import AskUnico from "./AskUnico";
import { MANUEL_HOSTS } from "../../lib/hosts";

// The E1 Unico assistant widget belongs on the E1 Unico business site, not on
// Manuel's personal brand pages. Both sites share this same deployment and
// root layout, so this checks the actual browser hostname rather than the
// route pathname — a rewrite makes manuelmontemayor.com/ and e1unico.com/
// resolve to the same pathname ("/") for different sites. useSyncExternalStore
// (instead of a hostname state + effect) avoids a hydration mismatch: the
// server has no hostname to render with, so it renders nothing until the
// client subscribes and reads window.location.
const noopSubscribe = () => () => {};
const getSnapshot = () => !MANUEL_HOSTS.includes(window.location.hostname);
const getServerSnapshot = () => false;

export default function ConditionalAskUnico() {
  const show = useSyncExternalStore(noopSubscribe, getSnapshot, getServerSnapshot);
  if (!show) return null;
  return <AskUnico />;
}
