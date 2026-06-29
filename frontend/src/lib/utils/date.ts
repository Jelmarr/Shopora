type DateInput = Date | string | number | null | undefined;

/**
 * Safely converts a loose date input into a valid JavaScript Date object.
 */
const toDate = (date: DateInput): Date | null => {
  if (!date) return null;
  const parsed = new Date(date);
  return isNaN(parsed.getTime()) ? null : parsed;
};

export const formatDate = {
  /**
   * Returns a standard short format.
   * Example: "Oct 24, 2026"
   */
  short(date: DateInput, locale = "en-US"): string {
    const d = toDate(date);
    if (!d) return "";
    return new Intl.DateTimeFormat(locale, {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(d);
  },

  /**
   * Returns a comprehensive written format.
   * Example: "Saturday, October 24, 2026"
   */
  long(date: DateInput, locale = "en-US"): string {
    const d = toDate(date);
    if (!d) return "";
    return new Intl.DateTimeFormat(locale, {
      dateStyle: "full",
    }).format(d);
  },

  /**
   * Returns a numeric format common for tables or inputs.
   * Example: "10/24/2026"
   */
  numeric(date: DateInput, locale = "en-US"): string {
    const d = toDate(date);
    if (!d) return "";
    return new Intl.DateTimeFormat(locale, {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    }).format(d);
  },

  /**
   * Returns a string pairing the short date with a 12-hour timestamp.
   * Example: "Oct 24, 2026, 2:30 PM"
   */
  dateTime(date: DateInput, locale = "en-US"): string {
    const d = toDate(date);
    if (!d) return "";
    return new Intl.DateTimeFormat(locale, {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }).format(d);
  },

  /**
   * Returns a relative string timeline indicator (e.g. "Just now", "3 days ago").
   */
  relative(date: DateInput, locale = "en-US"): string {
    const d = toDate(date);
    if (!d) return "";

    const ms = d.getTime() - Date.now();
    const sec = Math.round(ms / 1000);
    const min = Math.round(sec / 60);
    const hr = Math.round(min / 60);
    const day = Math.round(hr / 24);

    const rtf = new Intl.RelativeTimeFormat(locale, { numeric: "auto" });

    if (Math.abs(sec) < 45) return "just now";
    if (Math.abs(min) < 60) return rtf.format(min, "minute");
    if (Math.abs(hr) < 24) return rtf.format(hr, "hour");
    if (Math.abs(day) < 30) return rtf.format(day, "day");

    // Fallback to standard short format if it's older than a month
    return this.short(d, locale);
  },
};
