export function prevent(fn?: any, defaultOnly?: any) {
    return (e: any, ...params: any) => {
      e && e.preventDefault();
      !defaultOnly && e && e.stopPropagation();
      fn(e, ...params);
    };
  }
  