// Turns a markdown image that's alone on its own line — `![alt](src)` — into a
// bordered <figure>/<figcaption> matching the site's editorial theme, so authors
// keep writing plain markdown and get the caption/border treatment for free.
// Hand-rolled walk instead of pulling in unist-util-visit: hast nodes are just
// { type, tagName, properties, children }, so a manual recursive walk is short
// enough not to need the dependency.

const ONLY_IMAGE_CLASS = 'w-full border border-accent';
const FIGCAPTION_CLASS = 'mt-2 text-center text-xs tracking-widest uppercase text-base-content/50';

function isWhitespaceTextNode(node) {
  return node.type === 'text' && node.value.trim() === '';
}

function onlyChildImage(node) {
  if (node.type !== 'element' || node.tagName !== 'p') return null;
  const meaningful = node.children.filter((child) => !isWhitespaceTextNode(child));
  if (meaningful.length !== 1) return null;
  const [only] = meaningful;
  return only.type === 'element' && only.tagName === 'img' ? only : null;
}

function toFigure(img) {
  const alt = img.properties?.alt?.trim();
  const figureChildren = [
    {
      ...img,
      properties: { ...img.properties, class: ONLY_IMAGE_CLASS },
    },
  ];

  if (alt) {
    figureChildren.push({
      type: 'element',
      tagName: 'figcaption',
      properties: { class: FIGCAPTION_CLASS },
      children: [{ type: 'text', value: alt }],
    });
  }

  return {
    type: 'element',
    tagName: 'figure',
    properties: { class: 'not-prose my-8' },
    children: figureChildren,
  };
}

function walk(node) {
  if (!node.children) return;

  node.children = node.children.map((child) => {
    const img = onlyChildImage(child);
    if (img) return toFigure(img);
    walk(child);
    return child;
  });
}

export default function rehypeFigureImages() {
  return (tree) => {
    walk(tree);
  };
}
