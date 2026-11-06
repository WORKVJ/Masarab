/**
 * Re-mounts on every navigation: gives each page a soft entrance and a stable
 * `[data-page]` wrapper that the motion engine and scroll dial look inside.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div data-page className="mx-page-in flex flex-col">
      {children}
    </div>
  );
}
