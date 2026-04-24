/**
 * Invite URL for the VIP WhatsApp group.
 * Set `VITE_WHATSAPP_GROUP_URL` in `.env` (see `.env.example`).
 */
const FALLBACK_WHATSAPP = "https://achadinhosdobransa.com.br/vip";

export const WHATSAPP_GROUP_URL =
  (import.meta.env.VITE_WHATSAPP_GROUP_URL as string | undefined)?.trim() || FALLBACK_WHATSAPP;
