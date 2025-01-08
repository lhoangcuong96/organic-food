import Spinner from "@/components/ui/page-spinner";

export default function Loading() {
  return (
    <div className="flex items-center justify-center w-screen h-screen bg-slate-700">
      <Spinner></Spinner>
    </div>
  );
}
