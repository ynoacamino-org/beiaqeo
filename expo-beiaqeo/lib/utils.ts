import { PocketBaseConfig } from "@/config/global"
import { clsx, type ClassValue } from "clsx"
import { AuthRecord } from "pocketbase"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function extractAvatar(authRecord: AuthRecord): string {
  return `${PocketBaseConfig.url}/api/files/${authRecord?.collectionId}/${authRecord?.id}/${authRecord?.avatar}`
}
