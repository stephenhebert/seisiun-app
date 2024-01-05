import { toValue } from 'vue'

export function getFirstFocusableElement(domElement) {
  const el = toValue(domElement)
  console.log({el})
  const focusableElements = el?.querySelectorAll(
    'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex]:not([tabindex^="-"]), [contenteditable]',
  )
  return focusableElements?.[0]
}