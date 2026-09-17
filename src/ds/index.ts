// The design-system surface the app imports from.
//
// It used to re-export a compiled Datalab bundle off the global scope. That
// bundle hardcodes its palette in generated code, so it cannot be rethemed;
// these components take its exact props and paint them in Veloretti's visual
// language instead. Callers did not change.
export {
  Badge,
  Spinner,
  ProgressBar,
  AlertBanner,
  Avatar,
  Stepper,
  TextInput,
  Select,
  Toggle,
} from './veloretti'
