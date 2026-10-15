import type { CorsOptions } from "cors";

const allowedOrigins = (process.env.CORS_ORIGINS ?? "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

export const corsOptions: CorsOptions = {
  origin: allowedOrigins,
  methods: [
    "GET", 
    "POST", 
    "PUT",
    "PATCH", 
    "DELETE"
  ],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
  ]
};

// усі піддомени myfrontend.com, але не сторонні сайти.

// const corsOptions: CorsOptions = {
//   origin: (origin, callback) => {
//     if (!origin) {
//       return callback(null, true);
//     }

//     const url = new URL(origin);

//     const allowed =
//       url.protocol === "https:" &&
//       (url.hostname === "myfrontend.com" ||
//         url.hostname.endsWith(".myfrontend.com"));

//     callback(null, allowed);
//   },
// };
