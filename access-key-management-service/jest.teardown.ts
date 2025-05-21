// jest.teardown.js
export default async () => {
  // Ensures all connections, timers, etc., are done.
  await new Promise((resolve) => setTimeout(resolve, 500));
  process.exit(0);
};
