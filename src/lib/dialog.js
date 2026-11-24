const openers = new WeakMap();

// Opens a modal <dialog>, remembering what had focus so closeDialog can return it (Safari doesn't on its own).
export function openDialog(el) {
  if (el.open) return;
  openers.set(el, document.activeElement);
  el.showModal();
}

// Fades a modal <dialog> out, then closes it. CSS alone can't animate the close in Firefox or Safari (no `overlay`
// transition), so the exit plays on [data-closing] while the dialog is still open. Duration comes from its CSS
// transition (0 under reduced motion).
export function closeDialog(el, done) {
  if (!el?.open || el.dataset.closing !== undefined) return;
  el.dataset.closing = "";
  setTimeout(() => {
    el.close();
    delete el.dataset.closing;
    if (!document.activeElement || document.activeElement === document.body) openers.get(el)?.focus();
    done?.();
  }, parseFloat(getComputedStyle(el).transitionDuration) * 1000 || 0);
}
