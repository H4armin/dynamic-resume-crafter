
const Footer = () => {
  return (
    <footer className="border-t border-gray-200 pt-8 mt-16">
      <div className="grid md:grid-cols-4 gap-8">
        <div>
          <h3 className="font-semibold mb-4">About Us</h3>
          <p className="text-gray-600 text-sm">
            We're dedicated to helping job seekers create professional, ATS-friendly resumes that get noticed by employers.
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-4">Contact Us</h3>
          <p className="text-gray-600 text-sm">support@resumebuilder.com</p>
          <p className="text-gray-600 text-sm mt-2">Mon-Fri: 9AM - 5PM EST</p>
        </div>
        <div>
          <h3 className="font-semibold mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-600 hover:text-black">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
            </a>
            <a href="#" className="text-gray-600 hover:text-black">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
            </a>
            <a href="#" className="text-gray-600 hover:text-black">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </a>
          </div>
        </div>
        <div>
          <h3 className="font-semibold mb-4">Legal</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="text-gray-600 hover:text-black">Privacy Policy</a></li>
            <li><a href="#" className="text-gray-600 hover:text-black">Terms & Conditions</a></li>
            <li><a href="#" className="text-gray-600 hover:text-black">Cookie Policy</a></li>
            <li><a href="#" className="text-gray-600 hover:text-black">GDPR Compliance</a></li>
          </ul>
        </div>
      </div>
      <div className="text-center text-gray-600 mt-8 pt-8 border-t">
        <p>© 2025 Resume Builder | All rights reserved</p>
        <p className="text-sm mt-2">Helping job seekers land their dream jobs since 2023</p>
      </div>
    </footer>
  );
};

export default Footer;
