"use client"

import { useState } from "react"

import { GlassActionButton } from "@workspace/ui/components/liquid-glass/glass-action-button"

async function failingUpload() {
  await new Promise((resolve) => setTimeout(resolve, 1500))
  throw new Error("The file could not be read.")
}

export function GlassActionButtonError() {
  const [message, setMessage] = useState("")

  return (
    <div className="flex flex-col items-center gap-4">
      <GlassActionButton
        material="tinted"
        className="bg-primary text-primary-foreground"
        pendingLabel="Uploading"
        successLabel="Uploaded"
        onAction={() => {
          setMessage("")
          return failingUpload()
        }}
        onActionError={(error) =>
          setMessage(error instanceof Error ? error.message : "Upload failed.")
        }
      >
        Upload report
      </GlassActionButton>
      <p role="alert" className="min-h-5 text-sm text-destructive">
        {message}
      </p>
    </div>
  )
}
