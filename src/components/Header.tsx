import WebinarLogo from "@/components/webinar/WebinarLogo";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 flex items-center justify-center border-b border-border bg-bg-primary/70 px-6 py-4 backdrop-blur-md">
      <WebinarLogo />
    </header>
  );
}
