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
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [sitemapStats, setSitemapStats] = useState<any>(null);

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
      setSelectedTypes(new Set(data.selectedContentTypes || []));
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
      toggleNotification({
        type: 'info',
        message: 'Saving configuration...',
      });
      await put('/strapi-sitemap-generator/config', {
        baseUrl: config.baseUrl || 'https://example.com',
        selectedContentTypes: Array.from(selectedTypes),
        customPaths: config.customPaths || {},
        customPriorities: config.customPriorities || {},
        customChangefreq: config.customChangefreq || {},
      });

      toggleNotification({
        type: 'success',
        message: 'Configuration saved successfully!',
      });
    } catch (error) {
      toggleNotification({
        type: 'danger',
        message: 'Failed to save configuration',
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
      });
      return;
    }

    setGenerating(true);
    try {
      toggleNotification({
        type: 'info',
        message: 'Generating sitemap...',
      });
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

      toggleNotification({
        type: 'success',
        message: `Sitemap generated! Total URLs: ${data.meta.totalUrls}`,
      });
    } catch (error) {
      console.error('Generation error:', error);
      toggleNotification({
        type: 'danger',
        message: 'Failed to generate sitemap - check console for details',
      });
    } finally {
      setGenerating(false);
    }
  };

  const handleViewSitemap = () => {
    toggleNotification({
      type: 'info',
      message: 'Opening sitemap in new tab...',
    });
    window.open('/api/strapi-sitemap-generator/sitemap.xml', '_blank');
  };

  const handleDownloadSitemap = () => {
    toggleNotification({
      type: 'info',
      message: 'Downloading sitemap...',
    });
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
                      >
                        <Flex direction="column" gap={2}>
                          <Flex gap={3} alignItems="center" style={{ width: '100%' }}>
                            <Box style={{ minWidth: '120px' }}>
                              <Typography variant="pi" fontWeight="bold">URL Pattern</Typography>
                            </Box>
                            <Box style={{ flex: 1 }}>
                              <TextInput
                                placeholder={`/${ct.pluralName}/:slug`}
                                value={config.customPaths?.[ct.uid] || ''}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                  updateCustomPath(ct.uid, e.target.value)
                                }
                              />
                            </Box>
                          </Flex>

                          <Flex gap={3} alignItems="center" style={{ width: '100%' }}>
                            <Box style={{ minWidth: '120px' }}>
                              <Typography variant="pi" fontWeight="bold">Priority</Typography>
                            </Box>
                            <Box style={{ width: '120px' }}>
                              <NumberInput
                                placeholder="0.7"
                                min={0}
                                max={1}
                                step={0.1}
                                value={config.customPriorities?.[ct.uid] || 0.7}
                                onValueChange={(value: number) => updateCustomPriority(ct.uid, value)}
                              />
                            </Box>
                            <Box style={{ minWidth: '120px', marginLeft: '20px' }}>
                              <Typography variant="pi" fontWeight="bold">Frequency</Typography>
                            </Box>
                            <Box style={{ flex: 1 }}>
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
              message: 'Configuration reset to saved values',
            });
          }} variant="tertiary">
            Reset
          </Button>
          <Button
            onClick={handleSaveConfig}
            loading={loading}
            startIcon={<Check />}
            disabled={selectedTypes.size === 0}
          >
            Save Configuration
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export { HomePage };