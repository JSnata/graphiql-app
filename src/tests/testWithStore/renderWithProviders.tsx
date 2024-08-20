import { render, type RenderOptions } from "@testing-library/react";
import { setupStore, type AppStore, type RootState } from "./setupStore";
import type { PropsWithChildren, ReactElement } from "react";
import { Provider } from "react-redux";


interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'>
{
  preloadedState?: Partial<RootState>;
  store?: AppStore;
}

export function renderWithProviders (
  ui: ReactElement,
  {
    preloadedState = {} as Partial<RootState>,
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {},
)
{
  const Wrapper = ({ children }: PropsWithChildren<object>): JSX.Element => (
    <Provider store={ store }>
      { children }
    </Provider>
  );

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}