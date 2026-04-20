export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0a0a0a]">
      {/* Logo */}
      <div className="flex flex-col items-center gap-10">
        <img
          src="/verq.png"
          alt="Verq"
          className="w-32 sm:w-40 animate-pulse"
          style={{ filter: "brightness(1.1)" }}
        />

        {/* Progress bar */}
        <div className="w-48 sm:w-64 h-[1px] bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#FF3D00] rounded-full"
            style={{
              animation: "loader-bar 1.6s ease-in-out infinite",
            }}
          />
        </div>

        {/* Dots */}
        <div className="flex gap-2">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-[#FF3D00]"
              style={{
                animation: `loader-dot 1.2s ease-in-out ${i * 0.2}s infinite`,
              }}
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes loader-bar {
          0%   { transform: translateX(-100%); }
          50%  { transform: translateX(0%);    }
          100% { transform: translateX(100%);  }
        }
        @keyframes loader-dot {
          0%, 100% { opacity: 0.2; transform: translateY(0);    }
          50%       { opacity: 1;   transform: translateY(-6px); }
        }
      `}</style>
    </div>
  );
}
