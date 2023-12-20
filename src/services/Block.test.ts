import { expect } from 'chai';
import Block from './Block';
import sinon from 'sinon';
import { BaseProps } from './types';

describe('Block', () => {
  class TestBlock extends Block<BaseProps> {
    constructor(tagName: string, props: BaseProps) {
      super(tagName, props);
    }

    render() {
      return this.compile('{{ content }}', this._props);
    }
  }

  const testBlock = new TestBlock('h2', {
    content: 'Test block',
    attrs: { class: 'base' },
  });

  it('should render block', () => {
    expect(testBlock.getContent()?.innerHTML).to.be.eq('Test block');
  });

  it('should render block with tag', () => {
    expect(testBlock.getContent()?.tagName).to.be.eq('H2');
  });

  it('should render block with class', () => {
    expect(testBlock.getContent()?.className ).to.be.eq('base');
  });

  it('should update block when set prop', () => {
    testBlock.setProps({content: 'Updated test block'})
    expect(testBlock.getContent()?.innerHTML ).to.be.eq('Updated test block');
  });

  it('should not update block when set equal props', () => {
    const render = sinon.spy(testBlock,'render');
    testBlock.setProps({content: 'Updated test block'})

    expect(render.notCalled).to.be.true;
  });
});
