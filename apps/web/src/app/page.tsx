import { Logo } from "@workspace/ui/predict/logo"

export default function Page() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center gap-6 p-6 text-center">
      
      <Logo className="h-8 w-auto text-foreground" />
      <div className="flex max-w-md flex-col gap-2">
        <h1 className="text-heading-24 leading-tight font-medium tracking-tight">Understand your biology</h1>
        <p className="text-base text-muted-foreground">
          See what your biomarkers say about your biological age, muscle health, and long-term health. Coming soon.
        </p>
      </div>
    </main>
  )
}
