import { sileo } from "sileo";

export const notify = {
  success: (message: string, description?: string) =>
    sileo.success({
      title: message,
      description: description,
      fill: "black",
      styles: { title: "text-white!", description: "text-white/75" },
      duration: 5000,
    }),
  error: (message: string, description?: string) =>
    sileo.error({
      title: message,
      description: description,
      fill: "black",
      styles: { title: "text-white!", description: "text-white/75" },
      duration: 5000,
    }),
};
