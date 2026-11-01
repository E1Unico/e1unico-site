import { permanentRedirect } from "next/navigation";

// Unico Mobile is now Unico Wireless (2026-11-02). The old address keeps working: it sends visitors to /unicowireless.
export default function UnicoMobileRedirect() {
  permanentRedirect("/unicowireless");
}
