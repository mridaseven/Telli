import InfoPage from "@/components/InfoPage";

export const metadata = {
  title: "Helpdesk — Phonem",
};

export default function HelpdeskPage() {
  return (
    <InfoPage
      title="Helpdesk"
      body={[
        "Need a hand? We're here to help with orders, returns, and any questions about your refurbished iPhone.",
        "Reach us by email at support@phonem.com or call us during business hours. We usually reply within one working day.",
      ]}
    />
  );
}
