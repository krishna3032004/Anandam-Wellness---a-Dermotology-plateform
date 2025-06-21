// components/LoadingOverlay.jsx
export default function LoadingOverlay() {
    return (
      <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center backdrop-blur-sm">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin" />
          {/* <p className="text-white text-lg font-semibold animate-pulse">Loading...</p> */}
        </div>
      </div>
    );
  }
  