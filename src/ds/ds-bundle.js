/* @ds-bundle: {"format":4,"namespace":"VelorettiDesignSystem_ff4e7e","components":[{"name":"CategoryCard","sourcePath":"components/commerce/CategoryCard.jsx"},{"name":"ProductCard","sourcePath":"components/commerce/ProductCard.jsx"},{"name":"SwatchPicker","sourcePath":"components/commerce/SwatchPicker.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Input","sourcePath":"components/core/Input.jsx"},{"name":"OptionCard","sourcePath":"components/core/OptionCard.jsx"},{"name":"SegmentedControl","sourcePath":"components/core/SegmentedControl.jsx"},{"name":"Select","sourcePath":"components/core/Select.jsx"},{"name":"FAQ","sourcePath":"components/feedback/FAQ.jsx"}],"sourceHashes":{"components/commerce/CategoryCard.jsx":"09caf5ca08c7","components/commerce/ProductCard.jsx":"3bb650c9f232","components/commerce/SwatchPicker.jsx":"98dd7cec64a1","components/core/Badge.jsx":"02a34eaeee5e","components/core/Button.jsx":"5dafa17c812c","components/core/Input.jsx":"d543340be841","components/core/OptionCard.jsx":"23e17bd57c00","components/core/SegmentedControl.jsx":"b23dc0d42a08","components/core/Select.jsx":"63b672b0c3c3","components/feedback/FAQ.jsx":"0dcb565eb6f1","ui_kits/website/App.jsx":"1aa4c9b0541e","ui_kits/website/Cart.jsx":"146b31e81c54","ui_kits/website/Chrome.jsx":"7677aa18f987","ui_kits/website/Configurator.jsx":"b5ab74abb052","ui_kits/website/Home.jsx":"4789c7213264","ui_kits/website/ProductDetail.jsx":"fbd558143f2c","ui_kits/website/Shop.jsx":"584499b91b6f"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.VelorettiDesignSystem_ff4e7e = window.VelorettiDesignSystem_ff4e7e || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/commerce/CategoryCard.jsx
try { (() => {
/**
 * Veloretti CategoryCard — bike photo on a light-grey tile with pagination dots,
 * then a title, short description and an "Explore ›" link below (no border).
 */
