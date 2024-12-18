/* eslint-disable no-prototype-builtins */
import { type ClassValue, clsx } from "clsx";
import qs from "query-string";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// FORMAT DATE TIME
export const formatDateTime = (dateString: Date) => {
  const dateTimeOptions: Intl.DateTimeFormatOptions = {
    weekday: "short", // abbreviated weekday name (e.g., 'Mon')
    month: "short", // abbreviated month name (e.g., 'Oct')
    day: "numeric", // numeric day of the month (e.g., '25')
    hour: "numeric", // numeric hour (e.g., '8')
    minute: "numeric", // numeric minute (e.g., '30')
    hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
  };

  const dateDayOptions: Intl.DateTimeFormatOptions = {
    weekday: "short", // abbreviated weekday name (e.g., 'Mon')
    year: "numeric", // numeric year (e.g., '2023')
    month: "2-digit", // abbreviated month name (e.g., 'Oct')
    day: "2-digit", // numeric day of the month (e.g., '25')
  };

  const dateOptions: Intl.DateTimeFormatOptions = {
    month: "short", // abbreviated month name (e.g., 'Oct')
    year: "numeric", // numeric year (e.g., '2023')
    day: "numeric", // numeric day of the month (e.g., '25')
  };

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "numeric", // numeric hour (e.g., '8')
    minute: "numeric", // numeric minute (e.g., '30')
    hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
  };

  const formattedDateTime: string = new Date(dateString).toLocaleString(
    "nl-NL",
    dateTimeOptions
  );

  const formattedDateDay: string = new Date(dateString).toLocaleString(
    "nl-NL",
    dateDayOptions
  );

  const formattedDate: string = new Date(dateString).toLocaleString(
    "nl-NL",
    dateOptions
  );

  const formattedTime: string = new Date(dateString).toLocaleString(
    "nl-NL",
    timeOptions
  );

  return {
    dateTime: formattedDateTime,
    dateDay: formattedDateDay,
    dateOnly: formattedDate,
    timeOnly: formattedTime,
  };
};

export function formatAmount(amount: number): string {
  const formatter = new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
  });

  return formatter.format(amount);
}

export const parseStringify = (value: any) => JSON.parse(JSON.stringify(value));

export const removeSpecialCharacters = (value: string) => {
  return value.replace(/[^\w\s]/gi, "");
};

interface UrlQueryParams {
  params: string;
  key: string;
  value: string;
}

export function formUrlQuery({ params, key, value }: UrlQueryParams) {
  const currentUrl = qs.parse(params);

  currentUrl[key] = value;

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true }
  );
}

export function getAccountTypeColors(type: AccountTypes) {
  switch (type) {
    case "depository":
      return {
        bg: "bg-blue-25",
        lightBg: "bg-blue-100",
        title: "text-blue-900",
        subText: "text-blue-700",
      };

    case "credit":
      return {
        bg: "bg-success-25",
        lightBg: "bg-success-100",
        title: "text-success-900",
        subText: "text-success-700",
      };

    default:
      return {
        bg: "bg-green-25",
        lightBg: "bg-green-100",
        title: "text-green-900",
        subText: "text-green-700",
      };
  }
}

export function countTransactionCategories(
  transactions: Transaction[]
): CategoryCount[] {
  const categoryCounts: { [category: string]: number } = {};
  let totalCount = 0;

  // Iterate over each transaction
  transactions &&
    transactions.forEach((transaction) => {
      // Extract the category from the transaction
      const category = transaction.category;

      // If the category exists in the categoryCounts object, increment its count
      if (categoryCounts.hasOwnProperty(category)) {
        categoryCounts[category]++;
      } else {
        // Otherwise, initialize the count to 1
        categoryCounts[category] = 1;
      }

      // Increment total count
      totalCount++;
    });

  // Convert the categoryCounts object to an array of objects
  const aggregatedCategories: CategoryCount[] = Object.keys(categoryCounts).map(
    (category) => ({
      name: category,
      count: categoryCounts[category],
      totalCount,
    })
  );

  // Sort the aggregatedCategories array by count in descending order
  aggregatedCategories.sort((a, b) => b.count - a.count);

  return aggregatedCategories;
}

export function extractCustomerIdFromUrl(url: string) {
  // Split the URL string by '/'
  const parts = url.split("/");

  // Extract the last part, which represents the customer ID
  const customerId = parts[parts.length - 1];

  return customerId;
}

