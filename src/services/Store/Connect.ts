import Store from './Store';
import { StoreEvents } from './Store';
import isEqual from '../../utils/isEqual';
import { StoreType } from './types';
import { BaseProps, BlockType } from '../types';

const connect = <T extends BaseProps>(Component: BlockType, mapStateToProps: (state: StoreType) => T) => {
  return class extends Component {
    constructor(tagName: string, props: BaseProps = {}) {
      const store = new Store();

      let state = mapStateToProps(store.getState());
      super(tagName, { ...props, ...mapStateToProps(store.getState()) });

      store.on(StoreEvents.Updated, () => {
        const newState = mapStateToProps(store.getState());
        if (!isEqual(state, newState)) {
          this.setProps({...newState});
        }
        state = newState;
      });
    }
  };
}

export default connect;
