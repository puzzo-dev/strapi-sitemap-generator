import React, { useState, useEffect } from 'react';
import {
  Main,
  Box,
  Button,
  Flex,
  Grid,
  Typography,
  TextInput,
  NumberInput,
  SingleSelect,
  SingleSelectOption,
  Field,
  FieldLabel,
  FieldInput,
  Divider,
  Badge,
  IconButton,
} from '@strapi/design-system';
import { Check, Download, Eye, ArrowClockwise, Information } from '@strapi/icons';
import { useNotification, useFetchClient, Page } from '@strapi/admin/strapi-admin';

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
    setGenerating(true);
    try {
      const { data } = await get('/strapi-sitemap-generator/data');
      setSitemapStats(data.meta);

      toggleNotification({
        type: 'success',
        message: `Sitemap generated! Total URLs: ${data.meta.totalUrls}`,
      });
    } catch (error) {
      toggleNotification({
        type: 'danger',
        message: 'Failed to generate sitemap',
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
    <Main>
      <Page.Title>Sitemap Generator</Page.Title>

      <Box background="neutral0" paddingTop={6} paddingBottom={6} paddingLeft={10} paddingRight={10}>
        {/* Page Header */}
        <Box marginBottom={6}>
          <Typography variant="alpha" fontWeight="bold">Sitemap Generator</Typography>
          <Box marginTop={2}>
            <Typography variant="omega" textColor="neutral600">
              Generate and configure XML sitemaps for your content
            </Typography>
          </Box>
        </Box>

        {/* Quick Actions */}
        <Box marginBottom={8} background="neutral100" padding={6} hasRadius>
          <Flex justifyContent="space-between" alignItems="center">
            <Box>
              <Typography variant="delta" fontWeight="semiBold" marginBottom={1}>Quick Actions</Typography>
              <Typography variant="omega" textColor="neutral600">Generate, preview, or download your sitemap</Typography>
            </Box>
            <Flex gap={2}>
              <Button
                onClick={handleGenerateSitemap}
                loading={generating}
                startIcon={<ArrowClockwise />}
                variant="default"
              >
                Generate
              </Button>
              <Button onClick={handleViewSitemap} startIcon={<Eye />} variant="secondary">
                Preview
              </Button>
              <Button onClick={handleDownloadSitemap} startIcon={<Download />} variant="tertiary">
                Download
              </Button>
            </Flex>
          </Flex>
        </Box>

        {/* Statistics Cards */}
        {sitemapStats && (
          <Box marginBottom={8}>
            <Grid.Root gap={5}>
              <Grid.Item col={4}>
                <Box background="primary100" padding={6} hasRadius>
                  <Flex direction="column" gap={2}>
                    <Typography variant="pi" textColor="primary600" fontWeight="bold">TOTAL URLS</Typography>
                    <Typography variant="alpha" fontWeight="bold" textColor="primary600">
                      {sitemapStats.totalUrls}
                    </Typography>
                    <Typography variant="omega" textColor="primary700">
                      Indexed pages
                    </Typography>
                  </Flex>
                </Box>
              </Grid.Item>
              <Grid.Item col={4}>
                <Box background="success100" padding={6} hasRadius>
                  <Flex direction="column" gap={2}>
                    <Typography variant="pi" textColor="success600" fontWeight="bold">CONTENT TYPES</Typography>
                    <Typography variant="alpha" fontWeight="bold" textColor="success600">
                      {sitemapStats.contentTypes?.length || 0}
                    </Typography>
                    <Typography variant="omega" textColor="success700">
                      Active collections
                    </Typography>
                  </Flex>
                </Box>
              </Grid.Item>
              <Grid.Item col={4}>
                <Box background="secondary100" padding={6} hasRadius>
                  <Flex direction="column" gap={2}>
                    <Typography variant="pi" textColor="secondary600" fontWeight="bold">LAST UPDATED</Typography>
                    <Typography variant="epsilon" fontWeight="semiBold" textColor="secondary700">
                      {new Date(sitemapStats.lastGenerated).toLocaleDateString()}
                    </Typography>
                    <Typography variant="omega" textColor="secondary700">
                      {new Date(sitemapStats.lastGenerated).toLocaleTimeString()}
                    </Typography>
                  </Flex>
                </Box>
              </Grid.Item>
            </Grid.Root>
          </Box>
        )}

        <Divider marginBottom={6} />

        {/* Base Configuration */}
        <Box marginBottom={8}>
          <Typography variant="beta" fontWeight="semiBold" marginBottom={4}>
            Base Configuration
          </Typography>
          <Box background="neutral0" padding={6} hasRadius borderColor="neutral200">
            <Field name="baseUrl" required>
              <Flex direction="column" gap={1}>
                <FieldLabel>Website Base URL</FieldLabel>
                <FieldInput
                  type="text"
                  placeholder="https://example.com"
                  value={config.baseUrl || ''}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setConfig({ ...config, baseUrl: e.target.value })
                  }
                />
                <Typography variant="pi" textColor="neutral600">Enter your website's base URL without trailing slash</Typography>
              </Flex>
            </Field>
          </Box>
        </Box>

        <Divider marginBottom={6} />

        {/* Content Types */}
        <Box marginBottom={8}>
          <Flex justifyContent="space-between" alignItems="center" marginBottom={4}>
            <Box>
              <Typography variant="beta" fontWeight="semiBold">Content Types</Typography>
              <Typography variant="omega" textColor="neutral600" marginTop={1}>
                Select which content types to include in your sitemap
              </Typography>
            </Box>
            <Badge>{selectedTypes.size} selected</Badge>
          </Flex>

          {contentTypes.length === 0 ? (
            <Box padding={10} background="neutral100" hasRadius>
              <Flex direction="column" alignItems="center" gap={3}>
                <Information width="48px" height="48px" color="neutral500" />
                <Typography variant="delta" textColor="neutral600">No eligible content types found</Typography>
                <Typography variant="omega" textColor="neutral500" textAlign="center">
                  Content types must have a 'slug' field to be included in sitemaps
                </Typography>
              </Flex>
            </Box>
          ) : (
            <Flex direction="column" gap={3}>
              {contentTypes.map((ct, index) => (
                <Box
                  key={ct.uid}
                  background={selectedTypes.has(ct.uid) ? "primary100" : "neutral0"}
                  padding={5}
                  hasRadius
                  borderColor={selectedTypes.has(ct.uid) ? "primary200" : "neutral200"}
                  borderWidth="1px"
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleToggleContentType(ct.uid)}
                >
                  <Flex direction="column" gap={4}>
                    {/* Header */}
                    <Flex justifyContent="space-between" alignItems="center">
                      <Flex gap={3} alignItems="center">
                        <input
                          type="checkbox"
                          checked={selectedTypes.has(ct.uid)}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            e.stopPropagation();
                            handleToggleContentType(ct.uid);
                          }}
                          style={{ width: '20px', height: '20px', cursor: 'pointer' }}
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
                        <Badge backgroundColor="success100" textColor="success700">Published Content</Badge>
                      )}
                    </Flex>

                    {/* Expanded Settings */}
                    {selectedTypes.has(ct.uid) && (
                      <Box
                        marginTop={2}
                        paddingTop={4}
                        borderColor="neutral200"
                        onClick={(e: React.MouseEvent) => e.stopPropagation()}
                      >
                        <Grid.Root gap={4}>
                          <Grid.Item col={12}>
                            <Field name={`customPath-${ct.uid}`}>
                              <Flex direction="column" gap={1}>
                                <FieldLabel>URL Path Pattern</FieldLabel>
                                <FieldInput
                                  type="text"
                                  placeholder={`/${ct.pluralName}/:slug`}
                                  value={config.customPaths?.[ct.uid] || ''}
                                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                    updateCustomPath(ct.uid, e.target.value)
                                  }
                                />
                                <Typography variant="pi" textColor="neutral600">Leave empty to use default pattern: /{ct.pluralName}/:slug</Typography>
                              </Flex>
                            </Field>
                          </Grid.Item>
                          <Grid.Item col={6}>
                            <Field name={`priority-${ct.uid}`}>
                              <Flex direction="column" gap={1}>
                                <FieldLabel>SEO Priority</FieldLabel>
                                <NumberInput
                                  placeholder="0.7"
                                  min={0}
                                  max={1}
                                  step={0.1}
                                  value={config.customPriorities?.[ct.uid] || 0.7}
                                  onValueChange={(value: number) => updateCustomPriority(ct.uid, value)}
                                />
                                <Typography variant="pi" textColor="neutral600">Value between 0.0 and 1.0</Typography>
                              </Flex>
                            </Field>
                          </Grid.Item>
                          <Grid.Item col={6}>
                            <Field name={`changefreq-${ct.uid}`}>
                              <Flex direction="column" gap={1}>
                                <FieldLabel>Update Frequency</FieldLabel>
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
                                <Typography variant="pi" textColor="neutral600">How often this content changes</Typography>
                              </Flex>
                            </Field>
                          </Grid.Item>
                        </Grid.Root>
                      </Box>
                    )}
                  </Flex>
                </Box>
              ))}
            </Flex>
          )}
        </Box>

        <Divider marginBottom={6} />

        {/* Action Footer */}
        <Box background="neutral100" padding={5} hasRadius>
          <Flex justifyContent="space-between" alignItems="center">
            <Typography variant="omega" textColor="neutral600">
              Remember to save your configuration after making changes
            </Typography>
            <Flex gap={2}>
              <Button onClick={fetchConfig} variant="tertiary">
                Cancel
              </Button>
              <Button onClick={handleSaveConfig} loading={loading} startIcon={<Check />} disabled={selectedTypes.size === 0}>
                Save Configuration
              </Button>
            </Flex>
          </Flex>
        </Box>
      </Box>
    </Main>
  );
};

export { HomePage };
