import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Recycle, BarChart3, Shield, Leaf, ChevronDown } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900">
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:bg-gray-900/95 dark:border-gray-800">
        <div className="container flex h-16 items-center justify-between">
          <Link className="flex items-center gap-2" href="#">
            <Recycle className="h-8 w-8 text-emerald-600 dark:text-emerald-500" />
            <span className="text-xl font-bold tracking-tight">RecycleX</span>
          </Link>
          <nav className="hidden md:flex gap-6 items-center">
            <div className="relative group">
              <button className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-emerald-600 dark:text-gray-300 dark:hover:text-emerald-500">
                Solutions <ChevronDown className="h-4 w-4 opacity-50" />
              </button>
              <div className="absolute top-full left-0 mt-2 w-48 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 dark:bg-gray-800">
                <div className="py-1">
                  <Link className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700" href="#">Enterprise Solutions</Link>
                  <Link className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700" href="#">SMB Solutions</Link>
                  <Link className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700" href="#">Government</Link>
                </div>
              </div>
            </div>
            <Link className="text-sm font-medium text-gray-700 hover:text-emerald-600 dark:text-gray-300 dark:hover:text-emerald-500" href="#">
              Pricing
            </Link>
            <Link className="text-sm font-medium text-gray-700 hover:text-emerald-600 dark:text-gray-300 dark:hover:text-emerald-500" href="#">
              Case Studies
            </Link>
            <Link className="text-sm font-medium text-gray-700 hover:text-emerald-600 dark:text-gray-300 dark:hover:text-emerald-500" href="#">
              About
            </Link>
            <Link className="text-sm font-medium text-gray-700 hover:text-emerald-600 dark:text-gray-300 dark:hover:text-emerald-500" href="/dashboard">
              Dashboard
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link className="text-sm font-medium text-gray-700 hover:text-emerald-600 dark:text-gray-300 dark:hover:text-emerald-500 hidden md:inline-flex" href="/login">
              Sign In
            </Link>
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white" asChild>
              <Link href="/demo">Request Demo</Link>
            </Button>
            <button className="md:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                <line x1="4" x2="20" y1="12" y2="12" />
                <line x1="4" x2="20" y1="6" y2="6" />
                <line x1="4" x2="20" y1="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-br from-emerald-50 to-teal-100 dark:from-gray-900 dark:to-gray-800">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <div className="inline-flex items-center rounded-lg bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-800 dark:bg-emerald-800/30 dark:text-emerald-400">
                  <Leaf className="mr-1 h-4 w-4" />
                  Sustainable Enterprise Solutions
                </div>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl text-gray-900 dark:text-white">
                  <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent dark:from-emerald-400 dark:to-teal-300">RecycleX</span> Platform
                </h1>
                <p className="max-w-[600px] text-gray-600 md:text-xl xl:text-2xl dark:text-gray-400">
                  Enterprise-grade AI-powered recycling intelligence platform for comprehensive waste management and sustainability tracking.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white" asChild>
                    <Link href="/schedule-consultation">
                      Schedule Consultation <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" className="border-emerald-600 text-emerald-600 hover:bg-emerald-50 dark:border-emerald-500 dark:text-emerald-500 dark:hover:bg-emerald-950" asChild>
                    <Link href="/case-studies">View Case Studies</Link>
                  </Button>
                </div>
                <div className="flex items-center gap-4 pt-4">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className={`h-8 w-8 rounded-full border-2 border-white bg-emerald-${i*100} dark:border-gray-800`}></div>
                    ))}
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Trusted by over 500+ enterprise clients worldwide</p>
                </div>
              </div>
              <div className="rounded-xl bg-gradient-to-br from-white to-gray-100 p-8 shadow-xl dark:from-gray-800 dark:to-gray-900 hidden lg:block">
                <div className="aspect-video bg-gray-100 rounded-lg dark:bg-gray-700 flex items-center justify-center">
                  <span className="text-sm text-gray-500 dark:text-gray-400">Enterprise Dashboard Preview</span>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-20 border-t border-gray-200 dark:border-gray-800">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Enterprise-Grade Features</h2>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                RecycleX delivers comprehensive waste management analytics with powerful AI detection capabilities
              </p>
            </div>
            <div className="grid gap-8 lg:grid-cols-3">
              <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 transition-all duration-200 hover:shadow-md dark:bg-gray-800 dark:border-gray-700">
                <div className="h-12 w-12 rounded-lg bg-emerald-100 flex items-center justify-center mb-6 dark:bg-emerald-900">
                  <Recycle className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">AI Material Recognition</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Our proprietary deep learning algorithms identify and classify recyclable materials with 99.8% accuracy in real-time.
                </p>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <svg className="mr-2 h-4 w-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Multi-stream waste separation
                  </li>
                  <li className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <svg className="mr-2 h-4 w-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Contamination detection
                  </li>
                </ul>
              </div>
              <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 transition-all duration-200 hover:shadow-md dark:bg-gray-800 dark:border-gray-700">
                <div className="h-12 w-12 rounded-lg bg-emerald-100 flex items-center justify-center mb-6 dark:bg-emerald-900">
                  <BarChart3 className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Comprehensive Analytics</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Gain actionable insights with detailed reporting on material recovery rates, carbon impact, and cost savings.
                </p>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <svg className="mr-2 h-4 w-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    ESG reporting compliance
                  </li>
                  <li className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <svg className="mr-2 h-4 w-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Customizable dashboards
                  </li>
                </ul>
              </div>
              <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 transition-all duration-200 hover:shadow-md dark:bg-gray-800 dark:border-gray-700">
                <div className="h-12 w-12 rounded-lg bg-emerald-100 flex items-center justify-center mb-6 dark:bg-emerald-900">
                  <Shield className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Enterprise Security</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  SOC 2 Type II certified infrastructure with end-to-end encryption and role-based access controls.
                </p>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <svg className="mr-2 h-4 w-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Single sign-on (SSO)
                  </li>
                  <li className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <svg className="mr-2 h-4 w-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Audit logging
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-20 bg-gray-50 dark:bg-gray-900">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col md:flex-row gap-10 items-center">
              <div className="flex-1 space-y-4">
                <div className="inline-flex items-center rounded-lg bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-800 dark:bg-emerald-800/30 dark:text-emerald-400">
                  Client Success
                </div>
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Proven Results for Enterprise Clients</h2>
                <p className="text-lg text-gray-600 dark:text-gray-400">
                  Our enterprise clients report an average of 42% improvement in recyclable recovery and 37% reduction in waste management costs.
                </p>
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="bg-white p-4 rounded-lg shadow-sm dark:bg-gray-800">
                    <p className="text-4xl font-bold text-emerald-600 dark:text-emerald-500">78%</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Average increase in recycling rates</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm dark:bg-gray-800">
                    <p className="text-4xl font-bold text-emerald-600 dark:text-emerald-500">$2.4M</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Average annual cost savings</p>
                  </div>
                </div>
                <Button variant="outline" className="mt-4" asChild>
                  <Link href="/success-stories">View Success Stories</Link>
                </Button>
              </div>
              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white rounded-lg p-6 shadow-sm dark:bg-gray-800">
                  <svg viewBox="0 0 24 24" className="h-10 w-10 text-emerald-500 mb-4" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10Z" />
                  </svg>
                  <p className="italic text-gray-600 dark:text-gray-400 mb-4">
                    "RecycleX transformed our sustainability program. The platform's analytics have been instrumental in helping us achieve our ESG goals."
                  </p>
                  <p className="font-medium text-gray-900 dark:text-white">Sarah Johnson</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Chief Sustainability Officer</p>
                </div>
                <div className="bg-white rounded-lg p-6 shadow-sm dark:bg-gray-800">
                  <svg viewBox="0 0 24 24" className="h-10 w-10 text-emerald-500 mb-4" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10Z" />
                  </svg>
                  <p className="italic text-gray-600 dark:text-gray-400 mb-4">
                    "The ROI with RecycleX was evident within the first quarter. Their enterprise solution exceeded our expectations."
                  </p>
                  <p className="font-medium text-gray-900 dark:text-white">Michael Chen</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Director of Operations</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-20">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Ready to Transform Your Recycling Program?</h2>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Join industry leaders who are using RecycleX to meet sustainability goals and reduce waste management costs.
              </p>
            </div>
            <div className="mx-auto max-w-sm md:max-w-md lg:max-w-lg">
              <div className="bg-white rounded-xl p-8 shadow-md border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Schedule a Consultation</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-900 dark:text-white" htmlFor="first-name">
                        First name
                      </label>
                      <input
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent dark:border-gray-700"
                        id="first-name"
                        placeholder="First name"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-900 dark:text-white" htmlFor="last-name">
                        Last name
                      </label>
                      <input
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent dark:border-gray-700"
                        id="last-name"
                        placeholder="Last name"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-900 dark:text-white" htmlFor="email">
                      Work email
                    </label>
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent dark:border-gray-700"
                      id="email"
                      placeholder="you@company.com"
                      type="email"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-900 dark:text-white" htmlFor="company">
                      Company
                    </label>
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent dark:border-gray-700"
                      id="company"
                      placeholder="Your company"
                    />
                  </div>
                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">Request Demo</Button>
                  <p className="text-xs text-center text-gray-500 dark:text-gray-400">
                    By submitting this form, you agree to our
                    <Link className="underline underline-offset-2 hover:text-emerald-600" href="#">
                      {" "}
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link className="underline underline-offset-2 hover:text-emerald-600" href="#">
                      Privacy Policy
                    </Link>
                    .
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900">
        <div className="container px-4 md:px-6 py-12">
          <div className="grid gap-8 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <Recycle className="h-8 w-8 text-emerald-600 dark:text-emerald-500" />
                <span className="text-xl font-bold tracking-tight">RecycleX</span>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4 max-w-sm">
                Enterprise-grade recycling intelligence platform transforming sustainable waste management.
              </p>
              <div className="flex gap-4">
                <a href="#" className="text-gray-500 hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-500">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-500 hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-500">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-gray-500 hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-500">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-500 hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-500">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022.022.044.044.066.066a35.22 35.22 0 011.823 3.496 8.4 8.4 0 01-3.353 3.575zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-500 hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-500">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm0 2c4.41 0 8 3.59 8 8s-3.59 8-8 8-8-3.59-8-8 3.59-8 8-8zm.91 12.5c-.27 0-.53-.05-.79-.15-.24-.1-.45-.24-.63-.42-.18-.18-.32-.39-.42-.63-.1-.25-.15-.51-.15-.79h-2c0 .55.11 1.07.32 1.56.21.49.5.93.87 1.31.37.37.8.67 1.31.87.49.21 1.01.32 1.56.32.55 0 1.07-.11 1.56-.32.49-.21.93-.5 1.31-.87.37-.37.67-.8.87-1.31.21-.49.32-1.01.32-1.56h-2c0 .28-.05.54-.15.79-.1.24-.24.45-.42.63-.18.18-.39.32-.63.42-.26.1-.52.15-.79.15zm-3.5-6.5c-.28 0-.54.05-.79.15-.24.1-.45.24-.63.42-.18.18-.32.39-.42.63-.1.25-.15.51-.15.79s.05.54.15.79c.1.24.24.45.42.63.18.18.39.32.63.42.25.1.51.15.79.15s.54-.05.79-.15c.24-.1.45-.24.63-.42.18-.18.32-.39.42-.63.1-.25.15-.51.15-.79s-.05-.54-.15-.79c-.1-.24-.24-.45-.42-.63-.18-.18-.39-.32-.63-.42-.25-.1-.51-.15-.79-.15zm6 0c-.28 0-.54.05-.79.15-.24.1-.45.24-.63.42-.18.18-.32.39-.42.63-.1.25-.15.51-.15.79s.05.54.15.79c.1.24.24.45.42.63.18.18.39.32.63.42.25.1.51.15.79.15s.54-.05.79-.15c.24-.1.45-.24.63-.42.18-.18.32-.39.42-.63.1-.25.15-.51.15-.79s-.05-.54-.15-.79c-.1-.24-.24-.45-.42-.63-.18-.18-.39-.32-.63-.42-.25-.1-.51-.15-.79-.15z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium text-gray-900 dark:text-white">Solutions</h4>
              <ul className="space-y-3">
                <li>
                  <Link className="text-gray-600 hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-500" href="#">
                    Enterprise
                  </Link>
                </li>
                <li>
                  <Link className="text-gray-600 hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-500" href="#">
                    Government
                  </Link>
                </li>
                <li>
                  <Link className="text-gray-600 hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-500" href="#">
                    SMB
                  </Link>
                </li>
                <li>
                  <Link className="text-gray-600 hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-500" href="#">
                    Integrations
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium text-gray-900 dark:text-white">Products</h4>
              <ul className="space-y-3">
                <li>
                  <Link className="text-gray-600 hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-500" href="#">
                    AI Sorting
                  </Link>
                </li>
                <li>
                  <Link className="text-gray-600 hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-500" href="#">
                    Analytics Dashboard
                  </Link>
                </li>
                <li>
                  <Link className="text-gray-600 hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-500" href="#">
                    ESG Reporting
                  </Link>
                </li>
                <li>
                  <Link className="text-gray-600 hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-500" href="#">
                    Mobile App
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium text-gray-900 dark:text-white">Company</h4>
              <ul className="space-y-3">
                <li>
                  <Link className="text-gray-600 hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-500" href="#">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link className="text-gray-600 hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-500" href="#">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link className="text-gray-600 hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-500" href="#">
                    Press
                  </Link>
                </li>
                <li>
                  <Link className="text-gray-600 hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-500" href="#">
                    Sustainability Mission
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                © 2025 RecycleX. All rights reserved.
              </p>
              <div className="flex gap-8">
                <Link className="text-sm text-gray-500 hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-500" href="#">
                  Privacy Policy
                </Link>
                <Link className="text-sm text-gray-500 hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-500" href="#">
                  Terms of Service
                </Link>
                <Link className="text-sm text-gray-500 hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-500" href="#">
                  Cookie Policy
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
