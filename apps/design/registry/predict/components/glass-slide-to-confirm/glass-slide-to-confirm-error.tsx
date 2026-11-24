"use client"

import { GlassSlideToConfirm } from "@workspace/ui/components/liquid-glass/glass-slide-to-confirm"

async function failingPayment() {
  await new Promise((resolve) => setTimeout(resolve, 1500))
  throw new Error("Payment declined")
}

export function GlassSlideToConfirmError() {
  return (
    <GlassSlideToConfirm
      className="max-w-xs"
      hint={false}
      fillClassName="bg-primary text-primary-foreground"
      pendingLabel="Paying"
      errorLabel="Payment declined, try again"
      onConfirm={failingPayment}
    >
      Slide to pay
    </GlassSlideToConfirm>
  )
}
