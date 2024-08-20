'use client';
import { useRef } from 'react';
import { Provider } from 'react-redux';
import { makeStore, AppStore } from '../lib/store';


//включить StoreProviderлюбое место в дереве выше, где используется хранилище 
export default function StoreProvider ({
  children
}: {
  children: React.ReactNode;
})
{
  const storeRef = useRef<AppStore>();
  if (!storeRef.current)
  {
    storeRef.current = makeStore();
    // storeRef.current.dispatch(initializeCount(count))  если нужно исходные данные в сторе
  }

  return <Provider store={ storeRef.current }>{ children }</Provider>;
}