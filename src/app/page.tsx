import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-50">
      {/* Navbar Skeleton */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 dark:bg-slate-950/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container flex h-16 items-center justify-between px-4 sm:px-8 max-w-7xl mx-auto">
          <div className="flex gap-2 items-center font-bold text-xl text-blue-800 dark:text-blue-500">
            <span>StudyMind AI</span>
          </div>
          <nav className="hidden md:flex gap-6 text-sm font-medium text-slate-600 dark:text-slate-300">
            <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <Link href="/explore" className="hover:text-blue-600 transition-colors">Explore Topics</Link>
            <Link href="/pricing" className="hover:text-blue-600 transition-colors">Pricing</Link>
            <Link href="/about" className="hover:text-blue-600 transition-colors">About</Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium hover:underline">Log in</Link>
            <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white">
              <Link href="/register">Sign Up</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center p-8 text-center" style={{ minHeight: '65vh' }}>
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 max-w-4xl">
          Learn Anything. <br className="hidden md:block"/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500">
            Master It Faster.
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
          Type any topic, get an AI-generated study guide, quiz yourself, and track your progress.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white h-12 px-8 text-lg rounded-full">
            <Link href="/explore">Start Learning Free</Link>
          </Button>
          <Button size="lg" variant="outline" className="h-12 px-8 text-lg rounded-full">
            Watch How It Works
          </Button>
        </div>

        <div className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-800 w-full max-w-3xl flex flex-col items-center">
          <p className="text-sm text-slate-500 font-medium mb-4 uppercase tracking-wider">Example Topics</p>
          <div className="flex flex-wrap justify-center gap-3">
            {['Quantum Physics', 'World War II', 'Machine Learning', 'Roman Empire'].map(topic => (
              <span key={topic} className="px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-full text-sm font-medium text-slate-700 dark:text-slate-300 shadow-sm">
                {topic}
              </span>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
