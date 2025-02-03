import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Link } from "react-router-dom";
import { useRef } from "react";

const Index = () => {
  const featuresRef = useRef<HTMLElement>(null);
  const pricingRef = useRef<HTMLElement>(null);

  const scrollToSection = (ref: React.RefObject<HTMLElement>) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header onFeaturesClick={() => scrollToSection(featuresRef)} 
             onPricingClick={() => scrollToSection(pricingRef)} />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="container flex flex-col items-center gap-4 pt-32 pb-8 text-center md:pt-40">
          <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:text-6xl lg:leading-[1.1]">
            Project Management Made Simple
          </h1>
          <p className="max-w-[750px] text-lg text-muted-foreground sm:text-xl">
            Streamline your workflow, collaborate seamlessly, and deliver projects on time.
            TaskFlow helps teams stay organized and productive.
          </p>
          <div className="flex gap-4">
            <Button size="lg" asChild>
              <Link to="/signup">Get Started</Link>
            </Button>
            <Button size="lg" variant="outline" onClick={() => scrollToSection(featuresRef)}>
              Learn More
            </Button>
          </div>
        </section>

        {/* Features Section */}
        <section ref={featuresRef} className="container py-20 scroll-mt-20">
          <h2 className="text-3xl font-bold text-center mb-12">Powerful Features</h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="flex flex-col items-center text-center group hover:bg-accent p-6 rounded-lg transition-colors">
              <div className="mb-4 rounded-lg bg-primary/10 p-4 group-hover:bg-primary/20 transition-colors">
                <svg
                  className="h-6 w-6 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-bold">Task Management</h3>
              <p className="text-muted-foreground">
                Create, assign, and track tasks with ease. Keep your team aligned and productive.
              </p>
            </div>
            <div className="flex flex-col items-center text-center group hover:bg-accent p-6 rounded-lg transition-colors">
              <div className="mb-4 rounded-lg bg-primary/10 p-4 group-hover:bg-primary/20 transition-colors">
                <svg
                  className="h-6 w-6 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-bold">Team Collaboration</h3>
              <p className="text-muted-foreground">
                Work together seamlessly with real-time updates and communication tools.
              </p>
            </div>
            <div className="flex flex-col items-center text-center group hover:bg-accent p-6 rounded-lg transition-colors">
              <div className="mb-4 rounded-lg bg-primary/10 p-4 group-hover:bg-primary/20 transition-colors">
                <svg
                  className="h-6 w-6 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-bold">Analytics & Insights</h3>
              <p className="text-muted-foreground">
                Track progress and performance with detailed analytics and reporting tools.
              </p>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section ref={pricingRef} className="border-t bg-muted/40 py-20 scroll-mt-20">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12">Simple, Transparent Pricing</h2>
            <div className="grid gap-8 md:grid-cols-3">
              {/* Free Plan */}
              <div className="flex flex-col p-6 bg-background rounded-lg shadow-lg border transition-transform hover:scale-105">
                <h3 className="text-2xl font-bold mb-2">Free</h3>
                <div className="text-4xl font-bold mb-4">$0<span className="text-lg font-normal text-muted-foreground">/mo</span></div>
                <ul className="mb-6 flex-1 space-y-2">
                  <li className="flex items-center gap-2">
                    <svg className="h-5 w-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Up to 3 projects
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="h-5 w-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Basic task management
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="h-5 w-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    2 team members
                  </li>
                </ul>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/signup">Get Started</Link>
                </Button>
              </div>

              {/* Pro Plan */}
              <div className="flex flex-col p-6 bg-background rounded-lg shadow-lg border border-primary transition-transform hover:scale-105">
                <div className="absolute top-0 right-0 -translate-y-1/2 px-3 py-1 bg-primary text-primary-foreground text-sm font-medium rounded-full">
                  Popular
                </div>
                <h3 className="text-2xl font-bold mb-2">Pro</h3>
                <div className="text-4xl font-bold mb-4">$29<span className="text-lg font-normal text-muted-foreground">/mo</span></div>
                <ul className="mb-6 flex-1 space-y-2">
                  <li className="flex items-center gap-2">
                    <svg className="h-5 w-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Unlimited projects
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="h-5 w-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Advanced task management
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="h-5 w-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Up to 10 team members
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="h-5 w-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Analytics dashboard
                  </li>
                </ul>
                <Button size="lg" asChild>
                  <Link to="/signup">Start Free Trial</Link>
                </Button>
              </div>

              {/* Enterprise Plan */}
              <div className="flex flex-col p-6 bg-background rounded-lg shadow-lg border transition-transform hover:scale-105">
                <h3 className="text-2xl font-bold mb-2">Enterprise</h3>
                <div className="text-4xl font-bold mb-4">$99<span className="text-lg font-normal text-muted-foreground">/mo</span></div>
                <ul className="mb-6 flex-1 space-y-2">
                  <li className="flex items-center gap-2">
                    <svg className="h-5 w-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Everything in Pro
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="h-5 w-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Unlimited team members
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="h-5 w-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    24/7 priority support
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="h-5 w-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Custom integrations
                  </li>
                </ul>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/contact">Contact Sales</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="border-t bg-muted/40">
          <div className="container py-20 text-center">
            <h2 className="mb-4 text-3xl font-bold">Ready to Get Started?</h2>
            <p className="mb-8 text-muted-foreground">
              Join thousands of teams already using TaskFlow to improve their productivity.
            </p>
            <Button size="lg" asChild>
              <Link to="/signup">Start Free Trial</Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;