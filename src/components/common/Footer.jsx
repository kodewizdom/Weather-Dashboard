import { Github, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className=" py-6 text-center border-t bg-[#fff0f9] border-gray-200">
      
      <p className="text-sm text-gray-500">
        Created by: <span className="font-medium text-gray-700">Md Sajid Khan</span>
      </p>

      <div className="flex justify-center items-center gap-6 mt-6">
        
        <a
          href="https://github.com/kodewizdom"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-500 hover:text-black hover:scale-110 transition"
        >
          <Github size={25} />
        </a>

        <a
          href="https://linkedin.com/in/md-sajid-khan-72174a222"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-500 hover:text-blue-600 hover:scale-110 transition"
        >
          <Linkedin size={25} />
        </a>

        <a
          href="mailto:mdsajidkhan7759gmail.com"
          className="text-gray-500 hover:text-red-500 hover:scale-110 transition"
        >
          <Mail size={25} />
        </a>

      </div>
    </footer>
  );
};

export default Footer;