import useSWRInfinite from 'swr/infinite';
import { PageData } from '../types';

const PAGE_SIZE = 16;

const getKey = (pageIndex: number, previousPageData: any) => {
  if (previousPageData && !previousPageData.next) return null; // reached the end

  if (pageIndex === 0) return `https://pokeapi.co/api/v2/pokemon?offset=0&limit=${PAGE_SIZE}`; //first page

  return previousPageData.next; //return next page
};

const usePagination = () => {
  const { data, error, size, setSize } = useSWRInfinite(getKey, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  const flattenedPokemonPages = data?.flatMap((page: PageData) => page?.results) ?? [];

  const isLoadingMore = data && typeof data[size - 1] === 'undefined';

  const isReachedEnd = data && data[data.length - 1]?.length < PAGE_SIZE;

  return {
    data: flattenedPokemonPages,
    size,
    setSize,
    error,
    isLoadingMore,
    isReachedEnd,
  };
};

export default usePagination;
