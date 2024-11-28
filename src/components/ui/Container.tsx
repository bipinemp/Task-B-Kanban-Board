interface ContainerProps {
  children: React.ReactNode;
}

export default function Container({ children }: ContainerProps) {
  return (
    <div className="max-w-[1920px] bg-[#8F3F65] min-h-screen w-full mx-auto px-4 2xl:px-52">
      {children}
    </div>
  );
}
