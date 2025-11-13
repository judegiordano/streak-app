import { invoke } from "@tauri-apps/api/core";

import { Streak } from "../types";

export const invokeGetStreak = () => invoke<Streak>("get_streak")
