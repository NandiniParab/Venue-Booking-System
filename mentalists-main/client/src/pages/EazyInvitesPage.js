
import React, { useState } from 'react';
import { Heart, Download, Share2, Edit, Palette, Type, Image, Star } from 'lucide-react';
import { Button } from '../components/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/card';
import { Badge } from '../components/badge';
import { Input } from '../components/input';
import Modal from '../components/Modal';

const EazyInvitesPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalTemplate, setModalTemplate] = useState(null);

  const categories = ['All', 'Wedding', 'Engagement', 'Baby Shower', 'Birthday', 'Anniversary', 'Corporate'];

  const templates = [
    {
      id: 1,
      name: "Royal Indian Wedding",
      category: "Wedding",
      image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=400",
      premium: true,
      price: "₹299",
      rating: 4.9,
      downloads: 1234
    },
    {
      id: 2,
      name: "Elegant Engagement",
      category: "Engagement",
      image: "https://images.unsplash.com/photo-1464207687429-7505649dae38?w=400",
      premium: false,
      price: "Free",
      rating: 4.7,
      downloads: 892
    },
    {
      id: 3,
      name: "Floral Baby Shower",
      category: "Baby Shower",
      image: "https://images.unsplash.com/photo-1530047198515-1f1d24b9d1b3?w=400",
      premium: true,
      price: "₹199",
      rating: 4.8,
      downloads: 567
    },
    {
      id: 4,
      name: "Modern Birthday",
      category: "Birthday",
      image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400",
      premium: false,
      price: "Free",
      rating: 4.6,
      downloads: 743
    },
    {
      id: 5,
      name: "Golden Anniversary",
      category: "Anniversary",
      image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400",
      premium: true,
      price: "₹249",
      rating: 4.9,
      downloads: 456
    },
    {
      id: 6,
      name: "Corporate Event",
      category: "Corporate",
      image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=400",
      premium: true,
      price: "₹199",
      rating: 4.5,
      downloads: 321
    }
  ];

  const filteredTemplates = templates.filter(template => 
    (selectedCategory === 'All' || template.category === selectedCategory) &&
    (template.name.toLowerCase().includes(searchTerm.toLowerCase()) || template.category.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Scroll to templates section
  const handleBrowseTemplates = () => {
    const el = document.getElementById('templates-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#fdf6ee]">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#f4ce74]/20 to-[#a53f3f]/10" />
        <div className="container mx-auto px-4 relative">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-4 bg-[#3a0303] text-[#ffe9c1] px-4 py-2">
              NEW FEATURE
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-[#a53f3f] to-[#f4ce74] bg-clip-text text-transparent">
              EazyInvites
            </h1>
            <p className="text-xl text-[#a53f3f] mb-8">
              Create stunning digital invitations for any occasion in minutes
            </p>
            <div className="glass rounded-2xl p-8 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold mb-4">Start Creating</h3>
              <div className="space-y-4">
                <Input
                  placeholder="Search templates..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="border-0 bg-[#ffe9c1] text-[#3a0303] placeholder-[#a53f3f] text-lg rounded-xl px-4 py-3"
                />
                <Button className="w-full bg-[#a53f3f] text-white hover:bg-[#3a0303]" size="lg" onClick={handleBrowseTemplates}>
                  Browse Templates
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-[#ffe9c1]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-[#3a0303]">Why Choose EazyInvites?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-[#a53f3f] to-[#f4ce74] flex items-center justify-center">
                <Palette className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-bold text-[#3a0303]">Easy Customization</h3>
              <p className="text-sm text-[#a53f3f]">
                Customize colors, fonts, and layouts with ease
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-[#f4ce74] to-[#a53f3f] flex items-center justify-center">
                <Type className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-bold text-[#3a0303]">Professional Designs</h3>
              <p className="text-sm text-[#a53f3f]">
                Beautiful templates designed by professionals
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-[#a53f3f] to-[#f4ce74] flex items-center justify-center">
                <Share2 className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-bold text-[#3a0303]">Instant Sharing</h3>
              <p className="text-sm text-[#a53f3f]">
                Share via WhatsApp, Email, or Social Media
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-[#f4ce74] to-[#a53f3f] flex items-center justify-center">
                <Download className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-bold text-[#3a0303]">High Quality</h3>
              <p className="text-sm text-[#a53f3f]">
                Download in HD quality for print or digital use
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Template Categories */}
      <section className="py-12" id="templates-section">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-center mb-8 text-[#3a0303]">Choose Your Template</h2>
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                  className={selectedCategory === category ? "bg-[#a53f3f] text-white" : "bg-white text-[#a53f3f] border border-[#a53f3f] hover:bg-[#a53f3f] hover:text-white"}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
          {/* Templates Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredTemplates.map((template) => (
              <Card key={template.id} className="glass hover:shadow-xl transition-all duration-300 group">
                <CardHeader className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img
                      src={template.image}
                      alt={template.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {template.premium && (
                      <Badge className="absolute top-3 right-3 bg-yellow-500 text-black">
                        Premium
                      </Badge>
                    )}
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <Button variant="secondary" size="sm" onClick={() => { setModalTemplate(template); setShowModal(true); }}>
                        <Edit className="h-4 w-4 mr-2" />
                        Customize
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <h3 className="font-bold text-[#3a0303]">{template.name}</h3>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="text-sm">{template.rating}</span>
                        </div>
                        <span className="text-sm text-[#a53f3f]">({template.downloads})</span>
                      </div>
                      <span className="font-medium text-[#a53f3f]">{template.price}</span>
                    </div>
                    <Button variant="outline" className="w-full border-[#a53f3f] text-[#a53f3f] hover:bg-[#a53f3f] hover:text-white" onClick={() => { setModalTemplate(template); setShowModal(true); }}>
                      Use Template
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#ffe9c1]/60 to-[#f4ce74]/40">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 text-[#3a0303]">Ready to Create?</h2>
          <p className="text-xl text-[#a53f3f] mb-8">
            Start designing your perfect invitation today
          </p>
          <Button size="lg" className="bg-[#a53f3f] text-white hover:bg-[#3a0303]">
            Create Your Invitation
          </Button>
        </div>
      </section>
      {/* Modal for Use Template/Customize */}
      {showModal && modalTemplate && (
        <Modal onClose={() => setShowModal(false)} title={modalTemplate.name}>
          <div className="p-4">
            <img src={modalTemplate.image} alt={modalTemplate.name} className="w-full h-40 object-cover rounded-xl mb-4" />
            <div className="mb-2 text-[#a53f3f] font-semibold">Category: {modalTemplate.category}</div>
            <div className="mb-2 text-[#620808]">Price: {modalTemplate.price}</div>
            <div className="mb-2 text-[#3a0303]">Rating: {modalTemplate.rating} ({modalTemplate.downloads} downloads)</div>
            <Button className="w-full bg-[#a53f3f] text-white hover:bg-[#3a0303] mt-4" onClick={() => { setShowModal(false); alert('Mock: Start customizing ' + modalTemplate.name); }}>Start Customizing</Button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default EazyInvitesPage;
