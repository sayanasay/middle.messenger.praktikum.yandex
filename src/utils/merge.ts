// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Indexed<T = any> = {
    [key in string]: T;
  };

const merge = (lhs: Indexed, rhs: Indexed): Indexed => {
  for (const p in rhs) {
      if (!Object.prototype.hasOwnProperty.call(rhs, p)) {
          continue;
      }

      try {
          if (rhs[p].constructor === Object) {
              rhs[p] = merge(lhs[p] as Indexed, rhs[p] as Indexed);
          } else {
              lhs[p] = rhs[p];
          }
      } catch(e) {
          lhs[p] = rhs[p];
      }
  }

  return lhs;
}

export default merge;
