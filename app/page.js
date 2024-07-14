import Button from "@/components/Button";
import Section from "@/components/Section";
import Hero from "@/containers/Hero";
import Image from "next/image";

export default function Home() {
  return (
    <main className="pt-[4.75rem] lg:pt-[5.75rem] overflow-hidden">
      <Hero />
      <Button >Button</Button>
    </main>
  );
}
