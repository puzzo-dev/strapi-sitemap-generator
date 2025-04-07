import { Route, Switch } from "wouter";
import { ThemeProvider } from "@/components/ui/theme-provider";

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
    <ThemeProvider defaultTheme="dark" storageKey="i-varse-theme">
      <div className="flex flex-col min-h-screen dark:bg-secondary dark:text-accent-light">
        <Navbar />
        <main className="flex-grow pt-16">
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
  );
}

export default App;
