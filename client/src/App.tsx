import { Route, Switch } from "wouter";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";

// Pages
import Home from "@/pages/Home";
import Services from "@/pages/Services";
import Products from "@/pages/Products";
import Contact from "@/pages/Contact";
import NotFound from "@/pages/not-found";

// Layout components
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ThemeToggle from "@/components/ui/ThemeToggle";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="i-varse-theme">
        <div className="flex flex-col min-h-screen bg-white dark:bg-[#0a1929] text-gray-800 dark:text-white">
          <Navbar />
          <main className="flex-grow pt-20">
            <Switch>
              <Route path="/" component={Home} />
              <Route path="/services" component={Services} />
              <Route path="/products" component={Products} />
              <Route path="/contact" component={Contact} />
              <Route component={NotFound} />
            </Switch>
          </main>
          <Footer />
          <ThemeToggle />
        </div>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
