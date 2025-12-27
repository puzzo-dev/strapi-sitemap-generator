import { Page } from '@strapi/admin/strapi-admin';
import { Routes, Route } from 'react-router-dom';

import { HomePage } from './HomePage';

const App = () => {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="*" element={<Page.Error />} />
    </Routes>
  );
};

export { App };
