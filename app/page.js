import Button from "@/components/Button";
import Header from "@/containers/Header";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Header />
      <Button >Button</Button>
    </main>
  );
}