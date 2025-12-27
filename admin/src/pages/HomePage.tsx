import React, { useState, useEffect } from 'react';
import {
  Main,
  Box,
  Button,
  Flex,
  Typography,
  TextInput,
  NumberInput,
  SingleSelect,
  SingleSelectOption,
  Divider,
  Badge,
  IconButton,
} from '@strapi/design-system';
import { Check, Download, Eye, ArrowClockwise, Information } from '@strapi/icons';
import { useNotification, useFetchClient } from '@strapi/admin/strapi-admin';

const HomePage = () => {
  const { get, put } = useFetchClient();
  const { toggleNotification } = useNotification();

  const [contentTypes, setContentTypes] = useState<any[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<Set<string>>(new Set());
  const [config, setConfig] = useState<any>({});
  const [initialConfig, setInitialConfig] = useState<any>(null);
  const [initialSelectedTypes, setInitialSelectedTypes] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [sitemapStats, setSitemapStats] = useState<any>(null);

  // Check if any changes have been made
  const hasChanges = React.useMemo(() => {
    if (!initialConfig) return false;

    // Check if base URL changed
    if ((config.baseUrl || '') !== (initialConfig.baseUrl || '')) return true;

    // Check if selected types changed
    if (selectedTypes.size !== initialSelectedTypes.size) return true;
    for (const uid of selectedTypes) {
      if (!initialSelectedTypes.has(uid)) return true;
    }

    // Check if custom paths changed
    const currentPaths = JSON.stringify(config.customPaths || {});
    const initialPaths = JSON.stringify(initialConfig.customPaths || {});
    if (currentPaths !== initialPaths) return true;

    // Check if custom priorities changed
    const currentPriorities = JSON.stringify(config.customPriorities || {});
    const initialPriorities = JSON.stringify(initialConfig.customPriorities || {});
    if (currentPriorities !== initialPriorities) return true;

    // Check if custom changefreq changed
    const currentChangefreq = JSON.stringify(config.customChangefreq || {});
    const initialChangefreq = JSON.stringify(initialConfig.customChangefreq || {});
    if (currentChangefreq !== initialChangefreq) return true;

    return false;
  }, [config, selectedTypes, initialConfig, initialSelectedTypes]);

  // Fetch available content types
  useEffect(() => {
    fetchContentTypes();
    fetchConfig();
  }, []);

  const fetchContentTypes = async () => {
    try {
      const { data } = await get('/strapi-sitemap-generator/content-types');
      setContentTypes(data.data);
    } catch (error) {
      console.error('Failed to fetch content types:', error);
      toggleNotification({
        type: 'danger',
        message: 'Failed to fetch content types',
      });
    }
  };

  const fetchConfig = async () => {
    try {
      const { data } = await get('/strapi-sitemap-generator/config');
      setConfig(data);
      setInitialConfig(data);
      const selected = new Set<string>(data.selectedContentTypes || []);
      setSelectedTypes(selected);
      setInitialSelectedTypes(new Set<string>(selected));
    } catch (error) {
      console.error('Failed to fetch config:', error);
    }
  };

  const handleToggleContentType = (uid: string) => {
    const newSelected = new Set(selectedTypes);
    if (newSelected.has(uid)) {
      newSelected.delete(uid);
    } else {
      newSelected.add(uid);
    }
    setSelectedTypes(newSelected);
  };

  const handleSaveConfig = async () => {
    setLoading(true);
    try {
      const savedConfig = {
        baseUrl: config.baseUrl || 'https://example.com',
        selectedContentTypes: Array.from(selectedTypes),
        customPaths: config.customPaths || {},
        customPriorities: config.customPriorities || {},
        customChangefreq: config.customChangefreq || {},
      };

      await put('/strapi-sitemap-generator/config', savedConfig);

      // Update initial state to current state after successful save
      setInitialConfig(config);
      setInitialSelectedTypes(new Set(selectedTypes));

      toggleNotification({
        type: 'success',
        message: 'Your sitemap configuration has been saved successfully',
        timeout: 3000,
      });
    } catch (error) {
      console.error('Save error:', error);
      toggleNotification({
        type: 'danger',
        message: 'Failed to save configuration. Please try again.',
        timeout: 5000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateSitemap = async () => {
    if (selectedTypes.size === 0) {
      toggleNotification({
        type: 'warning',
        message: 'Please select at least one content type before generating',
        timeout: 4000,
      });
      return;
    }

    setGenerating(true);
    try {
      // First save the config with selected types
      await put('/strapi-sitemap-generator/config', {
        baseUrl: config.baseUrl || 'https://example.com',
        selectedContentTypes: Array.from(selectedTypes),
        customPaths: config.customPaths || {},
        customPriorities: config.customPriorities || {},
        customChangefreq: config.customChangefreq || {},
      });

      // Then generate sitemap
      const { data } = await get('/strapi-sitemap-generator/data');
      setSitemapStats(data.meta);

      // Update initial state to current state after successful generation
      setInitialConfig(config);
      setInitialSelectedTypes(new Set(selectedTypes));

      toggleNotification({
        type: 'success',
        message: `Successfully generated sitemap with ${data.meta.totalUrls} URLs`,
        timeout: 5000,
      });
    } catch (error) {
      console.error('Generation error:', error);
      toggleNotification({
        type: 'danger',
        message: 'Failed to generate sitemap. Check browser console for details.',
        timeout: 6000,
      });
    } finally {
      setGenerating(false);
    }
  };

  const handleViewSitemap = () => {
    window.open('/api/strapi-sitemap-generator/sitemap.xml', '_blank');
  };

  const handleDownloadSitemap = () => {
    window.open('/api/strapi-sitemap-generator/download', '_blank');
  };

  const updateCustomPath = (uid: string, path: string) => {
    setConfig({
      ...config,
      customPaths: {
        ...config.customPaths,
        [uid]: path,
      },
    });
  };

  const updateCustomPriority = (uid: string, priority: number) => {
    setConfig({
      ...config,
      customPriorities: {
        ...config.customPriorities,
        [uid]: priority,
      },
    });
  };

  const updateCustomChangefreq = (uid: string, changefreq: string) => {
    setConfig({
      ...config,
      customChangefreq: {
        ...config.customChangefreq,
        [uid]: changefreq,
      },
    });
  };

  return (
    <Box background="neutral100">
      <Box paddingTop={6} paddingBottom={10} paddingLeft={7} paddingRight={7}>
        {/* Header */}
        <Box marginBottom={8}>
          <Typography variant="alpha" fontWeight="bold" style={{ display: 'block' }}>Sitemap Generator</Typography>
          <Typography variant="omega" textColor="neutral600" marginTop={2} style={{ display: 'block' }}>
            Generate and manage XML sitemaps for your content
          </Typography>
        </Box>

        {/* Quick Actions */}
        <Box marginBottom={8} background="neutral0" padding={6} hasRadius shadow="tableShadow">
          <Typography variant="delta" fontWeight="semiBold" marginBottom={4}>Quick Actions</Typography>
          <Flex gap={3} paddingBottom={2} marginTop={3} style={{ flexWrap: 'nowrap', minHeight: '44px' }}>
            <Button
              onClick={handleGenerateSitemap}
              loading={generating}
              disabled={!hasChanges || selectedTypes.size === 0}
              startIcon={<ArrowClockwise />}
              style={{ whiteSpace: 'nowrap', flexShrink: 0 }}
            >
              Generate Sitemap
            </Button>
            <Button
              onClick={handleViewSitemap}
              startIcon={<Eye />}
              variant="secondary"
              style={{ whiteSpace: 'nowrap', flexShrink: 0 }}
            >
              Preview XML
            </Button>
          </Flex>
        </Box>

        {/* Statistics */}
        {sitemapStats && (
          <Flex gap={4} marginBottom={8}>
            <Box style={{ flex: 1 }} background="neutral0" padding={6} hasRadius shadow="tableShadow">
              <Flex direction="column" gap={4}>
                <Typography variant="sigma" textColor="neutral600" fontWeight="bold">TOTAL URLS</Typography>
                <Typography variant="alpha" fontWeight="bold">
                  {sitemapStats.totalUrls}
                </Typography>
              </Flex>
            </Box>
            <Box style={{ flex: 1 }} background="neutral0" padding={6} hasRadius shadow="tableShadow">
              <Flex direction="column" gap={4}>
                <Typography variant="sigma" textColor="neutral600" fontWeight="bold">CONTENT TYPES</Typography>
                <Typography variant="alpha" fontWeight="bold">
                  {sitemapStats.contentTypes?.length || 0}
                </Typography>
              </Flex>
            </Box>
            <Box style={{ flex: 1 }} background="neutral0" padding={6} hasRadius shadow="tableShadow">
              <Flex direction="column" gap={4}>
                <Typography variant="sigma" textColor="neutral600" fontWeight="bold">LAST UPDATED</Typography>
                <Typography variant="alpha" fontWeight="bold">
                  {new Date(sitemapStats.lastGenerated).toLocaleDateString()}
                </Typography>
              </Flex>
            </Box>
          </Flex>
        )}

        {/* Configuration */}
        <Box marginBottom={8} background="neutral0" padding={6} hasRadius shadow="tableShadow">
          <Typography variant="omega" fontWeight="semiBold" marginBottom={6} style={{ display: 'block' }}>
            Base URL Configuration
          </Typography>
          <Typography variant="sigma" fontWeight="bold" marginBottom={3}>Website Base URL</Typography>
          <Flex direction="column" gap={3} marginTop={3} style={{ width: '100%' }}>
            <Box style={{ width: '100%' }}>
              <TextInput
                placeholder="https://example.com"
                value={config.baseUrl || ''}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setConfig({ ...config, baseUrl: e.target.value })
                }
              />
            </Box>
          </Flex>
        </Box>

        {/* Content Types */}
        <Box marginBottom={8} background="neutral0" padding={6} hasRadius shadow="tableShadow">
          <Flex justifyContent="space-between" alignItems="center" marginBottom={4}>
            <Typography variant="delta" fontWeight="semiBold">Content Types</Typography>
            <Badge>{selectedTypes.size} selected</Badge>
          </Flex>

          {contentTypes.length === 0 ? (
            <Box padding={8} background="neutral100" hasRadius>
              <Flex direction="column" alignItems="center" gap={3}>
                <Information width="32px" height="32px" />
                <Typography variant="delta" textColor="neutral600">No content types available</Typography>
                <Typography variant="pi" textColor="neutral500">
                  Content types must have a 'slug' field
                </Typography>
              </Flex>
            </Box>
          ) : (
            <Flex direction="column" gap={2} alignItems="stretch" style={{ width: '100%' }}>
              {contentTypes.map((ct) => (
                <Box
                  key={ct.uid}
                  background={selectedTypes.has(ct.uid) ? "primary100" : "neutral0"}
                  padding={4}
                  hasRadius
                  shadow="filterShadow"
                  style={{ cursor: 'pointer', transition: 'all 0.2s', width: '100%' }}
                  onClick={() => handleToggleContentType(ct.uid)}
                >
                  <Flex direction="column" gap={3} alignItems="flex-start" style={{ width: '100%' }}>
                    <Flex justifyContent="space-between" alignItems="center" wrap="wrap" gap={2} style={{ width: '100%' }}>
                      <Flex gap={2} alignItems="center">
                        <input
                          type="checkbox"
                          checked={selectedTypes.has(ct.uid)}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            e.stopPropagation();
                            handleToggleContentType(ct.uid);
                          }}
                          style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                        />
                        <Box>
                          <Typography variant="delta" fontWeight="semiBold">
                            {ct.displayName}
                          </Typography>
                          <Typography variant="pi" textColor="neutral600">
                            {ct.uid}
                          </Typography>
                        </Box>
                      </Flex>
                      {ct.hasPublishedAt && (
                        <Badge backgroundColor="success100" textColor="success700">Published</Badge>
                      )}
                    </Flex>

                    {selectedTypes.has(ct.uid) && (
                      <Box
                        paddingTop={3}
                        onClick={(e: React.MouseEvent) => e.stopPropagation()}
                        background="neutral100"
                        padding={4}
                        hasRadius
                      >
                        <Flex direction="column" gap={4}>
                          <Box>
                            <Typography variant="pi" fontWeight="bold" marginBottom={2} style={{ display: 'block' }}>URL Structure</Typography>
                            <Typography variant="pi" textColor="neutral600" marginBottom={3} style={{ display: 'block' }}>
                              Configure how URLs are generated for this content type
                            </Typography>

                            <Flex gap={4} alignItems="flex-start" style={{ width: '100%' }}>
                              <Box style={{ flex: 1 }}>
                                <Typography variant="pi" textColor="neutral700" marginBottom={2} style={{ display: 'block' }}>Default:</Typography>
                                <Typography variant="pi" fontWeight="semiBold">
                                  {config.baseUrl || 'https://example.com'}/{ct.pluralName}/[slug]
                                </Typography>
                              </Box>

                              <Box style={{ flex: 1 }}>
                                <Typography variant="pi" textColor="neutral700" marginBottom={2} style={{ display: 'block' }}>Custom:</Typography>
                                <TextInput
                                  placeholder="Leave empty to use default"
                                  value={config.customPaths?.[ct.uid] || ''}
                                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                    updateCustomPath(ct.uid, e.target.value)
                                  }
                                />
                                <Typography variant="pi" textColor="neutral600" marginTop={1} style={{ fontSize: '12px' }}>
                                  Examples: "/" for root, "/blog" for custom
                                </Typography>
                              </Box>
                            </Flex>

                            {config.customPaths?.[ct.uid] && (
                              <Box marginTop={3}>
                                <Typography variant="pi" textColor="neutral700" marginBottom={1} style={{ display: 'block' }}>Preview:</Typography>
                                <Typography variant="pi" fontWeight="semiBold" textColor="primary600">
                                  {config.baseUrl || 'https://example.com'}{config.customPaths[ct.uid] === '/' ? '' : config.customPaths[ct.uid]}/[slug]
                                </Typography>
                              </Box>
                            )}
                          </Box>

                          <Divider />

                          <Flex gap={4} alignItems="flex-start" style={{ width: '100%' }}>
                            <Box style={{ flex: 1 }}>
                              <Typography variant="pi" textColor="neutral700" marginBottom={2} style={{ display: 'block' }}>Priority:</Typography>
                              <NumberInput
                                placeholder="0.7"
                                min={0}
                                max={1}
                                step={0.1}
                                value={config.customPriorities?.[ct.uid] || 0.7}
                                onValueChange={(value: number) => updateCustomPriority(ct.uid, value)}
                              />
                              <Typography variant="pi" textColor="neutral600" marginTop={1} style={{ fontSize: '12px' }}>
                                0.0 to 1.0 (default: 0.7)
                              </Typography>
                            </Box>
                            <Box style={{ flex: 1 }}>
                              <Typography variant="pi" textColor="neutral700" marginBottom={2} style={{ display: 'block' }}>Change Frequency:</Typography>
                              <SingleSelect
                                placeholder="Select frequency"
                                value={config.customChangefreq?.[ct.uid] || 'monthly'}
                                onChange={(value: string) => updateCustomChangefreq(ct.uid, value)}
                              >
                                <SingleSelectOption value="always">Always</SingleSelectOption>
                                <SingleSelectOption value="hourly">Hourly</SingleSelectOption>
                                <SingleSelectOption value="daily">Daily</SingleSelectOption>
                                <SingleSelectOption value="weekly">Weekly</SingleSelectOption>
                                <SingleSelectOption value="monthly">Monthly</SingleSelectOption>
                                <SingleSelectOption value="yearly">Yearly</SingleSelectOption>
                                <SingleSelectOption value="never">Never</SingleSelectOption>
                              </SingleSelect>
                            </Box>
                          </Flex>
                        </Flex>
                      </Box>
                    )}
                  </Flex>
                </Box>
              ))}
            </Flex>
          )}
        </Box>

        {/* Actions - Simplified */}
        <Flex justifyContent="flex-end" gap={2} wrap="wrap" marginTop={6}>
          <Button onClick={() => {
            fetchConfig();
            toggleNotification({
              type: 'info',
              message: 'Configuration has been reset to last saved values',
              timeout: 3000,
            });
          }} variant="tertiary">
            Reset
          </Button>
          <Button
            onClick={handleSaveConfig}
            loading={loading}
            startIcon={<Check />}
            disabled={!hasChanges || selectedTypes.size === 0}
          >
            Save Configuration
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export { HomePage };