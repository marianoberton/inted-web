export default function BackgroundVideo() {
    return (
      <div className="relative w-full h-screen overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 clip-video"></div>
        <video className="absolute inset-0 w-full h-full object-cover" autoPlay loop muted>
          <source src="/videos/drone_fpv_facultad_derecho.mp4" type="video/mp4" />
        </video>
      </div>
    );
  }
  