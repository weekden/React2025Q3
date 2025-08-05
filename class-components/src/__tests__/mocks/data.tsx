import { render, type RenderResult } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import CardDetails from '../../components/cardDetail/CardDetail';
import MainPage from '../../pages/mainPage';

export const mockListResponse = {
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

export const mockRender = (defaultPath: string = '/page/1'): RenderResult => {
  return render(
    <MemoryRouter initialEntries={[defaultPath]}>
      <Routes>
        <Route path="/page/:page" element={<MainPage />}>
          <Route path="detailsId/:id" element={<CardDetails />} />
        </Route>
      </Routes>
    </MemoryRouter>
  );
};