export function encryptId(id: string) {
  return btoa(id);
}

export function decryptId(id: string) {
  return atob(id);
}

export const getTransactionStatus = (date: Date) => {
  const today = new Date();
  const twoDaysAgo = new Date(today);
  twoDaysAgo.setDate(today.getDate() - 2);

  return date > twoDaysAgo ? "Processing" : "Success";
};

// export const authFormSchema = (type: string) => z.object({
//   // registreren
//   firstName: type === 'inloggen' ? z.string({ required_error: "Vereist", }).optional() : z.string({ required_error: "Vereist", }).min(2, { message: "Voornaam moet minimaal 2 tekens bevatten" }),
//   lastName: type === 'inloggen' ? z.string({ required_error: "Vereist", }).optional() : z.string({ required_error: "Vereist", }).min(2, { message: "Achternaam moet minimaal 2 tekens bevatten" }),
//   address1: type === 'inloggen' ? z.string({ required_error: "Vereist", }).optional() : z.string({ required_error: "Vereist", }).regex(/^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z\d\s]+$/, { message: "Adres moet zowel een straatnaam en huisnummer bevatten", }).max(50, { message: "Adres mag maximaal 50 tekens bevatten" }),
//   state: type === 'inloggen' ? z.string({ required_error: "Vereist", }).optional() : z.string({ required_error: "Vereist", }).regex(/^[a-zA-Z\s]+$/, { message: "Plaats mag alleen letters bevatten, geen cijfers of symbolen", }).min(2, { message: "Plaats moet minimaal 2 tekens bevatten" }),
//   city: type === 'inloggen' ? z.string({ required_error: "Vereist", }).optional() : z.string({ required_error: "Vereist", }).regex(/^[a-zA-Z\s]+$/, { message: "Plaats mag alleen letters bevatten, geen cijfers of symbolen", }).min(2, { message: "Plaats moet minimaal 2 tekens bevatten" }),
//   postalCode: type === 'inloggen' ? z.string({ required_error: "Vereist", }).optional() : z.string({ required_error: "Vereist", }).regex(/^\d{4}[A-Za-z]{2}$/, { message: "Postcode moet bestaan uit 4 cijfers en 2 letters (bijvoorbeeld 1234AB)", }).min(6, { message: 'Postcode moet minimaal 6 tekens lang zijn' }).max(6),
//   dateOfBirth: type === 'inloggen' ? z.string({ required_error: "Vereist", }).optional() : z.string({ required_error: "Vereist", }).regex(/^\d{2}-\d{2}-\d{4}$/, { message: "Geboortedatum moet het formaat DD-MM-JJJJ hebben (bijvoorbeeld 01-01-2000)", }).min(10, { message: "Geboortedatum moet minimaal 2 tekens bevatten" }).max(10),
//   bsn: type === 'inloggen' ? z.string({ required_error: "Vereist", }).optional() : z.string({ required_error: "Vereist", }).regex(/^\d{9}$/, { message: "BSN moet precies 9 cijfers bevatten", }).min(9, { message: "BSN moet minimaal 2 tekens bevatten" }).max(9),
//   // beide
//   email: z.string({ required_error: "Vereist", }).email({ message: "Vul een geldig mailadres in" }),
//   password: z.string({ required_error: "Vereist", }).min(8, { message: "Wachtwoord moet minimaal 8 tekens bevatten" }),
// })

export const authFormSchema = (type: string) => z.object({
  // sign up
  firstName: type === 'inloggen' ? z.string().optional() : z.string().min(3),
  lastName: type === 'inloggen' ? z.string().optional() : z.string().min(3),
  address1: type === 'inloggen' ? z.string().optional() : z.string().max(50),
  city: type === 'inloggen' ? z.string().optional() : z.string().max(50),
  state: type === 'inloggen' ? z.string().optional() : z.string().min(2).max(2),
  postalCode: type === 'inloggen' ? z.string().optional() : z.string().min(3).max(6),
  dateOfBirth: type === 'inloggenn' ? z.string().optional() : z.string().min(3),
  ssn: type === 'inloggen' ? z.string().optional() : z.string().min(3),
  // both
  email: z.string().email(),
  password: z.string().min(8),
})