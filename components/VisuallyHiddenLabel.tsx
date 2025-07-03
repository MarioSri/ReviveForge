"use client";
export default function VisuallyHiddenLabel({
  htmlFor,
  children,
}: {
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <label htmlFor={htmlFor} className="sr-only">
      {children}
    </label>
  );
}
