/**
 * Utility script to help convert pages to use the unified PageLayout component
 * 
 * Instructions:
 * 1. Run this script with node: node scripts/convertPagesToUnifiedLayout.js
 * 2. The script will scan all pages and show what needs to be changed
 * 3. Optional: Pass --update flag to automatically update files
 */

const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const readdir = promisify(fs.readdir);
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const stat = promisify(fs.stat);

const PAGES_DIR = path.join(__dirname, '..', 'src', 'pages');
const OLD_LAYOUT_IMPORT = /import\s+Layout\s+from\s+['"]\.\.\/components\/layout\/Layout['"]/;
const OLD_LAYOUT_USAGE = /<Layout[^>]*>([\s\S]*?)<\/Layout>/g;
const OLD_PAGE_TITLE = /import\s+PageTitle\s+from\s+['"]\.\.\/components\/common\/PageTitle['"]/;
const OLD_PAGE_TITLE_USAGE = /<PageTitle[^>]*title=['"](.*?)['"][^>]*\/>/;

const shouldUpdate = process.argv.includes('--update');

async function scanDirectory(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    
    if (entry.isDirectory()) {
      await scanDirectory(fullPath);
    } else if (entry.isFile() && /\.(jsx|tsx)$/.test(entry.name)) {
      await processFile(fullPath);
    }
  }
}

async function processFile(filePath) {
  try {
    const content = await readFile(filePath, 'utf8');
    const fileName = path.basename(filePath);
    
    // Check if the file uses the old Layout
    let needsUpdate = false;
    const hasOldLayout = OLD_LAYOUT_IMPORT.test(content);
    const hasOldPageTitle = OLD_PAGE_TITLE.test(content);
    
    if (hasOldLayout || hasOldPageTitle) {
      needsUpdate = true;
      console.log(`\n[${fileName}] needs to be updated:`);
      
      if (hasOldLayout) console.log('- Uses old Layout component');
      if (hasOldPageTitle) console.log('- Uses old PageTitle component');
      
      if (shouldUpdate) {
        let updatedContent = content;
        
        // Replace imports
        if (hasOldLayout) {
          updatedContent = updatedContent.replace(
            OLD_LAYOUT_IMPORT, 
            `import PageLayout from '../components/layout/PageLayout'`
          );
        }
        
        if (hasOldPageTitle) {
          updatedContent = updatedContent.replace(OLD_PAGE_TITLE, '');
        }
        
        // Replace usage
        let pageTitle = 'Apni Zameen';
        const pageTitleMatch = content.match(OLD_PAGE_TITLE_USAGE);
        if (pageTitleMatch && pageTitleMatch[1]) {
          pageTitle = pageTitleMatch[1];
        }
        
        updatedContent = updatedContent.replace(OLD_LAYOUT_USAGE, (match, children) => {
          return `<PageLayout pageTitle="${pageTitle}">${children}</PageLayout>`;
        });
        
        await writeFile(filePath, updatedContent, 'utf8');
        console.log(`✅ Updated ${fileName}`);
      }
    }
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error);
  }
}

async function main() {
  console.log('Scanning pages to find old Layout usage...');
  if (shouldUpdate) {
    console.log('Update mode: Files will be automatically updated');
  } else {
    console.log('Dry run mode: Use --update flag to automatically update files');
  }
  
  await scanDirectory(PAGES_DIR);
  
  console.log('\nDone!');
  if (!shouldUpdate) {
    console.log('Run with --update flag to apply changes');
  }
}

main().catch(console.error); 