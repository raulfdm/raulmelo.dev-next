import { PostApiData } from '@types-api';

export type RelevantTranslationData = {
  language: PostApiData['language'];
  uri: PostApiData['slug'];
};

export function getRelevantTranslationData(post: PostApiData) {
  const { translation } = post;
  return {
    language: translation!.language,
    uri: translation!.slug,
  };
}
