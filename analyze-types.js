#!/usr/bin/env node

/**
 * Type Usage Analysis Script
 * 
 * Analyzes all type definitions in lib/types and checks their usage
 * across components and pages to identify unused and redundant types
 */

const fs = require('fs');
const path = require('path');

// Extract all exported types from types directory
function extractTypesFromFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const types = [];
  
  // Match export interface/type/enum declarations
  const exportRegex = /^export\s+(interface|type|enum)\s+(\w+)/gm;
  let match;
  
  while ((match = exportRegex.exec(content)) !== null) {
    types.push({
      name: match[2],
      kind: match[1],
      file: path.basename(filePath),
      line: content.substring(0, match.index).split('\n').length
    });
  }
  
  return types;
}

// Search for type usage in a directory
function searchTypeUsage(typeName, searchDir) {
  const usages = [];
  
  function searchInFile(filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const lines = content.split('\n');
      
      lines.forEach((line, index) => {
        // Look for type usage patterns
        const patterns = [
          new RegExp(`\\b${typeName}\\b`, 'g'), // Direct usage
          new RegExp(`:\\s*${typeName}\\b`, 'g'), // Type annotation
          new RegExp(`<${typeName}>`, 'g'), // Generic usage
          new RegExp(`extends\\s+${typeName}\\b`, 'g'), // Inheritance
          new RegExp(`implements\\s+${typeName}\\b`, 'g'), // Implementation
        ];
        
        patterns.forEach(pattern => {
          if (pattern.test(line)) {
            usages.push({
              file: path.relative(process.cwd(), filePath),
              line: index + 1,
              content: line.trim()
            });
          }
        });
      });
    } catch (error) {
      // Skip files that can't be read
    }
  }
  
  function traverseDirectory(dir) {
    try {
      const items = fs.readdirSync(dir);
      
      for (const item of items) {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
          traverseDirectory(fullPath);
        } else if (item.endsWith('.tsx') || item.endsWith('.ts')) {
          searchInFile(fullPath);
        }
      }
    } catch (error) {
      // Skip directories that can't be read
    }
  }
  
  traverseDirectory(searchDir);
  return usages;
}

// Find duplicate/similar types
function findDuplicateTypes(allTypes) {
  const duplicates = [];
  const typesByName = {};
  
  // Group types by name
  allTypes.forEach(type => {
    if (!typesByName[type.name]) {
      typesByName[type.name] = [];
    }
    typesByName[type.name].push(type);
  });
  
  // Find exact duplicates
  Object.entries(typesByName).forEach(([name, types]) => {
    if (types.length > 1) {
      duplicates.push({
        name,
        count: types.length,
        locations: types.map(t => `${t.file}:${t.line}`)
      });
    }
  });
  
  return duplicates;
}

// Find similar types (potential redundancy)
function findSimilarTypes(allTypes) {
  const similar = [];
  
  // Look for types with similar names
  const typeNames = allTypes.map(t => t.name);
  
  for (let i = 0; i < typeNames.length; i++) {
    for (let j = i + 1; j < typeNames.length; j++) {
      const name1 = typeNames[i];
      const name2 = typeNames[j];
      
      // Check for similar patterns
      if (
        (name1.includes('Props') && name2.includes('Props') && 
         name1.replace('Props', '') === name2.replace('Props', '')) ||
        (name1.includes('Section') && name2.includes('Section') &&
         Math.abs(name1.length - name2.length) < 5)
      ) {
        similar.push({
          type1: name1,
          type2: name2,
          similarity: 'naming_pattern'
        });
      }
    }
  }
  
  return similar;
}

