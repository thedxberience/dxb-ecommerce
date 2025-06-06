"use client";
import { create } from "zustand";

interface PaginationStore {
    currentPage: number;
    itemsPerPage: number;
    lastIdPerPage: Record<number, string>; // Maps page number to the last product ID on that page
    setCurrentPage: (page: number) => void;
    setItemsPerPage: (items: number) => void;
    setLastIdPerPage: (page: number, id: string) => void;
    getLastIdPerPage: (page: number) => string | undefined;
}

export const usePaginationStore = create<PaginationStore>()(
    (set, get) => ({
        currentPage: 1,
        itemsPerPage: 12,
        lastIdPerPage: {},
        setCurrentPage: (page) => set({ currentPage: page }),
        setItemsPerPage: (items) => set({ itemsPerPage: items }),
        setLastIdPerPage: (page, id) => set((state) => ({
            lastIdPerPage: { ...state.lastIdPerPage, [page]: id }
        })),
        getLastIdPerPage: (page) => {
            return page in get().lastIdPerPage ? get().lastIdPerPage[page] : undefined;
        }
    }),
);