import {vi} from "vitest";

export const getAuth = vi.fn(() => ({
    // Mock authentication object
    currentUser: vi.fn(),
    signInWithEmailAndPassword: vi.fn(),
    // Add other mock methods as needed for your tests
}));