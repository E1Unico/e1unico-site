// Client-side checkout helper
export async function goToCheckout(product: string) {
  const res = await fetch("/api/checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ product }),
  });
  const { url } = await res.json();
  if (url) window.location.href = url;
}
