// src/client/views/parallel-copilot.view/view.ts
// This file is a placeholder for type definitions or interfaces specific to the view.
// It can be expanded as needed.

import { ParsedResponse } from "@/common/types/pcpp.types";

export interface TabState {
    rawContent: string;
    parsedContent: ParsedResponse | null;
}