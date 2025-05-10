import HeroSection from '../components/common/HeroSection';

const Buy = () => {
  return (
    <Layout>
      <HeroSection
        title="Buy Property in India"
        subtitle="Find your dream home from thousands of verified listings."
        primaryText="Browse Properties"
        primaryLink="/buy"
        secondaryText="Contact Us"
        secondaryLink="/contact"
      />
      {/* ...rest of the Buy page... */}
      {/* existing content below */}
    </Layout>
  );
};

export default Buy; 