function CategoryCard({
  title,
  description,
  image,
  cta = "Explore",
  dots = 0,
  activeDot = 0,
  onClick,
  style
}) {
  const [hover, setHover] = React.useState(false);
  const wrap = {
    display: "flex",
    flexDirection: "column",
    fontFamily: "var(--font-sans)",
    cursor: "pointer",
    ...style
  };
  const tile = {
    position: "relative",
    aspectRatio: "1/1",
    background: "var(--vr-surface-2)",
    borderRadius: "var(--radius-md)",
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  };
  const img = {
    width: "82%",
    height: "82%",
    objectFit: "contain",
    transition: "transform var(--dur-slow) var(--ease-out)",
    transform: hover ? "scale(1.03)" : "none"
  };
  return /*#__PURE__*/React.createElement("div", {
    style: wrap,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    onClick: onClick
  }, /*#__PURE__*/React.createElement("div", {
    style: tile
  }, image ? /*#__PURE__*/React.createElement("img", {
    src: image,
    alt: title,
    style: img
  }) : /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--vr-gray-300)",
      fontSize: "0.8125rem",
      letterSpacing: "0.14em",
      textTransform: "uppercase"
    }
  }, title), dots > 1 && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      bottom: 16,
      left: 0,
      right: 0,
      display: "flex",
      justifyContent: "center",
      gap: 8
    }
  }, Array.from({
    length: dots
  }).map((_, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      width: 7,
      height: 7,
      borderRadius: "50%",
      background: i === activeDot ? "var(--vr-ink)" : "var(--vr-gray-300)"
    }
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "20px 2px 0",
      display: "flex",
      flexDirection: "column",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 500,
      fontSize: "1.5rem",
      letterSpacing: "-0.015em",
      color: "var(--vr-ink)"
    }
  }, title), description && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "1rem",
      color: "var(--vr-gray-500)"
    }
  }, description), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
      fontSize: "0.9375rem",
      color: "var(--vr-ink)"
    }
  }, cta, /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.6",
    strokeLinecap: "round",
    style: {
      transform: hover ? "translateX(3px)" : "none",
      transition: "transform var(--dur-fast) var(--ease-out)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M9 6l6 6-6 6"
  })))));
}
Object.assign(__ds_scope, { CategoryCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/commerce/CategoryCard.jsx", error: String((e && e.message) || e) }); }

// components/commerce/SwatchPicker.jsx
try { (() => {
/**
 * Veloretti SwatchPicker — row of circular colour swatches with a selected ring
 * and the active colour's name beside them (e.g. "Matte Black").
 */
function SwatchPicker({
  swatches = [],
  value,
  onChange,
  size = 24,
  showLabel = true,
  style
}) {
  const idx = Math.max(0, swatches.findIndex(s => s.name === value));
  const active = swatches[idx];
  const row = {
    display: "inline-flex",
    alignItems: "center",
    gap: 14,
    fontFamily: "var(--font-sans)",
    ...style
  };
  const dots = {
    display: "inline-flex",
    alignItems: "center",
    gap: 10
  };
  const ring = on => ({
    width: size + 10,
    height: size + 10,
    borderRadius: "50%",
    padding: 0,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    background: "transparent",
    cursor: "pointer",
    border: `1.5px solid ${on ? "var(--vr-ink)" : "transparent"}`,
    transition: "border-color var(--dur-fast) var(--ease-standard)"
  });
  const dot = hex => ({
    width: size,
    height: size,
    borderRadius: "50%",
    background: hex,
    border: "1px solid rgba(0,0,0,0.12)",
    boxSizing: "border-box"
  });
  return /*#__PURE__*/React.createElement("div", {
    style: row
  }, /*#__PURE__*/React.createElement("div", {
    style: dots
  }, swatches.map(s => /*#__PURE__*/React.createElement("button", {
    key: s.name,
    title: s.name,
    "aria-label": s.name,
    "aria-pressed": s.name === value,
    style: ring(s.name === value),
    onClick: () => onChange && onChange(s.name)
  }, /*#__PURE__*/React.createElement("span", {
    style: dot(s.hex)
  })))), showLabel && active && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "0.9375rem",
      color: "var(--vr-ink)"
    }
  }, active.name));
}
Object.assign(__ds_scope, { SwatchPicker });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/commerce/SwatchPicker.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Veloretti Badge — small status/label chip. */
function Badge({
  children,
  variant = "neutral",
  pill = false,
  ...rest
}) {
  const palettes = {
    neutral: {
      bg: "var(--vr-gray-100)",
      fg: "var(--vr-gray-700)",
      bd: "transparent"
    },
    ink: {
      bg: "var(--vr-black)",
      fg: "var(--vr-white)",
      bd: "transparent"
    },
    outline: {
      bg: "transparent",
      fg: "var(--vr-ink)",
      bd: "var(--vr-gray-300)"
    },
    accent: {
      bg: "var(--vr-orange)",
      fg: "var(--vr-white)",
      bd: "transparent"
    }
  };
  const p = palettes[variant] || palettes.neutral;
  const style = {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    height: "24px",
    padding: "0 10px",
    fontFamily: "var(--font-sans)",
    fontWeight: 500,
    fontSize: "0.6875rem",
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    lineHeight: 1,
    color: p.fg,
    background: p.bg,
    border: `1px solid ${p.bd}`,
    borderRadius: pill ? "var(--radius-pill)" : "var(--radius-sm)",
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    ...rest.style
  };
  return /*#__PURE__*/React.createElement("span", _extends({}, rest, {
    style: style
  }), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/commerce/ProductCard.jsx
try { (() => {
/**
 * Veloretti ProductCard — bike photo on a light-grey tile, with the name and
 * price BELOW the tile (no border, no shadow). Matches the shop/explore grid.
 */
function ProductCard({
  name,
  tagline,
  price,
  priceNote,
  image,
  badge,
  badgeVariant = "ink",
  colors = [],
  dots = 0,
  activeDot = 0,
  onClick,
  style
}) {
  const [hover, setHover] = React.useState(false);
  const wrap = {
    display: "flex",
    flexDirection: "column",
    fontFamily: "var(--font-sans)",
    background: "transparent",
    cursor: "pointer",
    ...style
  };
  const tile = {
    position: "relative",
    aspectRatio: "1/1",
    background: "var(--vr-surface-2)",
    borderRadius: "var(--radius-md)",
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  };
  const img = {
    width: "82%",
    height: "82%",
    objectFit: "contain",
    transition: "transform var(--dur-slow) var(--ease-out)",
    transform: hover ? "scale(1.03)" : "none"
  };
  return /*#__PURE__*/React.createElement("div", {
    style: wrap,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    onClick: onClick
  }, /*#__PURE__*/React.createElement("div", {
    style: tile
  }, badge && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: 16,
      left: 16,
      zIndex: 2
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Badge, {
    variant: badgeVariant
  }, badge)), image ? /*#__PURE__*/React.createElement("img", {
    src: image,
    alt: name,
    style: img
  }) : /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--vr-gray-300)",
      fontSize: "0.8125rem",
      letterSpacing: "0.14em",
      textTransform: "uppercase"
    }
  }, name), dots > 1 && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      bottom: 16,
      left: 0,
      right: 0,
      display: "flex",
      justifyContent: "center",
      gap: 8
    }
  }, Array.from({
    length: dots
  }).map((_, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      width: 7,
      height: 7,
      borderRadius: "50%",
      background: i === activeDot ? "var(--vr-ink)" : "var(--vr-gray-300)"
    }
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "18px 2px 0",
      display: "flex",
      flexDirection: "column",
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 500,
      fontSize: "1.25rem",
      letterSpacing: "-0.01em",
      color: "var(--vr-ink)"
    }
  }, name), tagline && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "0.9375rem",
      color: "var(--vr-gray-500)"
    }
  }, tagline), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "1rem",
      color: "var(--vr-ink)"
    }
  }, price, priceNote && /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--vr-gray-500)"
    }
  }, " \xB7 ", priceNote)), colors.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      marginTop: 6
    }
  }, colors.map((c, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    title: c.name,
    style: {
      width: 15,
      height: 15,
      borderRadius: "50%",
      background: c.hex,
      border: "1px solid rgba(0,0,0,0.12)",
      boxSizing: "border-box"
    }
  })))));
}
Object.assign(__ds_scope, { ProductCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/commerce/ProductCard.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Veloretti Button — flat, near-square, uppercase-optional label.
 * Variants: primary (ink fill), secondary (outline), ghost, accent (signal red).
 */
function Button({
  children,
  variant = "primary",
  size = "md",
  full = false,
  uppercase = false,
  disabled = false,
  as = "button",
  style: styleOverride,
  ...rest
}) {
  const heights = {
    sm: "var(--control-h-sm)",
    md: "var(--control-h-md)",
    lg: "var(--control-h-lg)"
  };
  const pads = {
    sm: "0 18px",
    md: "0 26px",
    lg: "0 34px"
  };
  const fontSizes = {
    sm: "0.8125rem",
    md: "0.9375rem",
    lg: "1rem"
  };
  const palettes = {
    primary: {
      bg: "var(--vr-black)",
      fg: "var(--vr-white)",
      bd: "var(--vr-black)",
      hbg: "var(--vr-gray-900)"
    },
    secondary: {
      bg: "transparent",
      fg: "var(--vr-ink)",
      bd: "var(--vr-black)",
      hbg: "var(--vr-black)",
      hfg: "var(--vr-white)"
    },
    ghost: {
      bg: "transparent",
      fg: "var(--vr-ink)",
      bd: "transparent",
      hbg: "var(--vr-gray-100)"
    },
    accent: {
      bg: "var(--vr-orange)",
      fg: "var(--vr-white)",
      bd: "var(--vr-orange)",
      hbg: "var(--vr-orange-ink)"
    }
  };
  const p = palettes[variant] || palettes.primary;
  const [hover, setHover] = React.useState(false);
  const style = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    height: heights[size],
    padding: pads[size],
    width: full ? "100%" : "auto",
    fontFamily: "var(--font-sans)",
    fontWeight: 500,
    fontSize: fontSizes[size],
    letterSpacing: uppercase ? "0.12em" : "-0.005em",
    textTransform: uppercase ? "uppercase" : "none",
    lineHeight: 1,
    textDecoration: "none",
    whiteSpace: "nowrap",
    color: hover && !disabled ? p.hfg || p.fg : p.fg,
    background: hover && !disabled ? p.hbg : p.bg,
    border: `1.5px solid ${p.bd === "transparent" ? "transparent" : hover && p.hfg ? "var(--vr-black)" : p.bd}`,
    borderRadius: "var(--radius-pill)",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.4 : 1,
    transition: "var(--transition-control)",
    boxSizing: "border-box",
    appearance: "none",
    outline: "none",
    ...styleOverride
  };
  const Tag = as;
  return /*#__PURE__*/React.createElement(Tag, _extends({
    style: style,
    disabled: as === "button" ? disabled : undefined,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false)
  }, rest), children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Veloretti Input — underlined-to-boxed field with uppercase label. */
function Input({
  label,
  hint,
  error,
  id,
  style,
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const inputId = id || (label ? "in-" + label.replace(/\s+/g, "-").toLowerCase() : undefined);
  const wrap = {
    display: "flex",
    flexDirection: "column",
    gap: "7px",
    fontFamily: "var(--font-sans)",
    ...style
  };
  const lab = {
    fontSize: "0.6875rem",
    fontWeight: 500,
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    color: "var(--vr-gray-700)"
  };
  const field = {
    height: "var(--control-h-md)",
    padding: "0 14px",
    fontFamily: "var(--font-sans)",
    fontSize: "0.9375rem",
    color: "var(--vr-ink)",
    background: "var(--vr-white)",
    border: `1.5px solid ${error ? "var(--vr-orange)" : focus ? "var(--vr-black)" : "var(--vr-gray-200)"}`,
    borderRadius: "var(--radius-pill)",
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color var(--dur-fast) var(--ease-standard)",
    width: "100%"
  };
  const sub = {
    fontSize: "0.75rem",
    color: error ? "var(--vr-orange-ink)" : "var(--vr-gray-500)"
  };
  return /*#__PURE__*/React.createElement("label", {
    htmlFor: inputId,
    style: wrap
  }, label && /*#__PURE__*/React.createElement("span", {
    style: lab
  }, label), /*#__PURE__*/React.createElement("input", _extends({
    id: inputId,
    style: field,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false)
  }, rest)), (hint || error) && /*#__PURE__*/React.createElement("span", {
    style: sub
  }, error || hint));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Input.jsx", error: String((e && e.message) || e) }); }

// components/core/OptionCard.jsx
try { (() => {
/** Veloretti OptionCard — selectable bordered row (configurator: gear, size, etc.). */
function OptionCard({
  label,
  note,
  selected = false,
  disabled = false,
  onClick,
  style
}) {
  const [hover, setHover] = React.useState(false);
  const s = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    width: "100%",
    minHeight: 54,
    padding: "0 20px",
    textAlign: "left",
    fontFamily: "var(--font-sans)",
    fontSize: "0.9375rem",
    color: "var(--vr-ink)",
    background: "var(--vr-white)",
    cursor: disabled ? "not-allowed" : "pointer",
    border: `1.5px solid ${selected ? "var(--vr-black)" : hover && !disabled ? "var(--vr-gray-300)" : "var(--vr-gray-200)"}`,
    borderRadius: "var(--radius-lg)",
    opacity: disabled ? 0.4 : 1,
    transition: "border-color var(--dur-fast) var(--ease-standard)",
    boxSizing: "border-box",
    ...style
  };
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    style: s,
    disabled: disabled,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false)
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: selected ? 500 : 400
    }
  }, label), note && /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--vr-gray-500)",
      fontSize: "0.875rem"
    }
  }, note));
}
Object.assign(__ds_scope, { OptionCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/OptionCard.jsx", error: String((e && e.message) || e) }); }

// components/core/SegmentedControl.jsx
try { (() => {
/**
 * Veloretti SegmentedControl — pill toggle with a sliding thumb (e.g. Lite / Pro).
 * Controlled: pass `value` (one of options) and `onChange`.
 */
function SegmentedControl({
  options = [],
  value,
  onChange,
  size = "md",
  style
}) {
  const idx = Math.max(0, options.findIndex(o => (o.value ?? o) === value));
  const heights = {
    sm: 40,
    md: 52,
    lg: 60
  };
  const h = heights[size] || heights.md;
  const pad = 5;
  const track = {
    position: "relative",
    display: "inline-flex",
    padding: pad,
    gap: 0,
    background: "var(--vr-white)",
    border: "1px solid var(--vr-gray-100)",
    borderRadius: "var(--radius-pill)",
    boxShadow: "var(--shadow-sm)",
    fontFamily: "var(--font-sans)",
    boxSizing: "border-box",
    ...style
  };
  const thumb = {
    position: "absolute",
    top: pad,
    bottom: pad,
    left: pad,
    width: `calc((100% - ${pad * 2}px) / ${options.length})`,
    transform: `translateX(${idx * 100}%)`,
    background: "var(--vr-surface-3)",
    borderRadius: "var(--radius-pill)",
    transition: "transform var(--dur-med) var(--ease-out)",
    zIndex: 0
  };
  const seg = active => ({
    position: "relative",
    zIndex: 1,
    minWidth: 96,
    height: h - pad * 2,
    padding: "0 26px",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    background: "transparent",
    border: "none",
    cursor: "pointer",
    fontFamily: "var(--font-sans)",
    fontSize: size === "sm" ? "0.875rem" : "0.9375rem",
    fontWeight: active ? 500 : 400,
    color: active ? "var(--vr-ink)" : "var(--vr-gray-500)",
    transition: "color var(--dur-fast) var(--ease-standard)",
    whiteSpace: "nowrap"
  });
  return /*#__PURE__*/React.createElement("div", {
    style: track,
    role: "tablist"
  }, options.length > 0 && /*#__PURE__*/React.createElement("span", {
    style: thumb,
    "aria-hidden": "true"
  }), options.map((o, i) => {
    const val = o.value ?? o,
      label = o.label ?? o;
    return /*#__PURE__*/React.createElement("button", {
      key: val,
      role: "tab",
      "aria-selected": i === idx,
      style: seg(i === idx),
      onClick: () => onChange && onChange(val)
    }, label);
  }));
}
Object.assign(__ds_scope, { SegmentedControl });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/SegmentedControl.jsx", error: String((e && e.message) || e) }); }

// components/core/Select.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Veloretti Select — matches Input styling, custom chevron. */
function Select({
  label,
  hint,
  id,
  children,
  style,
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const selId = id || (label ? "sel-" + label.replace(/\s+/g, "-").toLowerCase() : undefined);
  const wrap = {
    display: "flex",
    flexDirection: "column",
    gap: "7px",
    fontFamily: "var(--font-sans)",
    ...style
  };
  const lab = {
    fontSize: "0.6875rem",
    fontWeight: 500,
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    color: "var(--vr-gray-700)"
  };
  const field = {
    height: "var(--control-h-md)",
    padding: "0 40px 0 14px",
    fontFamily: "var(--font-sans)",
    fontSize: "0.9375rem",
    color: "var(--vr-ink)",
    background: "var(--vr-white)",
    border: `1.5px solid ${focus ? "var(--vr-black)" : "var(--vr-gray-200)"}`,
    borderRadius: "var(--radius-pill)",
    outline: "none",
    boxSizing: "border-box",
    width: "100%",
    appearance: "none",
    WebkitAppearance: "none",
    backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23211F1D' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E\")",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right 14px center",
    transition: "border-color var(--dur-fast) var(--ease-standard)",
    cursor: "pointer"
  };
  const sub = {
    fontSize: "0.75rem",
    color: "var(--vr-gray-500)"
  };
  return /*#__PURE__*/React.createElement("label", {
    htmlFor: selId,
    style: wrap
  }, label && /*#__PURE__*/React.createElement("span", {
    style: lab
  }, label), /*#__PURE__*/React.createElement("select", _extends({
    id: selId,
    style: field,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false)
  }, rest), children), hint && /*#__PURE__*/React.createElement("span", {
    style: sub
  }, hint));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Select.jsx", error: String((e && e.message) || e) }); }

// components/feedback/FAQ.jsx
try { (() => {
/**
 * Veloretti FAQ — accordion list with a circular +/- toggle per row and hairline
 * dividers. Optional left-column title. One row open at a time by default.
 */
function FAQ({
  items = [],
  title = "FAQ",
  defaultOpen = 0,
  allowMultiple = false,
  style
}) {
  const [open, setOpen] = React.useState(() => defaultOpen === null ? [] : [defaultOpen]);
  const isOpen = i => open.includes(i);
  const toggle = i => {
    setOpen(cur => allowMultiple ? cur.includes(i) ? cur.filter(x => x !== i) : [...cur, i] : cur.includes(i) ? [] : [i]);
  };
  const wrap = {
    display: "grid",
    gridTemplateColumns: "minmax(0,220px) minmax(0,1fr)",
    gap: "clamp(24px,6vw,120px)",
    fontFamily: "var(--font-sans)",
    color: "var(--vr-ink)",
    ...style
  };
  const h = {
    fontSize: "clamp(2rem,4vw,2.75rem)",
    fontWeight: 500,
    letterSpacing: "-0.02em",
    margin: 0
  };
  const list = {
    borderTop: "1px solid var(--vr-gray-200)"
  };
  const rowBtn = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 20,
    width: "100%",
    padding: "26px 0",
    background: "none",
    border: "none",
    cursor: "pointer",
    textAlign: "left",
    fontFamily: "var(--font-sans)"
  };
  const q = {
    fontSize: "1.0625rem",
    color: "var(--vr-ink)",
    lineHeight: 1.4
  };
  const toggleBtn = on => ({
    flexShrink: 0,
    width: 30,
    height: 30,
    borderRadius: "50%",
    background: "var(--vr-surface-3)",
    color: "var(--vr-ink)",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1.125rem",
    lineHeight: 1,
    fontWeight: 400
  });
  const ansWrap = on => ({
    display: "grid",
    gridTemplateRows: on ? "1fr" : "0fr",
    transition: "grid-template-rows var(--dur-med) var(--ease-out)"
  });
  const ans = {
    overflow: "hidden"
  };
  const ansInner = {
    paddingBottom: 28,
    maxWidth: "60ch",
    fontSize: "1rem",
    lineHeight: 1.6,
    color: "var(--vr-gray-700)"
  };
  return /*#__PURE__*/React.createElement("div", {
    style: wrap
  }, title && /*#__PURE__*/React.createElement("h2", {
    style: h
  }, title), /*#__PURE__*/React.createElement("div", {
    style: list
  }, items.map((it, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      borderBottom: "1px solid var(--vr-gray-200)"
    }
  }, /*#__PURE__*/React.createElement("button", {
    style: rowBtn,
    onClick: () => toggle(i),
    "aria-expanded": isOpen(i)
  }, /*#__PURE__*/React.createElement("span", {
    style: q
  }, it.q), /*#__PURE__*/React.createElement("span", {
    style: toggleBtn(isOpen(i)),
    "aria-hidden": "true"
  }, isOpen(i) ? "\u2013" : "+")), /*#__PURE__*/React.createElement("div", {
    style: ansWrap(isOpen(i))
  }, /*#__PURE__*/React.createElement("div", {
    style: ans
  }, /*#__PURE__*/React.createElement("div", {
    style: ansInner
  }, it.a)))))));
}
Object.assign(__ds_scope, { FAQ });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/FAQ.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/App.jsx
try { (() => {
// App shell — routing + product data + cart state for the Veloretti website kit.
const black = {
    name: "Jet Black",
    hex: "#1A1A1A"
  },
  cream = {
    name: "Off-White",
    hex: "#EFE9DE"
  },
  sage = {
    name: "Sage Green",
    hex: "#9BA893"
  },
  navy = {
    name: "Midnight",
    hex: "#23303B"
  };
const PRODUCTS = [{
  id: "ace-two",
  name: "Ace Two",
  tagline: "Electric · Gates belt drive",
  price: "€2,599",
  priceNum: 2599,
  priceNote: "or €72/mo",
  category: "ebike",
  image: "../../assets/photography/escalator.jpg",
  badge: "New",
  colors: [black, cream, sage],
  specs: [["Range", "Up to 100 km"], ["Motor", "250W rear hub"], ["Drive", "Gates carbon belt"], ["Weight", "22 kg"], ["Frame", "Aluminium, 3 sizes"]]
}, {
  id: "ivy",
  name: "Ivy",
  tagline: "Electric · Step-through",
  price: "€2,499",
  priceNum: 2499,
  priceNote: "or €69/mo",
  category: "ebike",
  image: "../../assets/photography/shelter.jpg",
  badge: "E-bike",
  colors: [cream, black, navy],
  specs: [["Range", "Up to 90 km"], ["Motor", "250W rear hub"], ["Drive", "Gates carbon belt"], ["Weight", "23 kg"], ["Frame", "Step-through, 2 sizes"]]
}, {
  id: "caferacer",
  name: "Caféracer",
  tagline: "City · step-through",
  price: "€ 549",
  priceNum: 549,
  priceNote: "or € 15/mo",
  category: "city",
  image: "../../assets/photography/white-shirt.jpg",
  colors: [black, cream, sage],
  specs: [["Gears", "Shimano 7-speed"], ["Brakes", "Hydraulic disc"], ["Weight", "14 kg"], ["Frame", "Steel, 3 sizes"]]
}, {
  id: "attmnt",
  name: "Attaché Mount",
  tagline: "Accessory · Front rack",
  price: "€89",
  priceNum: 89,
  category: "city",
  image: "../../assets/photography/riders-mural.jpg",
  colors: [black],
  specs: [["Material", "Powder-coated steel"], ["Load", "Up to 15 kg"], ["Fits", "Ace Two, Ivy"]]
}];
function App() {
  const [view, setView] = React.useState("home");
  const [current, setCurrent] = React.useState(PRODUCTS[0]);
  const [cart, setCart] = React.useState([]);
  const go = (v, payload) => {
    if (v === "product" && payload) setCurrent(payload);
    setView(v);
    window.scrollTo(0, 0);
  };
  const addToCart = (p, color) => setCart(c => [...c, {
    name: p.name,
    price: p.price,
    priceNum: p.priceNum,
    image: p.image,
    colorName: color && color.name || "Matte Black"
  }]);
  const removeItem = idx => setCart(c => c.filter((_, i) => i !== idx));
  const bikesView = view === "accessories" || view === "business" || view === "about" ? "bikes" : view;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--surface-page)",
      minHeight: "100vh"
    }
  }, /*#__PURE__*/React.createElement(Header, {
    view: view,
    go: go,
    cartCount: cart.length
  }), bikesView === "home" && /*#__PURE__*/React.createElement(Home, {
    products: PRODUCTS,
    go: go
  }), bikesView === "bikes" && /*#__PURE__*/React.createElement(Shop, {
    products: PRODUCTS,
    go: go
  }), bikesView === "product" && /*#__PURE__*/React.createElement(ProductDetail, {
    product: current,
    go: go,
    addToCart: addToCart
  }), bikesView === "cart" && /*#__PURE__*/React.createElement(Cart, {
    items: cart,
    go: go,
    removeItem: removeItem
  }), /*#__PURE__*/React.createElement(Footer, {
    go: go
  }));
}
ReactDOM.createRoot(document.getElementById("root")).render(/*#__PURE__*/React.createElement(App, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/App.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Cart.jsx
try { (() => {
// Cart / bag screen.
function Cart({
  items,
  go,
  removeItem
}) {
  const {
    Button,
    Badge
  } = window.VR;
  const total = items.reduce((s, i) => s + i.priceNum, 0);
  const fmt = n => "€" + n.toLocaleString("nl-NL");
  const wrap = {
    maxWidth: 900,
    margin: "0 auto",
    padding: "var(--space-8) var(--container-gutter) var(--space-9)",
    fontFamily: "var(--font-sans)"
  };
  return /*#__PURE__*/React.createElement("section", {
    style: wrap
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: "clamp(1.75rem,3.5vw,2.75rem)",
      fontWeight: 500,
      letterSpacing: "-0.02em",
      margin: "0 0 28px",
      color: "var(--vr-ink)"
    }
  }, "Your bag"), items.length === 0 ? /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "60px 0",
      textAlign: "center",
      color: "var(--vr-gray-500)"
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "1.0625rem",
      marginBottom: 20
    }
  }, "Your bag is empty."), /*#__PURE__*/React.createElement(Button, {
    onClick: () => go("bikes")
  }, "Explore bikes")) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: "1px solid var(--vr-gray-200)"
    }
  }, items.map((i, idx) => /*#__PURE__*/React.createElement("div", {
    key: idx,
    style: {
      display: "flex",
      gap: 18,
      alignItems: "center",
      padding: "18px 0",
      borderBottom: "1px solid var(--vr-gray-100)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 88,
      height: 70,
      background: "var(--vr-surface-2)",
      borderRadius: "var(--radius-md)",
      overflow: "hidden",
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: i.image,
    alt: "",
    style: {
      width: "100%",
      height: "100%",
      objectFit: "cover"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 500,
      fontSize: "1.0625rem",
      color: "var(--vr-ink)"
    }
  }, i.name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "0.875rem",
      color: "var(--vr-gray-500)"
    }
  }, i.colorName, " \xB7 Medium")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 500,
      color: "var(--vr-ink)"
    }
  }, i.price), /*#__PURE__*/React.createElement("button", {
    onClick: () => removeItem(idx),
    style: {
      background: "none",
      border: "none",
      cursor: "pointer",
      color: "var(--vr-gray-500)",
      fontSize: "0.8125rem",
      textDecoration: "underline"
    }
  }, "Remove")))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: 28,
      flexWrap: "wrap",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "0.8125rem",
      color: "var(--vr-gray-500)"
    }
  }, "Subtotal \xB7 free delivery"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "1.5rem",
      fontWeight: 500,
      color: "var(--vr-ink)"
    }
  }, fmt(total))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    onClick: () => go("bikes")
  }, "Keep shopping"), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg"
  }, "Checkout")))));
}
Object.assign(window, {
  Cart
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Cart.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Chrome.jsx
try { (() => {
// Shared header + footer chrome for the Veloretti website kit.
const VR = window.VelorettiDesignSystem_ff4e7e;
function Header({
  view,
  go,
  cartCount
}) {
  const links = [["bikes", "Electric"], ["bikes", "City"], ["bikes", "Kids"], ["business", "Lease"], ["bikes", "Stores"], ["bikes", "Outlet"]];
  const wrap = {
    position: "sticky",
    top: 0,
    zIndex: 50,
    background: "rgba(246,243,236,0.92)",
    backdropFilter: "blur(10px)",
    borderBottom: "1px solid var(--vr-gray-100)",
    fontFamily: "var(--font-sans)"
  };
  const util = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: 34,
    padding: "0 var(--container-gutter)",
    fontSize: "0.75rem",
    color: "var(--vr-gray-500)",
    borderBottom: "1px solid var(--vr-gray-100)"
  };
  const utilLinks = {
    display: "flex",
    gap: 22
  };
  const ul = {
    background: "none",
    border: "none",
    cursor: "pointer",
    color: "var(--vr-gray-700)",
    fontSize: "0.75rem",
    fontFamily: "var(--font-sans)"
  };
  const inner = {
    position: "relative",
    height: 66,
    padding: "0 var(--container-gutter)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 24
  };
  const nav = {
    display: "flex",
    gap: 26
  };
  const linkS = {
    background: "none",
    border: "none",
    cursor: "pointer",
    fontFamily: "var(--font-sans)",
    fontSize: "0.875rem",
    fontWeight: 400,
    color: "var(--vr-ink)",
    padding: "6px 0"
  };
  const logo = {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%,-50%)",
    background: "none",
    border: "none",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    padding: 0
  };
  const icons = {
    display: "flex",
    alignItems: "center",
    gap: 16
  };
  const ib = {
    background: "none",
    border: "none",
    cursor: "pointer",
    color: "var(--vr-ink)",
    display: "flex",
    position: "relative",
    padding: 4
  };
  const testride = {
    height: 40,
    padding: "0 20px",
    borderRadius: "var(--radius-pill)",
    background: "var(--vr-black)",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    fontFamily: "var(--font-sans)",
    fontSize: "0.8125rem",
    fontWeight: 500
  };
  return /*#__PURE__*/React.createElement("header", {
    style: wrap
  }, /*#__PURE__*/React.createElement("div", {
    style: util
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      gap: 6,
      alignItems: "center"
    }
  }, "Part of ", /*#__PURE__*/React.createElement("b", {
    style: {
      color: "var(--vr-gray-700)",
      letterSpacing: "0.02em"
    }
  }, "PON")), /*#__PURE__*/React.createElement("span", {
    style: {
      letterSpacing: "0.02em"
    }
  }, "Forever forward."), /*#__PURE__*/React.createElement("div", {
    style: utilLinks
  }, /*#__PURE__*/React.createElement("button", {
    style: ul,
    onClick: () => go("bikes")
  }, "Accessories"), /*#__PURE__*/React.createElement("button", {
    style: ul,
    onClick: () => go("about")
  }, "About us"), /*#__PURE__*/React.createElement("button", {
    style: ul,
    onClick: () => go("about")
  }, "Journal"), /*#__PURE__*/React.createElement("button", {
    style: ul,
    onClick: () => go("about")
  }, "Help center"))), /*#__PURE__*/React.createElement("div", {
    style: inner
  }, /*#__PURE__*/React.createElement("nav", {
    style: nav
  }, links.map(([k, l]) => /*#__PURE__*/React.createElement("button", {
    key: l,
    style: linkS,
    onClick: () => go(k)
  }, l))), /*#__PURE__*/React.createElement("button", {
    style: logo,
    onClick: () => go("home"),
    "aria-label": "Veloretti home"
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logo/veloretti-wordmark-black.svg",
    alt: "Veloretti",
    style: {
      height: 17,
      display: "block"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: icons
  }, /*#__PURE__*/React.createElement("button", {
    style: testride,
    onClick: () => go("bikes")
  }, "Book a test ride"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "0.8125rem",
      color: "var(--vr-ink)"
    }
  }, "EN"), /*#__PURE__*/React.createElement("button", {
    style: ib,
    title: "Account"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "user"
  })), /*#__PURE__*/React.createElement("button", {
    style: ib,
    title: "Cart",
    onClick: () => go("cart")
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "bag"
  }), cartCount > 0 && /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      top: -4,
      right: -6,
      background: "var(--vr-orange)",
      color: "#fff",
      fontSize: "0.625rem",
      fontWeight: 500,
      minWidth: 16,
      height: 16,
      borderRadius: 999,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "0 4px"
    }
  }, cartCount)))));
}
function Icon({
  name,
  size = 20
}) {
  const p = {
    width: size,
    height: size,
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round",
    strokeLinejoin: "round"
  };
  const paths = {
    search: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("circle", {
      cx: "11",
      cy: "11",
      r: "7"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M21 21l-4.3-4.3"
    })),
    user: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("circle", {
      cx: "12",
      cy: "8",
      r: "4"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M4 21c0-4 4-6 8-6s8 2 8 6"
    })),
    bag: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
      d: "M6 8h12l-1 12H7L6 8z"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M9 8a3 3 0 0 1 6 0"
    })),
    arrow: /*#__PURE__*/React.createElement("path", {
      d: "M5 12h14M13 6l6 6-6 6"
    }),
    check: /*#__PURE__*/React.createElement("path", {
      d: "M4 12l5 5L20 6"
    }),
    bolt: /*#__PURE__*/React.createElement("path", {
      d: "M13 3L5 13h6l-1 8 8-11h-6l1-7z"
    }),
    shield: /*#__PURE__*/React.createElement("path", {
      d: "M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z"
    }),
    leaf: /*#__PURE__*/React.createElement("path", {
      d: "M5 19c0-8 6-14 14-14 0 8-6 14-14 14zM5 19c3-3 6-5 10-7"
    })
  };
  return /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    style: p
  }, paths[name]);
}
function Footer({
  go
}) {
  const wrap = {
    background: "var(--vr-black)",
    color: "var(--vr-gray-300)",
    fontFamily: "var(--font-sans)",
    padding: "64px var(--container-gutter) 40px"
  };
  const inner = {
    maxWidth: "var(--container-max)",
    margin: "0 auto"
  };
  const cols = {
    display: "grid",
    gridTemplateColumns: "1.4fr repeat(3,1fr)",
    gap: 40,
    paddingBottom: 48,
    borderBottom: "1px solid rgba(255,255,255,0.12)"
  };
  const h = {
    fontSize: "0.6875rem",
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    color: "#fff",
    marginBottom: 16
  };
  const li = {
    display: "block",
    background: "none",
    border: "none",
    color: "var(--vr-gray-300)",
    fontSize: "0.875rem",
    padding: "5px 0",
    cursor: "pointer",
    textAlign: "left"
  };
  const col = (t, items) => /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    style: h
  }, t), items.map(x => /*#__PURE__*/React.createElement("button", {
    key: x,
    style: li,
    onClick: () => go("bikes")
  }, x)));
  return /*#__PURE__*/React.createElement("footer", {
    style: wrap
  }, /*#__PURE__*/React.createElement("div", {
    style: inner
  }, /*#__PURE__*/React.createElement("div", {
    style: cols
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logo/veloretti-wordmark-white.svg",
    alt: "Veloretti",
    style: {
      height: 22,
      display: "block",
      marginBottom: 16
    }
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "0.875rem",
      lineHeight: 1.6,
      maxWidth: "32ch",
      margin: 0
    }
  }, "Designed in Amsterdam, handmade in Europe. Bikes built to make your daily rides a pleasure.")), col("Shop", ["Electric bikes", "City bikes", "Kids' bikes", "Accessories"]), col("Support", ["Test rides", "Service & repair", "Warranty", "Contact"]), col("Company", ["About us", "Sustainability", "Business leasing", "Careers"])), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      paddingTop: 24,
      fontSize: "0.75rem",
      flexWrap: "wrap",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("span", null, "\xA9 2025 Veloretti \xB7 Part of the Pon.Bike family"), /*#__PURE__*/React.createElement("span", {
    style: {
      letterSpacing: "0.1em"
    }
  }, "AMSTERDAM \xB7 NL"))));
}
Object.assign(window, {
  Header,
  Footer,
  Icon,
  VR
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Chrome.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Configurator.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// Ivy Two Pro configurator hero — studio product stage with trim + colour pickers.
(function () {
  const VR = window.VR || window.VelorettiDesignSystem_ff4e7e;
  const {
    Button,
    SegmentedControl,
    SwatchPicker
  } = VR;
  const SWATCHES = [{
    name: "Matte Black",
    hex: "#1A1A1A"
  }, {
    name: "Off-White",
    hex: "#E9E3D7"
  }, {
    name: "Burgundy",
    hex: "#5C2B2B"
  }, {
    name: "Sand",
    hex: "#D8CFBE"
  }];
  // feature hotspots positioned over the product stage (x%, y%)
  const HOTSPOTS = [{
    x: 64,
    y: 30
  }, {
    x: 33,
    y: 52
  }, {
    x: 47,
    y: 64
  }, {
    x: 55,
    y: 60
  }, {
    x: 72,
    y: 60
  }];
  function Hotspot({
    x,
    y
  }) {
    const [hover, setHover] = React.useState(false);
    return /*#__PURE__*/React.createElement("button", {
      onMouseEnter: () => setHover(true),
      onMouseLeave: () => setHover(false),
      style: {
        position: "absolute",
        left: x + "%",
        top: y + "%",
        transform: `translate(-50%,-50%) scale(${hover ? 1.08 : 1})`,
        width: 52,
        height: 52,
        borderRadius: 14,
        background: "var(--vr-white)",
        border: "none",
        boxShadow: "var(--shadow-md)",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "transform var(--dur-fast) var(--ease-out)",
        zIndex: 3
      },
      "aria-label": "Feature"
    }, /*#__PURE__*/React.createElement("svg", {
      width: "18",
      height: "18",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "var(--vr-ink)",
      strokeWidth: "1.6",
      strokeLinecap: "round"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M12 5v14M5 12h14"
    })));
  }
  function Configurator({
    productImage
  }) {
    const [trim, setTrim] = React.useState("pro");
    const [color, setColor] = React.useState("Matte Black");
    const wrap = {
      background: "#C9C4BD",
      padding: "clamp(40px,6vw,72px) var(--container-gutter) clamp(32px,5vw,56px)",
      fontFamily: "var(--font-sans)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
      color: "var(--vr-ink)"
    };
    const title = {
      fontSize: "clamp(3rem,7vw,5rem)",
      fontWeight: 500,
      letterSpacing: "-0.02em",
      lineHeight: 0.98,
      margin: 0
    };
    return /*#__PURE__*/React.createElement("section", {
      style: wrap
    }, /*#__PURE__*/React.createElement("h1", {
      style: title
    }, "Ivy Two", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
      style: {
        color: "rgba(26,26,26,0.32)"
      }
    }, trim === "pro" ? "Pro" : "Lite")), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 20,
        marginTop: 28
      }
    }, /*#__PURE__*/React.createElement(Button, {
      variant: "primary"
    }, "Buy"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: "1.0625rem",
        color: "var(--vr-gray-700)"
      }
    }, "from \u20AC ", trim === "pro" ? "3.299,00" : "2.799,00")), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 30
      }
    }, /*#__PURE__*/React.createElement(SwatchPicker, {
      swatches: SWATCHES,
      value: color,
      onChange: setColor
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        position: "relative",
        width: "100%",
        maxWidth: 1040,
        aspectRatio: "16/10",
        margin: "12px auto 0"
      }
    }, productImage ? /*#__PURE__*/React.createElement("img", {
      src: productImage,
      alt: "Ivy Two " + trim,
      style: {
        width: "100%",
        height: "100%",
        objectFit: "contain"
      }
    }) : /*#__PURE__*/React.createElement("div", {
      style: {
        position: "absolute",
        inset: "18% 8%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "rgba(26,26,26,0.28)",
        fontSize: "0.8125rem",
        letterSpacing: "0.14em",
        textTransform: "uppercase"
      }
    }, "Ivy Two Pro \xB7 product render"), HOTSPOTS.map((h, i) => /*#__PURE__*/React.createElement(Hotspot, _extends({
      key: i
    }, h)))), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 8
      }
    }, /*#__PURE__*/React.createElement(SegmentedControl, {
      options: [{
        value: "lite",
        label: "Lite"
      }, {
        value: "pro",
        label: "Pro"
      }],
      value: trim,
      onChange: setTrim
    })));
  }
  window.Configurator = Configurator;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Configurator.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Home.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// Home screen — hero, product grid, editorial split, feature strip, newsletter.
