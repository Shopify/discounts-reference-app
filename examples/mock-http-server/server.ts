import express, { NextFunction, type Request, type Response } from "express";

import discountRouter from "./src/cart-delivery";

const app = express();
const port = 3000;

// Error handling middleware
function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction,
) {
  console.error("Error:", err);
  res.status(500).json({
    error: "Internal server error",
    message: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
}

// To parse the request body as JSON
app.use(express.json());

// To log the request method and url
app.use((req: Request, res: Response, next: NextFunction) => {
  const contentType = req.headers["content-type"];
  console.info(`Request to ${req.method} ${req.url}`);
  console.info(`Content-Type: ${contentType}`);

  // Check if the content type is set correctly for POST requests only
  if (
    req.method === "POST" &&
    (!contentType || !contentType.includes("application/json"))
  ) {
    console.warn("Warning: Content-Type is not set to application/json");
  }

  console.info("Body:", JSON.stringify(req.body, null, 2));
  next();
});

/**
 * @api {get} / Home
 * @apiDescription Returns a welcome message
 * @apiSuccess (200) {string} response welcome message
 */
app.get("/", function (req: Request, res: Response) {
  res
    .status(200)
    .send(
      "The server is running at http://localhost:3000, reach it by posting to /cart-delivery. See the README for more information.",
    );
});

// Add the discount router for combined operations
app.use("/cart-delivery", discountRouter);

// Register error handler
app.use(errorHandler);

// Start the server
app.listen(port, function () {
  console.info(`Server is running at http://localhost:${port}`);
  console.warn("This server is not intended to be used in production.");
});
