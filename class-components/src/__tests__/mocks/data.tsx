import { render, type RenderResult } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import CardDetails from '../../components/cardDetail/CardDetail';

import { Provider } from 'react-redux';
import store from '../../store';
import { ThemeContextProvider } from '../../context/ThemeContext';
import App from '../../App';

export const mockListResponse = {
  count: 2,
  data: [
    {
      name: 'Link',
      race: 'Hylian',
      description: 'Hero of Hyrule',
      id: 'card-1',
    },
    {
      name: 'Zelda',
      race: 'Hylian',
      description: 'Princess of Hyrule',
      id: 'card-2',
    },
  ],
};

export const mockByIdResponse = {
  success: true,
  data: {
    id: 'card-1',
    name: 'Link',
    race: 'Hylian',
    description: 'Hero of Hyrule',
  },
};

export const mockRender = (initialPath: string = '/page/1'): RenderResult => {
  return render(
    <Provider store={store}>
      <ThemeContextProvider>
        <MemoryRouter initialEntries={[initialPath]}>
          <App />
        </MemoryRouter>
      </ThemeContextProvider>
    </Provider>
  );
};

export const mockRenderWithTheme = (
  defaultPath: string = '/page/1'
): RenderResult => {
  return render(
    <Provider store={store}>
      <ThemeContextProvider>
        <MemoryRouter initialEntries={[defaultPath]}>
          <Routes>
            <Route path="/page/:page/detailsId/:id" element={<CardDetails />} />
          </Routes>
        </MemoryRouter>
      </ThemeContextProvider>
    </Provider>
  );
};
