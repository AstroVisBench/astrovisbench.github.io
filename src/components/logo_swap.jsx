import { useEffect, useState } from 'react';

export default function LogoSwap() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const scrollContainer = document.querySelector('#scroll-div');
    console.log(scrollContainer);
    const handleScroll = () => {
      const scrollContainer2 = document.querySelector('#scroll-div');
      console.log(scrollContainer2.scrollTop);
      setScrolled(scrollContainer2.scrollTop > 300);
    };
    console.log("WKJADK");
    scrollContainer.addEventListener('scroll', () => {handleScroll();});
    //window.addEventListener('keydown', handleScroll);
    return () => scrollContainer.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <img
      src={scrolled ? '/avb_logo.svg' : '/avb_logo_no_name.svg'}
      alt="Site Logo"
      height="50"
      width="150"
    />
  );
}
