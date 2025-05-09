/**
 * Script to install required CSS dependencies for the unified layout
 * 
 * Usage: node scripts/setup-css-dependencies.js
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// CSS related dependencies we need
const dependencies = [
  '@headlessui/react',       // For dropdown menus, modals, etc.
  '@heroicons/react',        // For icons
  'tailwindcss',             // Tailwind CSS
  'postcss',                 // PostCSS for processing CSS
  'autoprefixer',            // Add vendor prefixes to CSS
  'tailwind-scrollbar-hide', // Hide scrollbars with Tailwind
  '@tailwindcss/forms',      // Form styles for Tailwind
  '@tailwindcss/aspect-ratio', // Aspect ratio utilities
  '@tailwindcss/typography'  // Typography utilities
];

// Check if we're in the right directory
const packageJsonPath = path.join(__dirname, '..', 'package.json');
if (!fs.existsSync(packageJsonPath)) {
  console.error('Error: package.json not found. Make sure you run this script from the project root.');
  process.exit(1);
}

// Read package.json
const packageJson = require(packageJsonPath);
const existingDeps = { 
  ...packageJson.dependencies,
  ...packageJson.devDependencies
};

// Filter out dependencies that are already installed
const missingDeps = dependencies.filter(dep => !existingDeps[dep]);

if (missingDeps.length === 0) {
  console.log('✅ All required CSS dependencies are already installed.');
  process.exit(0);
}

// Install missing dependencies
console.log(`Installing missing dependencies: ${missingDeps.join(', ')}`);
try {
  const isYarn = fs.existsSync(path.join(__dirname, '..', 'yarn.lock'));
  
  if (isYarn) {
    execSync(`yarn add ${missingDeps.join(' ')}`, { stdio: 'inherit' });
  } else {
    execSync(`npm install ${missingDeps.join(' ')}`, { stdio: 'inherit' });
  }
  
  console.log('✅ All dependencies installed successfully.');
} catch (error) {
  console.error('❌ Error installing dependencies:', error.message);
  process.exit(1);
}

// Check if tailwind.config.js needs to be updated
const tailwindConfigPath = path.join(__dirname, '..', 'tailwind.config.js');
if (fs.existsSync(tailwindConfigPath)) {
  const tailwindConfig = fs.readFileSync(tailwindConfigPath, 'utf8');
  
  // Check if plugins need to be added
  let needsUpdate = false;
  let updatedConfig = tailwindConfig;
  
  if (!tailwindConfig.includes('@tailwindcss/forms')) {
    needsUpdate = true;
    updatedConfig = updatedConfig.replace(
      'plugins: [',
      'plugins: [\n    require(\'@tailwindcss/forms\'),'
    );
  }
  
  if (!tailwindConfig.includes('@tailwindcss/aspect-ratio')) {
    needsUpdate = true;
    updatedConfig = updatedConfig.replace(
      'plugins: [',
      'plugins: [\n    require(\'@tailwindcss/aspect-ratio\'),'
    );
  }
  
  if (!tailwindConfig.includes('@tailwindcss/typography')) {
    needsUpdate = true;
    updatedConfig = updatedConfig.replace(
      'plugins: [',
      'plugins: [\n    require(\'@tailwindcss/typography\'),'
    );
  }
  
  if (!tailwindConfig.includes('tailwind-scrollbar-hide')) {
    needsUpdate = true;
    updatedConfig = updatedConfig.replace(
      'plugins: [',
      'plugins: [\n    require(\'tailwind-scrollbar-hide\'),'
    );
  }
  
  if (needsUpdate) {
    console.log('Updating tailwind.config.js with the new plugins...');
    fs.writeFileSync(tailwindConfigPath, updatedConfig, 'utf8');
    console.log('✅ tailwind.config.js updated successfully.');
  } else {
    console.log('✅ tailwind.config.js already has all required plugins.');
  }
}

console.log('\nSetup complete! You may need to restart your development server for changes to take effect.'); 