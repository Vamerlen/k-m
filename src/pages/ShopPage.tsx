
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowUp, ShoppingBag, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

const ShopPage = () => {
  const [showScrollToTop, setShowScrollToTop] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setShowScrollToTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePrintifyStoreClick = () => {
    // Replace with your actual Printify store URL
    window.open("https://printify.com/app/store", "_blank");
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <section className="py-24 bg-pattern">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="section-title">Our Merchandise</h2>
            <p className="section-subtitle">
              Shop our exclusive barber-inspired merchandise, custom designed and printed on demand
            </p>
          </div>

          <Card className="bg-white/90 backdrop-blur-sm border-none shadow-lg max-w-4xl mx-auto">
            <CardContent className="p-8">
              <div className="flex flex-col lg:flex-row items-center gap-8">
                <div className="lg:w-1/2">
                  <ShoppingBag className="h-16 w-16 text-barber-gold mb-4" />
                  <h3 className="text-2xl font-bold mb-4">Custom Barber Merchandise</h3>
                  <p className="text-muted-foreground mb-6">
                    We've partnered with Printify to bring you high-quality, custom-designed barber merchandise. 
                    From stylish t-shirts and hoodies to mugs and accessories, show your barber pride with our 
                    exclusive designs.
                  </p>
                  <Button 
                    onClick={handlePrintifyStoreClick}
                    className="bg-barber-gold hover:bg-barber-gold/90 text-white w-full md:w-auto"
                  >
                    Visit Our Printify Store <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
                <div className="lg:w-1/2">
                  <div className="aspect-video bg-muted rounded-md overflow-hidden flex items-center justify-center">
                    <img 
                      src="/placeholder.svg" 
                      alt="Merchandise preview" 
                      className="w-full h-auto object-cover"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-12 border-t pt-8">
                <h4 className="font-semibold text-xl mb-4">Why Choose Our Merchandise?</h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-barber-gold font-bold">✓</span>
                    <span>Premium quality materials and printing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-barber-gold font-bold">✓</span>
                    <span>Exclusive designs by professional artists</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-barber-gold font-bold">✓</span>
                    <span>Printed on demand – environmentally friendly</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-barber-gold font-bold">✓</span>
                    <span>Worldwide shipping available</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <div className="mt-12 text-center">
            <Link to="/" className="text-barber-gold hover:underline inline-flex items-center gap-2">
              Return to Homepage
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <Footer />

      {/* Scroll to top button */}
      <button 
        onClick={scrollToTop}
        className={`fixed right-8 bottom-8 p-3 bg-barber-gold text-white rounded-full shadow-lg z-50 hover:bg-barber-gold/90 transition-all ${
          showScrollToTop ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        aria-label="Scroll to top"
      >
        <ArrowUp className="h-6 w-6" />
      </button>
    </div>
  );
};

export default ShopPage;
