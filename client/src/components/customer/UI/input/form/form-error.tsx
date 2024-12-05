export function FormError({
  error,
  className,
}: {
  error: string;
  className?: string;
}) {
  return (
    <p className={`text-red-500 text-sm font-semibold ${className}`}>{error}</p>
  );
}
