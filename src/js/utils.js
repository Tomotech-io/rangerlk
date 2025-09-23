export const qs = (sel, scope = document) => scope.querySelector(sel);
export const qsa = (sel, scope = document) => [...scope.querySelectorAll(sel)];
