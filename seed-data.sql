-- Clear any existing data
DELETE FROM testimonials;
DELETE FROM products;
DELETE FROM services;
DELETE FROM navigation_items;
DELETE FROM social_links;
DELETE FROM footer_columns;
DELETE FROM site_content;

-- Insert services
INSERT INTO services (title, description, icon, translations) 
VALUES 
('Web Development', 'Custom websites and web applications with modern technologies', 'web', NULL),
('Mobile Apps', 'Cross-platform mobile applications for Android and iOS', 'mobile', NULL),
('Cloud Solutions', 'Scalable and secure cloud infrastructure deployment', 'cloud', NULL),
('AI Solutions', 'Custom AI integrations for business automation', 'ai', NULL);

-- Insert products
INSERT INTO products (title, description, image, key_features, benefits, translations) 
VALUES 
('Enterprise CRM', 'A comprehensive customer relationship management system', NULL, ARRAY['User-friendly interface', 'Advanced analytics', 'Integration capabilities'], ARRAY['Improved customer retention', 'Increased sales efficiency', 'Better data management'], NULL),
('Project Management Suite', 'End-to-end project management and collaboration tool', NULL, ARRAY['Real-time collaboration', 'Resource allocation', 'Gantt charts'], ARRAY['Enhanced team productivity', 'Better project visibility', 'Reduced delays'], NULL),
('E-commerce Platform', 'Full-featured e-commerce solution for businesses', NULL, ARRAY['Customizable storefront', 'Secure payment processing', 'Inventory management'], ARRAY['Increased online sales', 'Streamlined operations', 'Better customer experience'], NULL);

-- Insert testimonials
INSERT INTO testimonials (name, content, rating, image, translations) 
VALUES 
('John Smith', 'Working with I-Varse transformed our business operations completely. Their expertise and dedication are unmatched.', 5, NULL, NULL),
('Emily Johnson', 'The team delivered our project ahead of schedule and exceeded all expectations. Highly recommended!', 5, NULL, NULL),
('Michael Brown', 'Their cloud solutions helped us scale our business efficiently while cutting costs. Great experience overall.', 4, NULL, NULL);

-- Insert navigation items
INSERT INTO navigation_items (label, url, "order", translations) 
VALUES 
('Home', '/', 1, NULL),
('Services', '/services', 2, NULL),
('Products', '/products', 3, NULL),
('About', '/about', 4, NULL),
('Contact', '/contact', 5, NULL);

-- Insert social links
INSERT INTO social_links (platform, url, icon, translations) 
VALUES 
('Twitter', 'https://twitter.com', 'twitter', NULL),
('LinkedIn', 'https://linkedin.com', 'linkedin', NULL),
('Facebook', 'https://facebook.com', 'facebook', NULL);

-- Insert footer columns
INSERT INTO footer_columns (title, links, translations) 
VALUES 
('Company', '[{"label":"About Us","url":"/about"},{"label":"Careers","url":"/careers"},{"label":"Contact","url":"/contact"}]', NULL),
('Services', '[{"label":"Web Development","url":"/services"},{"label":"Mobile App Development","url":"/services"},{"label":"Cloud Solutions","url":"/services"}]', NULL),
('Resources', '[{"label":"Blog","url":"/blog"},{"label":"Documentation","url":"/docs"},{"label":"Support","url":"/support"}]', NULL);

-- Insert site content
INSERT INTO site_content (key, value, translations) 
VALUES 
('siteConfig', '{"siteName":"I-VARSE Technologies","siteDescription":"Digital solutions for modern businesses","contactEmail":"info@ivarse.com","contactPhone":"+1234567890","contactAddress":"123 Tech Boulevard, Silicon Valley, CA","logoLight":"/assets/I-VARSELogo3@3x.png","logoDark":"/assets/I-VARSELogo4@3x.png","favicon":"/assets/I-VARSEIcon1@3x.png"}', NULL);
