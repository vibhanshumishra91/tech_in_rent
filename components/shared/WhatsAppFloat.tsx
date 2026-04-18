import { FaWhatsapp } from "react-icons/fa6";

export default function WhatsAppFloat() {
  return (
    <a
      href="https://wa.me/917898711748"
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-50 inline-flex h-12 w-12 items-center justify-center rounded-full bg-emerald-600 text-white shadow-lg shadow-emerald-500/35 transition duration-300 hover:-translate-y-0.5 hover:bg-emerald-500"
    >
      <FaWhatsapp size={20} />
    </a>
  );
}
