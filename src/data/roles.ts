export const NORMAL_ROLE_ID = 'normal'
export const SPY_ROLE_ID = 'spy'
export const CHAOS_ROLE_ID = 'chaos'
export const ROLE_IDS = [NORMAL_ROLE_ID, SPY_ROLE_ID, CHAOS_ROLE_ID] as const

export type RoleId = typeof ROLE_IDS[number]