function main() {
  console.log('🔍 Analyzing type usage across the codebase...\n');
  
  // Extract all types from lib/types directory
  const typesDir = 'client/src/lib/types';
  const componentsDir = 'client/src/components';
  const pagesDir = 'client/src/pages';
  
  if (!fs.existsSync(typesDir)) {
    console.error('❌ Types directory not found:', typesDir);
    return;
  }
  
  const allTypes = [];
  const typeFiles = fs.readdirSync(typesDir).filter(f => f.endsWith('.ts'));
  
  // Extract all type definitions
  typeFiles.forEach(file => {
    const filePath = path.join(typesDir, file);
    const types = extractTypesFromFile(filePath);
    allTypes.push(...types);
  });
  
  console.log(`📋 Found ${allTypes.length} type definitions across ${typeFiles.length} files\n`);
  
  // Analyze usage
  const unusedTypes = [];
  const usageReport = [];
  
  console.log('🔎 Checking type usage...\n');
  
  allTypes.forEach((type, index) => {
    process.stdout.write(`\rProgress: ${index + 1}/${allTypes.length} (${type.name})`);
    
    const componentUsages = searchTypeUsage(type.name, componentsDir);
    const pageUsages = searchTypeUsage(type.name, pagesDir);
    const totalUsages = componentUsages.length + pageUsages.length;
    
    if (totalUsages === 0) {
      unusedTypes.push(type);
    }
    
    usageReport.push({
      type,
      componentUsages: componentUsages.length,
      pageUsages: pageUsages.length,
      totalUsages,
      usages: [...componentUsages, ...pageUsages]
    });
  });
  
  console.log('\n\n📊 Analysis Results:\n');
  
  // Report unused types
  if (unusedTypes.length > 0) {
    console.log(`🗑️  UNUSED TYPES (${unusedTypes.length}):`);
    unusedTypes.forEach(type => {
      console.log(`   ❌ ${type.name} (${type.kind}) - ${type.file}:${type.line}`);
    });
    console.log('');
  } else {
    console.log('✅ No unused types found!\n');
  }
  
  // Report duplicate types
  const duplicates = findDuplicateTypes(allTypes);
  if (duplicates.length > 0) {
    console.log(`🔄 DUPLICATE TYPES (${duplicates.length}):`);
    duplicates.forEach(dup => {
      console.log(`   ⚠️  ${dup.name} appears ${dup.count} times:`);
      dup.locations.forEach(loc => console.log(`      - ${loc}`));
    });
    console.log('');
  }
  
  // Report similar types
  const similar = findSimilarTypes(allTypes);
  if (similar.length > 0) {
    console.log(`🔍 POTENTIALLY REDUNDANT TYPES (${similar.length}):`);
    similar.forEach(sim => {
      console.log(`   🤔 ${sim.type1} ↔️ ${sim.type2} (${sim.similarity})`);
    });
    console.log('');
  }
  
  // Report low usage types
  const lowUsageTypes = usageReport.filter(r => r.totalUsages > 0 && r.totalUsages <= 2);
  if (lowUsageTypes.length > 0) {
    console.log(`📉 LOW USAGE TYPES (${lowUsageTypes.length}):`);
    lowUsageTypes.forEach(report => {
      console.log(`   📊 ${report.type.name}: ${report.totalUsages} usage(s)`);
      report.usages.slice(0, 3).forEach(usage => {
        console.log(`      - ${usage.file}:${usage.line}`);
      });
    });
    console.log('');
  }
  
  // Summary statistics
  const totalUsages = usageReport.reduce((sum, r) => sum + r.totalUsages, 0);
  const avgUsage = (totalUsages / allTypes.length).toFixed(1);
  
  console.log('📈 SUMMARY:');
  console.log(`   Total types: ${allTypes.length}`);
  console.log(`   Unused types: ${unusedTypes.length} (${(unusedTypes.length/allTypes.length*100).toFixed(1)}%)`);
  console.log(`   Duplicate types: ${duplicates.length}`);
  console.log(`   Similar types: ${similar.length}`);
  console.log(`   Average usage per type: ${avgUsage}`);
  console.log(`   Total usages found: ${totalUsages}`);
  
  // Generate cleanup recommendations
  if (unusedTypes.length > 0 || duplicates.length > 0) {
    console.log('\n🛠️  CLEANUP RECOMMENDATIONS:');
    
    if (unusedTypes.length > 0) {
      console.log(`   1. Remove ${unusedTypes.length} unused types`);
    }
    
    if (duplicates.length > 0) {
      console.log(`   2. Consolidate ${duplicates.length} duplicate types`);
    }
    
    if (similar.length > 0) {
      console.log(`   3. Review ${similar.length} potentially redundant types`);
    }
  }
  
  console.log('\n✅ Analysis complete!');
}

if (require.main === module) {
  main();
}
