const Copyright = () => {
  const year = new Date().getFullYear();

  return (
    <div className="flex flex-col items-center gap-3 py-6 max-w-300 w-full border-t border-white/25">
      <p className="text-sm">&copy; {year} ChatApp. All rights reserved.</p>
      <p className="text-xs">
        Build with 💖 by{" "}
        <a
          href="https://github.com/Kretostan"
          target="_blank"
          rel="noopener noreferer"
          className="text-primary"
        >
          Jakub Kret
        </a>
      </p>
    </div>
  );
};

export default Copyright;
