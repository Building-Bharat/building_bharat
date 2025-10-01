// components/Loader.tsx
export default function Loader() {
  return (
    <div className="flex items-center justify-center h-64 w-full mx-auto">
      <div className="relative w-16 h-16">
        <div className="absolute w-16 h-16 border-4 border-[#F97C04] border-t-transparent rounded-full animate-spin"></div>
        <div className="absolute w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin slow-spin"></div>
      </div>
    </div>
  );
}
