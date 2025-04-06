export const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId);
  const navbarHeight = 80; // Adjust this value based on your navbar height

  if (element) {
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  }
};
