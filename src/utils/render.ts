import Block from '../services/Block';

const render = (query: string, block: Block) => {
  const root = document.querySelector(query);
  if (!root) {
    return null;
  }

  root.innerHTML = '';
  root.appendChild(block.getContent());
  block.dispatchComponentDidMount();
  return root;
}

export default render;
