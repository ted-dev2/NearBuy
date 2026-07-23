export default function ShopNotFound() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center bg-zinc-50 px-6 text-center">
      <p className="text-sm font-medium uppercase tracking-wide text-zinc-500">
        NearBuy
      </p>
      <h1 className="mt-2 text-2xl font-bold text-zinc-900">Shop not found</h1>
      <p className="mt-2 max-w-sm text-sm text-zinc-600">
        This venue does not exist or is no longer available.
      </p>
    </main>
  );
}
