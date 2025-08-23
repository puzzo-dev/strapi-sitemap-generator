#!/usr/bin/env node

/**
 * Automated Type Refactoring Script
 * 
 * This script automatically refactors inline type declarations in component files
 * to use centralized types from @/lib/types
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Type mappings for common inline interfaces
const TYPE_MAPPINGS = {
  // FAQ Section Props
  'FAQStatsSectionProps': 'FAQStatsSectionProps',
  'FAQPopularSectionProps': 'FAQPopularSectionProps', 
  'FAQSearchSectionProps': 'FAQSearchSectionProps',
  
  // Blog Section Props
  'BlogFiltersSectionProps': 'BlogFiltersSectionProps',
  'BlogSidebarSectionProps': 'BlogSidebarSectionProps',
  'BlogPostsSectionProps': 'BlogPostsSectionProps',
  
  // Case Studies Section Props
  'CaseStudiesGridSectionProps': 'CaseStudiesGridSectionProps',
  'CaseStudiesContentSectionProps': 'CaseStudiesContentSectionProps',
  'CaseStudiesFilterSectionProps': 'CaseStudiesFilterSectionProps',
  'CaseStudiesTestimonialsSectionProps': 'CaseStudiesTestimonialsSectionProps',
  'CaseStudiesHeroSectionProps': 'CaseStudiesHeroSectionProps',
  'CaseStudiesCTASectionProps': 'CaseStudiesCTASectionProps',
  
  // Industries Section Props
  'IndustriesGridSectionProps': 'IndustriesGridSectionProps',
  'IndustriesHeroSectionProps': 'IndustriesHeroSectionProps',
  'IndustriesCTASectionProps': 'IndustriesCTASectionProps',
  'IndustriesTestimonialsSection': 'IndustriesTestimonialsSection',
  'IndustriesSolutionsSectionProps': 'IndustriesSolutionsSectionProps',
  
  // Industry Detail Section Props
  'IndustryDetailContentSectionProps': 'IndustryDetailContentSectionProps',
  'IndustryDetailSolutionsSectionProps': 'IndustryDetailSolutionsSectionProps',
  'IndustryDetailTechnologiesSectionProps': 'IndustryDetailTechnologiesSectionProps',
  
  // About Section Props
  'MissionVisionSectionProps': 'MissionVisionSectionProps',
  'CoreValuesSectionProps': 'CoreValuesSectionProps',
  
  // Product Section Props
  'ProductFeaturesSectionProps': 'ProductFeaturesSectionProps',
  'ProductDetailDescriptionSectionProps': 'ProductDetailDescriptionSectionProps',
  'ProductDetailHeroSectionProps': 'ProductDetailHeroSectionProps',
  'ProductPricingSectionProps': 'ProductPricingSectionProps',
  'ProductRelatedSectionProps': 'ProductRelatedSectionProps',
  'ProductCTASectionProps': 'ProductCTASectionProps',
};

// Directories to process
const COMPONENT_DIRS = [
  'client/src/components/sections',
  'client/src/components/ui',
  'client/src/components/layout'
];

function findFiles(dir, extensions = ['.tsx', '.ts']) {
  const files = [];
  
  function traverse(currentDir) {
    const items = fs.readdirSync(currentDir);
    
    for (const item of items) {
      const fullPath = path.join(currentDir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        traverse(fullPath);
      } else if (extensions.some(ext => item.endsWith(ext))) {
        files.push(fullPath);
      }
    }
  }
  
  traverse(dir);
  return files;
}

function refactorFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let hasChanges = false;
  
  // Extract interface declarations
  const interfaceRegex = /^interface\s+(\w+)\s*(?:extends[^{]*)?{[^}]*}/gm;
  const matches = [...content.matchAll(interfaceRegex)];
  
  for (const match of matches) {
    const interfaceName = match[1];
    
    if (TYPE_MAPPINGS[interfaceName]) {
      // Remove the interface declaration
      content = content.replace(match[0], '');
      
      // Add import if not already present
      const importRegex = new RegExp(`import.*${interfaceName}.*from.*@/lib/types`);
      if (!importRegex.test(content)) {
        // Find existing type imports or add new one
        const typeImportRegex = /import\s+type\s+{([^}]+)}\s+from\s+'@\/lib\/types';/;
        const typeImportMatch = content.match(typeImportRegex);
        
        if (typeImportMatch) {
          // Add to existing type import
          const existingTypes = typeImportMatch[1].trim();
          const newTypes = existingTypes ? `${existingTypes}, ${interfaceName}` : interfaceName;
          content = content.replace(typeImportRegex, `import type { ${newTypes} } from '@/lib/types';`);
        } else {
          // Add new type import after other imports
          const lastImportRegex = /^import.*from.*['"];$/gm;
          const imports = [...content.matchAll(lastImportRegex)];
          if (imports.length > 0) {
            const lastImport = imports[imports.length - 1];
            const insertIndex = lastImport.index + lastImport[0].length;
            content = content.slice(0, insertIndex) + 
                     `\nimport type { ${interfaceName} } from '@/lib/types';` + 
                     content.slice(insertIndex);
          }
        }
      }
      
      hasChanges = true;
    }
  }
  
  // Clean up extra whitespace
  if (hasChanges) {
    content = content.replace(/\n\n\n+/g, '\n\n');
    fs.writeFileSync(filePath, content);
    console.log(`✅ Refactored: ${filePath}`);
  }
  
  return hasChanges;
}

function main() {
  console.log('🚀 Starting automated type refactoring...\n');
  
  let totalFiles = 0;
  let refactoredFiles = 0;
  
  for (const dir of COMPONENT_DIRS) {
    const fullDir = path.resolve(dir);
    
    if (!fs.existsSync(fullDir)) {
      console.log(`⚠️  Directory not found: ${dir}`);
      continue;
    }
    
    console.log(`📁 Processing directory: ${dir}`);
    const files = findFiles(fullDir);
    
    for (const file of files) {
      totalFiles++;
      if (refactorFile(file)) {
        refactoredFiles++;
      }
    }
  }
  
  console.log(`\n📊 Summary:`);
  console.log(`   Total files processed: ${totalFiles}`);
  console.log(`   Files refactored: ${refactoredFiles}`);
  
  if (refactoredFiles > 0) {
    console.log('\n🔍 Running TypeScript validation...');
    try {
      execSync('npx tsc --noEmit --project client/tsconfig.json', { stdio: 'inherit' });
      console.log('✅ TypeScript validation passed!');
    } catch (error) {
      console.log('❌ TypeScript validation failed. Please review the changes.');
    }
  }
  
  console.log('\n🎉 Type refactoring completed!');
}

if (require.main === module) {
  main();
}

module.exports = { refactorFile, TYPE_MAPPINGS };
