const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className="h-full bg-black flex items-center justify-center "
    >
      {children}
    </div>
  );
};

export default AuthLayout;
