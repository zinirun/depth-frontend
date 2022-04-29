export default function deepFind(collection: any, key: string, value: any) {
  for (const o of collection) {
    for (const [k, v] of Object.entries(o)) {
      if (k === key && v === value) {
        return o;
      }
      if (Array.isArray(v)) {
        const _o: any = deepFind(v, key, value);
        if (_o) {
          return _o;
        }
      }
    }
  }
}
