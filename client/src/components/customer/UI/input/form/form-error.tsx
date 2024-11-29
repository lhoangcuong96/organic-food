export function FormError({ error }: { error: string }) {
  return <p className="text-red-500 text-sm font-semibold">{error}</p>;
}
