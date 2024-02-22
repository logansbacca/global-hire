import React from 'react'
import Footer from './Footer'

const About = (props) => {
  return (
    <>
    <div className="flex w-full h-fit flex-col items-center justify-center">
      <div className="w-full flex flex-col lg:flex-row items-center justify-center">
        <div className="w-full lg:w-1/2 bg-black">
          <div className="p-8 lg:p-40">
            <h1 className="text-3xl font-bold text-white text-center mb-4">About Us</h1>
            <p className="text-gray-700 text-center">
              At <span className="font-semibold">TalentConnect</span>, we are passionate about connecting global talent with exciting opportunities in development and multimedia. Our mission is to bridge the gap between skilled professionals and forward-thinking companies.
              <br /><br />
              With a team of experienced recruiters, we specialize in identifying top talent across various domains. Whether you're a developer, designer, or content creator, we've got you covered. Our commitment to excellence ensures that both candidates and employers find their perfect match.
              <br /><br />
              Join us on this journey as we empower businesses to thrive and individuals to achieve their career aspirations. Welcome to the <span className="font-semibold">TalentConnect</span> family!
            </p>
          </div>
        </div>
        <div className="w-full lg:w-1/2">
          <div className="max-w-md p-8">
            <img
              src="https://images.pexels.com/photos/3201630/pexels-photo-3201630.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="Company Office"
              className="w-full rounded-lg mb-4"
            />
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default About;