const {
  Button,
  Badge,
  ProductCard
} = window.VR;
function Hero({
  go
}) {
  const wrap = {
    position: "relative",
    minHeight: "78vh",
    display: "flex",
    alignItems: "flex-end",
    color: "#fff",
    fontFamily: "var(--font-sans)",
    overflow: "hidden"
  };
  const bg = {
    position: "absolute",
    inset: 0,
    backgroundImage: "url(../../assets/photography/riders-mural.jpg)",
    backgroundSize: "cover",
    backgroundPosition: "center 30%"
  };
  const scrim = {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(to top, rgba(22,21,20,0.55), rgba(22,21,20,0.05) 45%, rgba(22,21,20,0.15))"
  };
  const inner = {
    position: "relative",
    maxWidth: "var(--container-max)",
    margin: "0 auto",
    width: "100%",
    padding: "0 var(--container-gutter) 56px"
  };
  return /*#__PURE__*/React.createElement("section", {
    style: wrap
  }, /*#__PURE__*/React.createElement("div", {
    style: bg
  }), /*#__PURE__*/React.createElement("div", {
    style: scrim
  }), /*#__PURE__*/React.createElement("div", {
    style: inner
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "0.75rem",
      fontWeight: 500,
      letterSpacing: "0.14em",
      textTransform: "uppercase",
      opacity: 0.9
    }
  }, "New \xB7 Ace Two"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: "clamp(2.75rem,6vw,5.5rem)",
      fontWeight: 500,
      letterSpacing: "-0.02em",
      lineHeight: 1.0,
      margin: "14px 0 20px",
      maxWidth: "16ch"
    }
  }, "Ride into the city"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "1.125rem",
      lineHeight: 1.5,
      maxWidth: "46ch",
      margin: "0 0 28px",
      opacity: 0.92
    }
  }, "An electric bike designed in Amsterdam \u2014 timeless, quiet, and built to make your daily rides a pleasure."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 12,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "accent",
    size: "lg",
    onClick: () => go("product")
  }, "Shop the Ace Two"), /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    onClick: () => go("bikes"),
    style: {
      background: "rgba(255,255,255,0.12)",
      borderColor: "rgba(255,255,255,0.6)",
      color: "#fff"
    }
  }, "Book a test ride"))));
}
function FeatureStrip() {
  const items = [["bolt", "Up to 100 km", "on a single charge"], ["shield", "5-year warranty", "frame & battery"], ["leaf", "Handmade in Europe", "built to last"], ["arrow", "Free delivery", "assembled to your door"]];
  const wrap = {
    background: "var(--vr-black)",
    color: "#fff",
    fontFamily: "var(--font-sans)"
  };
  const inner = {
    maxWidth: "var(--container-max)",
    margin: "0 auto",
    padding: "22px var(--container-gutter)",
    display: "grid",
    gridTemplateColumns: "repeat(4,1fr)",
    gap: 24
  };
  return /*#__PURE__*/React.createElement("section", {
    style: wrap
  }, /*#__PURE__*/React.createElement("div", {
    style: inner
  }, items.map(([ic, t, s]) => /*#__PURE__*/React.createElement("div", {
    key: t,
    style: {
      display: "flex",
      gap: 12,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: ic,
    size: 22
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "0.9375rem",
      fontWeight: 500
    }
  }, t), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "0.8125rem",
      color: "var(--vr-gray-300)"
    }
  }, s))))));
}
function ProductGrid({
  products,
  go,
  title = "The collection",
  note
}) {
  const wrap = {
    maxWidth: "var(--container-max)",
    margin: "0 auto",
    padding: "var(--space-9) var(--container-gutter)",
    fontFamily: "var(--font-sans)"
  };
  return /*#__PURE__*/React.createElement("section", {
    style: wrap
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-end",
      marginBottom: 28,
      flexWrap: "wrap",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: "clamp(1.75rem,3vw,2.5rem)",
      fontWeight: 500,
      letterSpacing: "-0.02em",
      margin: 0,
      color: "var(--vr-ink)"
    }
  }, title), note && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "0.8125rem",
      letterSpacing: "0.06em",
      color: "var(--vr-gray-500)"
    }
  }, note)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))",
      gap: 24
    }
  }, products.map(p => /*#__PURE__*/React.createElement(ProductCard, _extends({
    key: p.id
  }, p, {
    onClick: () => go("product", p)
  })))));
}
function EditorialSplit({
  go
}) {
  const wrap = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    alignItems: "stretch",
    background: "var(--vr-surface-2)",
    fontFamily: "var(--font-sans)"
  };
  const img = {
    backgroundImage: "url(../../assets/photography/white-shirt.jpg)",
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: 460
  };
  const body = {
    padding: "clamp(32px,6vw,88px)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  };
  return /*#__PURE__*/React.createElement("section", {
    style: wrap
  }, /*#__PURE__*/React.createElement("div", {
    style: img
  }), /*#__PURE__*/React.createElement("div", {
    style: body
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "0.75rem",
      fontWeight: 500,
      letterSpacing: "0.14em",
      textTransform: "uppercase",
      color: "var(--vr-orange-ink)",
      marginBottom: 16
    }
  }, "Our philosophy"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: "clamp(1.75rem,3vw,2.75rem)",
      fontWeight: 500,
      letterSpacing: "-0.02em",
      lineHeight: 1.08,
      margin: "0 0 18px",
      color: "var(--vr-ink)"
    }
  }, "Designed to disappear into your day"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "1.0625rem",
      lineHeight: 1.6,
      color: "var(--vr-gray-700)",
      maxWidth: "42ch",
      margin: "0 0 28px"
    }
  }, "No cables to trip over, no maintenance to think about. Just a bike that starts when you do and keeps its looks for years. That's the Veloretti difference."), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    onClick: () => go("about")
  }, "Read our story"))));
}
function Newsletter() {
  const {
    Input
  } = window.VR;
  const [done, setDone] = React.useState(false);
  const wrap = {
    background: "var(--vr-black)",
    color: "#fff",
    fontFamily: "var(--font-sans)"
  };
  const inner = {
    maxWidth: 820,
    margin: "0 auto",
    padding: "var(--space-9) var(--container-gutter)",
    textAlign: "center"
  };
  return /*#__PURE__*/React.createElement("section", {
    style: wrap
  }, /*#__PURE__*/React.createElement("div", {
    style: inner
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: "clamp(1.75rem,3vw,2.5rem)",
      fontWeight: 500,
      letterSpacing: "-0.02em",
      margin: "0 0 12px"
    }
  }, "Join the ride"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "1.0625rem",
      color: "var(--vr-gray-300)",
      margin: "0 0 28px"
    }
  }, "Test-ride invites, new drops, and city stories. No noise."), done ? /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "1.0625rem"
    }
  }, "Thanks \u2014 check your inbox.") : /*#__PURE__*/React.createElement("form", {
    onSubmit: e => {
      e.preventDefault();
      setDone(true);
    },
    style: {
      display: "flex",
      gap: 10,
      maxWidth: 460,
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement("input", {
    placeholder: "Email address",
    required: true,
    type: "email",
    style: {
      flex: 1,
      height: "var(--control-h-md)",
      padding: "0 18px",
      border: "1.5px solid rgba(255,255,255,0.3)",
      background: "transparent",
      color: "#fff",
      borderRadius: "var(--radius-pill)",
      fontFamily: "var(--font-sans)",
      fontSize: "0.9375rem",
      outline: "none"
    }
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "accent",
    as: "button"
  }, "Sign up"))));
}
function FAQSection() {
  const {
    FAQ
  } = window.VR;
  const items = [{
    q: "Where can I test ride a Veloretti outside Amsterdam?",
    a: /*#__PURE__*/React.createElement(React.Fragment, null, "You can test ride the Electric Two at more than 100 partner stores across the Netherlands. Search by city or postcode to find your nearest location in Utrecht, Rotterdam or elsewhere in the country. ", /*#__PURE__*/React.createElement("a", {
      href: "#",
      style: {
        textDecoration: "underline"
      }
    }, "Find a store."))
  }, {
    q: "How is my Veloretti delivered and assembled?",
    a: "Your bike arrives ready to ride \u2014 delivered and assembled to your door, with free delivery across the Netherlands."
  }, {
    q: "Where can I have my Veloretti serviced or repaired?",
    a: "At any of our partner service points, or book a pick-up. Every bike comes with a 5-year warranty on frame and battery."
  }, {
    q: "Is the Electric Two suitable for longer commutes?",
    a: "Yes \u2014 up to 100 km on a single charge, with a quiet belt drive built for daily city and inter-city rides."
  }, {
    q: "Can I lease a Veloretti through my employer outside Amsterdam?",
    a: "Many employers across the Netherlands offer Veloretti through bike-lease schemes. Ask your HR team, or contact us and we'll help set it up."
  }];
  return /*#__PURE__*/React.createElement("section", {
    style: {
      background: "var(--surface-page)",
      padding: "var(--space-9) var(--container-gutter)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--container-max)",
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement(FAQ, {
    items: items
  })));
}
function Categories({
  go
}) {
  const {
    CategoryCard
  } = window.VR;
  const cats = [{
    title: "Electric bikes",
    description: "Effortless power, built for city life.",
    image: "../../assets/photography/escalator.jpg",
    dots: 2,
    activeDot: 0
  }, {
    title: "City bikes",
    description: "Minimal design. Maximum ease.",
    image: "../../assets/photography/shelter.jpg",
    dots: 5,
    activeDot: 0
  }, {
    title: "Kids bikes",
    description: "First rides, lasting adventures.",
    image: "../../assets/photography/white-shirt.jpg",
    dots: 2,
    activeDot: 0
  }, {
    title: "Balance bikes",
    description: "A confident start for young riders.",
    image: "../../assets/photography/riders-mural.jpg",
    dots: 2,
    activeDot: 0
  }];
  return /*#__PURE__*/React.createElement("section", {
    style: {
      maxWidth: "var(--container-max)",
      margin: "0 auto",
      padding: "var(--space-9) var(--container-gutter)",
      fontFamily: "var(--font-sans)"
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: "clamp(1.75rem,3vw,2.5rem)",
      fontWeight: 500,
      letterSpacing: "-0.02em",
      margin: "0 0 28px",
      color: "var(--vr-ink)"
    }
  }, "Explore our bikes"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))",
      gap: 28
    }
  }, cats.map(c => /*#__PURE__*/React.createElement(CategoryCard, _extends({
    key: c.title
  }, c, {
    onClick: () => go("bikes")
  })))));
}
function Home({
  products,
  go
}) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Hero, {
    go: go
  }), /*#__PURE__*/React.createElement(FeatureStrip, null), /*#__PURE__*/React.createElement(Categories, {
    go: go
  }), /*#__PURE__*/React.createElement(EditorialSplit, {
    go: go
  }), /*#__PURE__*/React.createElement(ProductGrid, {
    products: products.filter(p => p.category === "ebike"),
    go: go,
    title: "Electric bikes",
    note: "Designed in Amsterdam"
  }), /*#__PURE__*/React.createElement(FAQSection, null), /*#__PURE__*/React.createElement(Newsletter, null));
}
Object.assign(window, {
  Home,
  ProductGrid
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Home.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/ProductDetail.jsx
try { (() => {
// Product detail screen — gallery, buy box, spec list.
function ProductDetail({
  product,
  go,
  addToCart
}) {
  const {
    Button,
    Badge,
    OptionCard
  } = window.VR;
  const p = product;
  const [color, setColor] = React.useState(p.colors && p.colors[0] || {
    name: "Jet Black",
    hex: "#1A1A1A"
  });
  const [gear, setGear] = React.useState("three");
  const [size, setSize] = React.useState("M");
  const [added, setAdded] = React.useState(false);
  const wrap = {
    maxWidth: "var(--container-max)",
    margin: "0 auto",
    padding: "var(--space-7) var(--container-gutter) var(--space-9)",
    fontFamily: "var(--font-sans)"
  };
  const grid = {
    display: "grid",
    gridTemplateColumns: "1.35fr 1fr",
    gap: "clamp(28px,5vw,72px)",
    alignItems: "start"
  };
  const media = {
    background: "var(--vr-surface-2)",
    borderRadius: "var(--radius-lg)",
    overflow: "hidden",
    aspectRatio: "4/5"
  };
  const specs = p.specs || [["Range", "Up to 100 km"], ["Motor", "250W rear hub"], ["Drive", "Gates carbon belt"], ["Weight", "22 kg"], ["Frame", "Aluminium, 3 sizes"]];
  return /*#__PURE__*/React.createElement("section", {
    style: wrap
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => go("bikes"),
    style: {
      background: "none",
      border: "none",
      cursor: "pointer",
      color: "var(--vr-gray-500)",
      fontSize: "0.8125rem",
      letterSpacing: "0.06em",
      marginBottom: 22,
      display: "flex",
      alignItems: "center",
      gap: 8,
      fontFamily: "var(--font-sans)"
    }
  }, "\u2190 Back to bikes"), /*#__PURE__*/React.createElement("div", {
    style: grid
  }, /*#__PURE__*/React.createElement("div", {
    style: media
  }, /*#__PURE__*/React.createElement("img", {
    src: p.image,
    alt: p.name,
    style: {
      width: "100%",
      height: "100%",
      objectFit: "cover"
    }
  })), /*#__PURE__*/React.createElement("div", null, p.badge && /*#__PURE__*/React.createElement(Badge, {
    variant: "ink"
  }, p.badge), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: "clamp(2rem,4vw,3rem)",
      fontWeight: 500,
      letterSpacing: "-0.02em",
      margin: "14px 0 6px",
      color: "var(--vr-ink)"
    }
  }, p.name), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "1.0625rem",
      color: "var(--vr-gray-700)",
      margin: "0 0 18px"
    }
  }, p.tagline), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "baseline",
      gap: 12,
      marginBottom: 26
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "1.75rem",
      fontWeight: 500,
      color: "var(--vr-ink)"
    }
  }, p.price), p.priceNote && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "0.9375rem",
      color: "var(--vr-gray-500)"
    }
  }, p.priceNote)), p.colors && /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "baseline",
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "1.125rem",
      fontWeight: 500,
      color: "var(--vr-ink)"
    }
  }, "Colour"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "0.875rem",
      color: "var(--vr-gray-500)"
    }
  }, color.name)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10
    }
  }, p.colors.map(c => /*#__PURE__*/React.createElement("button", {
    key: c.name,
    title: c.name,
    onClick: () => setColor(c),
    style: {
      width: 52,
      height: 52,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "var(--vr-white)",
      cursor: "pointer",
      border: `1.5px solid ${color.name === c.name ? "var(--vr-black)" : "var(--vr-gray-200)"}`,
      borderRadius: "var(--radius-md)",
      boxSizing: "border-box"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 30,
      height: 30,
      borderRadius: "50%",
      background: c.hex,
      border: "1px solid rgba(0,0,0,0.08)",
      boxSizing: "border-box"
    }
  }))))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "1.125rem",
      fontWeight: 500,
      color: "var(--vr-ink)",
      marginBottom: 12
    }
  }, "Gear"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(OptionCard, {
    label: "Single speed",
    selected: gear === "single",
    onClick: () => setGear("single")
  }), /*#__PURE__*/React.createElement(OptionCard, {
    label: "Three speed",
    selected: gear === "three",
    onClick: () => setGear("three")
  }), /*#__PURE__*/React.createElement(OptionCard, {
    label: "Three speed with handbrakes",
    selected: gear === "three-hb",
    onClick: () => setGear("three-hb")
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "1.125rem",
      fontWeight: 500,
      color: "var(--vr-ink)",
      marginBottom: 12
    }
  }, "Size"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(OptionCard, {
    label: "Small",
    note: "155\u2013170 cm",
    selected: size === "S",
    onClick: () => setSize("S")
  }), /*#__PURE__*/React.createElement(OptionCard, {
    label: "Medium",
    note: "170\u2013185 cm",
    selected: size === "M",
    onClick: () => setSize("M")
  }), /*#__PURE__*/React.createElement(OptionCard, {
    label: "Large",
    note: "185\u2013200 cm",
    selected: size === "L",
    onClick: () => setSize("L")
  }))), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    full: true,
    onClick: () => {
      addToCart(p, color);
      setAdded(true);
      setTimeout(() => setAdded(false), 1600);
    }
  }, added ? "Added to bag ✓" : "Add to bag"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 14,
      display: "flex",
      gap: 8,
      alignItems: "center",
      color: "var(--vr-gray-500)",
      fontSize: "0.8125rem"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 16
  }), " Free delivery \xB7 14-day returns \xB7 5-year warranty"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 34,
      borderTop: "1px solid var(--vr-gray-100)"
    }
  }, specs.map(([k, v]) => /*#__PURE__*/React.createElement("div", {
    key: k,
    style: {
      display: "flex",
      justifyContent: "space-between",
      padding: "13px 0",
      borderBottom: "1px solid var(--vr-gray-100)",
      fontSize: "0.9375rem"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--vr-gray-500)"
    }
  }, k), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--vr-ink)",
      fontWeight: 500
    }
  }, v)))))));
}
Object.assign(window, {
  ProductDetail
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/ProductDetail.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Shop.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// Shop (Bikes) listing screen — filter rail + product grid.
function Shop({
  products,
  go
}) {
  const {
    Badge,
    ProductCard
  } = window.VR;
  const [filter, setFilter] = React.useState("all");
  const cats = [["all", "All bikes"], ["ebike", "Electric"], ["city", "City"], ["kids", "Kids"]];
  const shown = filter === "all" ? products : products.filter(p => p.category === filter);
  const wrap = {
    maxWidth: "var(--container-max)",
    margin: "0 auto",
    padding: "var(--space-8) var(--container-gutter) var(--space-9)",
    fontFamily: "var(--font-sans)"
  };
  const chip = active => ({
    height: 36,
    padding: "0 18px",
    fontFamily: "var(--font-sans)",
    fontSize: "0.8125rem",
    fontWeight: 500,
    letterSpacing: "0.04em",
    cursor: "pointer",
    borderRadius: "var(--radius-pill)",
    border: `1.5px solid ${active ? "var(--vr-black)" : "var(--vr-gray-200)"}`,
    background: active ? "var(--vr-black)" : "transparent",
    color: active ? "#fff" : "var(--vr-ink)",
    transition: "var(--transition-control)"
  });
  return /*#__PURE__*/React.createElement("section", {
    style: wrap
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "0.75rem",
      fontWeight: 500,
      letterSpacing: "0.14em",
      textTransform: "uppercase",
      color: "var(--vr-gray-500)"
    }
  }, "Shop"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: "clamp(2rem,4vw,3.25rem)",
      fontWeight: 500,
      letterSpacing: "-0.02em",
      margin: "10px 0 24px",
      color: "var(--vr-ink)"
    }
  }, "Bikes"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10,
      marginBottom: 32,
      flexWrap: "wrap"
    }
  }, cats.map(([k, l]) => /*#__PURE__*/React.createElement("button", {
    key: k,
    style: chip(filter === k),
    onClick: () => setFilter(k)
  }, l))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))",
      gap: 24
    }
  }, shown.map(p => /*#__PURE__*/React.createElement(ProductCard, _extends({
    key: p.id
  }, p, {
    onClick: () => go("product", p)
  })))));
}
Object.assign(window, {
  Shop
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Shop.jsx", error: String((e && e.message) || e) }); }

__ds_ns.CategoryCard = __ds_scope.CategoryCard;

__ds_ns.ProductCard = __ds_scope.ProductCard;

__ds_ns.SwatchPicker = __ds_scope.SwatchPicker;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.OptionCard = __ds_scope.OptionCard;

__ds_ns.SegmentedControl = __ds_scope.SegmentedControl;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.FAQ = __ds_scope.FAQ;

})();
