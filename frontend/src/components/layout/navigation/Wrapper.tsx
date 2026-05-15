const Wrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <nav className="fixed top-0 flex justify-center items-center h-20 w-screen bg-surface-section border-b border-border-default shadow-[0_0_10px_2px_black] z-1000">
      {children}
    </nav>
  );
};

export default Wrapper;
