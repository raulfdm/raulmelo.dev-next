import React from 'react';
import { GetStaticPaths } from 'next';
import head from 'ramda/src/head';

import { Backend } from '@services/Backend';
import {
  PersonalInformationApiData,
  PostsTagApiData,
  SiteApiData,
  SocialApiData,
} from '@types-api';
import { TagPage, TagPageProps } from '@screens/Tag/TagPage';
import { SupportedLanguages } from '@types-app';

const Tag = ({ tag, personalInfo, social, site }: TagPageProps) => {
  return (
    <TagPage
      tag={tag}
      personalInfo={personalInfo}
      social={social}
      site={site}
    />
  );
};

type Params = {
  params: {
    slug: string;
  };
  locale: SupportedLanguages;
};

export const getStaticProps = async ({ params }: Params) => {
  const [tags, personalInfo, social, site]: [
    PostsTagApiData,
    PersonalInformationApiData,
    SocialApiData,
    SiteApiData,
  ] = await Promise.all([
    Backend.fetch('post-tags', `?slug=${params.slug}`),
    Backend.fetch('personal-information'),
    Backend.fetch('social'),
    Backend.fetch('site'),
  ]);

  const tag = head(tags);

  return {
    props: { tag, personalInfo, social, site },
    revalidate: 1,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const tags = (await Backend.fetch('post-tags')) as PostsTagApiData;

  const paths: Params[] = [];

  /**
   * Without this generation, when I'm in `/tag/css` for instance
   * and want to access `/pt/tag/css`, it'll redirect to a 404 page.
   *
   * If I switch "fallback" to true, the problem will be fixed only locally
   * or running in server (not in serverless) and it'll also leads in the first
   * render of TagPage having "tag" prop as undefined.
   *
   * In this way I generate the same page for both lang and I don't have to do
   * any workaround.
   */

  ['en', 'pt'].forEach((lang) => {
    tags.forEach((tag) => {
      paths.push({
        params: {
          slug: tag.slug,
        },
        locale: lang as SupportedLanguages,
      });
    });
  });

  return {
    paths,
    fallback: false,
  };
};

export default Tag;