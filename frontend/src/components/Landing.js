import React from 'react';
import '../index.css'; // Make sure Tailwind CSS is imported
import Header from './Header';
import Footer from './Footer';
const LandingPage = () => {
  return (
    <div className=" min-h-screen  flex flex-col">

      {/* Header */}
     <Header />

      {/* Main Content */}
      <main className="flex-grow">

        {/* Hero Section */}
        <section className="text-center py-16 bg-gradient-to-b from-white to-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className='py-8'>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-800 mb-6 pt-8">Connecting Developers with Opportunities</h2>
            <p className="text-xl text-gray-700 mb-8">Join the best tech startups in the industry and find the perfect team for your next project.</p>
            </div>

            <div className='flex flex-row justify-center gap-6'>
            <a href="/register" className="text-white bg-gray-800 hover:bg-gray-900 py-3 px-6 rounded-lg transition duration-300 ease-in-out">Get Started</a>

            <a href="/login" className="text-base text-gray-800 border border-gray-800 bg-white hover:bg-gray-200 py-3 px-6 rounded-lg transition duration-300 ease-in-out ">Login</a>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-2xl font-bold mb-8 text-gray-800">Why Ready2Work?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h4 className="text-xl font-semibold mb-4">For Companies</h4>
                <p className="text-gray-700 mb-6">At Ready2Work, we understand that every project has unique needs. That’s why we offer companies the opportunity to find teams perfectly aligned with their tasks. We connect your business with developers organized into teams with complementary skills, ready to work on customized solutions. This ensures efficient results, hassle-free, and within the timeline you need.
</p>
                
              </div>
              <div>
                <h4 className="text-xl font-semibold mb-4">For Developers</h4>
                <p className="text-gray-700 mb-6">Sign up on our platform and become part of our developer community. When a task or project matches your skills and experience, we’ll notify you immediately so you can start working on real challenges and continue growing professionally. Connect with opportunities tailored to you!
</p>
              
              </div>
            </div>
          </div>
        </section>
       

        {/* Testimonials Section */}
        <section className="bg-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-2xl font-bold mb-8 text-gray-800">Testimonials</h3>
            <div className="space-y-10">
              <div className="bg-white p-8 rounded-lg shadow">
                <p className="text-lg text-gray-700 mb-4">"Ready2Work connected us with top developers who delivered exceptional results. Highly recommend!"</p>
                <p className="text-gray-600">- CEO, Tech Startup</p>
              </div>
              <div className="bg-white p-8 rounded-lg shadow">
                <p className="text-lg text-gray-700 mb-4">"As a developer, Ready2Work provided me with amazing opportunities to work on exciting projects. A game-changer for my career!"</p>
                <p className="text-gray-600">- Software Developer, Freelancer</p>
              </div>
            </div>
          </div>
        </section>

        {/* Call-to-Action Section */}
        <section id="register" className="text-center py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-2xl font-bold mb-6 text-gray-800">Ready to Join?</h3>
            <p className="text-xl mb-8 text-gray-700">Sign up now and start your journey with Ready2Work.</p>
            <a href="#registration-form" className="bg-blue-50 text-gray-800 py-3 px-6 rounded-lg hover:bg-blue-100">Register Now</a>
          </div>
        </section>

      </main>

      {/* Footer */}
     <Footer />

    </div>
  );
}

export default LandingPage;
