import mdxRemoteRenderToString from 'next-mdx-remote/render-to-string';
import mdxRemoteHydrate from 'next-mdx-remote/hydrate';
import rehypeAutoLink from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import mdxPrims from 'mdx-prism-2';
import remarkCodeTitle from 'remark-code-titles';
import remarkUnwrapImages from 'remark-unwrap-images';

import { mdxComponents } from '@components/MdxComponents';

export function hydrate(source: RenderToStringReturnType) {
  return mdxRemoteHydrate(source, {
    components: mdxComponents,
  });
}

export function renderToString(content: string) {
  return mdxRemoteRenderToString(content, {
    components: mdxComponents,
    mdxOptions: {
      remarkPlugins: [remarkUnwrapImages, remarkCodeTitle],
      rehypePlugins: [
        [
          mdxPrims,
          {
            ignoreMissing: true,
          },
        ],
        rehypeSlug,
        [
          rehypeAutoLink,
          {
            properties: {
              className: 'copy-title-icon',
            },
            content: null,
          },
        ],
      ],
    },
  });
}
