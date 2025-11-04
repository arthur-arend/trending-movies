import "@testing-library/jest-dom";
import { cleanup } from "@testing-library/react";
import { afterAll, afterEach, beforeAll } from "vitest";
import { server } from "./mocks/server";

// Inicia o servidor MSW antes de todos os testes
beforeAll(() => server.listen({ onUnhandledRequest: "error" }));

// Reseta handlers após cada teste
afterEach(() => {
  cleanup();
  server.resetHandlers();
});

// Limpa o servidor após todos os testes
afterAll(() => server.close());
