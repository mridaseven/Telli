import InfoPage from "@/components/InfoPage";

export const metadata = {
  title: "About us — Phonem",
};

export default function AboutPage() {
  return (
    <InfoPage
      title="About us"
      body={[
        "Phonem gives premium iPhones a second life. Every device is carefully refurbished, tested, and restored so it's as good as new.",
        "Our mission is simple: make great technology affordable and sustainable, without compromise.",
      ]}
    />
  );
}
