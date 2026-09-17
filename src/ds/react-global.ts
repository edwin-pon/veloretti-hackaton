// The Veloretti design-system bundle is compiled JSX that resolves `React` from
// the global scope (it was built for a <script> tag, not a module graph).
// Publishing React on globalThis before the bundle evaluates is what lets us
// import it as a module.
import * as React from 'react'

;(globalThis as unknown as { React: typeof React }).React = React
