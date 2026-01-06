import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ArrowRight, ShieldCheck, Phone, Users } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-background flex flex-col">
      {/* Hero Section */}
      <section className="bg-silver-100 py-20 px-6 text-center border-b border-silver-200">
        <div className="max-w-4xl mx-auto space-y-6">
          <h1 className="text-5xl md:text-6xl font-extrabold text-primary tracking-tight">
            Insurance Made Simple <br /> for Your Second Act
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
            Starting a small business in retirement? We provide clear, affordable coverage tailored for you. No jargon, just protection.
          </p>
          <div className="pt-8">
            <Link href="/quote">
              <Button size="xl" className="text-2xl h-20 px-12 shadow-lg bg-accent-gold hover:bg-accent-gold-light text-white border-none">
                Get a Free Quote <ArrowRight className="ml-3 w-8 h-8" />
              </Button>
            </Link>
          </div>
          <p className="text-lg text-gray-600 pt-4">Takes less than 5 minutes. No commitment required.</p>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="flex flex-col items-center text-center gap-4 border-2 border-silver-200 bg-white">
            <div className="bg-blue-100 p-4 rounded-full text-primary">
              <ShieldCheck size={48} />
            </div>
            <h2 className="text-2xl font-bold text-primary">Tailored Coverage</h2>
            <p className="text-lg text-gray-700">Policies designed specifically for consultants, handymen, and home-based businesses.</p>
          </Card>

          <Card className="flex flex-col items-center text-center gap-4 border-2 border-silver-200 bg-white">
            <div className="bg-blue-100 p-4 rounded-full text-primary">
              <Users size={48} />
            </div>
            <h2 className="text-2xl font-bold text-primary">Senior-Friendly Support</h2>
            <p className="text-lg text-gray-700">Our agents take the time to explain everything clearly. We speak your language.</p>
          </Card>

          <Card className="flex flex-col items-center text-center gap-4 border-2 border-silver-200 bg-white">
            <div className="bg-blue-100 p-4 rounded-full text-primary">
              <Phone size={48} />
            </div>
            <h2 className="text-2xl font-bold text-primary">Here to Help</h2>
            <p className="text-lg text-gray-700">Prefer to talk? Call our dedicated line anytime at <br /> <span className="font-bold">1-800-555-0199</span></p>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-white py-12 px-6 mt-auto">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold text-accent-gold-light">Silver Startup Insurance</h3>
            <p className="text-silver-200 mt-2">© 2026 Silver Startup Inc.</p>
          </div>
          <div className="text-lg">
            <Link href="/accessibility" className="underline hover:text-accent-gold-light">Accessibility Policy</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}