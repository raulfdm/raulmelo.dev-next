import React from 'react';
import { Algolia } from '@styled-icons/boxicons-logos/Algolia';
import { defineMessages } from 'react-intl';
import { InstantSearch, SearchBox, Hits, Stats } from 'react-instantsearch-dom';

import { SEO } from '@components/SEO';
import { useLocalization } from '@hooks/useLocalization';
import { algoliaConfig } from '@config/algolia';
import { HitAlgolia } from '@types-app';
import { PostCard } from '@components/PostCard';
import { MenuBar } from '@components/MenuBar';
import { algoliaDebounceSearchClient } from './utils';

const messages = defineMessages({
  stats: {
    id: 'search.stats',
  },
  input: {
    id: 'search.input',
  },
  seoDescription: {
    id: 'siteData.description',
  },
  seoTitle: {
    id: 'siteData.title',
  },
});

export const SearchPage = () => {
  const { formatMessage } = useLocalization();
  return (
    <>
      <SEO
        url="/search"
        description={formatMessage(messages.seoDescription)}
        title={formatMessage(messages.seoTitle)}
      />
      <MenuBar />
      <main className="font-san container mx-auto px-4 md:px-0 max-w-screen-md">
        <InstantSearch
          searchClient={algoliaDebounceSearchClient}
          indexName={algoliaConfig.indexName}
        >
          <div className="pb-5 md:pb-10">
            <SearchBox
              searchAsYouType
              autoFocus
              translations={{ placeholder: formatMessage(messages.input) }}
            />
            <Stats
              translations={{
                stats(results, milliseconds) {
                  return formatMessage(messages.stats, {
                    results,
                    milliseconds,
                  });
                },
              }}
            />
            <AlgoliaHits />
          </div>

          <PoweredByAlgolia />
        </InstantSearch>
      </main>
    </>
  );
};

function PoweredByAlgolia() {
  return (
    <a
      className="flex justify-end items-center font-medium font-sans text-base"
      href="https://www.algolia.com/"
    >
      Powered by <Algolia size="2rem" color="#5468ff" /> Algolia
    </a>
  );
}

function AlgoliaHits() {
  return (
    <Hits
      hitComponent={({ hit }: { hit: HitAlgolia }) => {
        const { timeToRead, excerpt } = hit;

        const post = {
          ...hit,
          childStrapiPostContent: {
            childMdx: { excerpt, timeToRead },
          },
        };

        return <PostCard post={post as any} key={hit.objectID} />;
      }}
    />
  );
}
