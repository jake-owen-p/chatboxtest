import { Role } from "@/types/chat"

export interface AuditEntry {
  role: Role
  content: string
  timestamp: string
}

const auditStore: AuditEntry[] = []

export function auditMessage(entry: AuditEntry): void {
  auditStore.push(entry)
}