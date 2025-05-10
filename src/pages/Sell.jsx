import HeroSection from '../components/common/HeroSection';

const Sell = () => {
  return (
    <Layout>
      <HeroSection
        title="Sell Your Property"
        subtitle="List your property and reach thousands of buyers instantly."
        primaryText="List Property"
        primaryLink="/sell"
        secondaryText="Contact Us"
        secondaryLink="/contact"
      />
      {/* ...rest of the Sell page... */}
      {/* existing content below */}
    </Layout>
  );
};

export default Sell; 